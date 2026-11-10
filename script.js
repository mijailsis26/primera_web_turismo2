// ==========================================================================
// SCRIPT PRINCIPAL: FUNCIONALIDADES, FORMULARIOS Y FILTROS (CORREGIDO)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {

    // ----------------------------------------------------------------------
    // 1. FUNCIONALIDAD DEL FORMULARIO DE CONTACTO (index.html)
    // ----------------------------------------------------------------------
    const formularioContacto = document.getElementById("form-contacto");
    const mensajeExito = document.getElementById("mensaje-exito");

    if (formularioContacto) {
        formularioContacto.addEventListener("submit", (evento) => {
            // DETENER RECARGA POR DEFECTO AL INICIO
            evento.preventDefault();

            // Capturar campos
            const nombre = document.getElementById("nombre").value;
            const email = document.getElementById("email").value;
            const mensaje = document.getElementById("mensaje").value;

            // Almacenar en objeto JS
            const datosContacto = {
                nombre: nombre,
                email: email,
                mensaje: mensaje,
                fechaEnvio: new Date().toISOString()
            };

            // Convertir a cadena de texto JSON
            const jsonContacto = JSON.stringify(datosContacto, null, 2);

            // Mostrar resultados en consola
            console.log("=== DATOS DE CONTACTO RECIBIDOS ===");
            console.log("Objeto JS:", datosContacto);
            console.log("JSON Formateado:", jsonContacto);

            // Mostrar mensaje de éxito
            if (mensajeExito) {
                mensajeExito.style.display = "block";
                setTimeout(() => {
                    mensajeExito.style.display = "none";
                }, 4000);
            }

            formularioContacto.reset();
        });
    }

    // ----------------------------------------------------------------------
    // 2. FILTRADO DINÁMICO EN EL CATÁLOGO DE DESTINOS (destinos.html)
    // ----------------------------------------------------------------------
    const formFiltros = document.querySelector(".bar-filtros");
    const selectDepartamento = document.getElementById("departamento");
    const selectTipoTurismo = document.getElementById("tipo-turismo");
    const bloquesDepartamento = document.querySelectorAll(".bloque-departamento");

    if (formFiltros) {
        formFiltros.addEventListener("submit", (evento) => {
            // DETENER RECARGA POR DEFECTO AL INICIO
            evento.preventDefault();

            const depSeleccionado = selectDepartamento.value;
            const tipoSeleccionado = selectTipoTurismo.value;

            // Recorremos los bloques de departamentos
            bloquesDepartamento.forEach((bloque) => {
                const idDepartamento = bloque.getAttribute("id");
                
                let coincideDepartamento = (depSeleccionado === "" || depSeleccionado === idDepartamento);
                
                const tarjetas = bloque.querySelectorAll(".card-destino");
                let tarjetasVisibles = 0;

                tarjetas.forEach((tarjeta) => {
                    const descripcionText = tarjeta.textContent.toLowerCase();
                    let coincideTipo = true;

                    if (tipoSeleccionado === "aventura") {
                        coincideTipo = descripcionText.includes("ciclismo") || 
                                       descripcionText.includes("aventura") || 
                                       descripcionText.includes("volcán") || 
                                       descripcionText.includes("huellas") || 
                                       descripcionText.includes("geológicas");
                    } else if (tipoSeleccionado === "cultural") {
                        coincideTipo = descripcionText.includes("cultura") || 
                                       descripcionText.includes("folclore") || 
                                       descripcionText.includes("misiones") || 
                                       descripcionText.includes("historia") || 
                                       descripcionText.includes("moneda");
                    } else if (tipoSeleccionado === "gastronomico") {
                        coincideTipo = descripcionText.includes("vino") || 
                                       descripcionText.includes("gastronomía") || 
                                       descripcionText.includes("gastronómica");
                    }

                    if (coincideDepartamento && coincideTipo) {
                        tarjeta.style.display = "block";
                        tarjetasVisibles++;
                    } else {
                        tarjeta.style.display = "none";
                    }
                });

                if (coincideDepartamento && tarjetasVisibles > 0) {
                    bloque.style.display = "block";
                } else {
                    bloque.style.display = "none";
                }
            });
        });
    }

    // ----------------------------------------------------------------------
    // 3. BUSCADOR RÁPIDO DE TOURS (index.html)
    // ----------------------------------------------------------------------
    const buscadorHome = document.querySelector(".buscador-tours");

    if (buscadorHome) {
        buscadorHome.addEventListener("submit", (evento) => {
            // DETENER RECARGA POR DEFECTO AL INICIO
            evento.preventDefault();

            const destino = document.getElementById("buscar-destino").value;

            if (destino !== "") {
                window.location.href = `destinos.html#${destino}`;
            } else {
                window.location.href = "destinos.html";
            }
        });
    }

    // ----------------------------------------------------------------------
    // 4. FUNCIONALIDAD DE RESERVA DE TOURS (tour-detalle.html)
    // ----------------------------------------------------------------------
    const formulariosReserva = document.querySelectorAll(".form-reserva");

    formulariosReserva.forEach((formReserva) => {
        formReserva.addEventListener("submit", (evento) => {
            // CRÍTICO: Previene que la página salte hacia arriba o se recargue al presionar enviar
            evento.preventDefault();

            // Identificar el nombre del tour desde el contenedor principal
            const contenedorTour = formReserva.closest(".tour-item") || formReserva.closest(".contenedor-tour-detalle");
            let nombreTour = "Tour no especificado";

            if (contenedorTour) {
                const tituloElemento = contenedorTour.querySelector("h2");
                if (tituloElemento) {
                    nombreTour = tituloElemento.textContent.trim();
                }
            }

            // Capturar entradas del formulario
            const inputFecha = formReserva.querySelector('input[type="date"]');
            const inputPasajeros = formReserva.querySelector('input[type="number"]');
            const selectModalidad = formReserva.querySelector("select");
            const mensajeExitoReserva = formReserva.querySelector(".mensaje-exito");
            
            const datosReserva = {
                tour: nombreTour,
                fechaViaje: inputFecha ? inputFecha.value : "No seleccionada",
                numeroPasajeros: inputPasajeros ? inputPasajeros.value : 1,
                modalidad: selectModalidad ? selectModalidad.value : "Estándar",
                fechaSolicitud: new Date().toLocaleString()
            };
            


            // Imprimir objeto e información formateada a JSON en consola
            console.log("=== NUEVA SOLICITUD DE RESERVA ===");
            console.log("Objeto Reserva:", datosReserva);
            console.log("JSON Reserva:", JSON.stringify(datosReserva, null, 2));

            // Mostrar el mensaje de éxito en la etiqueta <p> de la tarjeta sin mover la pantalla
            if (mensajeExitoReserva) {
                mensajeExitoReserva.style.display = "block";
    
                setTimeout(() => {
                    mensajeExitoReserva.style.display = "none";
                }, 4000);
            }
            

            // Limpiar los campos del formulario de reserva
            formReserva.reset();
        });
    });
    
});