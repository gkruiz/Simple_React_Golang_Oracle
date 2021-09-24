import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login } from './Login.js';
import { Recup1 } from './Recup.js';
import { Vusuario1 } from './Vusuario.js';
import { VUPerfil1 } from './VistasUsuario/VUPerfil.js';
import { VURegistro1 } from './VistasUsuario/VURegistro.js';
import { VUMembresia1 } from './VistasUsuario/VUMembresia.js';


import { Vadministrador1 } from './Vadministrador.js';
import { VAtemporada1 } from './VistasAdministrador/VAtemporadas.js';



export const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
  <Route exact path='/' component={Login}></Route>
	<Route exact path='/Recuperar' component={Recup1}></Route>
	<Route exact path='/Vusuario' component={Vusuario1}></Route>
	<Route exact path='/VUPerfil' component={VUPerfil1}></Route>
	<Route exact path='/VURegistro' component={VURegistro1}></Route>
	<Route exact path='/VUMembresia' component={VUMembresia1}></Route>

	<Route exact path='/Vadministrador' component={Vadministrador1}></Route>
  <Route exact path='/VAtemporadas' component={VAtemporada1}></Route>



      //<Route exact path='/signup' component={Login}></Route>
    </Switch>
  );
}




