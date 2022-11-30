function reservaData(sequelize, Datatypes) {
    alias = 'reserva';
    cols = {
        id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
        equipo1_id: { type: Datatypes.TINYINT(4) },
        equipo2_id: { type: Datatypes.TINYINT(4) },
        fecha_creacion: { type: Datatypes.DATEONLY },
        fecha_partido: { type: Datatypes.DATEONLY },
        franja_horaria_id: { type: Datatypes.TINYINT(4) },
        complejo_id: { type: Datatypes.TINYINT(4) },
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const reserva = sequelize.define(alias, cols, config);

    reserva.associate = function (modelos) {
        reserva.belongsTo(modelos.franja_horaria, {
            as: "franja_horaria",
            foreignKey: "franja_horaria_id"
        });

        reserva.belongsTo(modelos.complejo, {
            as: "complejo",
            foreignKey: "complejo_id"
        });

        reserva.belongsTo(modelos.equipo, {
            as: "equipo1",
            foreignKey: "equipo1_id"
        });

        reserva.belongsTo(modelos.equipo, {
            as: "equipo2",
            foreignKey: "equipo2_id"
        });
    }


    return reserva;
}

module.exports = reservaData;