function complejoData(sequelize, Datatypes) {
    alias = 'complejo';

    cols = {
        id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: Datatypes.STRING(20) },
        direccion: { type: Datatypes.STRING(30) },
        ciudad_id: { type: Datatypes.TINYINT(4) },

    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const complejo = sequelize.define(alias, cols, config);

    complejo.associate = function (modelos) {
        complejo.belongsTo(modelos.ciudad, {
            as: "ciudad",
            foreignKey: "ciudad_id"
        });
    }

    return complejo;

}

module.exports = complejoData;