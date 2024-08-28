const fs =require("fs")
const getFront =(req, res, next) =>{
// console.log("test")
fs.readFile('../frontend/homepage.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data)
  });
    // return loadPage("homepage").then((html)=>res.send(html));
}

module.exports = {getFront}