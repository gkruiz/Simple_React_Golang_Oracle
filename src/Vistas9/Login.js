import React from 'react';
import './css/Login.css';


export const Loguearse =   function Loguearse() {
   var usuario = document.getElementById("campo_usuario").value;
   var contrasena = document.getElementById("campo_contrasena").value;


console.log("usuario:"+usuario);
console.log("contrasena:"+contrasena);


   const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
		usuario1: usuario,
		contrasena1:contrasena
	 })
    };
	
    	
	fetch('http://127.0.0.1:5555/Loguearse', requestOptions)
        .then(response => response.text())
        .then((response) => {
            console.log(response)
	    
		if(response=="error"){
			alert("El usuario o la contrasena estan incorrectos!");
		}else{
			//document.cookie = "userId=nick123"
console.log(response.length);
			var regre = JSON.parse(response)
			var id=regre.id
			//var usuario=regre.id
			//var contrasena=regre.id
			var nombre=regre.nombre
			var apellido=regre.apellido
			var tier=regre.tier
			var fecha_nacimiento=regre.fecha_nacimiento
			var fecha_registro=regre.fecha_registro
			var correo_electronico=regre.correo_electronico
			//var foto=regre.id

			document.cookie = "id="+id
			document.cookie = "usuario="+usuario
			document.cookie = "password="+contrasena
			document.cookie = "nombre="+nombre
			document.cookie = "apellido="+apellido
			document.cookie = "tier="+tier
			document.cookie = "fecha_nacimiento="+fecha_nacimiento
			document.cookie = "fecha_registro="+fecha_registro
			document.cookie = "correo_electronico="+correo_electronico
			
			if(usuario=="Administrador9"){
				window.location = 'http://localhost:3000/Vadministrador';
			}else{
				window.location = 'http://localhost:3000/Vusuario';
			}

			
			
			console.log("ID:"+id);
		}
        });
console.log("-----");
console.log(getCookieValue("usuario"));
    
   console.log("entro ni idea");



   
}

function getCookieValue(name) {
  let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
  return result ? result.pop() : ""
}


export const Login =  function Login(props) {
  return (
    <div id='Login1'>
    		
		<table id='tabla1'>
			<tr>
			<td colspan="2" >
				<p id="titi1">Login TodoDeporteGT</p>
			</td>
			</tr>
			<tr>
			<td>
				Usuario:
			</td>
			<td>
				<input type="text" id="campo_usuario"/>
			</td>
			</tr>

			<tr>
			<td>
				Contrasena:
			</td>
			<td>
				<input type="password" id="campo_contrasena"/>
			</td>
			</tr>

			<tr>
			<td colspan="2">
				<input type="submit" value="Ingresar" onClick={Loguearse}/>
			</td>
			</tr>

			<tr>
			<td colspan="2">
				<a href="http://localhost:3000/Recuperar" id="rpc">Recuperar Contrasena</a>
			</td>
			</tr>


		</table>
	</div>
	
  );
}







