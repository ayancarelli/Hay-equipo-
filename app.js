const express = require('express'); 
const path = require('path');

const app = express();

app.get ('/', (req,res) => {
    res.sendFile (path.resolve(__dirname,'./views/index.html'))
});
app.get ('/login', (req,res) => {
    res.sendFile (path.resolve(__dirname,'./views/login.html'))
});
app.get ('/registro', (req,res) => {
    res.sendFile (path.resolve(__dirname,'./views/registro.html'))
});

app.get ('/canchas', (req,res) => {
    res.sendFile (path.resolve(__dirname,'./views/canchas.html'))
});

app.get ('/carrito', (req,res) => {
    res.sendFile (path.resolve(__dirname,'./views/carrito.html'))
});

app.get ('/equipos', (req,res) => {
    res.sendFile (path.resolve(__dirname,'./views/equipos.html'))
});

app.get ('/reservas', (req,res) => {
    res.sendFile (path.resolve(__dirname,'./views/reservas.html'))
});

app.use (express.static(path.resolve(__dirname,'./public')));

app.listen(3000,() => {
    console.log("Servidor corriendo");
});