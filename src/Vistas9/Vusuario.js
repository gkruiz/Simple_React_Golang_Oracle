import React from 'react';
import './css/Vusuario.css';

export const Vusuario1 =  function Vusuario1(props) {
  return (
    <div id='Vusuario1'>
    		
		<table id='tabla3' border="1px">
			
			<tr id="filaa1">
			<td>
				<a href="http://localhost:3000/Vusuario" id="logoa1">Logo</a>
			</td>
			<td>
				<a href="http://localhost:3000/VUPerfil" target="frame" class="menua1">Perfil</a>
			</td>
			<td>
				<a href="http://localhost:3000/VUMembresia" target="frame" class="menua1">Membresia</a>
			</td>
			<td>
				<a href="#" class="menua1">Eventos</a>
			</td>
			<td>
				<a href="#" class="menua1">Recompensas</a>
			</td>
			<td>
				<a href="#" class="menua1">Extras</a>
			</td>
			</tr>
			<tr id="filaa2">
			<td colspan="6" >
				<iframe id="framea1" name="frame"></iframe>

			</td>
			</tr>

			<tr id="filaa3">
			<td colspan="6">
				Pie Pagina
			</td>
			</tr>

		</table>
	</div>
	
  );
}







