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

const primerasNoticias = [{fecha:new Date(),titulo:"Masajes deportivos",texto:"Nuevos tipos de masajes"},
                          {fecha:new Date(), titulo:"Promos!", texto: "Podes canjear esta promo"},
                          ];



localStorage.setItem("noticias",JSON.stringify(primerasNoticias));



const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const noticias = JSON.parse(localStorage.getItem("noticias")) || [];


