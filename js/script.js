document.addEventListener("DOMContentLoaded", () => {
  cargarEstudiantes();

  let btnResumen = document.getElementById("verResumen");
  if (btnResumen) {
      btnResumen.addEventListener("click", verResumen);
  } else {
      console.error("Error: No se encontró el botón con ID 'verResumen'.");
  }
});

function guardarEstudiante() {
  const nombreEstudiante=document.getElementById('nombre-estudiante').value;
  const asistencia="no definida";
  const fecha=new Date().toLocaleDateString();
  let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
  estudiantes.push({ nombreEstudiante, asistencia, fecha });
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

}
 function cargarEstudiantes() {
  let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
  let lista = document.getElementById("lista-Estudiantes");
  lista.innerHTML = "";

  estudiantes.forEach((estudiante, index) => {
      let fila = `
          <tr>
              <td>${estudiante.nombreEstudiante}</td>
              <td>${estudiante.asistencia}</td>
              <td>${estudiante.fecha}</td>
              <td>
                  <button onclick="marcarAsistencia(${index}, 'Presente')">Presente</button>
                  <button onclick="marcarAsistencia(${index}, 'Ausente')">Ausente</button>
                  <button class="eliminar" onclick="removerEstudiante(${index})">Eliminar</button>
              </td>
          </tr>
      `;
      lista.insertAdjacentHTML('beforeend', fila);
  });
}
 function marcarAsistencia(index, estado) {
  let estudiantes = JSON.parse(localStorage.getItem("estudiantes"));
  estudiantes[index].asistencia = estado;
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
  cargarEstudiantes(); // Recargar la lista para reflejar los cambios
}

function removerEstudiante(index) {
  let estudiantes = JSON.parse(localStorage.getItem("estudiantes"));
  estudiantes.splice(index, 1);
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
  cargarEstudiantes(); // Recargar la lista para reflejar los cambios
}

function verResumen() {
  let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
  let resumen = "Resumen de Asistencia:\n";
  estudiantes.forEach(est => {
    resumen +='${est.nombre} ${est.asistencia} ${est.fecha}';
  })
  alert(resumen);
}