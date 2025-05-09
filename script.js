function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
}
function cargarHTML() {
    fetch('html.html')  // Aquí debes poner la ruta de tu archivo HTML
      .then(response => response.text())  // Convierte la respuesta en texto
      .then(html => {
        document.getElementById('contenido').innerHTML = html;  // Inserta el HTML en el div
      })
      .catch(error => {
        console.error('Hubo un error al cargar el archivo HTML:', error);
      });
  }
// Función para cargar un archivo HTML en un elemento por ID
function loadHTML(file, elementId) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
      if (elementId === 'header') {
        addMenuListeners();
      }
    });
}

// Cargar header y footer al iniciar
loadHTML('header.html', 'header');
loadHTML('footer.html', 'footer');

// Cargar contenido inicial
function loadContent(page) {
  fetch(page)
    .then(response => response.text())
    .then(data => {
      document.getElementById('content').innerHTML = data;
    });
}

// Añadir listeners a los enlaces del menú
function addMenuListeners() {
  const links = document.querySelectorAll('#header nav a[data-page]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      loadContent(page);
    });
  });
}

// Cargar la página de inicio por defecto
document.addEventListener('DOMContentLoaded', function() {
  loadContent('home.html');
});
