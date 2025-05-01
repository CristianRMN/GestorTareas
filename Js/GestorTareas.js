import { CheckUserAlias, fetchtareasUsuarios} from '../Js/fetch';

async function printAlias() {
    const nombreUsuario = document.getElementById("usuario_alias_logueado");
    const user = await CheckUserAlias();
    console.log("Usuario recibido:", user); 

    if (user && user.alias) {
        nombreUsuario.textContent = user.alias;
        
        const tareas = await getTareas(user); 
        console.log("Tareas obtenidas:", tareas);
        
        if (tareas) { 
            console.log("Hay tareas");
        } else {
            console.log("No hay tareas");
        }

    } else {
        console.log("No se encontró al usuario o no tiene alias");
    }
}

async function getTareas(data){
    const tareas = await fetchtareasUsuarios(data);
    console.log("Tareas: ", tareas);
    if(tareas){
        return tareas;
    }
}

function clickBotonNuevaTarea(){
    document.getElementById("boton_nueva_tarea").addEventListener("click", () => {
        document.querySelector(".contenedor_no_tareas").classList.add("oculto");
        document.querySelector(".contenedor_nueva_tarea").classList.remove("oculto");
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
            'id_user': id_user
        };
    });
}

printAlias();
clickBotonNuevaTarea();
enviarTarea();