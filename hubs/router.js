const express = require('express');

const router = express.Router();
const db = require("../data/db")

//Get request for all posts
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

//get request for single id
router.get('/:id', async (req,res) => {
    try{
        const posts = await db.findById(req.params.id); 
        res.status(200).json(posts);
    }catch (error) {
        console.log(error);
        res.status(500).json({
            messages: 'Error retrieving posts for this database id'
        })
    }
})

//get request for comments for single post
router.get('/:id/comments', async (req,res) => {
    try{
        const comments = await db.findPostComments(req.params.id); 
        res.status(200).json(comments);
    }catch (error) {
        console.log(error);
        res.status(500).json({
            messages: 'Error retrieving posts for this database id'
        })
    }
})

//post request for blog post
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

//post request for comments
router.post('/:id/comments', async (req,res) => {
    const commentInfo = {...req.body, post_id: req.params.id}
    try{
        const comment = await db.insertComment(commentInfo); 
        res.status(200).json(comment);
    } catch (error) {
        console.log(error);
        res.status(500).json({error})
    }
})

//delete request for blog posts
router.delete('/:id', async (req,res) => {
    try{
        const post = await db.remove(req.params.id); 
        res.status(200).json(post);
    }catch (error) {
        console.log(error);
        res.status(500).json({
            messages: 'Error retrieving posts for this database id'
        })
    }
})

//put request for editing posts
router.put('/:id', async (req,res) => {
    // const updateInfo = (req.params.id, req.body)
    try{
        const updatedPost = await db.update(req.params.id, req.body); 
        res.status(200).json(updatedPost);
    }catch (error) {
        console.log(error);
        res.status(500).json({
            messages: 'Error Updating posts for this database id'
        })
    }
})

module.exports = router;