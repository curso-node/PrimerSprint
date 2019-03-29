const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const hbs = require('hbs');
require('./helpers');
const crud = require('./crud');
const expressSession = require('express-session');

//Archivos estaticos
const directorioPublico = path.join(__dirname, '/public');
app.use(express.static(directorioPublico));

//Registro de partials - widgets
const directorioPartials = path.join(__dirname, '/widgets');
hbs.registerPartials(directorioPartials);

//Permite leer el cuerpo en las respuestas del parametro (req -> peticion)
//mildware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'llave', saveUninitialized: false, resave: false}));

//Revisar que peticiones se realizan al servidor
app.use(morgan('dev'));

//hbs vistas
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
		res.redirect('dashboard');
	} else{
		req.session.succes = false;
		res.render('ingresar');
	}
});

app.get('/dashboard', (req,res) => {
	if(req.session.succes){
		res.render('dashboard', {'datos': req.session.datosPersona});
	} else{
		res.redirect('ingresar');
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
	res.render('index', {success: req.session.succes, 'datos': req.session.datosPersona});
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