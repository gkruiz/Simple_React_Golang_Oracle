import React from 'react';
import './css/Recup.css';


export const EnvRinfo =   function EnvRinfo() {
   var correo = document.getElementById("campo_correo").value;

console.log("Campo_Correo:"+correo);


   const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
		correo1: correo
	})
    };
	
    
	fetch('http://127.0.0.1:5555/RecuperarContrasena', requestOptions)
        .then(response => response.text())
        .then((response) => {
            console.log(response)
        });
    
   console.log("entro ni idea");
   
}






export const Recup1 =  function Recup1(props) {
  return (
    <div id='Recup1'>
    		
		<table id='tabla2'>
			<tr>
			<td colspan="2">
				Recuperar Contrasena
			</td>
			</tr>
			<tr>
			<td>
				Ingrese su Correo:
			</td>
			<td>
				<input type="email" id="campo_correo"/>
			</td>
			</tr>

			<tr>
			<td colspan="2">
				<input type="submit" value="Recuperar" onClick={EnvRinfo}/>
			</td>
			</tr>

		</table>
	</div>
	
  );
}







