// models/Membre.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const membreSchema = new mongoose.Schema({
  nom: { type: String,
     required: true },
  email: { type: String,
     required: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
      unique: true },
  motDePasse: { type: String,
     required: true },
  role: { type: String,
     enum: ['membre', 'admin'],
      default: 'membre' },
}, { timestamps: true });

// Hash du mot de passe avant sauvegarde
membreSchema.pre('save', async function(next) {
  if(!this.isModified('motDePasse')) return next();
  this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
  next();
});

// Méthode de comparaison du mot de passe
membreSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.motDePasse);
}

module.exports = mongoose.model('Membre', membreSchema);
