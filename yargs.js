const comandos={
	opción:{
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
		alias:"d",
		demand:true
	},
	modalidad:{
		alias:"m",
		demand:true
	}
}
const funciones = require('./funciones')

const argv = require("yargs").command("coordinador","coordinador del programa de educación continua",comandos).argv

if (argv._ == "coordinador") {
	switch (argv.o) {
		case "new":
			funciones.añadirCurso(argv);
		break;
	}
}

