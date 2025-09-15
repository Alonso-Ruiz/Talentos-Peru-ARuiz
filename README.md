# Talentos Perú — Lista de Ofertas

Este proyecto lo hice como parte de una prueba técnica. La idea fue armar la pantalla principal de **Talentos Perú**, una app pensada para conectar empresas con postulantes de forma rápida y amigable. Quise que el diseño se sienta limpio, entendible y que funcione bien tanto en web como en móvil.

## 🚀 URL DEL PROYECTO DESPLEGADO
https://talentos-peru-a-ruiz-cq47axut9.vercel.app/


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

## Adjunto vistas del proyecto 

Vista Desktop

<img width="1336" height="646" alt="image" src="https://github.com/user-attachments/assets/13f79ec6-697e-4d56-a5e0-c709e8cb90b1" />

<img width="1332" height="649" alt="image" src="https://github.com/user-attachments/assets/aab1ac26-7b71-4779-adda-0ac4778a1e63" />

Vista Movil

<img width="211" height="377" alt="image" src="https://github.com/user-attachments/assets/e6952df6-7d35-489a-9edb-1f72b471a9ee" />

<img width="209" height="377" alt="image" src="https://github.com/user-attachments/assets/382cc0ef-8b96-4199-9f98-522a1aadadc1" />

<img width="210" height="377" alt="image" src="https://github.com/user-attachments/assets/a89bbc1c-2938-4fd2-9a02-859852a2ec02" />

