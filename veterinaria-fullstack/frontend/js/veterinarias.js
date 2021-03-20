let Veterinarios = [];
let listaveterinarios = document.getElementById("listaVeterinarios")
let nombrev = document.getElementById("nombre")
let apellidov = document.getElementById("apellido")
let idV = document.getElementById("documento")
let forma = document.getElementById("forma")
let btn_guardar = document.getElementById("btn_guardar");
let btn_cerrar = document.getElementById("btn_cerrar");
let btn_cerrarX = document.getElementById("btn_cerrarX");
let indice_v = document.getElementById("indice_v");
let etiqueta = document.getElementById("exampleModalLongTitle");
let url = "https://veterinaria-backend-chi.vercel.app/veterinarias";

async function ListarVeterinarios()
{
    try {
        const respuesta = await fetch("https://veterinaria-backend-chi.vercel.app/veterinarias");
        const veterinariosServer = await respuesta.json();

        if(Array.isArray(veterinariosServer))
        {
            Veterinarios = veterinariosServer;
        }

        if(Veterinarios.length>0)
        {
            const HTMLVeterinarios = Veterinarios.map((veterinario,indice)=>
            `<tr>
                <th scope="row">${indice}</th>
                    <td>${veterinario.documento}</td>
                    <td>${veterinario.nombre}</td>
                    <td>${veterinario.apellido}</td>
                    
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
                        </div>
                    </td>
            </tr>`
            ).join("");
            listaveterinarios.innerHTML=HTMLVeterinarios;
            Array.from(document.getElementsByClassName("editar")).forEach((btn_modificar,indice)=>btn_modificar.onclick = editar(indice))
            Array.from(document.getElementsByClassName("eliminar")).forEach((btn_eliminar,indice)=>btn_eliminar.onclick = eliminar(indice))
        }
        else
        {
            listaveterinarios.innerHTML = `
                <tr>
                    <td colspan="5">No Existen Veterinari@s....</td>
                </tr>`
        }
        
    } catch (error) {
        console.log(error);
        $(".alert").show();       
    }
}

async function EnviarDatos(e)
{
    e.preventDefault();

    try {
        const datos = 
            {
                documento: idV.value,
                nombre: nombrev.value,
                apellido: apellidov.value,
                   
            }
    let method = "POST";
    const accion = btn_guardar.innerHTML;

    switch(accion)
    {
        case "Modificar":
            method = "PUT"
            Veterinarios[indice_v.value]=datos;
            url = `https://veterinaria-backend-chi.vercel.app/veterinarias/${indice_v.value}`
            break;
        case "Eliminar":
            method ="DELETE";
            url = `https://veterinaria-backend-chi.vercel.app/veterinarias/${indice_v.value}`
            break;
    }
    const respuesta = await fetch(url, {
        method,
        headers:
        {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(datos)
    })

    if(respuesta.ok)
    {
        resetModal();
        ListarVeterinarios();
    }
    } catch (error) {
        console.log(error);
        $(".alert").show(); 
    }
    
}
function resetModal()
{
    btn_guardar.innerHTML="Guardar"
    idV.value="";
    nombrev.value="";
    apellidov.value="";
    
    
    etiqueta.textContent = "Nuevo Veterinario"
    idV.disabled = false;
    nombrev.disabled=false;
    apellidov.disabled=false;
    
}
function eliminar(indice)
{
    return function click ()
    {

        btn_guardar.innerHTML="Eliminar"
        etiqueta.textContent = "¿Desea eliminar el registro?"
        idV.disabled = true;
        nombrev.disabled=true;
        apellidov.disabled=true;
        
        RellenarModal(indice);
        

    }
}
function RellenarModal(indice)
{
    $("#exampleModalCenter").modal("toggle")
        
        console.log(Veterinarios[indice])
        const veterinario = Veterinarios[indice];

        idV.value = veterinario.documento;
        nombrev.value = veterinario.nombre;
        apellidov.value = veterinario.apellido;
        

        indice_v.value = indice;
}
function editar (indice)
{
    return function click ()
    {
        btn_guardar.innerHTML="Modificar"
        etiqueta.textContent = "Actualizar Veterinario"
        RellenarModal(indice);

    }
}

ListarVeterinarios();
forma.onsubmit = EnviarDatos;
btn_guardar.onclick = EnviarDatos;
btn_cerrar.onclick = resetModal;
btn_cerrarX.onclick = resetModal;