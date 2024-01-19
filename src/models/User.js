const fs = require("fs");
const path = require("path");

// Objeto User que contiene los métodos para manipular el JSON de usuarios
const User = {
    // Ruta hacia el JSON de usuarios
    fileName: path.join(__dirname , "../data/users.json"),
    // Conversión del JSON de usuarios a array para poder trabajarlo con JS 
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName , "utf-8"));
    },
    // Método que obtiene a todos los usuarios
    findAll: function () {
        return this.getData();
    },
    // Método para encontrar un usuario por ID
    getByPk: function(id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
	    return userFound;
    },
    // Método para encontrar un usuario por campo de formulario
    getByField: function(field , text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },
    // Método para crear un usuario
    // Esta parte le toca a Mario, esperar a ver qué código usa

    // Método para generar ID
    // Esta parte le toca a Mario, esperar a ver qué código usa

    // Método para eliminar un usuario por su ID
    delete: function (id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter (oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName , JSON.stringify(finalUsers , null , " ") );
	    return true;
    }
};


module.exports = User;
