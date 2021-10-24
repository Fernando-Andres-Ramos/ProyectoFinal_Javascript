/*Clases de objetos a utilizar*/
class Usuario {
  constructor (nombre,clave,tipoUsuario){
    this.nombre=nombre;
    this.clave=clave;
    this.tipoUsuario=tipoUsuario;
  }
}

class Publicacion{
  constructor(fecha,titulo,texto){
    this.fecha = fecha;
    this.titulo= titulo;
    this.texto = texto;
  }
}


const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const noticias = JSON.parse(localStorage.getItem("noticias")) || [];
