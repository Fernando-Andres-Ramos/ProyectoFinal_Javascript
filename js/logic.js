/*INICIALIZACION DE DOM */

formIngreso.style.display = "none";
formCrearUsuario.style.display="none";
buttonNavCloseSesion.style.display="none";
/*divFormsProductos.style.display = "none"
btnRegistro.style.display = "none"
tienda.style.display = "none"
cerrarSesion.style.visibility = "hidden"/*


/*FUNCIONES*/

/*Mostrar form de crear usuario */
const showFormCreate=()=>{formIngreso.style.display = "none";formCrearUsuario.style.display="block";}
/*Mostrar form de ingresar usuario */
const showFormLogin=()=>{formCrearUsuario.style.display="none";formIngreso.style.display="block";}



/*Crear usuarios nuevos */
const crearUsuario= (e)=>{
  e.preventDefault();
  let nombre = inputNombreReg.value;
  let clave = inputClaveReg.value;
  let tipo = inputTipoReg.value.toUpperCase();
  let passAdmin = inputClaveAdmin.value.toUpperCase();

  switch (tipo){
    case "SI":
      if (passAdmin==="JAVASCRIPT"){
        const usuario = new Usuario(nombre,clave,tipo);
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        validaciones.innerHTML = "Usuario registrado con éxito";
        validaciones.style.color="darkgreen";
      }
      else{
        validaciones.innerHTML = "Usted no es un administrador";
        validaciones.style.color="red";
      }
      break;
    
    case "NO":
      const usuario = new Usuario(nombre,clave,tipo);
      usuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      validaciones.innerHTML = "Usuario registrado con éxito";
      validaciones.style.color="darkgreen";
      break;

    default:
      validaciones.innerHTML = "Escriba SI o NO en la opcion de administrador";
      validaciones.style.color="red";
      break;
  }

  inputNombreReg.value = '';
  inputClaveReg.value = '';
  inputTipoReg.value='';
  inputClaveAdmin.value='';
  formCrearUsuario.style.display="none";

  setTimeout(() => {
    validaciones.innerHTML = ""
  }, 3000
  )
}

/*Logear usuario */
const login = (e) => {
  e.preventDefault();
  let nombreUsuario=inputNombreIng.value;
  let claveUsuario=inputClaveIng.value;
  if(localStorage.getItem("usuarioLogueado")){
  nombreUsuario = JSON.parse(localStorage.getItem("usuarioLogueado")).nombre
  claveUsuario = JSON.parse(localStorage.getItem("usuarioLogueado")).clave
  }
  
  const chequeoUsuario = usuarios.find(usuario=>usuario.nombre===nombreUsuario);

  if (chequeoUsuario) {

    validaciones.innerHTML = "";

    if (claveUsuario === chequeoUsuario.clave) {
    
      localStorage.setItem("usuarioLogueado",JSON.stringify(chequeoUsuario))
      tiempoUsuario = new Date().getTime()

      if (chequeoUsuario.tipoUsuario === "SI") {
        buttonNavIngreso.style.display = "none";
        buttonNavRegistro.style.display="none";
        formIngreso.style.display = "none";
        buttonNavCloseSesion.style.display="block";
        
        // completarSelect()
      } 
    
      else {
      document.getElementById("titulo").innerHTML = `<h2>Bienvenidx ${chequeoUsuario.nombre.toUpperCase()},
                                                    Estas son las noticias actuales</h2>`;
      buttonNavIngreso.style.display = "none";
      buttonNavRegistro.style.display="none";
      formIngreso.style.display = "none";
      formCrearUsuario.style.display="none";
      buttonNavCloseSesion.style.display="block";
      console.log(chequeoUsuario.nombre);
      mostrarNoticias();
      }

    } 
  
    else {
    validaciones.innerHTML = "La clave ingresada es incorrecta"
    validaciones.style.color = "red"
    }

  } 
  else {
  validaciones.innerHTML = "El usuario no esta registrado"
  validaciones.style.color = "red"
  }
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

  buttonNavIngreso.style.display = "none";
  buttonNavRegistro.style.display="none";
  formIngreso.style.display = "none";
  formCrearUsuario.style.display="none";
  buttonNavCloseSesion.style.display="block";
  seccionPublicaciones.style.display="block";
  if(noticias.length==0){
    seccionPublicaciones.innerHTML = `<br><br><br><p>Sin publicaciones, disculpe las molestias</p>`;
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
  formIngreso.style.display = "none";
  formCrearUsuario.style.display="none";
  buttonNavCloseSesion.style.display="none";
  buttonNavIngreso.style.display = "inline-block";
  buttonNavRegistro.style.display="inline-block";
  document.getElementById("titulo").innerHTML = "";
  document.getElementById("publicaciones").innerHTML="";
	localStorage.removeItem("usuarioLogueado");
}



buttonNavRegistro.addEventListener("click",showFormCreate);
botonReg.addEventListener("click",crearUsuario);


buttonNavIngreso.addEventListener("click",showFormLogin);
botonIng.addEventListener("click",login);


buttonNavCloseSesion.addEventListener("click",cerrarSesionFunc);
