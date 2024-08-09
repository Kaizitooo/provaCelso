const { Sequelize, DataTypes } = require('sequelize');

// Configura a conexão com o banco de dados
const sequelize = new Sequelize('bibliotecaBabel', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define o modelo Livro
const Livro = sequelize.define('Livro', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sinopse: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'livrosCadastro',
    timestamps: false // Se não usar timestamps
});

// Sincroniza o modelo com o banco de dados
sequelize.sync()
    .then(() => console.log('Modelo sincronizado com o banco de dados.'))
    .catch(error => console.error('Erro ao sincronizar modelo:', error));

module.exports = Livro;
