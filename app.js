const express = require('express');
const session = require('express-session');
const path = require('path');
const methodOverride = require('method-override');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const cookies = require('cookie-parser');
const cors = require('cors');


const app = express();

// Error CORS
const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "localhost:3000",
                    credentials: true
                }
            ]
        }
    }
}


// Middlewares de aplicación
app.use(cors(
    config.application.cors.server
));
app.use(session({
    secret: "Secreto de Hay Equipo",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookies());
app.use(userLoggedMiddleware);


// Template Engine
app.set('view engine', 'ejs');


// Routers
const rutasMain = require('./src/routes/main');
const rutasUsers = require('./src/routes/users');
const rutasProducts = require('./src/routes/products');
const rutasUsersApi = require('./src/routes/usersApi');
const rutasProductsApi = require('./src/routes/productsApi');
const rutasReservaApi = require('./src/routes/reservaApi');
const rutasCiudadApi = require('./src/routes/ciudadApi');
const rutasComplejoApi = require('./src/routes/complejoApi');
const rutasUltimoApi = require('./src/routes/ultimoApi');


app.use('/', rutasMain);
app.use('/products', rutasProducts);
app.use('/users', rutasUsers);
app.use('/usersApi', rutasUsersApi)
app.use('/productsApi', rutasProductsApi)
app.use('/reservaApi', rutasReservaApi)
app.use('/ciudadApi', rutasCiudadApi)
app.use('/complejoApi', rutasComplejoApi)
app.use('/ultimo', rutasUltimoApi)


app.listen(process.env.PORT || 3000, function () {
    console.log("Servidor corriendo");
});