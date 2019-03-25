const fs= require('fs');

//Listado para alcenar registros
let listado = [];

function crearRegistro (datosEstudiante) {
    
    listar();

    let datos = {
        identidad : datosEstudiante.dt,
        nombre : datosEstudiante.nombre,
        correo : datosEstudiante.correo,
        telefono : datosEstudiante.tel,
        rol: 'aspirante',
    }

    listado.push(datos);
    console.log('Datos que se almacenan', listado);
    guardar();
}

const listar = () => {
    try{
        listado = require('./dataBase/usuariosRegistrados.json');
    } catch (err) {
        let datos = {
            identidad : '123456789',
            nombre : 'Sebastian',
            correo : 'sebastian@gmail.com',
            telefono : '123456',
            rol: 'coordiandor',   
        }
        listado.push(datos);
    } 
    
};

const guardar = () => {
    let datos = JSON.stringify(listado);

    fs.writeFile('./dataBase/usuariosRegistrados.json', datos, (err) =>{
        if(err) throw err;

        console.log('Datos almacenados correctamente');
    })
}

module.exports = {
    crear: crearRegistro
}