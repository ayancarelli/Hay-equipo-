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




app.use (express.static(path.resolve(__dirname,'./public')));

app.listen(3000,() => {
    console.log("Servidor corriendo");
});