
export function fetchRegistroUsuario(data) {
    fetch('../Php/controller/LoginRegistroController.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            action: 'registrar_usuario',
            datos: data
        })
    })
        .then(Response => Response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    title: 'Usuario registrado',
                    text: 'Te has registrado con éxito en la web',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    window.location.href = '../Html/login.html';
                })
            } else {
                let mensaje = 'Error al realizar el registro';
                if (data.error === 'duplicado') {
                    mensaje = 'El alias o el email ya están registrados';
                }
                Swal.fire({
                    title: 'Usuario no registrado',
                    text: mensaje,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        })

}

export function fetchLoginUsuarios(dataLogin) {

    fetch('../Php/controller/LoginRegistroController.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            action: 'loguear_usuario',
            datos: dataLogin
        })
    })
        .then(Response => Response.json())
        .then(dataLogin => {
            if (dataLogin.success) {
                const userLogin = dataLogin.usuario;
                Swal.fire({
                    title: 'Usuario logueado',
                    text: 'Inicio de sesion exitoso',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then((result) => {
                    window.location.href = '../Html/TareasGestor.html';
                });
            }
            else {
                Swal.fire({
                    title: 'Credenciales incorrectas',
                    text: 'El email o la contraseña son incorrectas, vuelve a intentarlo',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        })

}

export async function CheckUserAlias() {
    return fetch('../Php/usuarioLogin/UsuarioSession.php')
        .then(Response => Response.json())
        .then(data => {
            if (data.success) {
                return data.usuario;
            }
            else {
                console.log("No se registro el session");
                return null;
            }
        })

}

export async function fetchtareasUsuarios(data) {
    return fetch('../Php/controller/GestorTareaController.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            action: 'selectTareas',
            datos: data
        })
    })
        .then(Response => Response.json())
        .then(data => {
            if (data.success) {
                const tareasUser = data.tareas;
                return tareasUser;
            }
            else {
                return null;
            }
        })

}

export async function fetchInsertTareausuario(data) {
    const response = await fetch('../Php/controller/GestorTareaController.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            action: 'registro_tareas',
            datos: data
        })
    });

    const result = await response.json();

    if (result.success) {
        Swal.fire({
            title: 'Tarea registrada',
            text: 'La tarea se ha guardado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    } else {
        let mensaje = 'Error al registrar la tarea';
        if (result.error === 'duplicado') {
            mensaje = 'La tarea ya se ha registrado';
        }
        Swal.fire({
            title: 'Tarea no registrada',
            text: mensaje,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }

    return result;
}





