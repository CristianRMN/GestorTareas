

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
                console.log("Nos redirigimos a login");
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

