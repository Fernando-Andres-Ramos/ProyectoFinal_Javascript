/*FUNCIONES*/
const limpiarPantalla=()=>{
  formIngreso.css("display","none");
  formCrearUsuario.css("display","none");
  administrador.css("display","none");
  seccionPublicaciones.css("display","none");
  validaciones.css("display","none");
  bienvenida.css("display","none");
}


/*Mostrar form de crear usuario */
const showFormCreate=()=>{
  limpiarPantalla();
  formCrearUsuario.css("display","block");
  formCrearUsuario.addClass("animate__animated animate__fadeInLeft");
  setTimeout(() => {
    formCrearUsuario.removeClass("animate__animated animate__fadeInLeft");
  },1000)
}

/*Mostrar form de ingresar usuario */
const showFormLogin=()=>{
  limpiarPantalla();
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
        validaciones.css({"color":"darkgreen","font-size":"30px"});
        animacion(cartel,formCrearUsuario);
      }
      else{
        validaciones.css({"color":"red","font-size":"30px"});
        cartel="Usted no es un administrador";
        animacion(cartel,formCrearUsuario);
      }
      break;
    
    case "NO":
      const usuario = new Usuario(nombre,clave,tipo);
      usuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      cartel="Usuario registrado con éxito";
      validaciones.css({"color":"darkgreen","font-size":"30px"});
      animacion(cartel,formCrearUsuario);
      break;

    default:
      validaciones.prepend("Escriba SI o NO en la opcion de administrador");
      validaciones.css({"color":"red","font-size":"30px"});
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
        bienvenida.prepend(`<h2>Bienvenidx ${chequeoUsuario.nombre.toUpperCase()},
                                        Este es el panel de noticias</h2>`);
        modificarNoticias();
      } 
    
      else {
      bienvenida.prepend(`<h2>Bienvenidx ${chequeoUsuario.nombre.toUpperCase()},
                                      Estas son las noticias actuales</h2>`);

      limpiarPantalla();
      buttonNavCloseSesion.css("display","block");
      mostrarNoticias();
      }

    } 
  
    else {
      validaciones.css({"color":"red","font-size":"30px"});
      cartel="La clave ingresada es incorrecta";
      animacion(cartel,formIngreso);
    }

  } 
  else {
    validaciones.css({"color":"red","font-size":"30px"});
    cartel="El usuario no esta registrado";
    animacion(cartel,formIngreso);
  }

  inputNombreIng.val('');
  inputClaveIng.val('');
}

/*Animaciones */
const animacion = (texto,animarSeccion)=>{
  validaciones.empty();
  validaciones.prepend(texto);
  animarSeccion.addClass("animate__animated animate__fadeOutLeft");
  setTimeout(() => {
    animarSeccion.hide(1000);
  },500)
  validaciones.delay(1500);
  validaciones.fadeIn(1000);
  validaciones.delay(1000);
  validaciones.fadeOut(1000);
  animarSeccion.removeClass("animate__animated animate__fadeOutLeft");
}

/*Elegir si se desea agregar o eliminar una noticia */
const modificarNoticias=()=>{
  limpiarPantalla();
  administrador.css({"display":"block","font-size":"26px","text-align":"center"});
  administrador.prepend(`<div class="row"><p class="col-12">¿Desea agregar o Eliminar noticias?</p></div>`);
  administrador.append(`<form class="row" id=modificarNoticias>
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
  limpiarPantalla();
  administrador.empty();
  administrador.append(`<form class="row col-6">
                          <input type="text" style="margin-bottom: 10px" name="titulo" placeholder="Titulo" id="tituloNoticia">
                          <input type="date" style="margin-bottom: 10px" name="fecha" placeholder="Fecha" id="fechaNoticia">
                          <textarea name="Texto" style="resize:none" placeholder="Texto" cols="30" rows="10" id="textoNoticia" ></textarea>
                          <button type="submit" value="Agregar" id="inputNoticia"class="btn btn-primary fs-3">Agregar</button>
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
    validaciones.append("Noticia/sección agregada");
    validaciones.css({"color":"green","font-size":"30px","margin-top":"15px"});
    validaciones.fadeIn(1000);
    validaciones.delay(1000);
    validaciones.fadeOut(1000);
  })
}


/*Eliminar articulos (noticias) */
const eliminarNoticia =()=>{
  limpiarPantalla();
  administrador.empty();
  administrador.append(`<form class="row" id="eliminarForm">
                          <h2 class="text-center mb-5">Eliminar Producto</h2>
                          <div class="mb-5 col-12 d-flex justify-content-center">
                            <label for="" class="form-label fs-3">Nombre</label>
                            <select name="" id="eliminarProductos"></select>
                          </div>
                          <button id="btnEliminar" type="submit" class="btn btn-primary fs-4">Eliminar</button>
                        </form>`); 


  // let deleteNoticias = noticias.filter(noticia => noticia.titulo != titulo);
  // localStorage.setItem("noticias",JSON.stringify(deleteNoticias));

  $("#eliminarProducto").val('');
	
  if(noticias != ""){

   for (let noticia of noticias) {
    let option = document.createElement("option");
    option.value = noticia.nombre;
    option.innerHTML = noticia.nombre;
    selectEliminarP.appendChild(option);
  }
    formProductoEliminar.style.display = "block"
 }
 else
  formProductoEliminar.style.display = "none"
}

/*Mostrar articulos (noticias) */
const mostrarNoticias = () => {

  limpiarPantalla();
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
  limpiarPantalla();
  buttonNavIngreso.css("display","inline-block");
  buttonNavRegistro.css("display","inline-block");
  buttonNavCloseSesion.css("display","none");
  administrador.empty();
  seccionPublicaciones.css("display","none");
  seccionPublicaciones.empty();
  $("#tituloBienvenida").empty();
	localStorage.removeItem("usuarioLogueado");
}

/*INICIALIZACION DE DOM */

limpiarPantalla();
buttonNavCloseSesion.css("display","none");
bienvenida.show(300);


buttonNavRegistro.click(showFormCreate);
botonReg.click(crearUsuario);


buttonNavIngreso.click(showFormLogin);
botonIng.click(login);


buttonNavCloseSesion.click(cerrarSesionFunc);
