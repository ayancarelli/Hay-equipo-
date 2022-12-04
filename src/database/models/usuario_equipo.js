function usuarioEquipoIntermedia(sequelize, Datatypes) {
    alias = 'usuario_equipo';
    cols = {
        id: { type: Datatypes.TINYINT(4).UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false },
        equipo_id: { type: Datatypes.TINYINT(4).UNSIGNED, allowNull: false },
        usuario_id: { type: Datatypes.TINYINT(4).UNSIGNED },
        nombre_jugador: { type: Datatypes.STRING(20), allowNull: false },
        apellido_jugador: { type: Datatypes.STRING(20), allowNull: false }
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const usuario_equipo = sequelize.define(alias, cols, config);

    usuario_equipo.associate = function (modelos) {
        usuario_equipo.belongsTo(modelos.usuario, {
            as: "usuario",
            foreignKey: "usuario_id"
        });

        usuario_equipo.belongsTo(modelos.equipo, {
            as: "equipo",
            foreignKey: "equipo_id"
        });
    }

    return usuario_equipo;
}

module.exports = usuarioEquipoIntermedia;