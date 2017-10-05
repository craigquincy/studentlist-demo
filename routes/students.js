'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('students/index', { title: 'Student Mantras', _layoutFile: 'layout.ejs' });
});

module.exports = router
