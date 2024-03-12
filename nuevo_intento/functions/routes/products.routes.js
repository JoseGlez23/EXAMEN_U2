//Especifico que ahora que router ahora v a ser mi express y ahora en ves de app uso router para mi CRUD
const { Router } = require("express");
//Especifico que la constante router va contener el Router que posee mi express
const router = Router();
const admin = require("firebase-admin");

const db = admin.firestore();

//Inserto una nueva pelicula en mi base de dartos
router.post("/api/movies", async (req, res) => {
  try {
    await db
      .collection("movies")
      .doc("/" + req.body.id + "/")
      .create({ name: req.body.name, category: req.body.category, duration: req.body.duration, price: req.body.price });
    return res.status(204).json();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//Mando a llamar una pelicula por su id dentro de mi base de datos
router.get("/api/movies/:product_id", (req, res) => {
  (async () => {
    try {
      const doc = db.collection("movies").doc(req.params.product_id);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});


//Mando a llamar a toda mi base de datos
router.get("/api/movies", async (req, res) => {
  try {
    const query = db.collection("movies");
    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name, category: doc.data().category, duration: doc.data().duration, price: doc.data().price,
    }));

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json();
  }
});

//Puedo eliminar una pelicula
router.delete("/api/movies/:product_id", async (req, res) => {
  try {
    const document = db.collection("movies").doc(req.params.product_id);
    await document.delete();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json();
  }
});


//Actualizo los elementos o datos que contiene mi pelicula
router.put("/api/movies/:product_id", async (req, res) => {
  try {
    const document = db.collection("movies").doc(req.params.product_id);
    await document.update({
      name: req.body.name, category: req.body.category, duration: req.body.duration, price: req.body.price
    });
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json();
  }
});

module.exports = router;
