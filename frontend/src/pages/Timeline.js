import React, {Component} from 'react';
import twitterLogo from '../twitter.svg';
import './Timeline.css';
import api from '../services/api';
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';
export default class Timeline extends Component{
    state={
        tweets: [],
        newTweet: ''
    };

    // Método carrego assim que a pagina for iniciada
    async componentDidMount(){
        this.subscribeToEvents();
        const response = await api.get('tweets');
        this.setState({tweets: response.data});
    }
    // Transformando as atualização na tela em tempo real
    // instalar socket.io-client
    subscribeToEvents = () => {
        const io = socket('http://localhost:3000');
        // conceito de imutabilidade, criar outra variável ao invés de modificar variável existente
        // ... = pegar todos os elementos
        io.on('tweet', data =>{
            this.setState({tweets: [data, ...this.state.tweets]})
        });
        io.on('like', data=>{
            // Percorrendo todos os tweets
            this.setState({tweets: this.state.tweets.map( tweet =>
                // Verificando qual tweet tem id igual ao curtido e retornando o tweet modificado
                tweet._id === data._id ? data : tweet


            )})
        });
    }

    handleInputChange=(e) =>{
        this.setState({newTweet: e.target.value});
    };

    hadleNewTweet = async (e) =>{
        if (e.keyCode !== 13) return;

        const content = this.state.newTweet;
        const author = localStorage.getItem('@goTwitter:username');
        await api.post('tweets', {content, author});
        this.setState({newTweet: ' '});
    }

    render(){
        return (
            <div className="timeline-wrapper">
            <img height={24} src={twitterLogo} alt="goTwitter"/>
            <form>
                <textarea
                value={this.state.newTweet}
                onChange={this.handleInputChange}
                onKeyDown={this.hadleNewTweet}
                placeholder = "O que está acontecendo?"
                />
            </form>
            <ul className="tweet-list">
                {this.state.tweets.map(tweet => (
                    <Tweet key={tweet._id} tweet = {tweet}/>
                    ))}
            </ul>
            </div>
        );
    }
}

