const fs = require('fs');
const path = require('path');

const equiposFilePath = path.join(__dirname, '../data/equiposDataBase.json');
const equiposJson = JSON.parse(fs.readFileSync(equiposFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controlador = {
    index: (req, res) => {
        res.render('index');
    }
}

module.exports = controlador;