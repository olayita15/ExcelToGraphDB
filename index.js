const XLSX = require("xlsx");
const Neode = require('neode');
const instance = Neode.fromEnv();


const Mother = instance.model('User', {
    name: 'string',
    lastname: {
    type: 'string'
    // unique: true
    },
    mail:'string'
});

async function llenarBaseDeDatos(rutaArchivo) {
    // Leer el archivo de Excel
    const libro = XLSX.readFile(rutaArchivo);
    const hoja = libro.Sheets['Hoja1'];
    // Obtener los datos y guardarlos en la base de datos
    const filas = XLSX.utils.sheet_to_json(hoja);
    const propiedades = Object.keys(filas[0]);
    for (let i = 0; i < filas.length; i++) { 
        const valores = Object.values(filas[i]);
        const fila = {};
        for (let j = 0; j < propiedades.length; j++) {
        fila[propiedades[j]] = valores[j];
        console.log(propiedades)
        console.log(valores)
    }
    console.log(fila);

      // Crear un nodo
    const nodo = await instance.model('User').create(fila);
    
    }
    instance.close();
};


llenarBaseDeDatos('excel.xlsx');
