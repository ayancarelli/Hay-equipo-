function franja_horariaData(sequelize, Datatypes) {
    alias = 'franja_horaria';
    cols = {
        id: { type: Datatypes.TINYINT(4).UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false },
        detalle: { type: Datatypes.STRING(50), allowNull: false },
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const franja_horaria = sequelize.define(alias, cols, config);

    franja_horaria.associate = function (modelos) {
        franja_horaria.hasMany(modelos.reserva, {
            as: "reserva",
            foreignKey: "franja_horaria_id"
        });
    }

    return franja_horaria;
}

module.exports = franja_horariaData;