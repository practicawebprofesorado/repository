<script>
    // Cargar header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });

    // Cargar footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });

    // Cargar contenido inicial (inicio.html)
    window.onload = function() {
        loadContent('inicio.html');
    };

    // Función para cargar contenido
    function loadContent(page) {
        fetch(page)
            .then(response => response.text())
            .then(data => {
                document.getElementById('content').innerHTML = data;
            });
    }
</script>
