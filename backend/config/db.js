const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb'); // Importation de ServerApiVersion pour configurer le serveur API
const uri = "mongodb+srv://AnquetilGabin:EdKOvGg4lIQCqC9c@cluster0.honqyvn.mongodb.net/JustTalk";

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Arrêter l'application en cas d'erreur de connexion
  }
}

module.exports = connectDB;