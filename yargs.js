const comandos={
	opcion:{
		alias:"o",
		demand:true
	},
	nombre:{
		alias:"n",
		demand:true
	},
	id:{
		alias:"i",
		demand:true
	},
	costo:{
		alias:"c",
		demand:true
	},
	descripcion:{
		alias:"a",
		demand:true
	},
	duraccion:{
		alias:"d"
	},
	modalidad:{
		alias:"m"
	}
}
const comandosreginCu={
	opcion:{
		alias:"o",
		demand:true
	},
	Idusuario:{
		alias:"i",
		demand:true
	},
	Idcurso:{
		alias:"c",
		demand:true
	}
}
const cursos={
	opcion:{
		alias:'o',
		demand:true
	},
	curso:{
		alias:"c"
	}
}
const actualizar={
	opcion:{
		alias:"o",
		demand:true
	},
	usuario:{
		alias:"u",
		demand:true
	},
	nuevo:{
		alias:"n",
		demand:true
	}
}
const eliminar={
	usuario:{
		alias:"u",
		demand:true
	},
	curso:{
		alias:"c",
		demand:true
	}
}

const funciones = require('./funciones')

const argv = require("yargs").command("coordinador","coordinador del programa de educación continua",comandos)
							.command("usuario","registrar usuario en un curso",comandosreginCu)
							.command("cursos","listar todos los cursos o por usuario",cursos)
							.command("actualizar","actualizar datos usuarios",actualizar)
							.command("eliminar","eliminar <x> usuario de <y> curso",eliminar)
							.argv
switch (argv._[0]){
	case "coordinador":
		switch (argv.o) {
			case "new":
				funciones.añadirCurso(argv);
			break;
		}
	break;
	case "usuario":
		switch(argv.o){
			case "reg":
			funciones.regin(argv);
		}
	break;
	case "cursos":
		funciones.cursosOP(argv.o,argv.c)
	break;
	case "actualizar":
		funciones.actualizar(argv)
	break;
	case "eliminar":
		funciones.eliminar(argv)
	break
}
