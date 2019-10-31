import React, {Component} from 'react';
import './Login.css';
import twitterLogo from '../twitter.svg';
export default class Login extends Component{
    state = {
        username:'',
    };
    // Funções não nativas do react são criadas
    // no padrão arrow functions, para poder usar o this como referência da classe
    handleInputChange = (e) => {
        this.setState({
            username: e.target.value
        });
    };

    handleSubmit = (e) =>{
        // Ao dar um submit no form a tendencia é redirecionar para outra pagina
        // por isso é interessante bloquear essa ação
        e.preventDefault();
        
        const {username} = this.state;
        // Caso o nome não estiver preenchido, não redireciona
        if (!username.length) return;

        localStorage.setItem('@goTwitter:username', username);
        this.props.history.push('/timeline');
    };

    render(){
        return(
            <div className="login-wrapper">
            <img src ={twitterLogo} alt="goTwitter"></img>
            <form onSubmit={this.handleSubmit}>
                <input
                value={this.state.username}
                onChange = {this.handleInputChange} 
                placeholder="Nome de usuário"
                />
                <button type ="submit">Entrar</button>
                
            </form>
            
            </div>
        ); 
    }
}
