const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const api = express();

api.use(bodyParser.json());

let categories = [
    {
        id: 1,
        name: 'Roman policier',
    },
    {
        id: 2,
        name: 'Roman d\'aventures',
    },
    {
        id: 3,
        name: 'Roman de mœurs',
    },
    {
        id: 4,
        name: 'Roman de science-fiction',
    },
];

api.get('/categories', (req, res) => {
    res.json(categories);
});

api.get('/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = categories.find((category) => category.id === categoryId);

    if (category) {
        res.json(category);
    } else {
        res.json({ message: `Category ${categoryId} pas trouvé` });
    }
});

api.post('/categories', (req, res) => {
    const { id, name } = req.body;

    if (id && name) {
        const category = { id, name };
        categories.push(category);
        res.json(category);
    } else {
        res.status(400).json({ message: 'Invalid category data' });
    }
});

api.delete('/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const index = categories.findIndex((category) => category.id === categoryId);

    if (index !== -1) {
        categories.splice(index, 1);
        res.json({ message: `Category ${categoryId} suppression réussie` });
    } else {
        res.status(404).json({ message: `Category ${categoryId} pas trouvé` });
    }
});

api.listen(5001, () => {
    console.log('Categories service started on port 5001');
});
