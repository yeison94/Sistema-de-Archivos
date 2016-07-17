var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdministradorSchema = new Schema({
	Nombre : {type : String},
	Username : {type : String},
	Contrasena : {type : String}
});

module.exports = mongoose.model('Administrador', AdministradorSchema);
