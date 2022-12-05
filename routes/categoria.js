// routes for schema categoria

const express = require('express');
const _ = require('underscore');
const Categoria = require('../models/categoria');

const app = express();

app.get('/categoria', function(req, res) {

    Categoria.find()
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err: err
                });
            }
            res.json({
                ok: true,
                msg: 'Lista de categorias obtenida con exito',
                conteo: categorias.length,
                categorias
            });

        });
});

app.post('/categoria', function(req, res) {
    
        let body = req.body;
    
        let categoria = new Categoria({
            nombre: body.nombre,
            descripcion: body.descripcion
        });
    
        categoria.save((err, categoriaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de guardar',
                    err: err
                });
            }
            res.json({
                ok: true,
                msg: 'Categoria guardada con exito',
                categoriaDB
            });
        });
    
    });

app.put('/categoria/:nombre', function(req, res) {
    let nombre = req.params.nombre;
    let body = _.pick(req.body, ['nombre', 'descripcion']);

    Categoria.findOneAndUpdate({'nombre': nombre}, body, { new: true, runValidators: true, context: 'query' }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actualizar',
                err: err
            });
        }
        res.json({
            ok: true,
            msg: 'Categoria actualizada con exito',
            categoria: categoriaDB
        });
    });
});

app.delete('/categoria/:nombre', function(req, res) {
    let nombre = req.params.nombre;

    Categoria.findOneAndDelete({'nombre': nombre}, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err: err
            });
        }
        res.json({
            ok: true,
            msg: 'Categoria eliminada con exito',
            categoria: categoriaDB
        });
    });
});

module.exports = app;