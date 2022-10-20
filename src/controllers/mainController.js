const fs = require('fs');
const path = require('path');

const equiposFilePath = path.join(__dirname, '../data/equiposDataBase.json');
const equiposJson = JSON.parse(fs.readFileSync(equiposFilePath, 'utf-8'));

const controlador = {
    index: (req, res) => {        
        res.render('index', {ps: equiposJson});
    }
}       

module.exports = controlador;
