const express = require('express');
const router = express.Router();
const multer = require('multer');
const templateController = require('../controllers/templateController');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Routes
router.post('/export-template', upload.array('images'), templateController.exportTemplate);
router.get('/import-template/:templateName', templateController.importTemplate);
router.post('/fill-template', templateController.fillTemplate);

module.exports = router;
