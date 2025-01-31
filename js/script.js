document.addEventListener("DOMContentLoaded", () => {
  cargarEstudiantes();

  let btnResumen = document.getElementById("verResumen");
  if (btnResumen) {
      btnResumen.addEventListener("click", verResumen);
  } else {
      console.error("Error: No se encontró el botón con ID 'verResumen'.");
  }
});

function agregarEstudiante() {
   // Función para agregar el estudiante al localStorage
   function agregarEstudiante(event) {
    // Evitamos que el formulario se envíe y recargue la página
    event.preventDefault();

    // Obtenemos el nombre del estudiante desde el input
    const nombreEstudiante = document.getElementById('nombre-estudiante').value;

    // Verificamos que el nombre no esté vacío
    if (nombreEstudiante.trim() === "") {
      alert("Por favor, ingresa un nombre.");
      return;
    }

    // Recuperamos los estudiantes actuales del localStorage
    let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

    // Creamos un nuevo objeto para el estudiante
    const nuevoEstudiante = {
      nombre: nombreEstudiante,  // Coma añadida
      asistencia: "No registrada",  // Coma añadida
      fecha: new Date().toLocaleDateString()  // Coma añadida
    };

    // Agregamos el nuevo estudiante al array de estudiantes
    estudiantes.push(nuevoEstudiante);

    // Guardamos el array actualizado en el localStorage
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

    // Limpiamos el input después de agregar el estudiante
    document.getElementById('nombre-estudiante').value = "";

    alert('Estudiante ${nombreEstudiante} agregado con éxito.');  // Interpolación de cadena con comillas invertidas
  }

  // Agregamos el evento click al botón de enviar el formulario
  document.getElementById('form-agregar').addEventListener('submit', agregarEstudiante);
}


function cargarEstudiantes() {
  let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
  let lista = document.getElementById("listaEstudiantes");
  lista.innerHTML = "";

  estudiantes.forEach((estudiante, index) => {
      let fila = `
          <tr>
              <td>${estudiante.nombre}</td>
              <td>${estudiante.asistencia}</td>
              <td>${estudiante.fecha}</td>
              <td>
                  <button onclick="marcarAsistencia(${index}, 'Presente')">Presente</button>
                  <button onclick="marcarAsistencia(${index}, 'Ausente')">Ausente</button>
                  <button class="eliminar" onclick="removerEstudiante(${index})">Eliminar</button>
              </td>
          </tr>
      `;
      lista.insertAdjacentHTML('beforeend', fila);  // Usamos insertAdjacentHTML para evitar sobrescribir el contenido
  });
}

function marcarAsistencia(index, estado) {
  let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
  estudiantes[index].asistencia = estado;
  estudiantes[index].fecha = new Date().toLocaleDateString();
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
  cargarEstudiantes();
}

function removerEstudiante(index) {
  let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
  estudiantes.splice(index, 1);
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
  cargarEstudiantes();
}

function verResumen() {
  let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
  let resumen = "Resumen de Asistencia:\n";
  estudiantes.forEach(est => {
    resumen +='${est.nombre} ${est.asistencia} ${est.fecha}';
  })
  alert(resumen);
}