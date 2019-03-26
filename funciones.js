const fs = require('fs');

const añadirCurso=(data)=>{
	cursosDisp();
	const dataC ={
	nombre:data.n,
	id:data.i,
	duraccion: data.d,
	costo:data.c,
	estado:"offline",
	modalidad:data.m,
	descripción:data.a
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
		cursos = require('./listaCursos')
	}catch{
		cursos=[]
	}

}

const guardar =()=>{
	let texto = JSON.stringify(cursos)
	fs.writeFile("listacursos.json",texto,(err)=> {
		if(err){throw(err)}	else{console.log('creado')}});
}

module.exports={
	añadirCurso
}