const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { register, login, auth, getUsers } = require('../controllers/userController');
const { addMsg, getAllMsgs } = require('../controllers/messagesController');

router.get('/', (req, res) => {
    res.status(200).send('api home page');
});

// definging all user routes with /user/...
router.post('/user/register', register);
router.post('/user/login', login);
router.get('/user/authenticate', authenticate, auth);
router.get('/user/getUsers', authenticate, getUsers);

// definging all user routes with /msg/...
router.post('/msg/addMsg', addMsg);
router.post('/msg/getMsg', getAllMsgs);

module.exports = router;
