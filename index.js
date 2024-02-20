const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Schema } = mongoose;
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/Maptrack', { useNewUrlParser: true, useUnifiedTopology: true });

const coordenadaSchema = new mongoose.Schema({
  coordenadas: {
    type: Schema.Types.Mixed,
  },
  nombre: String, // Agregar campo para el nombre del polígono
  descripcion: String, // Agregar campo para la descripción del polígono
}, { versionKey: false });

const Coordenada = mongoose.model('Coordenada', coordenadaSchema);

const marcadorSchema = new mongoose.Schema({
  marcadores: {
    type: Schema.Types.Mixed,
  },
  nombre: String, // Agregar campo para el nombre del polígono
  descripcion: String, // Agregar campo para la descripción del polígono

}, { versionKey: false });

const Marcador = mongoose.model('Marcador', marcadorSchema);

const geocercaSchema = new mongoose.Schema({
  geocercas: {
    type: Schema.Types.Mixed,
  },
  nombre: String, // Agregar campo para el nombre del polígono
  descripcion: String, // Agregar campo para la descripción del polígono
}, { versionKey: false });

const Geocerca = mongoose.model('Geocerca', geocercaSchema);

app.use(bodyParser.json());
app.use(cors());

app.post('/guardarPoligono', async (req, res) => {
  const { coordenadas, nombre, descripcion } = req.body;

  try {
    console.log('Coordenadas recibidas en el backend:', coordenadas);

    const resultadoInsercion = await Coordenada.create({ coordenadas, nombre, descripcion });

    const { _id } = resultadoInsercion.toObject();
    console.log('Resultado de la inserción:', { _id });

    res.json({ mensaje: 'Polígono guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar polígono:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



app.post('/guardarGeocerca', async (req, res) => {
  const { geocercas } = req.body;

  try {
    console.log('Geocercas recibidas en el backend:', geocercas);

    const resultadoInsercion = await Geocerca.create({ geocercas, nombre, descripcion });

    const { _id } = resultadoInsercion.toObject();
    console.log('Resultado de la inserción:', { _id });

    res.json({ mensaje: 'Geocercas guardadas correctamente' });
  } catch (error) {
    console.error('Error al guardar geocercas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Nuevo endpoint para obtener todos los polígonos
app.get('/obtenerPoligonos', async (req, res) => {
  try {
    // Buscar todos los documentos en la colección Coordenada
    const poligonos = await Coordenada.find({}, { coordenadas: 1 });
    res.json(poligonos);
    console.log(poligonos);
  } catch (error) {
    console.error('Error al obtener polígonos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



app.post('/guardarMarcador', async (req, res) => {
  const { marcadores, nombre, descripcion } = req.body;

  try {
    console.log('Marcador recibido en el backend:', marcadores);

    const resultadoInsercion = await Marcador.create({ marcadores, nombre, descripcion });

    const { _id } = resultadoInsercion.toObject();
    console.log('Resultado de la inserción:', { _id });

    res.json({ mensaje: 'Marcador guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar el marcador:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/obtenerMarcadores', async (req, res) => {
  try {
    // Buscar todos los documentos en la colección Marcador
    const marcadores = await Marcador.find({}, { marcadores: 1 });
    const marcadoresData = marcadores.map((item) => item.marcadores).flat(); // Aplanar el array
    res.json(marcadoresData);
    console.log(marcadoresData);
  } catch (error) {
    console.error('Error al obtener marcadores:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



// Nuevo endpoint para obtener todas las geocercas
app.get('/obtenerGeocercas', async (req, res) => {
  try {
    // Buscar todos los documentos en la colección Geocerca
    const geocercas = await Geocerca.find({}, { geocercas: 1 });
    // Extraer solo la propiedad geocercas y enviarla como respuesta
    const geocercasData = geocercas.map((item) => item.geocercas);
    res.json(geocercasData);
    console.log(geocercasData);
  } catch (error) {
    console.error('Error al obtener geocercas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});