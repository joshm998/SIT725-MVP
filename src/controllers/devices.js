const express = require('express');
const isAuthenticated = require('../helpers/authHelper')
const DeviceModel = require('../models/device');


const router = express.Router();

// Routes
router.get('', isAuthenticated, (req, res) =>
  res.send({ devices: req.user })
);

router.post('/add', isAuthenticated, (req, res) => {
  const device = new DeviceModel({
    name: req.body.name,
    deviceType: req.body.deviceType
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
