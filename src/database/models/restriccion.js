function restriccionData(sequelize, Datatypes) {
    alias = 'restriccion';
    cols = {
        id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: Datatypes.STRING(20) },
        tipo_restriccion_id: { type: Datatypes.INTEGER }
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const restriccion = sequelize.define(alias, cols, config)

    restriccion.associate = function (modelos) {
        restriccion.belongsTo(modelos.tipo_restriccion, {
            as: "tipo_restriccion",
            foreignKey: "tipo_restriccion_id"
        });
    }

    return restriccion;
}

module.exports = restriccionData;