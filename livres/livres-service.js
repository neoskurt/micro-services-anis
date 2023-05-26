const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const api = express();

api.use(bodyParser.json());

const livres = [
    {
        id: 1,
        title: 'La Machine à explorer le temps ',
        auteurId: 1,
        categoryId: 1
    },
    {
        id: 2,
        title: 'Le Meilleur des mondes',
        auteurId: 1,
        categoryId: 1
    },
    {
        id: 3,
        title: 'Ravage',
        auteurId: 1,
        categoryId: 1
    },
    {
        id: 4,
        title: '1984',
        auteurId: 1,
        categoryId: 1
    },
];


api.get('/livres', (req, res) => {
    res.send(livres);
});

api.get('/livres/:id', async (req, res) => {
    const livreId = parseInt(req.params.id);
    const livre = livres.find((livre) => livre.id === livreId);

    if (livre) {
        try {
            const auteurResponse = await axios.get(`http://localhost:4001/auteurs/${livre.auteurId}`);
            const categoryResponse = await axios.get(`http://localhost:5001/categories/${livre.categoryId}`);
            const auteur = auteurResponse.data;
            const category = categoryResponse.data;

            const livreDetail = {
                id: livre.id,
                title: livre.title,
                auteur: auteur.name,
                category: category.name
            };
            res.json(livreDetail);
        }
        catch (error) {
            console.log(error);
        }
    }
});

api.post('/livres', (req, res) => {
    const livre = req.body;
    livres.push(livre);
    res.json(livre);
});

api.delete('/livres/:id', (req, res) => {
    const livreId = parseInt(req.params.id);
    const livreIndex = livres.findIndex((livre) => livre.id === livreId);

    if (livreIndex !== -1) {
        const deletedlivre = livres.splice(livreIndex, 1);
        res.json(deletedlivre);
    } else {
        res.status(404).json({ message: `Livre ${livreId} pas trouvé` });
    }
});



api.listen(3001, () => {
    console.log('Le services se lance sur le port 3001');
}
);