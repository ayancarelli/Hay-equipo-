function ciudadData(sequelize, Datatypes) {
    alias = 'ciudad';
    cols = {
        id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: Datatypes.STRING(30) },
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const ciudad = sequelize.define(alias, cols, config)

    /* ciudad.associate = function (modelos) {
        ciudad.hasMany(modelos.complejo, {
            as: "complejo",
            foreignKey: "ciudad_id"
        });
    } */

    return ciudad;
}

module.exports = ciudadData;