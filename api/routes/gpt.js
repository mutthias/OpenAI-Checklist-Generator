const express = require('express');
const router = express.Router();
const { GetSuggestions } = require('../controllers/gptController')

router.post('/:content', GetSuggestions)

module.exports = router;