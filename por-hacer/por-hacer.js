
// requerimos el file system de node para poder guaradr en un aarchvio
const fs = require('fs');
const colors = require('colors');


// las tarea s eguardaran en un array
let listadoPorHacer = [];


// funcion para guardar la tarea en la db (el archivo json)
const guardarDB = () => {

   let data = JSON.stringify(listadoPorHacer);
     
      fs.writeFile('db/data.json', data, (err) => {
         if (err) throw new Error('No se puedo grabar');
       });
}


// funcion para obtener los datos de la debe ( archivo .json)
const cargarDB = () => {
   try {

      listadoPorHacer = require('../db/data.json');    

   } catch (error) {
      listadoPorHacer = [];
   }  
}
 

// funcion para inserrtar una tarea en el array
const crear = (descripcion) => {

   // cargamos la base de datos
   cargarDB(); 

   // creamos el objeto de la tarea por hacer
   let porHacer = {
      descripcion: descripcion,
      completado: false
   };

   // ahora insertamos el objeto al arrary listadoPorHacer
   listadoPorHacer.push( porHacer );

   // guardamos el array en el .json
   guardarDB();
   console.log(`La tarea ${ descripcion } se agrego correctamente a la DB`.red.bgCyan)
   return porHacer;
}


// función para listar las tareas en consola
const getListado = () => {
   cargarDB();
   return listadoPorHacer;;
}


// función para marcar alguna tarea como completada
const actualizar = (descripcion, completado = true) => {

   // paso 1: cargar el json en listadoPorHacer
   cargarDB();

   // paso 2: buscar el que coicida con la descripción
   let index = listadoPorHacer.findIndex( tarea => {
      return tarea.descripcion === descripcion;
   })

   // si existe la tarea la actualizamos el completado a false
   if( index >= 0 ) {
      listadoPorHacer[index].completado = completado;
      guardarDB();
      console.log(`La tarea ${descripcion} se a actualizado correctamente`.red.bgCyan);
      return true;
   } else {
      return false;
   }
}

// función para eliminar una tarea
const borrar = (descripcion) => {   
   // cargamos la base de datos
   cargarDB();

   // console.log(listadoPorHacer);
   let nuevoListado = listadoPorHacer.filter( (tarea) => tarea.descripcion !== descripcion);
   // console.log(tareas);

   // para saber si se borro
   if(listadoPorHacer.length === nuevoListado.length) {
      console.log(`La tarea ${ descripcion } no existe en la DB`.yellow.bgRed);
      return false;
   } else {

      listadoPorHacer = nuevoListado;
      guardarDB(); 
      console.log(`La tarea ${ descripcion } ha sido eliminada d ela DB`.red.bgCyan);
      return true;
      
      // let data = JSON.stringify(nuevoListado);        
      // fs.writeFile('db/data.json', data, (err) => {
      //    if (err) throw new Error('No se puedo grabar');
      // });
      
   }   
}



// esportamos la funcion crear
module.exports = {
   crear,
   getListado,
   actualizar,
   borrar
}