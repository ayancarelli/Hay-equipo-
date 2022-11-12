const express = require('express'); 
const path = require('path');
const methodOverride = require('method-override');


const rutasMain = require('./src/routes/main');
const rutasUsers = require('./src/routes/users');
const rutasProducts = require('./src/routes/products');

const app = express();

app.use (express.static(path.resolve(__dirname,'./public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.use('/', rutasMain);
app.use('/products', rutasProducts);
app.use('/users', rutasUsers);



app.listen(process.env.PORT || 3000, function() {
    console.log("Servidor corriendo");
});