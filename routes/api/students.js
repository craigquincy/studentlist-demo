'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../../knex');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (_req, res, next) => {
  knex('students')
    .orderBy('name')
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('students')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      res.send(row);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const { name, mantra } = req.body;

  if (!name || !name.trim()) {
    return next(boom.create(400, 'Name must not be blank'));
  }

  if (!mantra || !mantra.trim()) {
    return next(boom.create(400, 'mantra must not be balnk'));
  }

  const insertStudent = { name, mantra };

  knex('students')
    .insert(insertStudent, '*')
    .then((rows) => {
      res.send(rows[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('students')
    .where('id', id)
    .first()
    .then((student) => {
      if (!student) {
        throw boom.create(404, 'Not Found');
      }

      const { name, mantra } = req.body;
      const updateStudent = {};

      if (name) {
        updateStudent.name = name;
      }

      if (mantra) {
        updateStudent.mantra = mantra;
      }

      return knex('students')
        .update(updateStudent, '*')
        .where('id', id);
    })
    .then((rows) => {
      res.send(rows[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  let student;

  knex('students')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      student = row

      return knex('students')
        .del()
        .where('id', id);
    })
    .then(() => {
      delete student.id;

      res.send(student);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
