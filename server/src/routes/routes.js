const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { register, login, auth, getUsers } = require('../controllers/userController');

router.get('/', (req, res) => {
    res.status(200).send('api home page');
});

router.post('/register', register);
router.post('/login', login);

router.get('/authenticate', authenticate, auth);
router.get('/getUsers', authenticate, getUsers);

module.exports = router;
