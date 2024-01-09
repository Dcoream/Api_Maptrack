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
}, { versionKey: false });

const Coordenada = mongoose.model('Coordenada', coordenadaSchema);

const marcadorSchema = new mongoose.Schema({
  marcadores: {
    type: Schema.Types.Mixed,
  },
}, { versionKey: false });

const Marcador = mongoose.model('Marcador', marcadorSchema);

const geocercaSchema = new mongoose.Schema({
  geocercas: {
    type: Schema.Types.Mixed,
  },
}, { versionKey: false });

const Geocerca = mongoose.model('Geocerca', geocercaSchema);

app.use(bodyParser.json());
app.use(cors());

app.post('/guardarPoligono', async (req, res) => {
  const { coordenadas } = req.body;

  try {
    console.log('Coordenadas recibidas en el backend:', coordenadas);

    const resultadoInsercion = await Coordenada.create({ coordenadas });

    const { _id } = resultadoInsercion.toObject();
    console.log('Resultado de la inserción:', { _id });

    res.json({ mensaje: 'Coordenadas guardadas correctamente' });
  } catch (error) {
    console.error('Error al guardar coordenadas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/guardarMarcadores', async (req, res) => {
  const { marcadores } = req.body;

  try {
    console.log('Marcadores recibidos en el backend:', marcadores);

    const resultadoInsercion = await Marcador.create({ marcadores });

    const { _id } = resultadoInsercion.toObject();
    console.log('Resultado de la inserción:', { _id });

    res.json({ mensaje: 'Marcadores guardados correctamente' });
  } catch (error) {
    console.error('Error al guardar marcadores:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/guardarGeocerca', async (req, res) => {
  const { geocercas } = req.body;

  try {
    console.log('Geocercas recibidas en el backend:', geocercas);

    const resultadoInsercion = await Geocerca.create({ geocercas });

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

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
