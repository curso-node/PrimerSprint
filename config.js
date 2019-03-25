const express = require('express');
const app = express();
const morgan = require('morgan');

const PORT = 3000;

app.use(express.static(__dirname + '/public'));

//Revisar que peticiones se realizan al servidor
app.use(morgan('dev'));

app.listen(PORT, function () {
	console.log(`Servidor iniciado en el puerto ${PORT}`);
});