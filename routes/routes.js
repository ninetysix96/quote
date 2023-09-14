const express = require('express')
const NAKYL = require('../nakyl')

const router = express.Router()

router.get('/', async(req,res)=>{
    const finder = await NAKYL.find()
    res.json(finder())
})

router.post('/new', async(req,res)=>{
    const taze = new NAKYL()
    taze.nakyl = req.body.nakyl
    taze.awtor = req.body.awtor
    taze.save()
    res.send(taze)
})

router.put('/update/:id', async(req,res)=>{
    try{
        const nakylID = req.params.id
        const tazeNakyl = req.body.nakyl
        const tazeAwtor = req.body.awtor

        const tazelenen = await NAKYL.findOneAndUpdate(
            {_id: nakylID},
            {$set: {nakyl: tazeNakyl}},
            {$set: {awtor: tazeAwtor}},
            {new: true})
    
    if(!tazelenen){
        return res.status(404).send("Nakyl tapylmady")
    }
    res.status(200).send(tazelenen)
}catch(err){
    console.error("Problema yuze cykdy:", err);
    res.status(500).send("Server error.");
  }
})

router.delete("/delete/:id", async(req,res)=>{
    try{
        const nakylID = req.params.id
        const deleted = await NAKYL.findOneAndRemove({_id: nakylID})

        if(!deleted){
            return res.status(404).send("Nakyl tapylmady")
        }
        res.status(200).send("Nakyl pozuldy")
    }catch(err){
        console.error('Problema yuze cykdy:', err)
        res.status(500).send("Server error")
    }
})

module.exports = router