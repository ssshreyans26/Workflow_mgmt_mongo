const path = require('path');

const express = require('express');

const orderController = require('../controllers/orders');

const router = express.Router();


router.get('/neworders', orderController.neworders);

router.get('/pendingorders', orderController.pendingorders);

router.get('/delivered', orderController.delivered);

router.post('/error_update', orderController.error_update);

router.post('/update', orderController.update);

router.post('/new_orders', orderController.new_orders);

router.get('/delete_orders', orderController.deleteorders);

router.post('/delete_update', orderController.delete_update);

module.exports = router;