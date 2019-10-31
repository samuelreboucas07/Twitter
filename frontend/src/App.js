import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import login from './pages/login';
import timeline from './pages/Timeline';

class App extends Component {
  render() {
    return (
    <BrowserRouter>
    {/* Garantir que apenas uma rota seja chaada toda vez que o usuário estiver em uma rota diferente */}
    <Switch>
      {/* Roteamento funcionando */}
    <Route path="/" exact component={login}/>  
    <Route path="/timeline" component={timeline}/>       
    </Switch>
    </BrowserRouter>
    );
  }
}

export default App;
