import { CheckUserAlias, fetchtareasUsuarios, fetchInsertTareausuario} from '../Js/fetch';

async function printAlias() {
    const nombreUsuario = document.getElementById("usuario_alias_logueado");
    const user = await CheckUserAlias();
    console.log("Usuario recibido:", user); 

    if (user && user.alias) {
        nombreUsuario.textContent = user.alias;
        
        const tareas = await getTareas(user);         
        if (tareas) { 
            rellenartareas(tareas);
            startTareas();
        } else {
            hideTareas();
        }

    } else {
        console.log("No se encontró al usuario o no tiene alias");
    }
}

export async function getTareas(data){
    const tareas = await fetchtareasUsuarios(data);
    console.log("Tareas: ", tareas);
    if(tareas){
        return tareas;
    }
}

export function startTareas(){
    document.querySelector(".lista_tareas_no_completadas_contenedor").classList.remove("oculto");
    document.querySelector(".contenedor_nueva_tarea").classList.add("oculto");
    document.querySelector(".contenedor_no_tareas").classList.add("oculto");
}

export function hideTareas(){
    document.querySelector(".lista_tareas_no_completadas_contenedor").classList.add("oculto");
    document.querySelector(".contenedor_nueva_tarea").classList.add("oculto");
    document.querySelector(".contenedor_no_tareas").classList.remove("oculto");
}

function showNewTarea(){
    document.querySelector(".lista_tareas_no_completadas_contenedor").classList.add("oculto");
    document.querySelector(".contenedor_nueva_tarea").classList.remove("oculto");
    document.querySelector(".contenedor_no_tareas").classList.add("oculto");
}


function clickBotonNuevaTarea(){
    document.getElementById("boton_nueva_tarea").addEventListener("click", () => {
        showNewTarea();
    });
}

function checkEmptyNombreTarea(){
    const nombre = document.getElementById("nombre_id_nueva_tarea");
    if (nombre.value.trim() !== "") {
        return nombre.value;
    }
    return "";
}

function checkEmptyDescripcionTarea(){
    const descripcion = document.getElementById("descripcion_id_nueva_tarea");
    if (descripcion.value.trim() !== "") {
        return descripcion.value;
    }
    return "";
}

function clearCampos(){
    document.getElementById("descripcion_id_nueva_tarea").value = "";
    document.getElementById("nombre_id_nueva_tarea").value = "";
}

async function enviarTarea(){
    const user = await CheckUserAlias();
    document.querySelector(".btn_nueva_tarea_aceptar").addEventListener("click", (e) => {
        e.preventDefault();
        const nombre = checkEmptyNombreTarea();
        const descripcion = checkEmptyDescripcionTarea();
        const completada = 0;
        const id_user = user.id;
        const data = {
            'nombre': nombre,
            'descripcion': descripcion,
            'completada': completada,
            'id_usuario': id_user
        };
         const result = fetchInsertTareausuario(data);
         if(result){
            clearCampos();
         }
    });
}

async function cargaTarea(){
    const userLog = await CheckUserAlias();
    if(userLog && userLog.alias){
        let tareasuser = await getTareas(userLog);
        document.getElementById("boton_gestion_tarea").addEventListener("click", () => {
            if(tareasuser){
                startTareas();
                rellenartareas(tareasuser);
            }
            else{
                hideTareas();
            }
        });
    }
    
}

function rellenartareas(tareas){
    const elemento = document.querySelector(".lista_tareas_no_completadas");
    elemento.innerHTML = "";
    tareas.forEach((tarea, index) =>{
        const li = document.createElement("li");
        li.id = `id_tarea_${index}`;
        li.innerHTML = `
        <label id="label_nombre_tarea_${index}"><strong>Nombre: </strong>${tarea.nombre}</label></br>
        <label><strong>Descripcion: </strong>${tarea.descripcion}</label></br>
        <label><strong>Completada:</strong></label>
        <input type="checkbox" ${tarea.completada == 1 ? 'checked' : ''} id="completada_${index}"><br>
        <button id="actualizar_${index}" disabled>Actualizar tarea</button>
        `;
        elemento.appendChild(li);
        disableButtonIfCompletada(index);
    });
}

function disableButtonIfCompletada(index){
    const label_tarea = document.getElementById(`label_nombre_tarea_${index}`);
    const completadaCheck = document.getElementById(`completada_${index}`);
    const buttonActu = document.getElementById(`actualizar_${index}`);

    const datos = {
        'label_tarea':label_tarea,
        'completadaButton':completadaCheck,
        'buttonActu':buttonActu
    };

    actualizarTarea(datos);
    
    if(completadaCheck.checked){
        buttonActu.disabled = false;
    }
    else{
        buttonActu.disabled = true;
    }

    completadaCheck.addEventListener("change", () => {
        buttonActu.disabled = !completadaCheck.checked;
    });
}

function actualizarTarea(datos){
    let nombreTarea = divideLabel(datos);
    datos.buttonActu.addEventListener("click", () =>{
        let numeroCompletada = getNumberCompletada(datos);
        console.log(nombreTarea, numeroCompletada);
    });
}

function divideLabel(datos){
    const label = datos.label_tarea.textContent;
    let arrayNombre = label.split("Nombre: ");
    return arrayNombre[1];
}

function getNumberCompletada(datos){
    let actu = datos.completadaButton;
    return actu.checked ? 1 : 0;
}







printAlias();
clickBotonNuevaTarea();
enviarTarea();
cargaTarea();