      //Seleccionar el boton
      var mybutton = document.getElementById("buttonUp");
      mybutton.addEventListener("click",topFunction);

      // Cuando el usuario hace scroll en la pantalla, alcanzando 250px hacia abajo, el boton aparece.
      window.onscroll = function () {
        scrollFunction();
      };

      function scrollFunction() {
        if (
          document.body.scrollTop > 250 ||
          document.documentElement.scrollTop > 250
        ) {
          mybutton.style.display = "flex";
        } else {
          mybutton.style.display = "none";
        }
      }
      // Cuando el usuario hace click en el boton, la pagina sube hasta la parte mas alta.
      function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }