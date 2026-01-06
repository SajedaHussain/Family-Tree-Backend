// controllers/Members.js
//requir the model
const Member = require('../models/member');

//require express
const express = require('express')

//initialize the router
const router =express.Router();


//create a new ..post/ducks/
router.post('/',async (req,res)=>{
    try{
        console.log('error')
        const member = await Member.create(req.body);
        res.status(201).json({member}) //same as res.render وتلرجع لنا اوبجكت 
        //201 means created .. 200 means sucss 
    }catch(error){
        res.status(500).json({error:"fail to create member"}) // 500 means error
    }
})

// READ - GET -(index) /ducks - GET+/ducks
router.get('/', async (req, res) => {
  // Setting up for our code
  try{
    const members =await Member.find({});
    res.status(200).json({members})

  }catch(error){
    console.log(error)
    res.status(500).json({error:"fail to get member"})
  }
});

// show route for one record :id -GET+/ducks/123
router.get('/:id',async(req,res)=>{
    try{
        //git the id from the param then find-by id
        // if we dont get a duck respond with 404 else send 200 with duck
         const {id} =req.params
         const member = await Member.findById(id)
         if(!member){  // if there is no duck wich is null 
         res.status(404).json({error:'duck not found'})
         }else{
          res.status(200).json({member})
         }
    }catch(error){
        console.log(error)
        res.status(500).json({error:'faild to get a duck'})
    }
})

//delete a duck -DEL+/ducks/123
router.delete('/:id',async(req,res)=>{
    try{
      
        const {id} =req.params // get the id from params
        const member = await Member.findByIdAndDelete(id)  //try to find and delete the duck using the id
        if(!member){      //if there is no duck(not null wich is true), send 404
            res.status(404).json({error:"member not found"})
        }else{         //else send back a msg ssys deleted
            res.status(200).json({member}) //204 most pouler for deleting it means deleted and no data will be send- json send the duck
        }
        
         }
    catch(error){
        console.log(error)
        res.status(500).json({error:'faild to get a duck'})
    }
})


//updating - PUT + /ducks/123
router.put('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
         const member = await Member.findByIdAndUpdate(id,req.body,{new:true})
         if(!member){
            res.status(404).json({error:"duck not found"})
         }else{
            res.status(200).json({member})
         }
    }catch(error){
        console.log(error)
        res.status(500),json({error:"faild to update"})
    }
})

//export the router
module.exports =router;

