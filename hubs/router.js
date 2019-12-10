const express = require('express');

const router = express.Router();
const db = require("../data/db")

//Get request for all posts ✅
router.get('/', async (req,res) => {
    try{
        const posts = await db.find(req.query); 
        res.status(200).json(posts);
    }catch (error) {
        console.log(error);
        res.status(500).json({
            error: "The posts information could not be retrieved."
        })
    }
})

//get request for single id ✅
router.get('/:id', async (req,res) => {
    try{
        const posts = await db.findById(req.params.id); 

        if(posts.length > 0) {
            res.status(200).json(posts);
        } else{
            res.status(404).json({message: "The post with the specified ID does not exist."});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({
            messages: 'Error retrieving posts for this database id'
        })
    }
})

//get request for comments for single post ✅
router.get('/:id/comments', async (req,res) => {
    try{
        const comments = await db.findPostComments(req.params.id); 
        if(comments.length > 0) {
            res.status(200).json(comments);
        } else{
            res.status(404).json({message: "The post with the specified ID does not exist."});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({
            messages: 'Error retrieving posts for this database id'
        })
    }
})

//post request for blog post ✅
router.post('/', async (req,res) => {
    const postInfo = req.body
    try{
        if(!req.body.title || !req.body.contents){
            return res.status(400).json({ errorMessage: "Please provide title and contents for the post." }) 
        }
        const posts = await db.insert(postInfo); 
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({error,  error: "There was an error while saving the post to the database" })
    }
})

//post request for comments ❌
//  [Error: SQLITE_CONSTRAINT: FOREIGN KEY constraint failed] errno: 19, code: 'SQLITE_CONSTRAINT' }
router.post('/:id/comments', async (req,res) => {
    const commentInfo = {...req.body, post_id: req.params.id}
    try{
        // const post = await db.findById(req.params.id);
        // if(!post) {
        //     res.status(404).json({message: "The post with the specified ID does not exist."})
        // } 
        if(!req.body.text){
            return res.status(400).json({ errorMessage: "Please provide text for the comment." }) 
        }
        const comment = await db.insertComment(commentInfo);


        res.status(200).json(comment); 
    } catch (error) {
        console.log(error);
        res.status(500).json({error, error: "There was an error while saving the comment to the database" })
    }
})

//delete request for blog posts ✅
router.delete('/:id', async (req,res) => {
    try{
        const posts = await db.findById(req.params.id);
        const post = await db.remove(req.params.id);  
        if(posts.length > 0) {
            res.status(200).json(posts);
        } else{
            res.status(404).json({message: "The post with the specified ID does not exist."});
        }

    }catch (error) {
        console.log(error);
        res.status(500).json({
            error: "The post could not be removed" 
        })
    }
})

//put request for editing posts ✅
router.put('/:id', async (req,res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
      }
    
    db.update(req.params.id, req.body)
    .then(data => {
        if (data) {
          res.status(200).json(data)
        } else {
          res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
            error: "The post information could not be modified.",
        })
      })
})

module.exports = router;