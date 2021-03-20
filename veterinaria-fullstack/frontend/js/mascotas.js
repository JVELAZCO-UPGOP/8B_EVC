let lista_mascotas = document.getElementById("listamascotas")
let tipo = document.getElementById("tipo")
let nombre = document.getElementById("nombre")
let dueno = document.getElementById("dueno")
let form = document.getElementById("form")
let btnGuardar = document.getElementById("btnGuardar");
let btn_cerrar = document.getElementById("btn_cerrar");
let btn_cerrarX = document.getElementById("btn_cerrarX");
let indice = document.getElementById("indice");
let etiqueta = document.getElementById("exampleModalLongTitle");
let url = "https://veterinaria-backend-chi.vercel.app/mascotas";


let mascotas = [];

async function ListarMascotas()
{
    try {
        const respuesta = await fetch("https://veterinaria-backend-chi.vercel.app/mascotas");
        const mascotasServer = await respuesta.json();

        if(Array.isArray(mascotasServer))
        {
            mascotas = mascotasServer;
        }

        if(mascotas.length>0)
        {
            const HTMLMascotas = mascotas.map((mascota,index)=>
                `<tr>
                    <th scope="row">${index}</th>
                    <td>${mascota.tipo}</td>
                    <td>${mascota.nombre}</td>
                    <td>${mascota.dueno}</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
                        </div>
                    </td>
                </tr>`
            ).join("");
            lista_mascotas.innerHTML=HTMLMascotas;
            Array.from(document.getElementsByClassName("editar")).forEach((btn_modificar,index)=>btn_modificar.onclick = editar(index))
            Array.from(document.getElementsByClassName("eliminar")).forEach((btn_eliminar,index)=>btn_eliminar.onclick = eliminar(index))
        }
        else
        {
            lista_mascotas.innerHTML = `
                <tr>
                    <td colspan="5" center>No Existen Mascotas....</td>
                </tr>`
        }
        
    } catch (error) {
        console.log(error);
        $(".alert").show();       
    }
    
}

async function EnviarDatos(evento)
{
    evento.preventDefault();
    
    try {
        const datos = 
            {
                tipo: tipo.value,
                nombre: nombre.value,
                dueno: dueno.value
            }

        let method = "POST"
        const accion = btnGuardar.innerHTML;
        switch(accion)
        {
            case "Modificar":
                method = "PUT"
                mascotas[indice.value]=datos;
                url = `https://veterinaria-backend-chi.vercel.app/mascotas/${indice.value}`
            break;
            case "Eliminar":
                method = "DELETE"
                url = `https://veterinaria-backend-chi.vercel.app/mascotas/${indice.value}`
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
            ListarMascotas();
        }
    } catch (error) {
        console.log(error);
        $(".alert").show();  
    }    
}
function resetModal()
{
    btnGuardar.innerHTML="Guardar"
    tipo.value="Tipo animal";
    nombre.value="";
    dueno.value="Dueño";
    indice.value="";
    etiqueta.textContent = "Nueva Mascota"
    nombre.disabled = false;
    dueno.disabled = false;
    tipo.disabled = false;
}
function eliminar(index)
{
    return function click ()
    {

        btnGuardar.innerHTML="Eliminar"
        etiqueta.textContent = "¿Desea eliminar el registro?"
        nombre.disabled = true;
        dueno.disabled = true;
        tipo.disabled = true;
        RellenarModal(index);
    }
}
function RellenarModal(index)
{
    $("#exampleModalCenter").modal("toggle")
        
        console.log(mascotas[index])
        const mascota = mascotas[index];

        nombre.value = mascota.nombre
        tipo.value = mascota.tipo
        dueno.value = mascota.dueno
        indice.value = index;
}
function editar (index)
{
    return function click ()
    {
        btnGuardar.innerHTML="Modificar"
        etiqueta.textContent = "Actualizar Mascota"
        RellenarModal(index);

    }
}

ListarMascotas();

form.onsubmit = EnviarDatos;
btnGuardar.onclick = EnviarDatos;
btn_cerrar.onclick = resetModal;
btn_cerrarX.onclick = resetModal;