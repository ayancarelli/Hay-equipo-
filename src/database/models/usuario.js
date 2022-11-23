function usuarioData(sequelize, Datatypes){
    alias = 'usuario';
    cols = {
    id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: Datatypes.STRING(20)},
    apellido: {type: Datatypes.STRING(20)},
    dni: {type: Datatypes.INTEGER},
    genero: {type: Datatypes.BOOLEAN},
    email: {type: Datatypes.STRING(50)},
    password: {type: Datatypes.STRING(16)},
    foto_perfil: {type: Datatypes.STRING(50)}
    }

    config = {freezeTableName: true, timestamps: false};
    const usuario = sequelize.define(alias,cols,config)

    usuario.associate = function (modelos) {
       /*  usuario.hasMany(modelos.usuario_equipo, {
            as: "usuario_equipo",            
            foreignKey: "usuario_id"
        }); */

        usuario.belongsToMany(modelos.equipo, {
            as: "equipo",
            through: "usuario_equipo",
            foreignKey: "usuario_id",
            otherKey: "equipo_id",
            timestamps: false
        });
    }
    return usuario;
    }
    
    module.exports = usuarioData;
    