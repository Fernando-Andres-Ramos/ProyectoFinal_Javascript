/*INICIALIZACION DE DOM */

formIngreso.css("display","none");
formCrearUsuario.css("display","none");
buttonNavCloseSesion.css("display","none");
/*divFormsProductos.style.display = "none"
btnRegistro.style.display = "none"
tienda.style.display = "none"
cerrarSesion.style.visibility = "hidden"/*


/*FUNCIONES*/

/*Mostrar form de crear usuario */
const showFormCreate=()=>{
formIngreso.css("display","none");
formCrearUsuario.css("display","block");
formCrearUsuario.addClass("animate__animated animate__fadeInLeft");
setTimeout(()=>{
  circuloRojo.removeClass("animate__animated animate__fadeInLeft")
 },1500)
}


/*Mostrar form de ingresar usuario */
const showFormLogin=()=>{
  formCrearUsuario.css("display","none");
  formIngreso.css("display","block");
  formIngreso.addClass("animate__animated animate__fadeInLeft");

}



/*Crear usuarios nuevos */
const crearUsuario= (e)=>{
  e.preventDefault();
  let nombre = inputNombreReg.val();
  let clave = inputClaveReg.val();
  let tipo = inputTipoReg.val().toUpperCase();
  let passAdmin = inputClaveAdmin.val().toUpperCase();

  switch (tipo){
    case "SI":
      if (passAdmin==="JAVASCRIPT"){
        const usuario = new Usuario(nombre,clave,tipo);
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        $("#validaciones").prepend("Usuario registrado con éxito");
        $("#validaciones").css({"color":"darkgreen","font-size":"30px"});

      }
      else{
        $("#validaciones").prepend("Usted no es un administrador");
        $("#validaciones").css({"color":"red","font-size":"30px"});
      }
      break;
    
    case "NO":
      const usuario = new Usuario(nombre,clave,tipo);
      usuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      $("#validaciones").prepend("Usuario registrado con éxito");
      $("#validaciones").css({"color":"darkgreen","font-size":"30px"});
      break;

    default:
      $("#validaciones").prepend("Escriba SI o NO en la opcion de administrador");
      $("#validaciones").css({"color":"red","font-size":"30px"});
      break;
  }

  inputNombreReg.val('');
  inputClaveReg.val('');
  inputTipoReg.val('');
  inputClaveAdmin.val('');
  formCrearUsuario.css("display","none");

  setTimeout(() => {
    $("#validaciones").slideUp(1000);
  }, 3000
  )
}

/*Logear usuario */
const login = (e) => {
  e.preventDefault();
  let nombreUsuario=inputNombreIng.val();
  let claveUsuario=inputClaveIng.val();
  if(localStorage.getItem("usuarioLogueado")){
  nombreUsuario = JSON.parse(localStorage.getItem("usuarioLogueado")).nombre
  claveUsuario = JSON.parse(localStorage.getItem("usuarioLogueado")).clave
  }
  
  const chequeoUsuario = usuarios.find(usuario=>usuario.nombre===nombreUsuario);
  
  if (chequeoUsuario) {
    console.log(nombreUsuario);
    console.log(claveUsuario);

    if (claveUsuario == chequeoUsuario.clave) {
    
      localStorage.setItem("usuarioLogueado",JSON.stringify(chequeoUsuario));
      tiempoUsuario = new Date().getTime();

      if (chequeoUsuario.tipoUsuario === "SI") {
        buttonNavIngreso.css("display","none");
        buttonNavRegistro.css("display","none");
        formIngreso.css("display","none");
        buttonNavCloseSesion.css("display","block");
        
        // completarSelect()
      } 
    
      else {
      $("#tituloBienvenida").prepend(`<h2>Bienvenidx ${chequeoUsuario.nombre.toUpperCase()},
                                      Estas son las noticias actuales</h2>`);

      buttonNavIngreso.css("display","none");
      buttonNavRegistro.css("display","none");
      formIngreso.css("display","none");
      formCrearUsuario.css("display","none");
      buttonNavCloseSesion.css("display","block");
      mostrarNoticias();
      }

    } 
  
    else {
      $("#validaciones").prepend("La clave ingresada es incorrecta");
      $("#validaciones").css({"color":"red","font-size":"30px"});
    }

  } 
  else {
    $("#validaciones").prepend("El usuario no esta registrado");
    $("#validaciones").css({"color":"red","font-size":"30px"});
  }

  inputNombreReg.val('');
  inputClaveReg.val('');
  inputTipoReg.val('');
  inputClaveAdmin.val('');

  setTimeout(() => {
    $("#validaciones").empty();
  }, 3000
  )
}

/*Elegir si se desea agregar o eliminar una noticia */
const modificarNoticias=()=>{
let accion = prompt("¿Desea agregar o eliminar noticias?: Agregar(1)-Eliminar(2)")
if (accion=="1"){
  ingresarNoticia();
}
else{
  eliminarNoticia();
}
}

/*Agregar articulos (noticias) */
const ingresarNoticia=()=>{
let titulo = prompt("Escriba el titulo de la noticia");
let fecha = new Date();
let articulo= prompt("Escriba la noticia");
let nuevaNoticia = new Publicacion(fecha,titulo,articulo);
noticias.push(nuevaNoticia);
localStorage.setItem("noticias",JSON.stringify(noticias));
}

/*Eliminar articulos (noticias) */
const eliminarNoticia =()=>{
let titulo = prompt("Qué producto desea eliminar?");        
let deleteNoticias = noticias.filter(noticia => noticia.titulo != titulo);
localStorage.setItem("noticias",JSON.stringify(deleteNoticias));
}


/*Mostrar articulos (noticias) */
const mostrarNoticias = () => {

  buttonNavIngreso.css("display","none");
  buttonNavRegistro.css("display","none");
  formIngreso.css("display","none");
  formCrearUsuario.css("display","none");
  buttonNavCloseSesion.css("display","block");
  seccionPublicaciones.css("display","block");
  if(noticias.length==0){
    seccionPublicaciones.prepend(`<br><br><br><p>Sin publicaciones, disculpe las molestias</p>`);
    seccionPublicaciones.css("font-size","26px");

  }
  else if(noticias.length==1){
    seccionPublicaciones.innerHTML = `<h3 class="tituloNoticia">Titulo:${noticias[0].titulo}</h3>
                              <br>
                              <p class="fechaNoticia">Fecha:${noticias[0].fecha}</p>
                              <br>
                              <p class="textoNoticia">${noticias[0].texto}</p>
                              <br><br>`;
  }
  else{
    for(const noticia of noticias){
      seccionPublicaciones.innerHTML += `<h3 class="tituloNoticia">Titulo:${noticia.titulo}</h3>
                              <br>
                              <p class="fechaNoticia">Fecha:${noticia.fecha}</p>
                              <br>
                              <p class="textoNoticia">${noticia.texto}</p>
                              <br><br>`;  
    }

  }

}

const cerrarSesionFunc = ()=>{
  formIngreso.css("display","none");
  formCrearUsuario.css("display","none");
  buttonNavCloseSesion.css("display","none");
  buttonNavIngreso.css("display","inline-block");
  buttonNavRegistro.css("display","inline-block");
  $("#tituloBienvenida").empty();
  $("#publicaciones").empty();
	localStorage.removeItem("usuarioLogueado");
}



buttonNavRegistro.click(showFormCreate);
botonReg.click(crearUsuario);


buttonNavIngreso.click(showFormLogin);
botonIng.click(login);


buttonNavCloseSesion.click(cerrarSesionFunc);
