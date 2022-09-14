const { postService } = require('../services/postService');

const postController = {
    create: async (req, res) => {
        const { title, content, categoryIds } = req.body;
        // const { user } = req.email;

    try {
        const { code, message, post } = await postService.create({
        title, content, categoryIds });

        if (message) return res.status(code).json({ message });

        return res.status(code).json(post);
    } catch (error) {
        return res.status(500).json({ message: 'Erro Interno' });
    }
    },

    findAll: async (req, res) => {
        const { code, posts } = await postService.findAll();
        return res.status(code).json(posts);
    },
};

module.exports = {
    postController,
};