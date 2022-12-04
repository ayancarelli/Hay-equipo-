function reservaData(sequelize, Datatypes) {
    alias = 'reserva';
    cols = {
        id: { type: Datatypes.TINYINT(4).UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false },
        equipo1_id: { type: Datatypes.TINYINT(4).UNSIGNED, allowNull: false },
        equipo2_id: { type: Datatypes.TINYINT(4).UNSIGNED, allowNull: false },
        fecha_creacion: { type: Datatypes.DATEONLY, allowNull: false },
        fecha_partido: { type: Datatypes.DATEONLY, allowNull: false },
        franja_horaria_id: { type: Datatypes.TINYINT(4).UNSIGNED, allowNull: false },
        complejo_id: { type: Datatypes.TINYINT(4).UNSIGNED, allowNull: false },
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