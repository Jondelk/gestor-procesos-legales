const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const procesoRoutes = require('./routes/proceso.routes');
const taskRoutes = require('./routes/task.routes');
const calculoRoutes = require("./routes/calculo.routes");
const estadoRoutes = require("./routes/estado.routes");

const app = express();

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'API del Gestor de Procesos Legales funcionando'
  });
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/procesos', procesoRoutes);
app.use('/api/tasks', taskRoutes);
app.use("/api/calculo", calculoRoutes);
app.use("/api/estados", estadoRoutes);

module.exports = app;