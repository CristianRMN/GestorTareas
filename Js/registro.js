import { fetchRegistroUsuario } from "./fetch";

function checkTextAlias() {
    const alias = document.getElementById("alias_id");
    if (alias.value.trim() !== "") {
        return alias.value;
    }
    return "";
}

function checkTextEmail() {
    const email = document.getElementById("email_id");
    if (email.value.trim() !== "") {
        return email.value;
    }
    return "";
}

function checkTextPassword() {
    const password = document.getElementById("password_id");
    if (password.value.trim() !== "") {
        return password.value;
    }
    return "";
}

function confirmRegistro() {
    document.querySelector(".botones_registro_contenedor .btn_registro_aceptar").addEventListener("click", function (e) {
        e.preventDefault();
        const alias = checkTextAlias();
        const email = checkTextEmail();
        const password = checkTextPassword();
        if (alias !== "" && email !== "" && password !== "") {
            const data = {
                'alias': alias,
                'email': email,
                'password':password
            };
            fetchRegistroUsuario(data);
        }
        else{
            
        }
    });


}

confirmRegistro();
