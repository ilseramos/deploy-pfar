// routes for schema carrito

const express = require('express');
const _ = require('underscore');
const Carrito = require('../models/carrito');

const app = express();

app.get('/carrito/:id', function(req, res) {
    let id = req.params.id;

    Carrito.find({'usuario': id}, (err, carritoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de consultar',
                err: err
            });
        }
        res.json({
            ok: true,
            msg: 'Carrito obtenido con exito',
            carrito: carritoDB
        });
    });
});

app.post('/carrito', function(req, res) {
    let body = req.body;

    // new carrito type object from schema carrito
    let carrito = new Carrito({
        usuario: body.usuario,
        producto: body.producto
    });

    carrito.save((err, carritoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de guardar',
                err: err
            });
        }
        res.json({
            ok: true,
            msg: 'Carrito guardado con exito',
            carrito: carritoDB
        });
    });
});

app.put('/carrito/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['cantidad']);

    Carrito.findOneAndUpdate({'usuario': id}, body, { new: true, runValidators: true, context: 'query' }, (err, carritoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actualizar',
                err: err
            });
        }
        res.json({
            ok: true,
            msg: 'Carrito actualizado con exito',
            carrito: carritoDB
        });
    });
});

module.exports = app;