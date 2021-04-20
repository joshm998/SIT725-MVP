const express = require('express');
const isAuthenticated = require('../helpers/authHelper');
const DeviceModel = require('../models/device');


const router = express.Router();

// Routes
router.get('', isAuthenticated, (req, res) => {
  DeviceModel.find({ownerId: req.user.id})
  .then((result) => {
    res.send({ devices: result });
  })
  .catch((err) => {
    console.error(err);
  });
  
});

router.post('/add', isAuthenticated, (req, res) => {
  const device = new DeviceModel({
    name: req.body.name,
    deviceType: req.body.deviceType,
    image: req.image,
    ownerId: req.user.id
  });

  device
    .save()
    .then((doc) => {
      res.send({ createdDevice: doc });
    })
    .catch((err) => {
      console.error(err);
    });
  
});

module.exports = router;
