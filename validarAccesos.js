let baseusuarios = require('./dataBase/usuariosRegistrados');

function existeUsuario (datosUsuario) {
    let usuarioExiste = false;
    baseusuarios.map( (usuario,index) => {
        if((datosUsuario.correo == usuario.correo) && (datosUsuario.contrasena == usuario.contrasena)){
            usuarioExiste = true;
        }
    })
    
    return usuarioExiste;
}

module.exports = {
    existeUsuario : existeUsuario
}
