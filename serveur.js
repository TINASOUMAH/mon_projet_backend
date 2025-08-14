
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

//ANTI-sommeil//
function antisleep(url){
  if(!url) return console.error("url render manquande")
    setInterval(()=>{
  https.get(url,(res)=>{
    console.log(`ping à ${url} -status:${res.statuscode}}`)

  }).on("error",(err)=>{
    console.error("erreur ping:",err.message)
  })
}, 5 * 60 * 1000)
}
antisleep("https://mon-projet-backend-2.onrender.com/")

app.listen(process.env.PORT, () => {
  console.log(`Le serveur lancé avec succès sur le port : ${process.env.PORT}`);
});
