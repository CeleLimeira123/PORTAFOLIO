// ==========================================================
//  main.js - Funcionalidades UX del portafolio
//
//  1. Menú hamburguesa
//  2. Modo oscuro (se recuerda la elección)
//  3. Botón "volver arriba"
//  4. Validación del formulario en tiempo real
//  5. Modal de detalle de proyectos
//  6. Filtro de proyectos por categoría
//
//  Cada bloque revisa que sus elementos existan en la página,
//  así una página que no los tiene no genera errores en consola.
// ==========================================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Si el usuario pidió "menos movimiento", el scroll no se anima
  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  // ========================================================
  // 1. MENÚ HAMBURGUESA
  // ========================================================
  const hamburger = document.querySelector('.navbar__toggle');
  const nav = document.getElementById('menu');

  if (hamburger && nav) {
    const esTablet = window.matchMedia('(min-width: 768px)');

    function abrirMenu() {
      nav.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Cerrar menú');
    }

    function cerrarMenu() {
      nav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Abrir menú');
    }

    // toggle: si no tiene la clase la agrega, si ya la tiene la quita
    hamburger.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) {
        cerrarMenu();
      } else {
        abrirMenu();
      }
    });

    // Cerrar al elegir un enlace
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) cerrarMenu();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        cerrarMenu();
        hamburger.focus();
      }
    });

    // Cerrar al tocar fuera del menú
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('is-open')) return;
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) cerrarMenu();
    });

    // Cerrar si la pantalla pasa a tablet/desktop
    esTablet.addEventListener('change', function (e) {
      if (e.matches) cerrarMenu();
    });
  }

// ========================================================
// MODO OSCURO SIMPLIFICADO
// ========================================================
const btnTema = document.getElementById("btnTema");

if (btnTema) {
    btnTema.addEventListener("click", function() {
        // 1. Alterna la clase "dark" en el body (como indicó tu profesor)
        document.body.classList.toggle("dark");
        
        // 2. Cambia el texto del botón según el estado
        const esOscuro = document.body.classList.contains("dark");
        btnTema.textContent = esOscuro ? "Modo Claro ☀️" : "Modo Oscuro 🌙";
    });
}
  // ========================================================
  // 4. VALIDACIÓN DEL FORMULARIO EN TIEMPO REAL
  // ========================================================
  const formulario = document.getElementById('formContacto');

  if (formulario) {
    const inputNombre = document.getElementById('nombre');
    const inputEmail = document.getElementById('email');
    const inputMensaje = document.getElementById('mensaje');

    const mensajeNombre = document.getElementById('mensajeNombre');
    const mensajeEmail = document.getElementById('mensajeEmail');
    const mensajeMensaje = document.getElementById('mensajeMensaje');
    const contador = document.getElementById('contadorMensaje');
    const exito = document.getElementById('formExito');

    const MAX_MENSAJE = 300;
    const soloLetras = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/;
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    // Muestra el resultado de una validación (borde, texto y color)
    function mostrarResultado(input, mensaje, esValido, texto) {
      mensaje.textContent = texto;
      mensaje.classList.toggle('ok', esValido);
      mensaje.classList.toggle('error', !esValido);
      input.classList.toggle('correcto', esValido);
      input.classList.toggle('error', !esValido);
      input.setAttribute('aria-invalid', String(!esValido));
    }

    // Cada función devuelve true si el campo es válido
    function validarNombre() {
      const valor = inputNombre.value.trim();

      if (valor.length < 3) {
        mostrarResultado(inputNombre, mensajeNombre, false, 'El nombre debe tener al menos 3 caracteres');
        return false;
      }
      if (!soloLetras.test(valor)) {
        mostrarResultado(inputNombre, mensajeNombre, false, 'El nombre solo puede tener letras y espacios');
        return false;
      }
      mostrarResultado(inputNombre, mensajeNombre, true, 'Nombre válido');
      return true;
    }

    function validarEmail() {
      const valor = inputEmail.value.trim();

      if (valor === '') {
        mostrarResultado(inputEmail, mensajeEmail, false, 'Escribe tu correo electrónico');
        return false;
      }
      if (!formatoEmail.test(valor)) {
        mostrarResultado(inputEmail, mensajeEmail, false, 'Escribe un correo válido, por ejemplo: tu@correo.com');
        return false;
      }
      mostrarResultado(inputEmail, mensajeEmail, true, 'Correo válido');
      return true;
    }

    function validarMensaje() {
      const valor = inputMensaje.value.trim();
      contador.textContent = inputMensaje.value.length + ' / ' + MAX_MENSAJE;

      if (valor.length < 10) {
        mostrarResultado(inputMensaje, mensajeMensaje, false, 'El mensaje debe tener al menos 10 caracteres');
        return false;
      }
      mostrarResultado(inputMensaje, mensajeMensaje, true, 'Mensaje válido');
      return true;
    }

    // En tiempo real: se valida mientras el usuario escribe
    inputNombre.addEventListener('input', validarNombre);
    inputEmail.addEventListener('input', validarEmail);
    inputMensaje.addEventListener('input', validarMensaje);

    // También al salir del campo (por si pasó de largo sin escribir)
    inputNombre.addEventListener('blur', validarNombre);
    inputEmail.addEventListener('blur', validarEmail);
    inputMensaje.addEventListener('blur', validarMensaje);

    // Al enviar: se validan todos y se enfoca el primero con error
    formulario.addEventListener('submit', function (e) {
      e.preventDefault();

      // Se ejecutan los tres (sin cortocircuito) para mostrar todos los errores a la vez
      const nombreOk = validarNombre();
      const emailOk = validarEmail();
      const mensajeOk = validarMensaje();

      if (!nombreOk) {
        inputNombre.focus();
      } else if (!emailOk) {
        inputEmail.focus();
      } else if (!mensajeOk) {
        inputMensaje.focus();
      }

      if (nombreOk && emailOk && mensajeOk) {
        const primerNombre = inputNombre.value.trim().split(' ')[0];
        exito.textContent = '¡Gracias, ' + primerNombre + '! Tu mensaje fue validado correctamente.';
        exito.hidden = false;

        formulario.reset();

        // Limpia los estilos y mensajes de validación
        [inputNombre, inputEmail, inputMensaje].forEach(function (campo) {
          campo.classList.remove('correcto', 'error');
          campo.removeAttribute('aria-invalid');
        });
        [mensajeNombre, mensajeEmail, mensajeMensaje].forEach(function (m) {
          m.textContent = '';
          m.classList.remove('ok', 'error');
        });
        contador.textContent = '0 / ' + MAX_MENSAJE;
      } else {
        exito.hidden = true;
      }
    });
  }


  // ========================================================
  // 5. MODAL DE DETALLE DE PROYECTOS
  // ========================================================
  const modal = document.getElementById('modal');

  if (modal) {
    const btnCerrar = document.getElementById('btnCerrar');
    const modalTitulo = document.getElementById('modalTitulo');
    const modalTexto = document.getElementById('modalTexto');
    const modalCategoria = document.getElementById('modalCategoria');
    const zonaProyectos = document.getElementById('proyectos');

    const nombresCategoria = { web: 'Web', python: 'Python', datos: 'Datos' };
    let elementoPrevio = null;   // para devolver el foco al cerrar

    function abrirModal(tarjeta) {
      elementoPrevio = document.activeElement;

      modalTitulo.textContent = tarjeta.querySelector('h3').textContent;
      modalTexto.textContent = tarjeta.querySelector('p').textContent;
      modalCategoria.textContent = nombresCategoria[tarjeta.dataset.categoria] || 'Proyecto';

      modal.classList.add('is-open');
      document.body.classList.add('modal-open');
      btnCerrar.focus();
    }

    function cerrarModal() {
      modal.classList.remove('is-open');
      document.body.classList.remove('modal-open');
      if (elementoPrevio) elementoPrevio.focus();
    }

    // Abrir: un solo listener para todos los botones "Ver detalle"
    zonaProyectos.addEventListener('click', function (e) {
      const boton = e.target.closest('.btn-detalle');
      if (boton) abrirModal(boton.closest('.card-info'));
    });

    // Cerrar con la X
    btnCerrar.addEventListener('click', cerrarModal);

    // Cerrar al hacer clic en el fondo oscuro (no dentro del cuadro)
    modal.addEventListener('click', function (e) {
      if (e.target === modal) cerrarModal();
    });

    // Cerrar con Escape y mantener el foco dentro del modal con Tab
    document.addEventListener('keydown', function (e) {
      if (!modal.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        cerrarModal();
        return;
      }

      if (e.key === 'Tab') {
        const enfocables = modal.querySelectorAll('button, a[href]');
        const primero = enfocables[0];
        const ultimo = enfocables[enfocables.length - 1];

        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primero.focus();
        }
      }
    });
  }


  // ========================================================
  // 6. FILTRO DE PROYECTOS POR CATEGORÍA
  // ========================================================
  const botonesFiltro = document.querySelectorAll('.filtro');
  const tarjetas = document.querySelectorAll('#proyectos .card-info');
  const resultado = document.getElementById('resultadoFiltro');

  if (botonesFiltro.length > 0 && tarjetas.length > 0) {
    function aplicarFiltro(categoria) {
      let visibles = 0;

      tarjetas.forEach(function (tarjeta) {
        const coincide = categoria === 'todos' || tarjeta.dataset.categoria === categoria;
        tarjeta.hidden = !coincide;
        if (coincide) visibles++;
      });

      botonesFiltro.forEach(function (boton) {
        boton.setAttribute('aria-pressed', String(boton.dataset.filtro === categoria));
      });

      if (resultado) {
        resultado.textContent = 'Mostrando ' + visibles + ' de ' + tarjetas.length + ' proyectos';
      }
    }

    botonesFiltro.forEach(function (boton) {
      boton.addEventListener('click', function () {
        aplicarFiltro(boton.dataset.filtro);
      });
    });
  }
});
