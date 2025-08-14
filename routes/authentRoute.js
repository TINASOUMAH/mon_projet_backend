const express = require('express');
const router = express.Router();
const authController = require('../controleurs/authetificationcontroleurs');

router.post('/inscription', authController.inscription);
router.post('/connexion', authController.connexion);

module.exports = router;
