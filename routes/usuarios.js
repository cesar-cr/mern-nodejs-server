// rutas para creas usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');
// Crear un usuario

// api/usuario
router.post('/',
    [
        check('nombre', 'El nombre es obigatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password','El password debe ser minimo de 8 caracteres').isLength({min:8})
    ],
    usuarioController.crearUsuario
);

module.exports = router;