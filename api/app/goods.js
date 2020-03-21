const path = require('path');
const auth = require('../middleware/auth');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');


const config = require('../config');

const router = express.Router();

const Goods = require('../model/Goods');

router.get('/', async (req, res) => {
    try {
        const query = req.query.categories;

        if (req.query.categories){
            const goods = await Goods.find({categories: query});

            return res.send(goods);
        }

        const goods = await Goods.find();

        res.send(goods);
    } catch (e) {
        res.send(e);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const news = await Goods.findOne({_id: req.params.id}).populate('categories').populate('user');

        res.send(news);
    } catch (e) {
        res.send(e);
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, config.uploadPath),
    filename: (req, file, cb) => cb(null, nanoid() + path.extname(file.originalname))
});

const upload = multer({storage});


router.post('/', [auth, upload.single('image')], async (req, res) => {
    const user = req.user;

    try {
        const goodsData = req.body;

        if (req.file) {
            goodsData.image = req.file.filename;
        }

        goodsData.user = user._id;

        const goods = new Goods(goodsData);

        await goods.save();

        res.send(goods)
    } catch (e) {
        res.send(e)
    }
});

router.delete('/:id', auth, async (req, res) => {
    const user = req.user;
    try {
        const news = await Goods.findOne({_id: req.params.id});

        if (news.user.toString() === user._id.toString()){
            await Goods.findByIdAndDelete({_id: req.params.id});
            console.log('Ok');
            res.send({message: 'Goods delete'});
        } else {
            return res.send({message: 'Only the author can delete'});
        }
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;