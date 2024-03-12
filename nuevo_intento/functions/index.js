//Usa las funciones de firebase para poder interactual con la nube
const functions = require("firebase-functions");
//Usa la libreria express para estructurar el codigo del CRUD
const express = require("express");
//Permite dar acceso a los servicios de firebase como los comandos que proporciona
const admin = require("firebase-admin");

//Especifica que la variable app contendra a express.
const app = express();

//Autentica la direccion de la base de datos, ademas de que da permiso al codigo que proporciona firebase dentro de cuentas servicios
admin.initializeApp({
  credential: admin.credential.cert("./permission.json"),
  databaseURL: "https://new-project-334f2-default-rtdb.firebaseio.com",
});

//Genera una llamada de hello word en la interface
app.get("/hello-word", (req, res) => {
  return res.status(200).json({ message: "Hello word" });
});

//Manda a llamar a mi carpeta routes que contiene mi archivo products.routes que contiene mis rutas de CRUD
app.use(require("./routes/products.routes"));

//Exporta doto este archivo 
exports.app = functions.https.onRequest(app);
