function restriccionData(sequelize, Datatypes) {
    alias = 'restriccion';
    cols = {
        id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: Datatypes.STRING(20) },
        tipo_restriccion_id: { type: Datatypes.TINYINT(4) }
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const restriccion = sequelize.define(alias, cols, config)

    restriccion.associate = function (modelos) {
        restriccion.belongsTo(modelos.tipo_restriccion, {
            as: "tipo_restriccion",
            foreignKey: "tipo_restriccion_id"
        });

        restriccion.belongsToMany(modelos.equipo, {
            as: "equipo",
            through: "equipo_restriccion",
            foreignKey: "restriccion_id",
            otherKey: "equipo_id",
            timestamps: false
        });
    }

    return restriccion;
}

module.exports = restriccionData;