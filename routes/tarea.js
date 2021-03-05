const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// crea proyectos
// api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea 
);

// obtener las tareas por proyecto
// api/tareas
router.get('/',
    auth,
    tareaController.obtenerTareas 
);

// actualizar una tarea
// api/tareas
router.put('/:id',
    auth,
    tareaController.actulizarTarea
);

// eliminar 
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
)

module.exports = router;