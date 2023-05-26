const express = require('express');
const bodyParser = require('body-parser');
const api = express();

api.use(bodyParser.json());

let auteurs = [
    {
        id: 1,
        name: 'H.G. Wells',
    },
    {
        id: 2,
        name: 'Aldous Huxley',
    },
    {
        id: 3,
        name: 'René Barjavel',
    },
    {
        id: 4,
        name: 'George Orwell',
    },
];

api.get('/auteurs', (req, res) => {
    res.json(auteurs);
});

api.get('/auteurs/:id', (req, res) => {
    const auteurId = parseInt(req.params.id);
    const auteur = auteurs.find((auteur) => auteur.id === auteurId);

    if (auteur) {
        res.json(auteur);
    } else {
        res.json(`auteur ${auteurId} pas trouvé`);
    }
});

api.post('/auteurs', (req, res) => {
    const { id, name } = req.body;

    if (id && name) {
        const auteur = { id, name };
        auteurs.push(auteur);
        res.json(auteur);
    } else {
        res.status(400).json({ message: 'Invalid auteur data' });
    }
});

api.delete('/auteurs/:id', (req, res) => {
    const auteurId = parseInt(req.params.id);
    const index = auteurs.findIndex((auteur) => auteur.id === auteurId);

    if (index !== -1) {
        auteurs.splice(index, 1);
        res.json({ message: `auteur ${auteurId} suppression réussie` });
    } else {
        res.status(404).json({ message: `auteur ${auteurId} pas trouvé` });
    }
});

api.listen(4001, () => {
    console.log('auteurs service started on port 4001');
});
