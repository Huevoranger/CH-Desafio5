/*Coder House
Curso backend
Grupo: 22885
Nombre: Erick Omar Sandoval Báez
DESAFIO 5*/
const { application } = require("express");
const express = require("express");

//Inicialización a router
const { Router } = express;
const router = new Router();

//Valores iniciales solamente para prueba
const arr = [
  {
    name: "Avengers",
    price: 3000,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Avengers_marvel_movie_comic_book_action-128.png",
    id:0
  },
  {    
    name: "Flash",
    price: 2000,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Flash_dc_comic_book_movie-128.png",
    id:1
  },
  {    
    name: "Pi",
    price: 1000,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/geek-3/24/Pi_math_mathematics-256.png",
    id:2
  },
];

//Se envia el array completo de productos
router.get("/productos", (req, res) => {
  res.render("index", {dta: arr})
});

//Se busca un producto con determinado id
router.get("/productos/:id", (req, res) => {
  let idNum= req.params.id //Se recibe el id deseado
  let arrNew= arr.filter((x)=> x.id == idNum) //Se filtra para encontrar la posición del array que coincida con ese id
  let cond= arrNew.length //Condición para evitar que se devuelva un objeto en blanco 
  if ( idNum>cond){
    res.json({
        error: `Objeto no encontrado`
    });
  } else{ //Si no encuentra error, devuelve el producto deseado
    res.send(arrNew[0])
  }   
});

//Agregar un producto
router.post("/productos", (req, res) => {
 
  let { name, price, thumbnail } = req.body; //Se estructura la forma deseada que debe de tener un artículo nuevo
  console.log(req.body)
  let id= arr.length  //Se le agrega el id correspondiente a la posición siguiente con respecto al tamaño del array
  let obj = { //Se le da estructura al nuevo objeto
    name,
    price,
    thumbnail, 
    id
  };
  arr.push(obj) //Se agrega el objeto al final del array
  if (arr.length==0){
    res.render("index", {dta: "No hay objetos"})
  } else{
    res.render("exito",obj)
  }
  // res.json({
  //   message: `Objeto guardado con éxito con id ${id}, concepto ${name}` //Señalización de que el objeto se agregó correctamente con el id correspondiente
  // })
});

//Actualizar un producto
router.put("/productos/:id", (req, res) => {
  let idNum= req.params.id //Se obtiene el id del producto a actualizar
  let {name, price, thumbnail } = req.body; //Se le da formato a la solicitud del cliente
  id= idNum; //Se vuelve a actualizar el id con el que fue buscado
  let obj = {
    name,
    price,
    thumbnail, 
    id
  };
  arr[idNum]= obj //Se indica que se va a reemplazar el producto anterior por el nuevo
  res.json({
    message: `Se ha actualizado el producto ${name}` //Se da un mensaje de actualización 
  })
});

//Se elimina el Producto
router.delete("/productos/:id", (req, res) => {
  let idNum= req.params.id //Se obtiene el id del producto a eliminar
  let obj = {
    name:"",
    price:0,
    thumbnail:"", 
    id:""
  };
  arr[idNum]= obj//Se indica que se va a reemplazar el producto anterior por un objeto vacío
  res.json({
    message: `Se ha elimidado el producto` //Se da un mensaje de actualización 
  })
});


//router.use("/productos");

module.exports = router;