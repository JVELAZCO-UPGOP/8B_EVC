let Duenos = [];
let listaduenos = document.getElementById("listaDuenos")
let nombre = document.getElementById("nombre")
let apellido = document.getElementById("apellido")
let documento = document.getElementById("documento")
let forma = document.getElementById("forma")
let btn_guardar = document.getElementById("btn_guardar");
let btn_cerrar = document.getElementById("btn_cerrar");
let btn_cerrarX = document.getElementById("btn_cerrarX");
let indice_d = document.getElementById("indice_d");
let etiqueta = document.getElementById("exampleModalLongTitle");
let url = "https://veterinaria-backend-chi.vercel.app/duenos";

async function ListarDuenos()
{
    try {
        const respuesta = await fetch("https://veterinaria-backend-chi.vercel.app/duenos");
        const duenosServer = await respuesta.json();

        if(Array.isArray(duenosServer))
        {
            Duenos = duenosServer;
        }
        
        if(Duenos.length > 0)
        {
            const HTMLDuenos = Duenos.map((dueno,indice)=>
            `<tr>
                <th scope="row">${indice}</th>
                    <td>${dueno.documento}</td>
                    <td>${dueno.nombre}</td>
                    <td>${dueno.apellido}</td>
                    <td>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
                        </div>
                    </td>
            </tr>`
            ).join("");
            listaduenos.innerHTML=HTMLDuenos;
            Array.from(document.getElementsByClassName("editar")).forEach((btn_modificar,indice)=>btn_modificar.onclick = editar(indice))
            Array.from(document.getElementsByClassName("eliminar")).forEach((btn_eliminar,indice)=>btn_eliminar.onclick = eliminar(indice))
        }
        else
        {
            listaduenos.innerHTML = `
                <tr>
                    <td colspan="5" center>No Existen Dueños....</td>
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
                documento: documento.value,
                nombre: nombre.value,
                apellido: apellido.value,
                  
            }
        let method = "POST";
        const accion = btn_guardar.innerHTML;

        switch(accion)
        {
            case "Modificar":
                method = "PUT";
                Duenos[indice_d.value]=datos;
                url = `https://veterinaria-backend-chi.vercel.app/duenos/${indice_d.value}`
            break;
            case "Eliminar":
                method = "DELETE";
                url = `https://veterinaria-backend-chi.vercel.app/duenos/${indice_d.value}`
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
            ListarDuenos();
        }
        
    } catch (error) {
        console.log(error);
        $(".alert").show(); 
    }
}
function resetModal()
{
    btn_guardar.innerHTML="Guardar"
    documento.value="";
    nombre.value="";
    apellido.value="";
    etiqueta.textContent = "Nuevo Dueño"
    documento.disabled = false;
    nombre.disabled=false;
    apellido.disabled=false;
    
}
function eliminar(indice)
{
    return function click ()
    {

        btn_guardar.innerHTML="Eliminar"
        etiqueta.textContent = "¿Desea eliminar el registro?"
        documento.disabled = true;
        nombre.disabled=true;
        apellido.disabled=true;
        RellenarModal(indice);
    }
}
function RellenarModal(indice)
{
    $("#exampleModalCenter").modal("toggle")
        
        console.log(Duenos[indice])
        const dueno = Duenos[indice];

        documento.value = dueno.documento;
        nombre.value = dueno.nombre;
        apellido.value = dueno.apellido;
        indice_d.value = indice;
}
function editar (indice)
{
    return function click ()
    {
        btn_guardar.innerHTML="Modificar"
        etiqueta.textContent = "Actualizar Dueño"
        RellenarModal(indice);

    }
}

ListarDuenos();
forma.onsubmit = EnviarDatos;
btn_guardar.onclick = EnviarDatos;
btn_cerrar.onclick = resetModal;
btn_cerrarX.onclick = resetModal;