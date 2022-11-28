function equipo_restriccionData(sequelize, Datatypes) {
    alias = 'equipo_restriccion';
    cols = {
        id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
        equipo_id: { type: Datatypes.TINYINT(4) },
        restriccion_id: { type: Datatypes.TINYINT(4) }
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const equipo_restriccion = sequelize.define('equipo_restriccion')
    const equipo = sequelize.define('equipo')
    const restriccion = sequelize.define('restriccion')
    


    equipo.belongsToMany(restriccion, { through: equipo_restriccion });
    restriccion.belongsToMany(equipo, { through: equipo_restriccion });
    

    return equipo_restriccion;
}

module.exports = equipo_restriccionData;