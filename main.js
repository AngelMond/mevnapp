require('dotenv').config();
const express = require('express');
// const session = require('express-session');
const cors = require('cors');
let path = require('path');
let bodyParser = require('body-parser')



//Import connection to database
const db = require('./config/connection');

//Import Routes
const routes = require('./routes')

const PORT = process.env.PORT || 8081;
const app = express();

// Set up sessions
// const sess = {
//     secret: 'Super secret secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 10_600_000,
//     },
// };



// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Configuración cabeceras y CORS
app.use((req, res, next) => {
    // Permitir cualquier origen de solicitudes (CORS)
    res.header('Access-Control-Allow-Origin', '*');

    // Permitir los encabezados personalizados especificados
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-KEY, X-Requested-With, Accept',);

    // Permitir los métodos HTTP especificados
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');

    next();
});



//Mis middlewares
// app.use(cors());
// app.use(session(sess));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());



//Aqui le decimos que entre a la ruta "/" y es donde va a servir todo el front desde la carpeta client que tiene los archivos 
//que copiamos y pegamos de la carpeta dist cuando ejecutamos npm run build
// app.use(express.static(path.join(__dirname, 'client')));

/********* URLs Limpias y Optimizadas */

//Esta es la version mejorada de la linea de arriba, es lo mismo solo que aqui
//le decimos que Nodejs no redirija a las rutas del back cuando recargue el navegador
app.use('/', express.static('client', {redirect: false }));

//Aqui las rutas son "/api"
app.use(routes);

//Cualquier ruta no especificada nos sirve el index.html y las rutas del front
//Este fichero es el que nos hace el routing del frontend
app.use('*', (req, res, next) => {
    return res.sendFile(path.resolve('client/index.html'));
})

//Start connection to DB and server
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connection to DB successfull');
    app.listen(PORT, () => console.log(`Web server listening on port ${PORT}`));
});
