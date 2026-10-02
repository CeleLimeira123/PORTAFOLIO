// ==========================================
// SCRIPT PRINCIPAL - PORTAFOLIO DE CELESTE
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    // ------------------------------------------
    // FUNCIÓN REUTILIZABLE: muestra un mensaje y
    // pinta el campo en verde (ok) o rojo (error)
    // ------------------------------------------
    function mostrar(mensaje, campo, ok, texto) {
        mensaje.textContent = texto;
        mensaje.style.color = ok ? "green" : "red";

        if (campo) {
            campo.classList.toggle("correcto", ok);
            campo.classList.toggle("error", !ok);
        }
    }

    // 1. MENÚ HAMBURGUESA
    const hamburger = document.getElementById("hamburger");
    const nav = document.getElementById("nav");

    if (hamburger && nav) {
        hamburger.addEventListener("click", function() {
            nav.classList.toggle("active");
            // toggle = alternar: si no tiene la clase la agrega, si ya la tiene la quita
        });
    }

    // 2. MODO OSCURO
    const btnTema = document.getElementById("btnTema");

    if (btnTema) {
        btnTema.addEventListener("click", function() {
            document.body.classList.toggle("dark");
        });
    }

    // 3. BOTÓN VOLVER ARRIBA
    const btnArriba = document.getElementById("btnArriba");

    if (btnArriba) {
        window.addEventListener("scroll", function() {
            btnArriba.style.display = window.scrollY > 100 ? "flex" : "none";
        });

        btnArriba.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 4. FILTRO DE PROYECTOS POR CATEGORÍA
    const botonesFiltro = document.querySelectorAll(".filtros button");
    const itemsFiltro = document.querySelectorAll(".item");

    botonesFiltro.forEach(function(boton) {
        boton.addEventListener("click", function() {
            const categoria = boton.dataset.categoria;

            itemsFiltro.forEach(function(item) {
                const mostrarItem = categoria === "todos" || item.classList.contains(categoria);
                item.classList.toggle("oculto", !mostrarItem);
            });
        });
    });

    // 5. BÚSQUEDA Y AUTOCOMPLETADO DE HABILIDADES
    const inputBusqueda = document.getElementById("inputBusqueda");
    const listaSugerencias = document.getElementById("sugerencias");
    const tarjetasHabilidades = document.querySelectorAll(".item-habilidad");

    if (inputBusqueda && listaSugerencias && tarjetasHabilidades.length > 0) {
        const habilidades = Array.from(tarjetasHabilidades).map(function(tarjeta) {
            return tarjeta.querySelector("h3").textContent;
        });

        // Muestra solo las tarjetas que contienen el texto
        const filtrar = function(texto) {
            tarjetasHabilidades.forEach(function(tarjeta) {
                const titulo = tarjeta.querySelector("h3").textContent.toLowerCase();
                tarjeta.classList.toggle("oculto", !titulo.includes(texto));
            });
        };

        inputBusqueda.addEventListener("input", function() {
            const texto = inputBusqueda.value.toLowerCase();
            listaSugerencias.innerHTML = "";
            filtrar(texto);

            if (texto === "") return;

            habilidades.forEach(function(habilidad) {
                if (habilidad.toLowerCase().includes(texto)) {
                    const li = document.createElement("li");
                    li.textContent = habilidad;

                    li.addEventListener("click", function() {
                        inputBusqueda.value = habilidad;
                        listaSugerencias.innerHTML = "";
                        filtrar(habilidad.toLowerCase());
                    });

                    listaSugerencias.appendChild(li);
                }
            });
        });

        // Cierra las sugerencias al hacer clic fuera
        document.addEventListener("click", function(e) {
            if (!inputBusqueda.contains(e.target) && !listaSugerencias.contains(e.target)) {
                listaSugerencias.innerHTML = "";
            }
        });
    }

    // 6. MODAL DE EXPERIENCIA
    const modal = document.getElementById("modal");
    const btnCerrar = document.getElementById("btnCerrar");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalTexto = document.getElementById("modalTexto");
    const tarjetasExperiencia = document.querySelectorAll(".item-experiencia");

    if (modal && btnCerrar && tarjetasExperiencia.length > 0) {
        tarjetasExperiencia.forEach(function(tarjeta) {
            tarjeta.addEventListener("click", function() {
                modalTitulo.textContent = tarjeta.dataset.titulo;
                modalTexto.textContent = tarjeta.dataset.detalle;
                modal.style.display = "flex";
            });
        });

        btnCerrar.addEventListener("click", function() {
            modal.style.display = "none";
        });

        // Cerrar haciendo clic fuera de la caja blanca
        modal.addEventListener("click", function(e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // 7. VALIDACIÓN DE CAMPOS (contacto y cotizador)
    // Una sola función para nombre, correo, celular y mensaje
    function validar(idCampo, idMensaje, esValido, textoError, textoOk) {
        const campo = document.getElementById(idCampo);
        const mensaje = document.getElementById(idMensaje);

        if (!campo || !mensaje) return;

        campo.addEventListener("input", function() {
            const valido = esValido(campo.value);
            mostrar(mensaje, campo, valido, valido ? textoOk : textoError);
        });
    }

    validar("nombre", "mensajeNombre",
        function(v) { return v.trim().length >= 3; },
        "El nombre debe tener al menos 3 caracteres",
        "Nombre válido");

    validar("email", "mensajeEmail",
        function(v) { return v.includes("@") && v.includes("."); },
        "Ingresa un correo válido, por ejemplo correo@gmail.com",
        "Correo válido");

    // Celular de Bolivia: 8 dígitos y empieza con 6 o 7
    validar("telefono", "mensajeTelefono",
        function(v) { return /^[67]\d{7}$/.test(v); },
        "El celular debe tener 8 dígitos y empezar con 6 o 7",
        "Celular válido");

    validar("mensajeTexto", "mensajeTextoFeedback",
        function(v) { return v.length >= 5; },
        "El mensaje debe tener al menos 5 caracteres",
        "Mensaje válido");

    // 8. COTIZADOR
    const formCotizador = document.getElementById("formCotizador");

    if (formCotizador) {
        const nombreInput = document.getElementById("nombre");
        const emailInput = document.getElementById("email");
        const telefonoInput = document.getElementById("telefono");
        const servicios = document.querySelectorAll(".servicio");
        const cantidadInput = document.getElementById("cantidad");
        const plazoInput = document.getElementById("plazo");

        const mensajeServicios = document.getElementById("mensajeServicios");
        const mensajeCantidad = document.getElementById("mensajeCantidad");
        const mensajeBoton = document.getElementById("mensajeBoton");
        const mensajeFinal = document.getElementById("mensajeFinal");

        const subtotalResultado = document.getElementById("subtotal");
        const recargoResultado = document.getElementById("recargo");
        const descuentoResultado = document.getElementById("descuento");
        const totalResultado = document.getElementById("total");

        const boton = document.getElementById("btnCotizar");

        // ---------- VALIDACIONES (solo dicen si está bien o mal) ----------
        function nombreValido() {
            return nombreInput.value.trim().length >= 3;
        }

        function emailValido() {
            return emailInput.value.includes("@") && emailInput.value.includes(".");
        }

        function telefonoValido() {
            return /^[67]\d{7}$/.test(telefonoInput.value);
        }

        // Lista de servicios que el usuario marcó
        function serviciosElegidos() {
            return Array.from(servicios).filter(function(s) { return s.checked; });
        }

        function cantidadValida() {
            const cantidad = Number(cantidadInput.value);
            return cantidadInput.value !== "" && Number.isInteger(cantidad) && cantidad >= 1 && cantidad <= 10;
        }

        // ---------- MENSAJES ----------
        function mostrarServicios() {
            const elegidos = serviciosElegidos();
            const nombres = elegidos.map(function(s) { return s.dataset.nombre; });
            const texto = elegidos.length === 0 ? "Selecciona al menos un servicio" : `Seleccionados: ${nombres.join(", ")}`;

            mostrar(mensajeServicios, null, elegidos.length > 0, texto);
        }

        function mostrarCantidad() {
            const cantidad = Number(cantidadInput.value);
            let texto;

            if (cantidadInput.value === "") {
                texto = "Escribe la cantidad de proyectos";
            } else if (!Number.isInteger(cantidad)) {
                texto = "La cantidad debe ser un número entero";
            } else if (cantidad < 1 || cantidad > 10) {
                texto = "La cantidad debe estar entre 1 y 10";
            } else {
                texto = "Cantidad válida";
            }

            mostrar(mensajeCantidad, cantidadInput, cantidadValida(), texto);
        }

        // El botón solo se activa si todo es válido
        function actualizarBoton() {
            const todoOk = nombreValido() && emailValido() && telefonoValido() && serviciosElegidos().length > 0 && cantidadValida();

            boton.disabled = !todoOk;
            mostrar(mensajeBoton, null, todoOk, todoOk ? "Todo listo, ya puedes enviar" : "Completa todos los campos para continuar");
        }

        // ---------- CÁLCULO ----------
        function calcular() {
            // Suma el precio de todos los servicios marcados
            let precioProyecto = 0;

            serviciosElegidos().forEach(function(s) {
                precioProyecto += Number(s.value);
            });

            const cantidad = cantidadValida() ? Number(cantidadInput.value) : 0;
            const plazo = plazoInput.value;

            let recargo;
            let descuento;

            // Recargo según el plazo
            if (plazo === "urgente") {
                recargo = 40;
            } else {
                if (plazo === "rapido") {
                    recargo = 20;
                } else {
                    recargo = 0;
                }
            }

            // Descuento según la cantidad
            if (cantidad >= 5) {
                descuento = 15;
            } else {
                if (cantidad >= 3) {
                    descuento = 10;
                } else {
                    descuento = 0;
                }
            }

            const subtotal = precioProyecto * cantidad;
            const montoRecargo = subtotal * recargo / 100;
            const montoDescuento = subtotal * descuento / 100;
            const total = subtotal + montoRecargo - montoDescuento;

            subtotalResultado.textContent = `Bs ${subtotal.toFixed(2)}`;
            recargoResultado.textContent = `${recargo} % (Bs ${montoRecargo.toFixed(2)})`;
            descuentoResultado.textContent = `${descuento} % (Bs ${montoDescuento.toFixed(2)})`;
            totalResultado.textContent = `Bs ${total.toFixed(2)}`;
        }

        // ---------- EVENTOS (tiempo real) ----------
        // Los mensajes de nombre, correo y celular los maneja "validar"
        nombreInput.addEventListener("input", actualizarBoton);
        emailInput.addEventListener("input", actualizarBoton);
        telefonoInput.addEventListener("input", actualizarBoton);

        // Cada vez que marcas o desmarcas un servicio
        servicios.forEach(function(s) {
            s.addEventListener("change", function() {
                mostrarServicios();
                calcular();
                actualizarBoton();
            });
        });

        cantidadInput.addEventListener("input", function() {
            mostrarCantidad();
            calcular();
            actualizarBoton();
        });

        plazoInput.addEventListener("change", calcular);

        // ---------- SOLICITAR ----------
        boton.addEventListener("click", function() {
            mensajeFinal.textContent = `¡Gracias ${nombreInput.value}! Tu cotización de ${totalResultado.textContent} será enviada a ${emailInput.value} y te llamaremos al ${telefonoInput.value}.`;
            mensajeFinal.className = "exito";
        });

        // ---------- LIMPIAR ----------
        formCotizador.addEventListener("reset", function() {
            // setTimeout espera a que el navegador vacíe los campos
            setTimeout(function() {
                document.querySelectorAll(".cotizador .mensaje").forEach(function(m) {
                    m.textContent = "";
                });
                document.querySelectorAll(".cotizador .error, .cotizador .correcto").forEach(function(campo) {
                    campo.classList.remove("error", "correcto");
                });
                mensajeFinal.textContent = "";
                mensajeFinal.className = "";

                calcular();
                actualizarBoton();
            }, 0);
        });
    }

});