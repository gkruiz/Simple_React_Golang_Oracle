import React from 'react';
import Axios from 'axios';
import './css/VAtemporadas.css';



export const GuardaTemporada = function GuardaTemporada() {
   var fecha_inicio = document.getElementById("fecha_inicio").value;
   var fecha_final = document.getElementById("fecha_final").value;

	var ini_365=fechatonumber(fecha_inicio);
	var fin_365=fechatonumber(fecha_final);

	var sepa_ini=fecha_inicio.split("-");
	var sepa_fin=fecha_final.split("-");

	var anoInicio=parseInt(sepa_ini[0]);
	var anoFinal=parseInt(sepa_fin[0]);

	console.log(sepa_ini[0]);
	console.log(sepa_fin[0]);
	console.log(sepa_ini[1]);
	console.log(sepa_fin[1]);
	console.log(sepa_ini[2]);
	console.log(sepa_fin[2]);
	console.log(ini_365);
	console.log(fin_365);

    
	if((anoInicio<=anoFinal)&&(ini_365<fin_365)){

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ AnoIni: anoInicio,AnoFin:anoFinal,IniD:ini_365,FinD:fin_365,FI:fecha_inicio,FF:fecha_final })
			};
		
			fetch('http://127.0.0.1:5555/NuevaTemporada', requestOptions)
			.then(response => response.text())
			.then((response) => {
				console.log(response)
		  });

	}else{
		alert("La fecha inicio debe de ser anterior a fecha fin");
	}



  
	
    

}







function getCookieValue(name) {
  let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)")
  return result ? result.pop() : ""
}


function fechatonumber(fecha){

	var res = fecha.split("-");
	var ano=res[0];
    var mes=res[1];
	var dia=res[2];

	var dimen=0;

	switch(mes){
		case "01":
			dimen=parseInt(dia);
		break;
		case "02":
			dimen=31+parseInt(dia);
		break;
		case "03":
			dimen=31+28+parseInt(dia);
		break;
		case "04":
			dimen=31+28+31+parseInt(dia);
		break;
		case "05":
			dimen=31+28+31+30+parseInt(dia);
		break;
		case "06":
			dimen=31+28+31+30+31+parseInt(dia);
		break;
		case "07":
			dimen=31+28+31+30+31+30+parseInt(dia);
		break;
		case "08":
			dimen=31+28+31+30+31+30+31+parseInt(dia);
		break;
		case "09":
			dimen=31+28+31+30+31+30+31+30+parseInt(dia);
		break;
		case "10":
			dimen=31+28+31+30+31+30+31+30+31+parseInt(dia);
		break;
		case "11":
			dimen=31+28+31+30+31+30+31+30+31+30+parseInt(dia);
		break;
		case "12":
			dimen=31+28+31+30+31+30+31+30+31+30+31+parseInt(dia);
		break;
	}
	return dimen;
}







export const VAtemporada1 =  function VAtemporada1(props) {
  return (
    <div id='VAtemporada1'>
    		
		
				<table id='VAttabla5' border="1px">
			
					<tr id="VAtfilab1">
					<td id="VAtcolumnab3">
						Finalizar Temporada:
					</td>
					<td>

					</td>
					</tr>

					<tr id="VAtfilab1">
					<td id="VAtcolumnab3">
						Temporada:
					</td>
					<td>
						<select id="TemporadaSelect">
								<option >a</option>
								<option >b</option>
						</select>
						<input type="submit" value="Finalizar" />
					</td>
					</tr>



					<tr id="VAtfilab1">
					<td id="VAtcolumnab3">
						Nueva Temporada:
					</td>
					<td>
						
						
						
					</td>
					</tr>

					<tr id="VAtfilab1">
					<td id="VAtcolumnab3">
						Inicio:
					</td>
					<td>
					<input type="date"  id="fecha_inicio" />
					</td>
					</tr>

					<tr id="VAtfilab1">
					<td id="VAtcolumnab3">
						Final:
					</td>
					<td>
					<input type="date"  id="fecha_final" />
						<input type="submit" value="Guardar" onClick={GuardaTemporada}    />
					</td>
					</tr>

				
					<tr id="VAtfilab1">
					<td id="VAtcolumnab3" colspan="2">
						
					</td>
					</tr>


				</table>
			
	</div>
	
  );
}







