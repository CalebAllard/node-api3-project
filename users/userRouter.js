const express = require('express');
const {validateUserId,validateUser,validatePost} = require('../middleware');
const router = express.Router();
const db = require('./userDb');
const postsDb = require('../posts/postDb');
router.post('/', validateUser, (req, res) => {
  db.insert(req.body)
    .then(resp => {
      res.status(201).json(resp);
    })
    .catch(err => {
      res.status(500).json({errMessage: 'Error adding user'});
    })
});

router.post('/:id/posts', validatePost, (req, res) => {
  postsDb.insert(req.body)
    .then(resp => {
      res.status(201).json(resp);
    })
    .catch(err => {
      res.status(500).json({errMessage:"We  had a problem adding your post"})
    });
});

router.get('/', (req, res) => {
  const { id } = req.params;
  db.get(id).then(resp => {
    res.status(200).json(resp);
  })
  .catch(err => {
    res.status(500).json({err: 'Err getting users from database'});
  });
});

router.get('/:id', validateUserId, (req, res) => {
  const {id} = req.params;
  db.getById(id)
  .then(resp => {
      res.status(200).json(resp);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({err: 'Problem geting user for database'});
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
// }

// function validateUser(req, res, next) {
//   // do your magic!
// }

// function validatePost(req, res, next) {
//   // do your magic!
// }

module.exports = router;
