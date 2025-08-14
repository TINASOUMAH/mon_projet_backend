// controllers/tacheController.js

const tache = require("../modeles/tachemodel"); // importe ton modèle correctement

// Ajouter une tâche
exports.ajoutertache = async (req, res) => {
  try {
    const { titre, description, priority, status,assigneA } = req.body;

    // Ici on simule un utilisateur pour tester sans authentification
    const createdBy = req.user /* req.user.id : "testUserId123"*/;

    const newtache = new tache({
      titre,
      description,
      priority,
      status,
      createdBy: req.membre.id,
      assigneA
    });

    const savetache = await newtache.save();
    res.status(201).json(savetache);
  } catch (error) {
    console.error("Erreur création tâche :", error);
    res.status(500).json({ error: error.message });
  }
};

// Récupérer toutes les tâches avec pagination et filtres
exports.getTaches = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
 /*
    let filtres = { createdBy:req.user.id };
   
    if (priority) filtres.priority = priority;
    if (status) filtres.status = status;*/

    const taches = await tache.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await tache.countDocuments();

    res.json({
      taches,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Erreur récupération tâches :", error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches' });
  }
};

// Récupérer une tâche par ID
exports.getTacheId = async (req, res) => {
  try {
    const tacheFind = await tache.findOne({ _id: req.params.id});
    if (!tacheFind) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(tacheFind);
  } catch (error) {
    console.error("Erreur récupération tâche par ID :", error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la tâche' });
  }
};

// Modifier une tâche




exports.modifierTache = async (req, res) => {
  try {

    const updatedTache = req.body;
    const taches=await tache.findByIdAndUPdate(req.params.id,{updatedTache},{new:true})
    .populate("assignedto","name")
    .populate("createdBy","name")
    if(!taches) return res.status(404).json({message:"tache non trouvé"})
      res.json(taches);

  }catch(err){
    res.status(500).json({error:err.messag})
  }
}
// Supprimer une tâche
exports.supprimerTache = async (req, res) => {
  try {
    const deletedTache = await tache.findOneAndDelete(req.params.id,{new:true});
    if (!deletedTache) return res.status(404).json({ message: 'tache non trouvée' });
    res.json({ message: 'Tâche supprimée avec succès' });
  } catch (error) {
    console.error("Erreur suppression tâche :", error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la tâche' });
  }
};
