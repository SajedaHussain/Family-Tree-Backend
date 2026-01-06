// controllers/Members.js
//requir the model
const Member = require('../models/member');
const Tree = require('../models/tree');
//require express
const express = require('express')

//initialize the router
const router =express.Router();


const verifyAccess = async (treeCode, code) => {
    const targetTree = await Tree.findById(treeCode);
    if (!targetTree)                    
        return { error: "tree is not defined", status: 404 };
    if (targetTree.code !== code) 
        return { error: "code is wrong", status: 403 };
   return { success: true };
};


//create a new ..post/ducks/
router.post('/',async (req,res)=>{
    try{
        const { treeCode, code } = req.body; 
        const access = await verifyAccess(treeCode, code);

        if (access.error) 
            return res.status(access.status).json({ error: access.error });

        const member = await Member.create(req.body);
        res.status(201).json({ Member });
    }catch(error){
        console.log(error)
        res.status(500).json({error:"fail to create duck"}) // 500 means error
    }
})

// READ - GET -(index) /ducks - GET+/ducks
router.get('/', async (req, res) => {
  // Setting up for our code
  try{
   const { treeCode, code } = req.query;
    let filter = {};
       if (treeCode) filter.treeCode = treeCode;//اذا ارسل treeId سيقوم باحضار البط للشجره المحدده 

     const member = await Member.find(filter).populate('parentId', 'firstName lastName');//populate-->{ابحث عن الشخص الذي لديه ال ID و احضره لهنا }
     //البارامتر الأولparentId-->(اين نريد تعبئه البيانات )  //البارامتر الثاني ('firstName lastName')-->المعلومات التي نريد تعبئتها 
     res.status(200).json({ member });
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
        const { treeCode, code } = req.body; 

        const access = await verifyAccess(treeCode, code);
        
        if (access.error) return res.status(access.status).json({ error: access.error });
       
        const member = await Member.findByIdAndDelete(req.params.id)  //try to find and delete the duck using the id
        if(!member){      //if there is no duck(not null wich is true), send 404
            res.status(404).json({error:"Duck not found"})
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
        const { treeCode, code } = req.body; 

        const access = await verifyAccess(treeCode, code);
        
        if (access.error) return res.status(access.status).json({ error: access.error });
        
        const {id}=req.params;
         const member = await Member.findByIdAndUpdate(id,req.body,{new:true})
         if(!member){
            res.status(404).json({error:"duck not found"})
         }else{
            res.status(200).json({member})
         }
    }catch(error){
        console.log(error)
        res.status(500).json({error:"faild to update"})
    }
})

//export the router
module.exports =router;









