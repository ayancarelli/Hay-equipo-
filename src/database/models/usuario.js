function usuarioData(sequelize, Datatypes) {
    alias = 'usuario';
    cols = {
        id: { type: Datatypes.TINYINT(4).UNSIGNED, primaryKey: true, autoIncrement: true, allowNull: false },
        nombre: { type: Datatypes.STRING(20), allowNull: false },
        apellido: { type: Datatypes.STRING(20), allowNull: false },
        dni: { type: Datatypes.INTEGER.UNSIGNED, allowNull: false },
        genero: { type: Datatypes.BOOLEAN, allowNull: false },
        email: { type: Datatypes.STRING(50), allowNull: false },
        password: { type: Datatypes.STRING(255), allowNull: false },
        foto_perfil: { type: Datatypes.STRING(255), allowNull: false }
    }

    config = { freezeTableName: true, timestamps: false, camelCase: false };
    const usuario = sequelize.define(alias, cols, config)

    usuario.associate = function (modelos) {
        usuario.hasMany(modelos.usuario_equipo, {
            as: "usuario_equipo",
            foreignKey: "usuario_id"
        });
    }
    return usuario;
}

module.exports = usuarioData;
