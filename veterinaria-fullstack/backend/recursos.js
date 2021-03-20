module.exports = {
    mascotas: [
        {tipo: "Gato", nombre: "Manchas0", dueno:"Edwin" },
        {tipo: "Perro", nombre: "Manchas1", dueno:"Camilo" },
        {tipo: "Gato", nombre: "Manchas2", dueno:"Edwin" },
        {tipo: "Otro", nombre: "Manchas3", dueno:"Ximena" },
        {tipo: "Gato", nombre: "Manchas4", dueno:"Lucas" },
    ],
    veterinarias: [
        {nombre: "Alondra", apellido: "Perez", documento:"1234567890" },
        {nombre: "Jose", apellido: "Gomez", documento:"4234569999" },
        {nombre: "Julian", apellido: "Madrid", documento:"4569888888" },
        {nombre: "Melisa", apellido: "Montiel", documento:"7788996655" },
    ],
    duenos: [
        {nombre: "Edwin", apellido: "Vazquez", documento:"1112125695" },
        {nombre: "Ximena", apellido: "Perez", documento:"1255698534" },
        {nombre: "Camilo", apellido: "Vela", documento:"7857256936" },
        {nombre: "Lucas", apellido: "España", documento:"5551478955" },
    ],
    consultas: [
        {
            mascota: 0, 
            veterinaria: 0, 
            fechaCreacion: new Date(),
            fechaEdicion: new Date(),
            historia: "",
            diagnostico: "diagnostico",
        },
    ],
};