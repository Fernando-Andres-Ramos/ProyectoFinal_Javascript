<?php
  $destinatario = 'fernando.andres.ramos94@gmail.com';
  $nombre=$_POST['nombre_apellido'];
  $email=$_POST['email'];
  $telefono=$_POST['phone'];
  $mensaje=$_POST['floatingTextarea2'];

  $asunto="Correo de prueba";
  $header = "Enviado desde la pagina de esteticaramos";
  $mensajeCompleto = "Nombre y apellido: " . $nombre ."\nemail: ".$email. "\n telefono: ".$telefono. "\nAsunto: ".$mensaje. "\n";

  mail($destinatario,$asunto,$mensajeCompleto,$header);
  echo "<script>alert('Correo enviado exitosamente')</script>";
  echo "<script>setTimeout(\"location.href='Contacto.html'\",1000)</script>";
?>