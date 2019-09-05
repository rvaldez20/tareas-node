
/*
   *************   Proyecto To DO  *****************
   Especificaciones d elos comandos
   comandos: 
      node app crear -d "Pasear al perro"
         -d: descripcion
      *** Agrega una tarea a la lista (al archivo .json)

      node listar
      *** Lista las tareas que tenesmo guardadas

      node actualizar -d "Pasear al perro" -c true
         -d: descripcion
         -c: true / false 
      *** Actualiza una tarea para marcarla como completada o no completada

   Fucionalidad

*/

/* ------------imports de paquetes----------------- */

const colors = require('colors');
// const argv = require('yargs').argv;
const argv = require('./config/yargs').argv;

const porHacer = require('./por-hacer/por-hacer');

// console.log(argv);
/* ------------------------------------------------ */


// configuramos los comandos de la terminal
let comando = argv._[0];

switch( comando ) {
   
   case 'crear': 
         // console.log('--------- Crear tarea por hacer --------------');
         let tarea = porHacer.crear( argv.descripcion );
         //console.log(tarea);         
      break;

   case 'listar':      
   
      // console.log('--------- Mostrar todas las tareas por hacer --------------');
      let listado = porHacer.getListado();

      if (listado.length === 0) console.log('No hay tareas Guardadas'.green)
      else {
         for (let tarea of listado) {
            console.log('=========Por Hacer========='.white.bgBlack);
            console.log(tarea.descripcion);
            console.log('Estado:', tarea.completado);
            console.log('==========================='.white.bgBlack);
         }
      }
   break;

   case 'actualizar':
      // console.log('--------- Actualiza una tarea por hacer --------------');
      let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
      // console.log('Actualizado')
   break;

   case 'borrar':
      // console.log('--------- Borrando una tarea por hacer --------------');
      porHacer.borrar(argv.descripcion);
      // console.log('Borrado')
   break

   default: 
   console.log('Comando no reconocido')
}


