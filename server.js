const express=require("express");
const db=require("./db/db.json");
const fs=require("fs");
const path=require("path");
const { v4: uuidv4 } = require('uuid');

const app=express();

const PORT=process.env.PORT||3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

// HTML routes
app.get("/index",(req,res)=>{
  res.sendFile(path.join(__dirname,"public/index.html"))
});

// API routes
app.get("/api/index",(req,res)=>{
  res.json(db);
});

app.post("/api/index",(req,res)=>{
  console.log(req.body)
  req.body.id=uuidv4();
  db.push(req.body)
  fs.writeFile("./db/db.json",JSON.stringify(db),(error)=>{
      if(error) {
        console.log(error);
        res.json(error);
      }
      res.json("You are requesting with POST");
    });
});

// DELETE route
app.delete("/api/index/:id",(req,res)=>{
  console.log(req.params.id)
  const noteIndex=db.findIndex(note=>note.id==req.params.id)
  db.splice(noteIndex,1)
  fs.writeFile("./db/db.json",JSON.stringify(db),(error)=>{
      if(error) {
        console.log(error);
        res.json(error);
      }
    res.json("You are requesting with DELETE");
  });
});

app.listen(PORT, ()=>
  console.log(`Server running at http://localhost:${PORT}`)
);