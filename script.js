$(document).ready(function () {
    // Inicialización de los campos
    $('#nombre, #apellidos, #email, #telefono').val('');
    $('#producto').val('100');
    $('#plazo').val('1');
    $('#presupuesto').val('10');
    $('input[type="checkbox"]').prop('checked', false);

    // Función para validar la primera parte del formulario
    function validarContacto() {
        let campos = {
            nombre: {
                valor: $('#nombre').val(),
                patron: /^[a-zA-Z]+$/,
                min: 3,
                max: 15,
                mensaje: 'El nombre debe contener solo letras y tener entre 3 y 15 caracteres.'
            },
            apellidos: {
                valor: $('#apellidos').val(),
                patron: /^[a-zA-Z]+$/,
                min: 8,
                max: 40,
                mensaje: 'Los apellidos deben contener solo letras y tener entre 8 y 40 caracteres.'
            },
            email: {
                valor: $('#email').val(),
                patron: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                mensaje: 'El correo electrónico no es válido.'
            },
            telefono: {
                valor: $('#telefono').val(),
                patron: /^\d+$/,
                min: 10,
                max: 10,
                mensaje: 'El teléfono debe contener solo números y tener 10 dígitos.'
        
            }
        };

        let valido = true;
    for (let campo in campos) {
        if (!campos[campo].patron.test(campos[campo].valor) || campos[campo].valor.length < campos[campo].min || campos[campo].valor.length > campos[campo].max) {
            $('#' + campo + '-error').text(campos[campo].mensaje).addClass('d-block');
            $('#' + campo).addClass('is-invalid');
            valido = false;
        } else {
            $('#' + campo + '-error').removeClass('d-block');
            $('#' + campo).removeClass('is-invalid');
        }
    }

    let hasExtra = false;
    $('input[type="checkbox"][name^="extra"]').each(function () {
        if ($(this).is(':checked')) {
            hasExtra = true;
        }
    });

    if (!hasExtra) {
        $('#extras-error').addClass('d-block');
        valido = false;
    } else {
        $('#extras-error').removeClass('d-block');
    }

    return valido;
}

    // Función para calcular el presupuesto estimado
    function calcularPresupuesto() {
        let producto = parseInt($('#producto').val());
        let plazo = parseInt($('#plazo').val());
        let extras = 0;

        $('input[type="checkbox"]:checked').each(function () {
            extras += parseInt($(this).val());
        });

        let presupuesto = producto + (plazo * 20) + extras;

        $('#presupuesto').val(presupuesto);
    }

    // Eventos para validar 
    $('#formulario').submit(function (event) {
        event.preventDefault();

        if (validarContacto()) {
            calcularPresupuesto();

            if ($('#producto').val() !== '' && $('#plazo').val() !== '' && $('#presupuesto').val() !== '') {
                var hasExtra = false;
                $('input[type="checkbox"][name^="extra"]').each(function () {
                    if ($(this).is(':checked')) {
                        hasExtra = true;
                    }
                });

                if (hasExtra) {
                    alert('Datos introducidos correctamente');
                    location.reload(); 
                } else {
                    $('#extras-error').addClass('d-block');
                }
            } else {
                alert('Por favor, complete todos los campos');
            }
        } else {
            alert('Por favor, complete los campos de contacto correctamente');
        }
    });

    $('#producto, #plazo, input[type="checkbox"]').change(function () {
        calcularPresupuesto();
    });
});