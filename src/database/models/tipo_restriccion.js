function tipoRestriccionData(sequelize, Datatypes) {
    alias = 'tipo_restriccion';
    cols = {
        id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
        descripcion: { type: Datatypes.STRING(20) }
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const tipo_restriccion = sequelize.define(alias, cols, config)

    tipo_restriccion.associate = function (modelos) {
        tipo_restriccion.hasMany(modelos.restriccion, {
             as: "restriccion",
             foreignKey: "tipo_restriccion_id"
         });

       }

    return tipo_restriccion;
}

module.exports = tipoRestriccionData;