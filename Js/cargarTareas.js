import { getTareas } from '../Js/GestorTareas';
import { CheckUserAlias } from './fetch';

async function cargaTarea(){
    const userLog = await CheckUserAlias();
    const parrafoTareas = document.getElementById("no_tareas_h2");

    if(userLog && userLog.alias){
        let tareasuser = await getTareas(userLog);
        document.getElementById("boton_gestion_tarea").addEventListener("click", () => {
            if(tareasuser){
                parrafoTareas.textContent = "hay tareas";
                cargarTareaReload();
            }
        });
    }
    
}

function cargarTareaReload(){
    document.querySelector(".contenedor_no_tareas").classList.remove("oculto");
    document.querySelector(".contenedor_nueva_tarea").classList.add("oculto");
}

cargaTarea();