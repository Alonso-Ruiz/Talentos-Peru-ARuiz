# Talentos Perú — Lista de Ofertas

Este proyecto lo hice como parte de una prueba técnica. La idea fue armar la pantalla principal de **Talentos Perú**, una app pensada para conectar empresas con postulantes de forma rápida y amigable. Quise que el diseño se sienta limpio, entendible y que funcione bien tanto en web como en móvil.

## 🎨 Diseño  
- Usé una paleta de azules como principal (para transmitir confianza) y amarillo para resaltar botones importantes.  
- Tipografías: **Inter** para textos y **Poppins** para títulos, para darle jerarquía y que sea fácil de leer.  
- La estructura quedó así:
  - Navbar con logo, perfil y botón para cambiar entre modo claro/oscuro.  
  - Barra de búsqueda con dos inputs: cargo y ubicación.  
  - Filtros de fecha, modalidad y experiencia.  
  - **Web (desktop):** lista de ofertas a la izquierda y detalle a la derecha.  
  - **Móvil:** el detalle aparece en un **modal** al dar clic en la oferta.

## ⚙️ Funcionalidades
- **Filtros activos**: se puede filtrar por fecha, modalidad y experiencia, y el listado se actualiza al instante.  
- **Tema claro/oscuro**: se puede cambiar con un clic y el modo elegido se guarda en `localStorage`, así que se mantiene si recargas la página.  
- **Ofertas dinámicas**: las ofertas se cargan desde un arreglo en JS.
- **Detalle de oferta**:
  - En web aparece a la derecha.  
  - En móvil abre un modal, y si cambias a vista de escritorio, se sincroniza automáticamente.  
- **Acciones en el detalle**: copiar enlace, descartar la oferta (se elimina de la lista) y guardar.  
- **Filtros en móvil**: se muestran en línea y con scroll horizontal para que no se corte la experiencia.  

## 🚀 Conclusión
Busqué que esta pantalla sea **simple, clara y útil**, que se vea bien tanto en desktop como en móvil y que sea fácil de mantener. El código está ordenado y preparado para crecer, por ejemplo, conectando un backend real en el futuro.
