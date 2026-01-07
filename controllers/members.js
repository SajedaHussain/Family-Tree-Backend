const express = require('express')
//requir the model
const Member = require('../models/member');
const Tree = require('../models/tree');
//initialize the router
const router = express.Router();


//ACCESS CODE ====================================================================================================
const verifyAccess = async (tree_id, code) => {
    const targetTree = await Tree.findById(tree_id);
    if (!targetTree)
        return { error: "tree is not defined", status: 404 };
    if (targetTree.code !== code)
        return { error: "code is wrong", status: 403 };
    return { success: true };
};

//POST ===========================================================================================================
router.post('/', async (req, res) => {
    try {
        const { tree_id, code } = req.body;
        const access = await verifyAccess(tree_id, code);
        if (access.error)
            return res.status(access.status).json({ error: access.error });

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
        const { tree_id } = req.query;
        let filter = {};
        if (tree_id) filter.tree_id = tree_id;//اذا ارسل treeId سيقوم باحضار البط للشجره المحدده 
        const member = await Member.find(filter).populate('parentId', 'firstName lastName');//populate-->{ابحث عن الشخص الذي لديه ال ID و احضره لهنا }
        //البارامتر الأولparentId-->(اين نريد تعبئه البيانات )  //البارامتر الثاني ('firstName lastName')-->المعلومات التي نريد تعبئتها 
        res.status(200).json({ member });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "fail to get member" })
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
router.delete('/:id', async (req, res) => {
    try {
        const { tree_id, code } = req.body;
        const access = await verifyAccess(tree_id, code);
        if (access.error) return res.status(access.status).json({ error: access.error });
        const member = await Member.findByIdAndDelete(req.params.id)  //try to find and delete the duck using the id
        if (!member) {
            res.status(404).json({ error: "member not found" })
        } else {
            res.status(200).json({ member })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'faild to get a member' })
    }
})

//PUT ==============================================================================================================
router.put('/:id', async (req, res) => {
    try {
        const { tree_id, code } = req.body;
        const access = await verifyAccess(tree_id, code);
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

//export the router
module.exports = router;









