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

printAlias();
