import React, {useState} from 'react';
import Axios from 'axios';
import './css/VURegistro.css';

var glo="";

export const Posts =   function Posts() {
   var username = document.getElementById("campo_usuario").value;
   var nombre = document.getElementById("campo_nombre").value;
   var apellido = document.getElementById("campo_apellido").value;
   var tier = document.getElementById("campo_tier").value;
   var fecha_nacimiento = document.getElementById("campo_fecha_nacimiento").value;
   var correo_electronico = document.getElementById("campo_correo_electronico").value;
  var camcontra = document.getElementById("campo_contrasena").value;
   var foto = document.getElementById("campo_foto").value;
	
	let file = document.getElementById("campo_foto").files[0];
    	const reader = new FileReader();
    
   

console.log("Username:"+username);
console.log("nombre:"+nombre);
console.log("apellido:"+apellido);
console.log("tier:"+tier);
console.log("contra:"+camcontra);
console.log("nacimiento:"+fecha_nacimiento);
console.log("correo:"+correo_electronico);



	//INICIA ENVIAR INFOMRACION DE REGISTRO
      reader.onloadend = () => {

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ 
			usuario: username,
			nombrex:nombre,
			apellidox:apellido,
			tierx:tier,
			fecha_nacimientox:fecha_nacimiento,
			correo_electronicox:correo_electronico,
			photox:reader.result,
			passwordx:camcontra
		 })
	    };
	
	fetch('http://127.0.0.1:5555/RegistraUsuario', requestOptions)
        .then(response => response.text())
        .then((response) => {
            console.log(response)
        });


     //console.log(reader.result);
    };
    reader.readAsDataURL(file);


   
    
  
   
}




export const VURegistro1 =  function VURegistro(props) {
  return (
    <div id='VURegistro1'>
    		
				<table id='tabla6' border="0px">
					<tr id="filab1">
					<td id="columnab3" colsPan="2">
						Registro de Usuario
					
					</td>
					</tr>

					<tr id="filab1">
					<td id="columnab3">
						Username:
					</td>
					<td>
						<input type="text" name="campo_usuario" id="campo_usuario" />
					</td>
					</tr>

					<tr id="filab1">
					<td id="columnab3">
						Nombre:
					</td>
					<td>
						<input type="text" name="campo_nombre" id="campo_nombre"/>
					</td>
					</tr>

					<tr id="filab1">
					<td id="columnab3">
						Apellido:
					</td>
					<td>
						<input type="text" name="campo_apellido" id="campo_apellido"/>
					</td>
					</tr>

					<tr id="filab1">
					<td id="columnab3">
						Tier:
					</td>
					<td>
						<input type="text" name="campo_tier" id="campo_tier"/>
					</td>
					</tr>

					<tr id="filab1">
					<td id="columnab3">
						Fecha Nacimiento:
					</td>
					<td>
						<input type="date" name="campo_fecha_nacimiento" id="campo_fecha_nacimiento"/>
					</td>
					</tr>


					<tr id="filab1">
					<td id="columnab3">
						Correo Electronico:
					</td>
					<td>
						<input type="text" name="campo_correo_electronico" id="campo_correo_electronico"/>
					</td>
					</tr>
					<tr id="filab1">
					<td id="columnab3">
						Contrasena:
					</td>
					<td>
						<input type="password" name="campo_contrasena" id="campo_contrasena"/>
					</td>
					</tr>
					<tr id="filab1">
					<td id="columnab3">
						Seleccione una Foto:
					</td>
					<td>
						<input type="File" name="campo_foto" id="campo_foto" />
						
					</td>
					</tr>
					<tr id="filab1">
					<td id="columnab3" colspan="2">
						<input type="submit" value="Guardar Cambios" onClick={Posts}/>
					</td>
					</tr>


				</table>
			
	</div>
	
  );
}



function getBase64(file, onLoadCallback) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() { resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}




