const { postService } = require('../services/postService');

const erro = { message: 'Erro Interno' };

const postController = {
    // error: () => { 'Erro Interno'; },
    create: async (req, res) => {
        const { title, content, categoryIds } = req.body;
        const { id: userId } = req.user;

        try {
            const { code, message, post } = await postService.create({
            title, content, categoryIds, userId });

            if (message) return res.status(code).json({ message });

            return res.status(code).json(post);
        } catch (error) {
            return res.status(500).json(erro);
        }
    },

    findAll: async (req, res) => {
        try {
            const { code, posts } = await postService.findAll();
            return res.status(code).json(posts);
        } catch (error) {
            return res.status(500).json(erro);
        }
    },

    findOne: async (req, res) => {
        const { id } = req.params;

        try {
            const { code, message, post } = await postService.findOne(id);

            if (message) return res.status(code).json({ message });

            return res.status(code).json(post);
        } catch (error) {
            return res.status(500).json(erro);
        }
    },

    update: async (req, res) => {
        const { title, content } = req.body;
        const { id } = req.params;
        const { id: userId } = req.user;

        try {
            const { code, message, update } = await postService.update(id, userId, title, content);
        
            if (message) return res.status(code).json({ message });

            return res.status(code).json(update);
        } catch (error) {
            return res.status(500).json(erro);
        }
    },

    delPost: async (req, res) => {
        const { id } = req.params;
        const { id: userId } = req.user;

        try {
            const { code, message } = await postService.delPost(id, userId);

            if (message) return res.status(code).json({ message });
        
            return res.status(code).end();
        } catch (error) {
            return res.status(500).json(erro);
        }
    },
};

module.exports = {
    postController,
};