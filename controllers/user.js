const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req, res = response) => {
    const { q, nombre = "no name", apikey } = req.query;
    res.json({
        msg: 'Get api - controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });


    //verificar correo
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'correo ya se encuentra registrado'
        });
    }

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar bd

    await usuario.save();
    res.json({
        msg: 'post api - controlador',
        usuario
    });
}


const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'put api - controlador',
        id
    });
}


const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete api - controlador'
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch api - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}