/*INICIALIZACION DE DOM */

formIngreso.css("display","none");
formCrearUsuario.css("display","none");
buttonNavCloseSesion.css("display","none");
administrador.css("block","none");
$("#validaciones").css("display","none");


/*FUNCIONES*/

/*Mostrar form de crear usuario */
const showFormCreate=()=>{
  formIngreso.css("display","none");
  formCrearUsuario.css("display","block");
  formCrearUsuario.addClass("animate__animated animate__fadeInLeft");
  setTimeout(() => {
    formCrearUsuario.removeClass("animate__animated animate__fadeInLeft");
  },1000)
}

/*Mostrar form de ingresar usuario */
const showFormLogin=()=>{
  formCrearUsuario.css("display","none");
  formIngreso.css("display","block");
  formIngreso.addClass("animate__animated animate__fadeInLeft");
  setTimeout(() => {
    formIngreso.removeClass("animate__animated animate__fadeInLeft");
  },1000)
}


/*Crear usuarios nuevos */
const crearUsuario= (e)=>{
  e.preventDefault();
  let nombre = inputNombreReg.val();
  let clave = inputClaveReg.val();
  let tipo = inputTipoReg.val().toUpperCase();
  let passAdmin = inputClaveAdmin.val().toUpperCase();
  let cartel;

  switch (tipo){
    case "SI":
      if (passAdmin==="ADMIN"){
        const usuario = new Usuario(nombre,clave,tipo);
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        cartel="Usuario registrado con éxito";
        $("#validaciones").css({"color":"darkgreen","font-size":"30px"});
        animacion(cartel,formCrearUsuario);
      }
      else{
        $("#validaciones").css({"color":"red","font-size":"30px"});
        cartel="Usted no es un administrador";
        animacion(cartel,formCrearUsuario);
      }
      break;
    
    case "NO":
      const usuario = new Usuario(nombre,clave,tipo);
      usuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      cartel="Usuario registrado con éxito";
      $("#validaciones").css({"color":"darkgreen","font-size":"30px"});
      animacion(cartel,formCrearUsuario);
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
        $("#tituloBienvenida").prepend(`<h2>Bienvenidx ${chequeoUsuario.nombre.toUpperCase()},
                                        Este es el panel de noticias</h2>`);
        modificarNoticias();
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
      $("#validaciones").css({"color":"red","font-size":"30px"});
      cartel="La clave ingresada es incorrecta";
      animacion(cartel,formIngreso);
    }

  } 
  else {
    $("#validaciones").css({"color":"red","font-size":"30px"});
    cartel="El usuario no esta registrado";
    animacion(cartel,formIngreso);
  }

  inputNombreIng.val('');
  inputClaveIng.val('');
}

/*Animaciones */
const animacion = (texto,tipoFormulario)=>{
  $("#validaciones").empty();
  tipoFormulario.addClass("animate__animated animate__fadeOutLeft");
  setTimeout(() => {
    tipoFormulario.hide(1000);
  },500)
  $("#validaciones").prepend(texto);
  $("#validaciones").delay(1500);
  $("#validaciones").fadeIn(1000);
  $("#validaciones").delay(1000);
  $("#validaciones").fadeOut(1000);
  tipoFormulario.removeClass("animate__animated animate__fadeOutLeft");
}

/*Elegir si se desea agregar o eliminar una noticia */
const modificarNoticias=()=>{
  administrador.css({"display":"block","font-size":"26px","text-align":"center"});
  administrador.prepend(`<p>¿Desea agregar o Eliminar noticias?</p>`);
  administrador.append(`<br><br><br>
                        <form id=modificarNoticias>
                        <input type="radio" name="opcionAdmin" value="agregar">
                        <label for="Agregar">Agregar sección</label>
                        <br>
                        <input type="radio" name="opcionAdmin" value="eliminar">
                        <label for="Eliminar">Eliminar sección</label>
                        </form>`);

  $(document).ready(()=>{
    $("#modificarNoticias").change(()=>{
      let selected_value = $("input[name=opcionAdmin]:checked").val();
      if (selected_value=="agregar")
        ingresarNoticia();
      if(selected_value=="eliminar")
        eliminarNoticia();
    })
  })
}

/*Agregar articulos (noticias) */
const ingresarNoticia=()=>{
  administrador.empty();

  administrador.append(`<form class="row col-6">
                          <input type="text" style="margin-bottom: 10px" name="titulo" placeholder="Titulo" id="tituloNoticia">
                          <input type="date" style="margin-bottom: 10px" name="fecha" placeholder="Fecha" id="fechaNoticia">
                          <textarea name="Texto" style="resize:none" placeholder="Texto" cols="30" rows="10" id="textoNoticia" ></textarea>
                          <input type="submit" style="margin-top: 20px" value="Agregar" id="inputNoticia">
                        </form>`); 

  $("#inputNoticia").click((e)=>{
    e.preventDefault();
    let titulo = $("#tituloNoticia").val();
    let fecha = $("#fechaNoticia").val();
    let articulo = $("#textoNoticia").val();
    let nuevaNoticia = new Publicacion(fecha,titulo,articulo);
    noticias.push(nuevaNoticia);
    localStorage.setItem("noticias",JSON.stringify(noticias));
    $("#tituloNoticia").val('');
    $("#fechaNoticia").val('');
    $("#textoNoticia").val('');
    $("#validaciones").append("Noticia/sección agregada");
    $("#validaciones").css({"color":"green","font-size":"30px","margin-top":"15px"});
    $("#validaciones").fadeIn(1000);
    $("#validaciones").delay(1000);
    $("#validaciones").fadeOut(1000);
  })
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
    seccionPublicaciones.prepend(`<div class="card contenedorNoticia">
                                    <div class="card-body">
                                    <h2 class="card-title">${noticia[0].titulo}</h2>
                                    <h5 class="card-fecha">${noticia[0].fecha}</h5>
                                    <br>
                                    <p class="card-text">${noticia[0].texto}</p>
                                    </div>
                                  </div>`);
  }
  else{
    for(const noticia of noticias){
      seccionPublicaciones.prepend(`<div class="card contenedorNoticia">
                                      <div class="card-body">
                                      <h2 class="card-title">${noticia.titulo}</h2>
                                      <h5 class="card-fecha">${noticia.fecha}</h5>
                                      <br>
                                      <p class="card-text">${noticia.texto}</p>
                                      </div>
                                    </div>`);
    }

  }

}

const cerrarSesionFunc = ()=>{
  formIngreso.css("display","none");
  formCrearUsuario.css("display","none");
  buttonNavCloseSesion.css("display","none");
  buttonNavIngreso.css("display","inline-block");
  buttonNavRegistro.css("display","inline-block");
  administrador.css("display","none");
  $("#tituloBienvenida").empty();
  $("#publicaciones").empty();
	localStorage.removeItem("usuarioLogueado");
}



buttonNavRegistro.click(showFormCreate);
botonReg.click(crearUsuario);


buttonNavIngreso.click(showFormLogin);
botonIng.click(login);


buttonNavCloseSesion.click(cerrarSesionFunc);
