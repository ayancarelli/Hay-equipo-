const express = require('express'); 
// const session = require('cookie-session');
const session = require('express-session');
const path = require('path');
const methodOverride = require('method-override');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const cookies = require('cookie-parser');


const app = express();


// Middlewares de aplicación
app.use(session({
    secret: "Secreto de Hay Equipo",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.resolve(__dirname,'./public')));
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


app.use('/', rutasMain);
app.use('/products', rutasProducts);
app.use('/users', rutasUsers);


app.listen(process.env.PORT || 3000, function() {
    console.log("Servidor corriendo");
});