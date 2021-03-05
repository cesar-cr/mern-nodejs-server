const Proyecto = require('../models/Proyectos');
const { validationResult } = require('express-validator');

exports.crearProyecto = async (req, res) => {

    // Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);
        proyecto.creador = req.usuario.id;
        proyecto.save();
        res.json(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
    
}

// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({creado:-1});
        res.json({ proyectos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

// actualiza un proyecto
exports.actualizaProyecto = async (req, res) => { 
    // Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // extraer la informacion del proyecto
    const { nombre } = req.body;
    const nuevoProyecto = {};
    if (nombre) {
        nuevoProyecto.nombre = nombre;
    }

    try {
        // revisar el ID
        let proyecto = await Proyecto.findById(req.params.id);
        // si el proyecto existe
        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        // verficar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }
        // actualizar 
        proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id }, { $set: nuevoProyecto }, { new: true });
        res.json({ proyecto });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error'});
    }
}

// elimina proyecto por ID

exports.eliminarProyecto = async (req, res) => {
    try {
        // revisar el ID
        let proyecto = await Proyecto.findById(req.params.id);
        // si el proyecto existe
        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        // verficar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }
        // eliminar proyecto
        await Proyecto.findOneAndRemove({ _id: req.params.id });
        res.json({msg:'Proyecto eliminado'})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error en el servidor'});
    }
}