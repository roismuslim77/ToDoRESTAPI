import React, {Component} from 'react';
import { View, Text, TextInput, FlatList, Button, TouchableHighlight } from 'react-native';
import {Header, Body, Title, Right, Left} from 'native-base';
import axios from 'axios';

export default class Index extends Component{
    constructor(){
        super()
        this.state={
            text: '',
            id: 0,
            items: [],
            btntext: 'Save',
            dataUp: ''
        }
    }

    componentDidMount(){
        axios.get('https://apps-todos.herokuapp.com/todoapp')
        .then((res)=>{
            this.setState({items: res.data})
        })  
        .catch((err)=>alert(err)) 
    }

    handleAdd(){
      if(this.state.btntext=='Save'){
        if(this.state.text.length>0){
            axios({
                method: 'post',
                url: 'https://apps-todos.herokuapp.com/todoapp/new',
                data: {
                  title: this.state.text,
                  details: ' '
                }
              })
            .then(this.componentDidMount())
            .then(this.textInput.clear())
            .then(this.setState({text: ''}))
            .catch((err)=>alert(err))
        } else{
            alert('Please type your list')
        }
     } else {
        urldata = 'https://apps-todos.herokuapp.com/todoapp/'+this.state.id+'/up'
        axios.put(urldata, {title: this.state.text})
        .then( res =>{
            this.componentDidMount();
            this.setState({
                btntext: 'Save',
                id: 0,
                text: ''
            })
        })
     }
    }

    handleDelete (id){
        axios.delete('https://apps-todos.herokuapp.com/todoapp/'+ id +'/del')
        .then(this.componentDidMount())
        .then(alert('Succes Deleted'))
        .then(this.setState({text: ''}))
    }

    handleUpdate(idUp, title){
        this.setState({
            text: title,
            btntext: 'Update',
            id: idUp
        })
    }

    render(){
        return(
            <View>
              <Header style={{height: 40, backgroundColor: '#6ef442'}}>
                <Left/>
				<Body><Title style={{fontWeight: 'bold', marginLeft: 5}}>TO DO APP</Title></Body>
              </Header>
              <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>                
                <TextInput value={this.state.text} ref={input => { this.textInput = input }} style={{borderBottomWidth: 0.3, width: 280, height: 35, marginRight: 15}} onChangeText={(text)=>this.setState({text})}/>
                <Button
					style={{}}
                    title={this.state.btntext}
                    color='#6ef442'
                    onPress={()=>this.handleAdd()}/>
              </View>
                <FlatList
					inverted
                    data={this.state.items}
                    style={{marginLeft: 10, marginRight: 10, marginTop: 5}}
                    renderItem={({item, index})=><TouchableHighlight onPress={()=>this.handleUpdate(item._id, item.title)} onLongPress={()=>this.handleDelete(item._id)}>
                    <Text style={{borderBottomWidth: 0.3, borderBottomColor: 'grey', marginBottom: 5}}>{item.title}</Text>
                    </TouchableHighlight>}
                    />
            </View>
        )
    }
}

