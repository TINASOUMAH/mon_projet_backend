const express=require("express")
const { ajoutertache,getTaches,getTacheId,modifierTache,supprimerTache}  = require("../controleurs/tachecontroleur")
const router= express.Router()
const authMiddleware = require('../middlewares/authetiMiddleware');

router.use(authMiddleware);
/**ajouter une tache */
router.post("/", ajoutertache)
/**recuperer les taches par pagination */
router.get("/",getTaches)
/*recuperer tout une taches par son id* */

router.get("/:id" ,getTacheId)
/**modifier une tache */
router.put("/:id", modifierTache)
/**supprimer une tache */
router.delete("/:id",supprimerTache )

module.exports=router;