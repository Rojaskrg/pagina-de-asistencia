// Selección de elementos del DOM
const listaEstudiantes = document.getElementById('listaEstudiantes');
const agregarEstudianteBtn = document.getElementById('agregarEstudiante');
const nombreEstudianteInput = document.getElementById('nombreEstudiante');
const resumenAsistenciaDiv = document.getElementById('resumenAsistencia');
const verResumenBtn = document.getElementById('verResumen');

// Cargar estudiantes desde localStorage
let estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];

// Función para guardar datos en localStorage
function guardaLocal() {
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
}

// Función para mostrar la lista de estudiantes
function despliegaListaEstudiantes() {
    listaEstudiantes.innerHTML = '';
    estudiantes.forEach((estudiante, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${estudiante.nombre}</td>
            <td>${estudiante.estado || 'Sin marcar'}</td>
            <td>${estudiante.fecha || 'N/A'}</td>
        `;

        // Crear botones
        const buttonPresente = document.createElement('button');
        buttonPresente.textContent = 'Presente';
        buttonPresente.addEventListener('click', () => marcarAsistencia(index, 'Presente'));
        
        const buttonAusente = document.createElement('button');
        buttonAusente.textContent = 'Ausente';
        buttonAusente.addEventListener('click', () => marcarAsistencia(index, 'Ausente'));
        
        const buttonEliminar = document.createElement('button');
        buttonEliminar.textContent = 'Eliminar';
        buttonEliminar.addEventListener('click', () => removerEstudiante(index));
        
        // Agregar botones a la fila
        fila.appendChild(buttonPresente);
        fila.appendChild(buttonAusente);
        fila.appendChild(buttonEliminar);

        listaEstudiantes.appendChild(fila);
    });
}

// Funciones adicionales como agregar, eliminar y marcar asistencia...
// (Tu código original para agregarEstudiante, marcarAsistencia, removerEstudiante y verResumen)

// Event listeners
agregarEstudianteBtn.addEventListener('click', agregarEstudiante);
verResumenBtn.addEventListener('click', verResumen);

// Inicializar la tabla al cargar la página
despliegaListaEstudiantes();