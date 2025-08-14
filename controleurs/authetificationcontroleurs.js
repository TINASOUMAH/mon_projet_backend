// controllers/authController.js
const jwt = require('jsonwebtoken');
const Membre = require('../modeles/membremodel');
const bcrypt=require("bcryptjs")
const creerToken = (membre) => {
  return jwt.sign({ id: membre._id, email: membre.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

exports.inscription = async (req, res) => {
  try {
    const { nom, email, motDePasse,role } = req.body;
    const existe = await Membre.findOne({ email });
    if(existe) return res.status(400).json({ message: 'Email déjà utilisé' });

    const nouveauMembre = new Membre({ nom, email, motDePasse ,role});
    await nouveauMembre.save();

    const token = creerToken(nouveauMembre);
    res.status(201).json({ token, membre: nouveauMembre });
  } catch (error) {
      console.error('Erreur inscription:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}

exports.connexion = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const membre = await Membre.findOne({ email });
    if(!membre) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

    const estValide = await bcrypt.compare(motDePasse,membre.motDePasse);
    if(!estValide) return res.status(401).json({ message: 'Email ou mot de passe incorrect' });

    const token = creerToken(membre);
    res.json({ token, membre });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
}
