import React from 'react';
import Axios from 'axios';
import './css/VUMembresia.css';



export const Posts =   function Posts() {
   var usuario = document.getElementById("campo_usuario").placeholder;
   var nombre = document.getElementById("campo_nombre").value;
   var apellido = document.getElementById("campo_apellido").value;
   var tier = document.getElementById("campo_tier").value;
   var fecha_nacimiento = document.getElementById("campo_fecha_nacimiento").value;
   var correo_electronico = document.getElementById("campo_correo_electronico").value;
   var new_pass = document.getElementById("campo_nueva_contrasena").value;
   var old_pass = document.getElementById("campo_vieja_contrasena").value;
   

   if(nombre==""){
	nombre = document.getElementById("campo_nombre").placeholder;
   }
   if(apellido==""){
	apellido = document.getElementById("campo_apellido").placeholder;
   }
   if(tier==""){
	tier = document.getElementById("campo_tier").placeholder;
   }
   if(fecha_nacimiento==""){
	fecha_nacimiento = document.getElementById("vista").value;
   }
   if(correo_electronico==""){
	correo_electronico = document.getElementById("campo_correo_electronico").placeholder;
   }



  var com1 = usuario!="";
  var com2 = nombre!="";
  var com3 = apellido!="";
  var com4 = tier!="";
  var com5 = fecha_nacimiento!="";
  var com6 = correo_electronico!="";
  var com7 = new_pass!="";
  var com8 = old_pass!="";

 console.log("---dataI")
 console.log(usuario)
 console.log(nombre)
 console.log(apellido)
 console.log(tier)
 console.log(fecha_nacimiento)
 console.log(correo_electronico)
 console.log(new_pass)
 console.log(old_pass)
 console.log("---dataf")

  if(com1 && com2 && com3 && com4 && com5 && com6){

	if(com7 && com8){
	//si  hace cambio de contrasena
		if(old_pass==getCookieValue("password")){
			    const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ usuariox: usuario,nombrex:nombre,apellidox:apellido,tierx:tier,fecha_nacimientox:fecha_nacimiento,correo_electronicox:correo_electronico,new_passx:new_pass,cambio:1 })
			    };

			    fetch('http://127.0.0.1:5555/updateInfo', requestOptions)
				.then(response => response.text())
				.then((response) => {
				    console.log(response)
				});
		modiCookies(new_pass,nombre, apellido,tier,fecha_nacimiento,correo_electronico)
		}else{
		alert("La contrasena antigua no coincide!");

		}


	}else if(com7 && (!com8)){
		alert("Debe ingresar la contrasena anterior para hacer el cambio!");	
	}else{
	//no hace cambio de contrasena
	    const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ usuariox: usuario,nombrex:nombre,apellidox:apellido,tierx:tier,fecha_nacimientox:fecha_nacimiento,correo_electronicox:correo_electronico,new_passx:new_pass,cambio:0 })
	    };

	    fetch('http://127.0.0.1:5555/updateInfo', requestOptions)
		.then(response => response.text())
		.then((response) => {
		    console.log(response)
		});
	modiCookies(getCookieValue("password"),nombre, apellido,tier,fecha_nacimiento,correo_electronico)

	}




  }else{

	alert("No pueden quedar campos vacios!");
  }

   
	
    
	
    
   console.log("entro ni idea");
    

}


function modiCookies(contrasena,nombre, apellido,tier,fecha_nacimiento,correo_electronico){
			document.cookie = "password="+contrasena
			document.cookie = "nombre="+nombre
			document.cookie = "apellido="+apellido
			document.cookie = "tier="+tier
			document.cookie = "fecha_nacimiento="+fecha_nacimiento
			document.cookie = "correo_electronico="+correo_electronico

}




function imagenR(){

   var inputVal = getCookieValue("usuario");
   const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: inputVal })
    };
	
	fetch('http://127.0.0.1:5555/getImage', requestOptions)
        .then(response => response.text())
        .then((response) => {
		console.log(response)
		var inputNombre = document.getElementById("fotoM");
    		inputNombre.src = response;
            
        });

	return "Imagen";
}


function getCookieValue(name) {
  let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
  return result ? result.pop() : ""
}



export const VUMembresia1 =  function VUMembresia1(props) {
  return (
    <div id='VUPerfil1'>
    		
		
				<table id='tabla5' border="1px">
			
					<tr id="filab1">
					<td id="columnab3">
						Seleccione Membresia:
					</td>
					<td>

						<select name="subject" >
						<option value="Gold">Gold</option>
						<option value="Silver">Silver</option>
						<option value="Bronce">Bronce</option>
						</select>
					</td>
					</tr>

					<tr id="filab1">
					<td id="columnab3">
						Introduzca la fecha:
					</td>
					<td>
						<input type="date" name="vista" id="vista" />
					</td>
					</tr>

					<tr id="filab1">
					<td id="columnab3">
						Apellido:
					</td>
					<td>
						<input type="text" name="campo_apellido" id="campo_apellido"   placeholder={getCookieValue("apellido")}/>
					</td>
					</tr>

					<tr id="filab1">
					<td id="columnab3">
						Tier:
					</td>
					<td>
						<input type="text" name="campo_tier" id="campo_tier" placeholder={getCookieValue("tier")}/>
					</td>
					</tr>

					<tr id="filab1">
					<td id="columnab3">
						Fecha Nacimiento:
					</td>
					<td>
						

<input type="date" name="campo_fecha_nacimiento" id="campo_fecha_nacimiento" />
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







