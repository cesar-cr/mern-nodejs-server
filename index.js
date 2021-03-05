const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// crear el servidor
const app = express();
// conectar a la BD
connectDB();
// habilitar cors
app.use(cors());
// habilitar express.json
app.use(express.json({ extended: true }));
// puerto de APP
const PORT = process.env.PORT || 4001;

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tarea', require('./routes/tarea'));

app.listen(PORT, () => {
    console.log(`El servidor esta escuchando en el servidor:  ${PORT}`);
})