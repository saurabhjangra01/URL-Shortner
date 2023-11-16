const express = require('express');
const router = express.Router();

const { getAllUrls, createUrl, getUrl } = require('./../controllers/urls');

// routes

router.get('/',             getAllUrls);           // get all tasks
router.post('/shortUrls',   createUrl);            // create a task
router.get('/:shortUrl',    getUrl);               // get a single task

module.exports = router;