// routes for schema producto

const express = require('express');
const _ = require('underscore');
const Producto = require('../models/producto');

const app = express();

// listar todos los productos
app.get('/producto', function(req, res) {

    Producto.find()
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err: err
                });
            }
            res.json({
                ok: true,
                msg: 'Lista de productos obtenida con exito',
                conteo: productos.length,
                productos
            });

        });
});

// listar un producto por id
app.get('/producto/:id', function(req, res) {
    let id = req.params.id;

    Producto.findById(id , (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de consultar',
                err: err
            });
        }
        res.json({
            ok: true,
            msg: 'Producto obtenido con exito',
            producto: productoDB
        });
    });
});

// agregar un producto
app.post('/producto', function(req, res) {
    let body = req.body;

    // new producto type object from schema producto
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        picture: body.picture,
        categoria: body.categoria,
        disponible: body.disponible,
        usuario: body.usuario
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de guardar',
                err: err
            });
        }
        res.json({
            ok: true,
            msg: 'Producto guardado con exito',
            producto: productoDB
        });
    });
});

// actualizar un producto por id
app.put('/producto/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'picture', 'categoria', 'disponible', 'usuario']);

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actualizar',
                err: err
            });
        }
        res.json({
            ok: true,
            msg: 'Producto actualizado con exito',
            producto: productoDB
        });
    });
});

// eliminar un producto por id
app.delete('/producto/:id', function(req, res) {
    let id = req.params.id;

    Producto.findByIdAndRemove(id, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err: err
            });
        }
        res.json({
            ok: true,
            msg: 'Producto eliminado con exito',
            producto: productoDB
        });
    });
});

// buscar productos por nombre o palabra clave
app.get('/producto/buscar/:termino', function(req, res) {
    let termino = req.params.termino; 
    let regex = new RegExp(termino, 'i'); 

    Producto.find({ nombre: regex })
        .exec((err, productos) => { 
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err: err
                });
            }
            res.json({
                ok: true,
                msg: 'Lista de productos obtenida con exito',
                conteo: productos.length,
                productos
            });
        });
});

// buscar productos por categoria
app.get('/producto/buscar/categoria/:categoria', function(req, res) {
    let categoria = req.params.categoria;

    Producto.find({ categoria: categoria }) 
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err: err
                });
            }
            res.json({
                ok: true,
                msg: 'Lista de productos obtenida con exito',
                conteo: productos.length,
                productos
            });
        });
});



module.exports = app;