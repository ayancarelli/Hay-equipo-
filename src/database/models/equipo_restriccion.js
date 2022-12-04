function equipo_restriccionData(sequelize, Datatypes) {
    alias = 'equipo_restriccion';
    cols = {
        id: { type: Datatypes.TINYINT(4).UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false },
        equipo_id: { type: Datatypes.TINYINT(4).UNSIGNED, allowNull: false },
        restriccion_id: { type: Datatypes.TINYINT(4).UNSIGNED, allowNull: false }
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };

    const equipo_restriccion = sequelize.define(alias, cols, config);

    return equipo_restriccion;
}

module.exports = equipo_restriccionData;