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
    
    /* equipo.belongsToMany(complejo, { through: reserva });
    equipo.belongsToMany(franja_horaria, { through: reserva });
    complejo.belongsToMany(equipo, { through: reserva });
    complejo.belongsToMany(franja_horaria, { through: reserva });
    franja_horaria.belongsToMany(equipo, { through: reserva });
    franja_horaria.belongsToMany(complejo, { through: reserva }); */
    

    return reserva;
}

module.exports = reservaData;