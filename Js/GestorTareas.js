import { CheckUserAlias } from '../Js/fetch';

async function printAlias() {
    const nombreUsuario = document.getElementById("usuario_alias_logueado");
    const user = await CheckUserAlias();
    console.log("Usuario recibido:", user); 
    if (user && user.alias) {
        nombreUsuario.textContent = user.alias;
    } else {
        console.log("No se encontró al usuario o no tiene alias");
    }
}

function getTareas(data){
    
}

printAlias();
