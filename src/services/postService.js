const { BlogPost, PostCategory, Category, sequelize } = require('../database/models');

const postService = {
    create: async ({ title, content, categoryIds }) => {
        if (!title || !content || !categoryIds) {
            return { code: 400, message: 'Some required fields are missing' };
        }
        
        const { code, message, post } = await sequelize.transaction(async (t) => {
        const { rows } = await Category.findAndCountAll({ where: { id: categoryIds } });
        if (rows.length < categoryIds.length) {
            return { code: 400, message: '"categoryIds" not found' };
        }
        
        const { dataValues } = await BlogPost.create(
            { title, content, userId: 1 }, { t },
        );
        
        const arrayCategory = categoryIds.map((item) => ({
            postId: dataValues.id, categoryId: item,
        }));
        await PostCategory.bulkCreate(arrayCategory, { t });
        return { code: 201, post: dataValues };
        });
        
        return { code, message, post };
    },
};

module.exports = {
    postService,
};