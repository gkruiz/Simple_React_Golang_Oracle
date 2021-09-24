import React from 'react';
import './css/Vadministrador.css';


function sessval(){
	var cooks=getCookieValue("usuario");
	if(cooks!="Administrador9" && cooks!=""){
		window.location = 'http://localhost:3000/Vusuario';
	}else if(cooks==""){
		window.location = 'http://localhost:3000/';
	}


}


function getCookieValue(name) {
	let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
	return result ? result.pop() : ""
}


export const Vadministrador1 =  function Vadministrador1(props) {
  return (
    <div id='Vadministrador1' onload={sessval()}>
    		
		<table id='tabla7' border="1px">
			
			<tr id="VAfilaa1">
			<td>
				<a href="http://localhost:3000/Vadministrador" id="logoa1">Logo</a>
			</td>
			<td>
				<a href="#" target="frame" class="VAmenua1">CargaMasiva</a>
			</td>
			<td>
				<a href="http://localhost:3000/VAtemporadas" target="frame" class="VAmenua1">Temporadas</a>
			</td>
			<td>
				<a href="#" class="VAmenua1">Jornadas</a>
			</td>
			<td>
				<a href="#" class="VAmenua1">Eventos</a>
			</td>
			<td>
				<a href="#" class="VAmenua1">Deportes</a>
			</td>
			<td>
				<a href="#" class="VAmenua1">Recompensas</a>
			</td>
			<td>
				<a href="#" class="VAmenua1">Reportes</a>
			</td>
			</tr>



			<tr id="filaa2">
			<td colspan="8" >
				<iframe id="VAframea1" name="frame"></iframe>

			</td>
			</tr>

			<tr id="VAfilaa3">
			<td colspan="8">
				Pie Pagina
			</td>
			</tr>

		</table>
	</div>
	
  );
}







