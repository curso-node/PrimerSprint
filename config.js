const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const crud = require('./crud');
const crudCursos = require('./crudCursos')
const expressSession = require('express-session');
require('./helpers');

const directorioPublico = path.join(__dirname, '/public');
app.use(express.static(directorioPublico));


const directorioPartials = path.join(__dirname, '/widgets');
hbs.registerPartials(directorioPartials);

//Permite leer el cuerpo en las respuestas del parametro (req -> peticion)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'llave', saveUninitialized: false, resave: false}));

//peticiones servidor
app.use(morgan('dev'));

//Inicializacion HBS
app.set('view engine', 'hbs');

app.get('/registrarse', (req, res) =>{
	res.render('registrarse');
});

app.post('/registrarse', (req, res) =>{
	res.render("registrarse");
	crud.crear(req.body);
});

app.get('/ingresar', (req, res) =>{
	res.render('ingresar' );
});

app.post('/ingresar', (req, res) =>{		
	let verificar = require('./validarAccesos');
	let validarUsuario = verificar.existeUsuario(req.body);

	if(validarUsuario.usuarioExiste){
		req.session.datosPersona = validarUsuario.datosUsuario;
		req.session.succes = true;

		if(validarUsuario.usuarioExiste){
			req.session.datosPersona = validarUsuario.datosUsuario;
			req.session.succes = true;
			res.redirect('dashboard');
		} 
	} else{
			req.session.succes = false;
			res.render('ingresar');
	}
});


app.get('/dashboard', (req,res) => {
	if(req.session.succes){
		res.render('dashboard', {
			success: req.session.succes, 
			'datos': req.session.datosPersona,
			});
	} else{
		res.redirect('ingresar');
	}
})
app.post("/crearCurso",(req, res)=>{
	crudCursos.añadirCurso(req.body);
	res.render('dashboard')

})
app.get('/dashboard/Cursos', (req, res ) => {
	let listadoDeCursos = require('./dataBase/listacursos.json');
	// let registrados = require('./dataBase/registrados.json')
	if(req.session.succes && req.session.datosPersona.rol === 'coordinador'){
		res.render('Cursos',{
			success: req.session.succes, 
			'datos': req.session.datosPersona,
			'listadoCursos': listadoDeCursos
			})
	} else{
		// res.send('no tiene permiso');
		res.redirect('../ingresar');
	}
})
app.post('/dashboard/cerrarCurso',(req,res)=>{
	crudCursos.cursosOP("cerrar",req.body.ID)
	if(req.session.succes && req.session.datosPersona.rol === 'coordinador'){
		res.render('Cursos',{
			success: req.session.succes, 
			'datos': req.session.datosPersona,
			})
	} else{
		res.redirect('../ingresar');
	}
})
app.post("/inscritos",(req,res)=>{
	crudCursos.cursosOP("inscritos",req.body.idCur)
	if(req.session.succes && req.session.datosPersona.rol === 'coordinador'){
		res.render('inscritos',{
			success: req.session.succes, 
			'datos': req.session.datosPersona,
			'listaInscritos':lista.lis,
			'totalInscritos':lista.lon,
			'Idcurso':lista.curso
			})
	} else{
		// res.send('no tiene permiso');
		res.redirect('../ingresar');
	}
			
})
app.post("/infoUsuarioCurso",(req,res)=>{
	crudCursos.infoUsuCur(req.body.iden,req.body.cur)
	if(req.session.succes && req.session.datosPersona.rol === 'coordinador'){
		res.render('infoUsuarioCurso',{
				success: req.session.succes, 
				'datos': req.session.datosPersona,
				'informacion':informacion
		})
	} else{
		// res.send('no tiene permiso');
		res.redirect('../ingresar');
	}
})
app.get("/dashboard/verUsuarios",(req,res)=>{
	let usuarios = require('./dataBase/usuariosRegistrados.json');
	if(req.session.succes && req.session.datosPersona.rol === 'coordinador'){
		res.render('verUsuarios',{
				success: req.session.succes, 
				'datos': req.session.datosPersona,
				'lista':usuarios
		})
	} else{
		// res.send('no tiene permiso');
		res.redirect('../ingresar');
	}
})
app.post("/eliminar",(req,res)=>{
	crudCursos.eliminar(req.body.iden,req.body.cur)
	if(req.session.succes && req.session.datosPersona.rol === 'coordinador'){
		res.render('dashboard',{
				success: req.session.succes, 
				'datos': req.session.datosPersona
		})
	} else{
		// res.send('no tiene permiso');
		res.redirect('../ingresar');
	}
})

app.post("/convertir",(req,res)=>{
	crudCursos.eliminar(req.body.iden,req.body.cur)
	if(req.session.succes && req.session.datosPersona.rol === 'coordinador'){
		res.render('dashboard',{
				success: req.session.succes, 
				'datos': req.session.datosPersona
		})
	} else{
		// res.send('no tiene permiso');
		res.redirect('../ingresar');
	}
})
app.get('/salir', ( req, res ) => {
	if(req.session.succes){
		req.session.datosPersona = undefined;
		req.session.succes = false;
		res.redirect('ingresar');
	}
})

app.get('/', (req, res) => {
	res.render('index', {
		success: req.session.succes, 
		'datos': req.session.datosPersona,
		});
});

// Rutas 404
app.get('*', (req, res) => {
	res.send('Página no existe');
});


const PORT = 3000;
// Llamado al servidor
app.listen(PORT, function () {
	console.log(`Servidor iniciado en el puerto ${PORT}`);
});