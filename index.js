const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Schema } = mongoose; // Agregamos la importación de Schema
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/Maptrack', { useNewUrlParser: true, useUnifiedTopology: true });

const coordenadaSchema = new mongoose.Schema({
  coordenadas: {
    type: Schema.Types.Mixed,  // Cambiamos el tipo de dato a Mixed
  },
}, { versionKey: false });

const Coordenada = mongoose.model('Coordenada', coordenadaSchema);

app.use(bodyParser.json());
app.use(cors());

app.post('/guardarPoligono', async (req, res) => {
  const { coordenadas } = req.body;

  try {
    console.log('Coordenadas recibidas en el backend:', coordenadas);

    const resultadoInsercion = await Coordenada.create({ coordenadas });

    // No incluimos el campo __v en la respuesta
    const { _id } = resultadoInsercion.toObject();
    console.log('Resultado de la inserción:', { _id });

    res.json({ mensaje: 'Coordenadas guardadas correctamente' });
  } catch (error) {
    console.error('Error al guardar coordenadas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
