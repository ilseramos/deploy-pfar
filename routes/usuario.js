// routes for schema usuario

const express = require('express');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 10;

    Usuario.find()
        .skip(Number(desde))
        .limit(Number(hasta))
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err: err
                });
            }
            res.json({
                ok: true,
                msg: 'Lista de usuarios obtenida con exito',
                conteo: usuarios.length,
                usuarios
            });

        });
});

app.get('/usuario/:id', function(req, res) {
    let id = req.params.id;

    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de consultar',
                err: err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario obtenido con exito',
            usuario: usuarioDB
        });
    });
});

app.post('/usuario', function(req, res) {
    let body = req.body;

    // new usuario type object from schema usuario
    let usuario = new Usuario({
        nickname: body.nickname,
        email: body.email,
        email_verified: body.email_verified
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de guardar',
                err: err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario guardado con exito',
            usuario: usuarioDB
        });
    });
});

// actualizar usuario por mail
app.put('/usuario/:mail', function(req, res) {

    let mail = req.params.mail;
    let body = _.pick(req.body, ['nickname', 'email', 'picture', 'email_verified']);

    Usuario.findOneAndUpdate(mail, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actualizar',
                err: err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario actualizado con exito',
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err: err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario eliminado con exito',
            usuario: usuarioDB
        });
    });
});

// consulatar usuario por email
app.get('/usuario/email/:email', function(req, res) {
    let email = req.params.email;

    Usuario.findOne({
        email: email
    }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de consultar',
                err: err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario obtenido con exito',
            usuario: usuarioDB
        });
    });
});

module.exports = app;


