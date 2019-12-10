const express = require('express');

const router = express.Router();
const db = require("../data/db")

router.get('/', async (req,res) => {
    try{
        const posts = await db.find(req.query); 
        res.status(200).json(posts);
    }catch (error) {
        console.log(error);
        res.status(500).json({
            messages: 'Error retrieving posts for this database'
        })
    }
})

router.get('/:id', async (req,res) => {
    try{
        const posts = await db.findById(req.params.id); 
        res.status(200).json(posts);
    }catch (error) {
        console.log(error);
        res.status(500).json({
            messages: 'Error retrieving posts for this database user'
        })
    }
})

router.post('/', async (req,res) => {
    const postInfo = req.body
    try{
        const posts = await db.insert(postInfo); 
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
})

module.exports = router;