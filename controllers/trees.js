const express=require('express')
//require the moudle
const Tree = require('../models/tree.js');
//inilialize the router
const router=express.Router();



//POST
router.post('/',async (req,res)=>{
    try {
        const tree = await Tree.create(req.body)
        res.status(201).json({tree})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"failed to create tree"})
    }
})
//Get 
router.get('/',async(req,res)=>{
    try {
        const tree= await Tree.find({})
        res.status(200).json({tree})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"failed to get tree"}) 
    }

})
//Get
router.get('/:id', async(req,res)=>{
    try {
        const{id}=req.params
        const tree = await Tree.findById(id)
        if (!tree) {
            res.status(404).json({error:"tree not found"})
        } else {
            res.status(200).json({tree})

        }
        //else
        //send 200 with pet
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"failed to get tree"}) 
     
    }
})
//Del 
router.delete('/:id',async(req,res)=>{
    try {
        //get the id from params
        //try to find and delete the pet using the id
        //if there is no pet send 404
        //else 
        //send back msg to say delete
      const{id}=req.params
      const tree = await Tree.findByIdAndDelete(id)
       if (!tree) {
            res.status(404).json({error:"Tree not found"})
        } else {
            //use status 204 if dont 
            res.status(200).json({ message: "Tree deleted" })
        }
        
    } catch (error) {
      console.log(error)
      res.status(500).json({error:"failed to delete tree"})    
    }
})
//PUT
router.put('/:id', async(req,res)=>{
    try {
       const{id}=req.params
      const tree = await Tree.findByIdAndUpdate(id,req.body,{new: true})
       if (!tree) {
            res.status(404).json({error:"tree not found"})
        } else { 
            res.status(200).json({tree})
        }
    } catch (error) {
      console.log(error)
      res.status(500).json({error:"failed to update tree"})   
    }
})

//export the router

module.exports=router;