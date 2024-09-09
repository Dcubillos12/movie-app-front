# MovieApp 🎬

Bienvenido a **MovieApp**, un proyecto que forma parte de una **prueba técnica** para la empresa **Inlaze**. El objetivo era crear una aplicación que permitiera a los usuarios explorar películas populares usando la API de [TMDB](https://www.themoviedb.org/), con opciones para filtrar y buscar películas, así como la posibilidad de marcarlas como favoritas.

## ¿De qué se trata?

La idea principal es que los usuarios puedan descubrir nuevas películas de manera fácil y rápida. Se puede navegar por una lista de películas populares, hacer búsquedas por palabra clave o filtrar por género. Además, cuando el usuario encuentra una película que le gusta, puede marcarla como favorita y acceder a esos títulos más tarde. Todo esto mientras la aplicación se adapta a cualquier dispositivo, ya sea un móvil, una tablet o un ordenador.

## ¿Cómo lo hice?

### 1. **Página principal con películas populares**
Lo primero fue integrar la API de TMDB para traer las películas populares. La API es bastante sencilla de usar, pero una de las cosas que tuve que resolver fue cómo mostrar correctamente muchas películas sin sobrecargar la página. Aquí es donde decidí usar la paginación, de modo que el contenido se cargue poco a poco, lo que mejora el rendimiento y la experiencia del usuario.

### 2. **Filtros y búsqueda**
Para facilitar la búsqueda de películas, implementé un filtro por género y un campo de búsqueda. Esto me permitió profundizar un poco más en la API de TMDB, que tiene una documentación muy clara, pero había algunos problemas con los filtros que tuve que investigar. Después de hacer algunas pruebas y leer más detenidamente la documentación, logré hacer que los filtros funcionaran correctamente.

### 3. **Detalles de las películas**
Para cada película, hice una página de detalles que muestra información como el título, el resumen, los géneros, la fecha de estreno, y un pequeño botón que permite marcarla como favorita. Esto fue bastante fluido de implementar, pero me aseguré de que la experiencia fuera lo más sencilla posible para el usuario.

### 4. **Autenticación básica**
Aquí permito que los usuarios se registren e inicien sesión para gestionar su lista de películas favoritas. El proceso de autenticación fue un reto, pero con un enfoque simple, logré implementar un sistema que cubre lo necesario para esta prueba.

### 5. **Diseño responsivo**
Desde el principio, tuve en mente que la aplicación debería verse bien en cualquier dispositivo, así que usé **Material UI** para los componentes visuales y me aseguré de que todo fuera completamente responsivo. Hubo algunos detalles con ciertos componentes que no se veían bien en pantallas pequeñas, pero ajustando los estilos y haciendo pruebas en diferentes tamaños de pantalla, pude solucionarlo.

## Problemas y soluciones

Como en cualquier proyecto, me encontré con algunos desafíos. Uno de los más grandes fue manejar correctamente la paginación y los filtros al mismo tiempo. Al principio, la página se refrescaba de manera inesperada cuando se aplicaban filtros junto con la paginación, pero tras investigar un poco y usar el estado de React de manera más eficiente, logré que ambos funcionaran juntos sin problemas.

También tuve algunos problemas menores con la implementación del diseño responsivo. Algunos elementos se veían bien en escritorio, pero no tanto en dispositivos móviles. Esto lo fui solucionando haciendo pruebas y ajustes con las utilidades de Material UI y CSS Modules.

## Instalación

Si quieres probar el proyecto por ti mismo, estos son los pasos:

```bash
git clone https://github.com/tu_usuario/moviematch.git
