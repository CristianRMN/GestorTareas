
export function fetchRegistroUsuario(data) {
    fetch('../Php/controller/TareaController.php', {
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
            Swal.fire({
                title: 'Usuario no registrado',
                text: 'Error al realizar el registro',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        }
    })
    
}

export function fetchLoginUsuarios(dataLogin){

    fetch('../Php/controller/TareaController.php', {
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
        if(dataLogin.success){
            const userLogin = dataLogin.usuario;
            Swal.fire({
                title: 'Usuario logueado',
                text: 'Inicio de sesion exitoso',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });            
        }
        else{
            Swal.fire({
                title: 'Credenciales incorrectas',
                text: 'El email o la contraseña son incorrectas, vuelve a intentarlo',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }); 
        }
    })

}

