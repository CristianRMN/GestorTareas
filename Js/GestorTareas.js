import { CheckUserAlias } from '../Js/fetch';

async function printAlias(){
    const nombreUsuario = document.getElementById("usuario_alias_logueado");
    const alias = await CheckUserAlias();
    console.log("Alias de fetch: ", alias);
    if(alias){
        nombreUsuario.textContent = alias;
    }
    else{
        console.log("No se encontró al usuario");
    }
}

printAlias();

