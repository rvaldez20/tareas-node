
/*
   Especificacion d ela configuracion de yargs
   comando crear
      'Crear un elemento por hacer2
      flag: --descripcion o -d

   comando actualizar
      'Actualiza el estado completado de una tarea'
      flag: --descripcion o -d
            --completado o -c true (valor por defecto)

   Que funcione el --help

*/

const descripcion = {
   demand: true,
   alias: 'd',
   desc: 'Descripcion de la tare por hacer'
};

const completado = {
   alias: 'c',
   default: true,
   desc: 'Marca como completado o pendiente la tarea'
};


// Configuración de la libreia yargs
const argv = require('yargs')
   .command('crear', 'Crear una tarea por hacer', {
      descripcion
   })
   .command('actualizar', 'Actualiza el estado completado de una tarea', {
      descripcion,
      completado
   })
   .command('borrar', 'Elimina una tarea por hacer', {
      descripcion
   })
   .help()
   .argv;


   // Exportamos argv
   module.exports = {
      argv
   }