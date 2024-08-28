const supportRouter = require("express").Router();

const fs =require("fs");
supportRouter.get("/", (req, res, next) => {
    fs.readFile('./frontend/hompage.html', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.send(data)
    });
  });
supportRouter.post("/reset", (req,res,next)=>{
    const resetText = fs.readFileSync('./storage/temaplate_for_support.json');
    fs.writeFileSync("./storage/support_users.json", resetText)
    res.send({reset: true})
})

module.exports = supportRouter;