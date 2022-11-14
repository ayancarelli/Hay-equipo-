const fs = require('fs');

const User = {
    fileName: './src/data/usersDataBase.json',

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    findAll: function () {
        return this.getData();
    },

    generateId: function () {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },

    findByPk: function (id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },

    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        };
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },

    /* edit: function (userData) {
        let allUsers = this.findAll();
        let userToModify;
        for (let user of allUsers) {
            if (userData.id == user.id) {
                user.nombre = userData.nombre;
                user.apellido = userData.apellido;
                user.dni = userData.dni;
                user.fechaDeNacimiento = userData.fechaDeNacimiento;
                user.genero = userData.genero;
                user.fotoPerfil = userData.fotoPerfil;
                user.email = userData.email;
                userToModify = user;
                break;
            }
        }

        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return userToModify;
    }, */

    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    }
}

module.exports = User;