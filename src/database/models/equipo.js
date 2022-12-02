function equipoData(sequelize, Datatypes) {
    alias = 'equipo';
    cols = {
        id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre_equipo: { type: Datatypes.STRING(20) },
        img_equipo: { type: Datatypes.STRING(50) },
        creacion: { type: Datatypes.DATE, defaultValue: Datatypes.NOW },
        fecha_baja: { type: Datatypes.DATE, defaultValue: null }
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const equipo = sequelize.define(alias, cols, config)

    equipo.associate = function (modelos) {       
        equipo.hasMany(modelos.usuario_equipo, {
            as: "usuario_equipo",
            foreignKey: "equipo_id"
        });

        equipo.belongsToMany(modelos.restriccion, {
            as: "restriccion",
            through: "equipo_restriccion",
            foreignKey: "equipo_id",
            otherKey: "restriccion_id",
            timestamps: false
        });

        equipo.hasMany(modelos.reserva, {
            as: "reserva1",
            foreignKey: "equipo1_id"
        });

        equipo.hasMany(modelos.reserva, {
            as: "reserva2",
            foreignKey: "equipo2_id"
        });
    }

    return equipo;
}

module.exports = equipoData;