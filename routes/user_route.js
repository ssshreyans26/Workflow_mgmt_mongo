const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/',userController.login);

router.post('/logincheck', userController.postLogin);

router.get('/options', userController.options);

router.get('/signup',userController.signup);

router.post('/sign_up',userController.sign_up);

router.get('/newusers',userController.newusers);

router.get('/accept',userController.accept);

router.get('/logout',userController.logout);

router.get('/reject',userController.reject);

router.get('/test',userController.test);

module.exports = router;
