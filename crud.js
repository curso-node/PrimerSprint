const fs= require('fs');

//Listado para alcenar registros
let listado = [];

function crearRegistro (datosEstudiante) {
    
    listar();

    let datos = {
        identidad : datosEstudiante.dt,
        nombre : datosEstudiante.nombre,
        correo : datosEstudiante.correo,
        contrasena : datosEstudiante.contrasena,
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
const crearCurso=(data)=>{
    cursosDisp();
    
    const dataC ={
    nombre:data.nombre,
    id:data.id,
    duracion: data.duracion,
    costo:data.costo,
    estado:"disponible",
    modalidad:data.modalidad,
    descripción:data.descr
    };
    let Ident = cursos.find(xxx => xxx.id == dataC.id);

    if (!Ident) {
        let nm = cursos.find(varC => varC.nombre == dataC.nombre);
        if (!nm) {
            cursos.push(dataC);
            guardarCur()

        }else{
            console.log("ya existe un curso con ese nombre");
        }
        
    }else{
        console.log('ya existe un curso con ese ID')
    }

}
const cursosDisp=()=>{
    try{
        cursos = require('./database/listacursos')
    }catch{
        cursos=[]
    }

}

const guardarCur =()=>{
    let texto = JSON.stringify(cursos)
    fs.writeFile("./database/listacursos.json",texto,(err)=> {
        if(err){throw(err)} else{console.log('creado')}});
}

module.exports = {
    crear: crearRegistro,
    crearCurso
}