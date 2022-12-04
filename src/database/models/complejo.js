function complejoData(sequelize, Datatypes) {
    alias = 'complejo';

    cols = {
        id: { type: Datatypes.TINYINT(4).UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false },
        nombre: { type: Datatypes.STRING(20), allowNull: false },
        direccion: { type: Datatypes.STRING(30), allowNull: false },
        ciudad_id: { type: Datatypes.TINYINT(4).UNSIGNED, allowNull: false },
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