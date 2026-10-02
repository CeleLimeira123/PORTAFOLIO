// ==========================================
// SCRIPT PRINCIPAL - PORTAFOLIO DE CELESTE
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

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
                const mostrar = categoria === "todos" || item.classList.contains(categoria);
                item.classList.toggle("oculto", !mostrar);
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

    // 7. VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // Una sola función para los tres campos
    function validar(idCampo, idMensaje, esValido, textoError, textoOk) {
        const campo = document.getElementById(idCampo);
        const mensaje = document.getElementById(idMensaje);

        if (!campo || !mensaje) return;

        campo.addEventListener("input", function() {
            const valido = esValido(campo.value);

            mensaje.textContent = valido ? textoOk : textoError;
            mensaje.style.color = valido ? "green" : "red";
            campo.classList.toggle("correcto", valido);
            campo.classList.toggle("error", !valido);
        });
    }

    validar("nombre", "mensajeNombre",
        function(v) { return v.length >= 3; },
        "El nombre debe tener al menos 3 caracteres",
        "Nombre válido");

    validar("email", "mensajeEmail",
        function(v) { return v.includes("@") && v.includes("."); },
        "Ingresa un correo electrónico válido",
        "Correo válido");

    validar("mensajeTexto", "mensajeTextoFeedback",
        function(v) { return v.length >= 5; },
        "El mensaje debe tener al menos 5 caracteres",
        "Mensaje válido");

});