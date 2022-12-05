require('../config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
    res.send('<h1>Servidor IlseShop</h1>');
});

//rutas
app.use(require('../routes/usuario'));
app.use(require('../routes/producto'));
app.use(require('../routes/carrito'));
app.use(require('../routes/categoria'));


//base de datos 
mongoose.connect('mongodb+srv://admin:password_server20@cluster0.9isnw.mongodb.net/ilseShop', {

    useNewUrlParser: true,
    useUnifiedTopology: true

}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('servidor en linea en el puerto: ', process.env.PORT);
});