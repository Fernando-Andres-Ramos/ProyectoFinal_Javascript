<?php
  $destinatario = 'fernando-ramos94@hotmail.com';
  $nombreErr = $emailErr = $telefonoErr = "" ;
  $nombre = $email = $telefono=  $mensaje= "" ;


  function validar_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
  }

  if ($_SERVER["REQUEST_METHOD"] == "POST") {

    //Verificar y validar nombre
    if($_POST['nombre_apellido'] == preg_replace('([^A-Za-z])', ' ', $_POST['nombre_apellido'])){
      $nombre = validar_input($_POST['nombre_apellido']);
    }
    else{
      $nombreErr = "Por favor, no utilice numeros ni caracteres especiales en tu nombre";
    } 

    //Verificar y validar 
    
    $email = validar_input($_POST['email']); 
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
      $emailErr = "Formato de email invalido"; 
    }


    //Verificar y validar telefono
    if($_POST['phone'] == preg_replace('([^0-9-+])','', $_POST['phone'])){
      $telefono = $_POST['phone'];
    }
    else{
      $telefonoErr = "Por favor, solo coloque numeros en este campo";
    }


    //Verificar y validar nombre
    $mensaje = validar_input($_POST['floatingTextarea2']);
    

    $asunto="Consulta a Estetica.Ramos";
    $header = "Enviado desde la pagina de esteticaramos";
    $mensajeCompleto = "Nombre completo: " . $nombre ."\n\nEmail: ".$email. "\n\nTelefono: ".$telefono. "\n\nAsunto: ".$mensaje. "\n";
  
    if (empty($nombreErr) and empty($emailErr) and empty($telefonoErr)) {
      mail($destinatario,$asunto,$mensajeCompleto,$header);
      echo "<script>alert('Correo enviado exitosamente')</script>";
      echo "<script>setTimeout(\"location.href='Contacto.html'\",1000)</script>";
    }
    else{
      echo "<script>alert('Correo no enviado')</script>";
      echo "<script>setTimeout(\"location.href='Contacto.html'\",1000)</script>";
    }
  } 
?>