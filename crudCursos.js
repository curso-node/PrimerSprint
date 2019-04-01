const fs = require('fs');

const añadirCurso=(data)=>{
	cursosDisp();
	const dataC ={
	nombre:data.nombre,
	id:data.id,
	duraccion: data.duraccion,
	costo:data.costo,
	estado:"disponible",
	modalidad:data.modalidad,
	descripción:data.descripcion
	};	
	let Ident = cursos.find(xxx => xxx.id == dataC.id);

	if (!Ident) {
		let nm = cursos.find(varC => varC.nombre == dataC.nombre);
		if (!nm) {

			cursos.push(dataC);
			guardar()

		}else{
			console.log("ya existe un curso con ese nombre");
		}
		
	}else{
		console.log("ya exite un curso con ese ID");
	}
}
const cursosDisp=()=>{
	try{
		cursos = require('./dataBase/listacursos')
	}catch{
		cursos=[]
	}

}

const guardar =()=>{
	let texto = JSON.stringify(cursos)
	fs.writeFile("./dataBase/listacursos.json",texto,(err)=> {
		if(err){throw(err)}	else{console.log('Realizado con exito')}});
}


const regin=(datos)=>{ //registrar usuarios en cursos
	cursosDisp()
	UsuDisp()
	regg()	
	let data={
		IdUsu:datos.Idusuario,
		Idcur:datos.Idcurso
	};
	let curso = cursos.find(Idcurso => Idcurso.id == data.Idcur);
	let Usu = listaUsu.find(Idusuario => Idusuario.id == data.IdUsu);
	let hg = usuReg.find(vf => vf.usuarios.id ==Usu.id && vf.curso == curso.nombre)
	if(!hg){
		let br ={
			curso:{
				nombre:curso.nombre,
				id:curso.id
			},
			usuarios:{
				nombre: Usu.nombre,
				id: Usu.id
			}
		}
		usuReg.push(br)
		guardarReg()
		
	}else{
		console.log("ya hay un usuario con ese ID registrado en:"+curso.nombre)
	}
}
const regg=()=>{ //llevar a usuReg los inscritos y sus cursos correspondientes
	usuReg = require('./dataBase/registrados')
}
const guardarReg =()=>{ //crear el archivo de registrados
	let texto = JSON.stringify(usuReg)
	fs.writeFile("./dataBase/registrados.json",texto,(err)=> {
		if(err){throw(err)}	else{console.log('Realizado con exito')}});
}
const UsuDisp=()=>{
		listaUsu = require('./dataBase/usuariosRegistrados')
}
const cursosOP=(opcion,lcurso)=>{
	cursosDisp()
	UsuDisp()
	regg()
	switch (opcion){
		case "disponibles": //listar cursos disponibles
			let Us = cursos.filter(ff=> ff.estado == "disponible")
			for (var i = 0; i < Us.length; i++) {
				console.log(Us[i])
			}
		break
		case "inscritos": //listar inscritos
			let ls = usuReg.filter(tt=>tt.curso['id']==lcurso)
			lista={
				lis:ls,
				lon:ls.length,
				curso:lcurso
			}
			console.log(lista.lis)
			console.log(lista.lon)
			return ls
		break
		case "cerrar": //cerrar
		console.log(lcurso)
		let ab = cursos.find(ab => ab.id==lcurso)
		if (!ab) {
			console.log('Ese curso no existe')
		}else{
			ab['estado']="cerrado"
			guardar()
		}
		break
	}
}
const actualizar=(datos)=>{
	UsuDisp()
	let usua = listaUsu.find(wh => wh.id == datos.u)
	if (!usua) {
		console.log("El usuario no existe")
	}else{
		usua[datos.o] = datos.n
		guardarUsu()

	}
}
const guardarUsu=()=>{
	let txt = JSON.stringify(listaUsu)
	fs.writeFile("usuarios.json",txt,(err)=> {
		if(err){throw(err)}	else{console.log('Realizado con exito')}})
}
const eliminar=(usu,cur)=>{
	cursosDisp()
	UsuDisp()
	regg()
	let dataUs = listaUsu.find(xf => xf.identidad == usu )
	let dataCur = cursos.find(xfc => xfc.id == cur)
	if (!dataUs || !dataCur) {
		console.log("Uno de los datos es invalido. ¡verifique!")
	}else{
		let nEliminar = usuReg.filter(xx=> xx.curso.id != cur ||  xx.usuarios.id != usu) //no sé por qué funciona con || y no con && pero así funciona
		console.log(nEliminar)
		usuReg = nEliminar
		guardarReg()
	}
}
const miscursos=(Mcur)=>{
	regg()
	let Mcursos = usuReg.filter(mc => mc.usuarios.id == Mcur)
	for (var i = 0; i < Mcursos.length; i++) {
		console.log(Mcursos[i].curso)
	}
}
const infoUsuCur=(ID,cur)=>{
	UsuDisp()
	console.log(ID)
	let infoUsuario = listaUsu.find(iu => iu.identidad == ID)
	informacion={
		nombre:infoUsuario.nombre,
		identidad:infoUsuario.identidad,
		correo:infoUsuario.correo,
		telefono:infoUsuario.telefono,
		rol:infoUsuario.rol,
		curso:cur
	}
}




module.exports={
	añadirCurso,
	regin,
	cursosOP,
	actualizar,
	eliminar,
	miscursos,
	infoUsuCur

}