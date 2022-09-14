const { BlogPost, PostCategory, Category, User, sequelize } = require('../database/models');

// const getName = async (displayName) => {
//     const userDisplayName = await User.findOne({
//       where: { displayName },
//     });
  
//     const { id } = userDisplayName;
//     return id;
//   };

const postService = {
    getUser: async (email) => {
        const userId = await User.findOne({ where: { email } });
        const { id } = userId;
        return id;
    },

    create: async ({ title, userId, content, categoryIds }) => {
        if (!title || !content || !categoryIds) {
            return { code: 400, message: 'Some required fields are missing' };
        }
        
        const { code, message, post } = await sequelize.transaction(async (t) => {
        const { rows } = await Category.findAndCountAll({ where: { id: categoryIds } });
        if (rows.length < categoryIds.length) {
            return { code: 400, message: '"categoryIds" not found' };
        }
        
        const { dataValues } = await BlogPost.create(
            { title, content, userId }, { t },
        );
        
        const arrayCategory = categoryIds.map((item) => ({
            postId: dataValues.id, categoryId: item,
        }));
        await PostCategory.bulkCreate(arrayCategory, { t });
        return { code: 201, post: dataValues };
        });
        
        return { code, message, post };
    },

    findAll: async () => {
        const posts = await BlogPost.findAll(
            { include: 
                [
                    { model: User, as: 'user', attributes: { exclude: ['password'] } },
                    { model: Category, as: 'categories', through: { attributes: [] } },
                ],
            },
        );

        return { code: 200, posts };
    },

    findOne: async (id) => {
        const post = await BlogPost.findOne({ where: { id },
            include: 
                [
                    { model: User, as: 'user', attributes: { exclude: ['password'] } },
                    { model: Category, as: 'categories', through: { attributes: [] } },
                ], 
            });
      
        if (!post) {
          return { code: 404, message: 'Post does not exist' };
        }
      
        return { code: 200, post };
    },

    update: async (id, userId, title, content) => {
        if (!title || !content) return { code: 400, message: 'Some required fields are missing' }; 

        const post = await BlogPost.findByPk(id);

        if (!post) return { code: 404, message: 'Post does not exist' };

        if (post.userId !== userId) return { code: 401, message: 'Unauthorized user' };

        await BlogPost.update({ title, content }, { where: { id } });

        const update = await BlogPost.findByPk(id, {
            include: 
                [
                    { model: User, as: 'user', attributes: { exclude: ['password'] } },
                    { model: Category, as: 'categories', through: { attributes: [] } },
                ],
        });

        return { code: 200, update };
      },
};

module.exports = {
    postService,
};