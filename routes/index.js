var express = require('express');
var router = express.Router();

const modbus = require('../..')
const Serialport = require('serialport')
const socket = new Serialport('/dev/ttyUSB0', {
  baudRate: 115200,
  Parity: 'none',
  stopBits: 2,
  dataBits: 8
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

  // set Slave PLC ID
const client = new modbus.client.RTU(socket, 8)

socket.on('connect', function () {
  client.writeSingleRegister(4096, 65096).then(function (resp) {
    console.log(resp)
    socket.close()
  }).fail(function (err) {
    console.log(err)
    socket.close()
  })
})

socket.on('error', function (err) {
  console.log(err)
})

});

module.exports = router;
