function tipoRestriccionData(sequelize, Datatypes) {
    alias = 'tipo_restriccion';
    cols = {
        id: { type: Datatypes.TINYINT(4).UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false },
        descripcion: { type: Datatypes.STRING(100), allowNull: false }
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