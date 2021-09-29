/*INICIALIZACION DE DOM */

formIngreso.style.display = "none";
formCrearUsuario.style.display="none";
showCloseSesion.style.display="none";
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
const login = () => {
  nombreUsuario=inputNombreIng;
  claveUsuario=inputClaveIng;
  console.log(nombreUsuario);
  console.log(claveUsuario);
  if(localStorage.getItem("usuarioLogueado")){
  nombreUsuario = JSON.parse(localStorage.getItem("usuarioLogueado")).nombre
  claveUsuario = JSON.parse(localStorage.getItem("usuarioLogueado")).clave
}
  
const chequeoUsuario = usuarios.find(usuario=>usuario.nombre===nombreUsuario);
console.log(chequeoUsuario);

if (chequeoUsuario) {

  validaciones.innerHTML = "";

  if (claveUsuario === chequeoUsuario.clave) {
    
    localStorage.setItem("usuarioLogueado",JSON.stringify(chequeoUsuario))
    tiempoUsuario = new Date().getTime()

    if (chequeoUsuario.tipoUsuario === "SI") {
      formIngreso.style.display = "none";
      formCrearUsuario.style.display="none";
      showCloseSesion.style.display="block";
      /*completarSelect()
      formLogin.style.display = "none"
      divFormsProductos.style.display = "flex"
      cerrarSesion.style.visibility = "visible"
      */
    } 
    
    else {
      /*document.getElementById("titulo").innerHTML = `<h1>Bienvenidx ${chequeoUsuario.nombre.toUpperCase()} </h1>`
      renderizarTienda()
      cerrarSesion.style.visibility = "visible"*/
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
const mostrarNoticias=()=>{
  if(noticias != []){
    for(const noticia of noticias){
      const contenedor = document.getElementById("publicaciones")
      contenedor.innerHTML += `<h3>Titulo:${noticia.titulo}</h3>
                              <br>
                              <p>Fecha:${noticia.fecha}</p>
                              <br>
                              <p>${noticia.texto}</p>
                              <br><br>`;  
    }
  }
}



showRegistro.addEventListener("click",showFormCreate);
botonReg.addEventListener("click",crearUsuario);


showIngreso.addEventListener("click",showFormLogin);
botonIng.addEventListener("click",login);