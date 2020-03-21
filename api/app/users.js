const express = require('express');
const auth = require('../middleware/auth');
const User = require('../model/User');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', async (req, res) => {

    const user = new User(req.body);

    try {
        user.generateToken();

        await user.save();

        return res.send(user);

    } catch (error) {

        return res.status(400).send(error);

    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    user.generateToken();

    await user.save();

    res.send(user);
});

router.get('/', auth, async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).send({error: 'Not authorization'})
    }

    return res.send(user);
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Success'};

    try {
        const token = req.get('Authorization').split(' ')[1];

        if (!token) return res.send(success);

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.generateToken();

        await user.save();

        return res.send(success);
    } catch (e) {
        return res.send(e)
    }
});

module.exports = router;