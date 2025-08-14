
const cors=require("cors")
const express = require("express");
const app = express();
app.use(cors())

// Activer le parsing JSON avant les routes
app.use(express.json());

const routetache = require("./routes/tacheRoute");
app.use('/api/auth', require('./routes/authentRoute'));

const { db } = require("./dbs/db");
db();

app.use("/api/taches", routetache);

const https = require('https');

function pingServer() {
  https.get('https://ton-nom-de-domaine.onrender.com', (res) => {
    console.log(`Ping envoyé - statut : ${res.statusCode}`);
  }).on('error', (err) => {
    console.error('Erreur de ping :', err.message);
  });
}

// Ping toutes les 5 minutes
setInterval(pingServer, 5 * 60 * 1000);


app.listen(process.env.PORT, () => {
  console.log(`Le serveur lancé avec succès sur le port : ${process.env.PORT}`);
});
