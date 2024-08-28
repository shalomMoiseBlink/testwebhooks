const storageRouter = require("express").Router();
const fs = require("fs")
storageRouter.get("/support", (req,res,next)=>{
    fs.readFile('./storage/support_users.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send(data)
      });
})

module.exports = storageRouter;