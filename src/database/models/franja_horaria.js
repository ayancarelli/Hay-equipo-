function franja_horariaData(sequelize, Datatypes) {
    alias = 'franja_horaria';
    cols = {
        id: { type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true },
        detalle: { type: Datatypes.INTEGER(12) },
        
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const franja_horaria = sequelize.define(alias, cols, config)

    franja_horaria.associate = function (modelos) {
        franja_horaria.belongsTo(modelos.reserva, {
            as: "reserva",
            foreignKey: "franja_horaria_id"
        });
    }

    return franja_horaria;
}

module.exports = franja_horariaData;