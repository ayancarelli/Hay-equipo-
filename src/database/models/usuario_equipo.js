function usuarioEquipoIntermedia(sequelize, Datatypes) {
    alias = 'usuario_equipo';
    cols = {
        id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
        equipo_id: { type: Datatypes.TINYINT(4) },
        usuario_id: { type: Datatypes.TINYINT(4) },
        nombre_jugador: { type: Datatypes.STRING(20) },
        apellido_jugador: { type: Datatypes.STRING(20) }
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const usuario_equipo = sequelize.define(alias, cols, config);

    return usuario_equipo;
}

module.exports = usuarioEquipoIntermedia;