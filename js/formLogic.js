const enviarForm = () => {
  $.ajax({
    url:'/Person/Edit/@Model.Id/',
    type:'post',
    data:$('#myForm').serialize(),
    success:function(){
        alert("worked");
    }
});
}

$("#formmulario").submit(enviarForm);