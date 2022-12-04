function ciudadData(sequelize, Datatypes) {
    alias = 'ciudad';
    cols = {
        id: { type: Datatypes.TINYINT(4).UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false },
        nombre: { type: Datatypes.STRING(30), allowNull: false },
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const ciudad = sequelize.define(alias, cols, config)

    ciudad.associate = function (modelos) {
        ciudad.hasMany(modelos.complejo, {
            as: "complejo",
            foreignKey: "ciudad_id"
        });
    }

    return ciudad;
}

module.exports = ciudadData;