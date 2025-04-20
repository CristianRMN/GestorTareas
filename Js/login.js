import { fetchLoginUsuarios } from '../Js/fetch';

function checkTextEmailLogin() {
    const email = document.getElementById("email_id_login");
    if (email.value.trim() !== "") {
        return email.value;
    }
    return "";
}

function checkTextPasswordLogin() {
    const password = document.getElementById("password_id_login");
    if (password.value.trim() !== "") {
        return password.value;
    }
    return "";
}

function confirmLogin() {
    document.querySelector(".botones_login_contenedor .btn_login_aceptar").addEventListener("click", function (e) {
        e.preventDefault();
        const email = checkTextEmailLogin();
        const password = checkTextPasswordLogin();
        if (email !== "" && password !== "") {
            const dataLogin = {
                'email': email,
                'password': password
            };
            fetchLoginUsuarios(dataLogin);
        }
        else{
            console.log("Daton no se pueden enviar de login");
        }
    });

}

confirmLogin();

