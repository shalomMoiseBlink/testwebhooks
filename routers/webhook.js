const webhook = require("express").Router();
const {doItAll, handlePaylinkWebhook} = require("../models/blink.model")
 webhook.post("/", (req,res,next)=>{
    if(req.body.paylink_id){
        handlePaylinkWebhook(req.body)
    } else doItAll(req.body.transaction_id)
    res.send(req.body)
})

module.exports = webhook;