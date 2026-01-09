const express = require('express')
//requir the model
const Member = require('../models/member');
const Tree = require('../models/tree');
//initialize the router
const router = express.Router();


//ACCESS CODE ====================================================================================================
const verifyAccess = async (treeId, code) => {
    const targetTree = await Tree.findById(treeId);
    console.log(treeId)
    console.log(targetTree)
    if (!targetTree) return { error: "tree is not defined", status: 404 };
    if (targetTree.code !== code) return { error: "code is wrong", status: 403 };
    return { success: true };
};

//POST ===========================================================================================================
router.post('/', async (req, res) => {
    try {
        const { treeId, code } = req.body;
        const access = await verifyAccess(treeId, code);
        
        if (access.error) return res.status(access.status).json({ error: access.error });

        const member = await Member.create(req.body);
        res.status(201).json({ member });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "fail to create member" })
    }
})

// GET ALL =====================================================================================================
router.get('/', async (req, res) => {
    try {
        const { treeId } = req.query;
        let filter = {};
        if (treeId) filter.treeId = treeId;//اذا ارسل treeId سيقوم باحضار البط للشجره المحدده 
        const member = await Member.find(filter).populate('parentId', 'firstName lastName');//populate-->{ابحث عن الشخص الذي لديه ال ID و احضره لهنا }
        //البارامتر الأولparentId-->(اين نريد تعبئه البيانات )  //البارامتر الثاني ('firstName lastName')-->المعلومات التي نريد تعبئتها 
        res.status(200).json({ member });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "fail to get members" })
    }
});

// GET ONE ============================================================================================================
router.get('/:id', async (req, res) => {
    try {
        //git the id from the param then find-by id
        const { id } = req.params
        const member = await Member.findById(id)
        if (!member) {  // if there is no duck wich is null 
            res.status(404).json({ error: 'member not found' })
        } else {
            res.status(200).json({ member })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'faild to get a member' })
    }
})

//DELETE =========================================================================================================
router.delete('/:id/:treeId', async (req, res) => {
  try {
    const { id, treeId } = req.params;
    const { code } = req.query;

    const access = await verifyAccess(treeId, code);
    if (access.error) return res.status(access.status).json({ error: access.error });

    const member = await Member.findByIdAndDelete(id);
    if (!member) return res.status(404).json({ error: "member not found" });

    res.status(200).json({ member });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'failed to delete member' });
  }
});

//PUT ==============================================================================================================
router.put('/:id', async (req, res) => {
    try {
        const { treeId, code } = req.body;
        const access = await verifyAccess(treeId, code);
        if (access.error) return res.status(access.status).json({ error: access.error });
        const { id } = req.params;
        const member = await Member.findByIdAndUpdate(id, req.body, { new: true })
        if (!member) {
            res.status(404).json({ error: "member not found" })
        } else {
            res.status(200).json({ member })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "faild to update" })
    }
})

//export the router ===============================================================================
module.exports = router;









