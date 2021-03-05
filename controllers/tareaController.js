const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyectos');
const { validationResult } = require('express-validator');

// crea una nueva tara

exports.crearTarea = async (req, res) => {

    // Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // extraer el proyecto 
    const { proyecto } = req.body;
    try {
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        // revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }

        // crear la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en el servicio'});
    }
}

// listar tareas por proyecto
exports.obtenerTareas = async (req, res) => {
    try {
        const { proyecto } = req.query;
        const existeProyecto = await Proyecto.findById(proyecto);
        if (!existeProyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        // revisar si el proyecto actual pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }

        // obtener las tareas
        const tareas = await Tarea.find({ proyecto });
        res.json({ tareas });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en el servicio'});
    }
}

// actualizar una tarea
exports.actulizarTarea = async (req, res) => {
    try {
        const { proyecto, nombre, estado } = req.body;
        // revisar si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // revisar si el proyecto actual pertenece al usuario autenticado
        const existeProyecto = await Proyecto.findById(proyecto);
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }

        // crear un obj con nueva info
        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        // guardar tarea
        tarea = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, { new : true});
        res.json({tarea});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en el servicio'});
    }
}

// eliminar tarea
exports.eliminarTarea = async (req, res) => {
    try {
        const { proyecto } = req.query;
        // revisar si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if (!tarea) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }

        // revisar si el proyecto actual pertenece al usuario autenticado
        const existeProyecto = await Proyecto.findById(proyecto);
        if (existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({ msg: 'Usuario no autorizado' });
        }

        // eliminar tarea
        await Tarea.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error en el servicio'});
    }
}