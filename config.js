const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const crud = require('./crud');

////// Realizado por Andres
//Archivos estaticos
const directorioPublico = path.join(__dirname, '/public');
app.use(express.static(directorioPublico));

//Registro de partials - widgets
const directorioPartials = path.join(__dirname, '/widgets');
hbs.registerPartials(directorioPartials);

//Permite leer el cuerpo en las respuestas del parametro (req -> peticion)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Revisar que peticiones se realizan al servidor
app.use(morgan('dev'));

//hbs vistas
app.set('view engine', 'hbs');

app.get('/registrarse', (req, res) =>{
	res.render('registrarse');
});

app.post('/registrarse', (req, res) =>{
	res.send('ok');
	crud.crear(req.body);
});

app.get('/', (req, res) => {
	res.render('index');
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

//// Termina Realizado por Andres