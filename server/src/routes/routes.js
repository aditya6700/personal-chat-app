const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');

router.get('/', (req, res) => {
    res.status(200).send('api home page');
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;
