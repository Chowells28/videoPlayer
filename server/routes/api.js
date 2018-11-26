const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');
const Config = require('../../config/db/database');

const db = Config;

mongoose.Promise = global.Promise;
mongoose.connect(db.database, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('Error connecting to db', err);
  } else {
    console.log('Successful connection to mLab MongoDB...');
  }
});

// GET
router.get('/', (req, res) => {
  res.send('api works');
});

// GET : ALL
router.get('/videos', (req, res) => {
  console.log('Get request for all videos');
  Video.find({}).exec((err, videos) => {
    if(err) {
      console.log('Error retrieving videos');
    } else {
      res.json(videos);
    }
  });
  //res.send('api works');
});

// GET : SINGLE
router.get('/videos/:id', (req, res) => {
  console.log('Get request for single video by ID');
  Video.findById(req.params.id).exec((err, video) => {
    if(err) {
      console.log('Error retrieving video');
    } else {
      res.json(video);
    }
  });
  //res.send('api works');
});


// POST : New
router.post('/videos', (req, res) => {
  console.log('Post a video');
  let newVideo = new Video();
  newVideo.title = req.body.title;
  newVideo.url = req.body.url;
  newVideo.description = req.body.description;
  newVideo.save((err, insertedVideo) => {
    if(!err) {
      res.json(insertedVideo);
    } else {
      console.log('Error saving video', err);
    }
  });
});

// PUT : Update
router.put('/video/:id', (req, res) => {
  console.log('Update a video');
  Video.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      url: req.body.url,
      description: req.body.description
    }
  },
  {
    new: true
  },
  (err, updatedVideo) => {
    if(!err) {
      res.json(updatedVideo);
    } else {
      console.log('Error updating video', err);
    }
  });
});

// DELETE : Delete
router.delete('/video/:id', (req, res) => {
  console.log('Deleting a video');
  Video.findByIdAndRemove(req.params.id, function(err, deletedVideo) {
    if(!err) {
      res.json(deletedVideo);
    } else {
      console.log('Error deleting video', err);
    }
  });
});

module.exports = router;
