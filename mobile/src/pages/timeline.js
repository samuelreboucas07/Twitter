import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import api from '../services/api';
import Tweet from '../componentes/Tweet';
import socket from 'socket.io-client';

export default class Timeline extends React.Component{
    static navigationOptions = ({navigation}) => ({    
        title: 'Inicio',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center'},

        headerLeft: null,
        headerRight:(
        <TouchableOpacity onPress={()=>navigation.navigate('New')}>    
        <Icon 
        style={{ marginRight: 20 }}
        name="add-circle-outline"
        size={24}
        color="#4BB0EE"
        />
        </TouchableOpacity>
        )
    })
    state = {
        tweets:[]
    };

    async componentDidMount(){
        this.subscribeToEvents();
        const response = await api.get('tweets');
        this.setState({tweets: response.data});
    }

    subscribeToEvents = () => {
        const io = socket('http://192.168.0.107:3000');
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


    render(){
        return(
            <View style={styles.container}>
            <FlatList
            data={this.state.tweets}
            keyExtractor={tweet => tweet._id}
            renderItem ={({ item }) => <Tweet tweet={item}/>}
            />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#FFF"
    }
});