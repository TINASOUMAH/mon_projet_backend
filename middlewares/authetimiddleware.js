// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const Membre = require('../modeles/membremodel');


const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ message: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const membre = await Membre.findById(decoded.id);
    if(!membre) return res.status(401).json({ message: 'Utilisateur non trouvé' });

    req.membre = membre; // Ajouter membre à la requête
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

module.exports = authMiddleware;
