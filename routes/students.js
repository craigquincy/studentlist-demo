'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('students/index', { title: 'Student Mantras', _layoutFile: 'layout.ejs' });
});

router.get('/new', (req, res, next) => {
  res.render('students/new', { title: 'New Student', _layoutFile: 'layout.ejs' });
});

router.get('/:id', (req, res, next) => {
  res.render('students/show', { title: 'Student Info', _layoutFile: 'layout.ejs' });
});

router.get('/:id/edit', (req, res, next) => {
  res.render('students/edit', { title: 'Student Info', _layoutFile: 'layout.ejs' });
});

module.exports = router
