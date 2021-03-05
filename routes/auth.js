// rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// Iniciar sesion
// api/auth
router.post('/',
    [
        check('email', 'Agrega un email valido').isEmail(),
        check('password','El password debe ser minimo de 8 caracteres').isLength({min:8})
    ],
    authController.autenticarUsuario
);

router.get('/',
    auth,
    authController.usuarioAtenticado
);

module.exports = router;