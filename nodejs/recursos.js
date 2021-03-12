module.exports = {
    mascotas: [
        {tipo: "perro", nombre: "Manchas0", dueno:"Miguel" },
        {tipo: "perro", nombre: "Manchas1", dueno:"Miguel" },
        {tipo: "perro", nombre: "Manchas2", dueno:"Miguel" },
        {tipo: "perro", nombre: "Manchas3", dueno:"Miguel" },
        {tipo: "perro", nombre: "Manchas4", dueno:"Miguel" },
    ],
    veterinarias: [
        {nombre: "Alexandra", apellido: "Perez", documento:"1234567890" },
        {nombre: "Alexander", apellido: "Gomez", documento:"4234569999" },
        {nombre: "Julian", apellido: "Madrid", documento:"4569888888" },
        {nombre: "Luisa", apellido: "Gonzalez", documento:"7788996655" },
    ],
    duenos: [
        {nombre: "Edwin", apellido: "Vazquez", documento:"1112125695" },
        {nombre: "Veronica", apellido: "Perez", documento:"1255698534" },
        {nombre: "Antonio", apellido: "Vela", documento:"7857256936" },
        {nombre: "Nancy", apellido: "España", documento:"5551478955" },
    ],
    consultas: [
        {
            mascota: 0, 
            veterinaria: 0, 
            fechaCreacion: new Date(),
            fechaEdicion: new Date(),
            historia: "",
            diagnostico: "",
        },
    ],
};