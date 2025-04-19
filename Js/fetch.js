

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
            console.log("Datos insertados correctamente");
        } else {
            console.log("Error al insertar los datos");
        }
    })
    
}
