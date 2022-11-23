function equipoData(sequelize, Datatypes) {
    alias = 'equipo';
    cols = {
        id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre_equipo: { type: Datatypes.STRING(20) },
        img_equipo: { type: Datatypes.STRING(50) },
        creacion: { type: Datatypes.DATE, defaultValue: Datatypes.NOW },
        fecha_baja: { type: Datatypes.DATE, defaultValue: null }
    }

    config = { freezeTableName: true, timestamps: false };
    const equipo = sequelize.define(alias, cols, config)

    equipo.associate = function (modelos) {
       /*  equipo.hasMany(modelos.usuario_equipo, {
            as: "usuario_equipo",
            foreignKey: "equipo_id"
        }); */

         equipo.belongsToMany(modelos.usuario, {
             as: "usuario",
             through: "usuario_equipo",
             foreignKey: "equipo_id",
             otherKey: "usuario_id",
             timestamps: false
         });
    }

    return equipo;
}

module.exports = equipoData;