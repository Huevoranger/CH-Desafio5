/*Coder House
Curso backend
Grupo: 22885
Nombre: Erick Omar Sandoval Báez
DESAFIO 5*/
const express= require("express")
const app= express()
const apiRoute = require("./routes/api");


app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
const path = require('path')

app.use(express.json());

//routeo a carpeta api
app.use("/api", apiRoute);

app.use(express.static('public'))

// app.get("/",(req,res)=>{
//   res.render("form")
// })

// app.post("/", (req,res)=>{
// //console.log(req.body);
// res.redirect("/api/productos");
// })

  
app.get("/", (req, res) => {
    res.render("form");
});

app.post("/", (req,res)=>{
    console.log(req.body);
    res.redirect("/api/productos");
})



//inicialización del servidor
app.listen(8080, () => {
    console.log("Server running on port 8080");
});