function usuarioEquipoIntermedia(sequelize, Datatypes) {
    alias = 'usuario_equipo';
    cols = {
        id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
        equipo_id: { type: Datatypes.INTEGER },
        usuario_id: { type: Datatypes.INTEGER },
        nombre_jugador: { type: Datatypes.STRING(20) },
        apellido_jugador: { type: Datatypes.STRING(20) }
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const usuario_equipo = sequelize.define(alias, cols, config)

    /*  usuario_equipo.associate = function (modelos) {
         
         usuario_equipo.belongsTo(modelos.usuario, {
             as: "usuario",
             foreignKey: "usuario_id"
         });
 
         usuario_equipo.belongsTo(modelos.equipo, {
             as: "equipo",
             foreignKey: "equipo_id"
         });
     } */

    return usuario_equipo;
}

module.exports = usuarioEquipoIntermedia;