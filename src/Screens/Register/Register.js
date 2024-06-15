import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import { auth } from '../../firebase/config'

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'',
            password:'',
            email:'',
            miniBio: '',
            profilePic: '',
            error: '',

        }
    }

    componentDidMount(){
        console.log("hizo el did mount y estas son sus props");
        console.log(this.props);
    }

    onSubmit(name, email, password){
        if(
            name === null || name === '' || name.length < 5
        ){
            this.setState({error: 'El name no puede ser menor de 5 caracteres'})
            return false
        }
        if(
            email === null || email === '' || !email.includes('@')
        ){
            this.setState({error: 'El email tiene un formato invalido'})
            return false
        }
        if(

            password === null || password === '' || password.length < 6
        ){
            this.setState({error: 'La password no puede ser menor de 6 caracteres'})
            return false
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then((user)=>{
            if (user) {
                console.log("Usuario registrado");   
            }
        })
        .catch((err)=>{
            if (err.code === "auth/email-already-in-use") {
                this.setState({error: "Email ya en uso"})
                
            }
        })

    }
    redirect(){
        this.props.navigation.navigate("login")
    }

    render(){
        return(
            <View>
                <Text>Register</Text>

                <TextInput
                    onChangeText={(text) => this.setState({name: text, error: ''})}
                    value={this.state.name}
                    placeholder='Indica tu nombre'
                    keyboardType='default'
                    style={styles.input}
                />

                /*EMAIL */
                <TextInput
                    onChangeText={(text) => this.setState({email: text, error: ''})}
                    value={this.state.email}
                    placeholder='Indica tu email'
                    keyboardType='default'
                    style={styles.input}
                />

                <TextInput
                    onChangeText={(text) => this.setState({password: text, error: ''})}
                    value={this.state.password}
                    placeholder='Indica tu password'
                    keyboardType='default'
                    style={styles.input}
                />

                /* MINI BIO */
                <TextInput
                    style={styles.input}
                    onChangeText={(bio) => this.setState({ miniBio: bio })}
                    placeholder='Tell us something about yourself'
                    keyboardType='default'
                    value={this.state.miniBio}
                />

        /* PROFILE PICTURE */
                 <TextInput
                    style={styles.input}
                    onChangeText={(url) => this.setState({ profilePic: url })}
                    placeholder='Add the URL of your picture'
                    keyboardType='default'
                    value={this.state.profilePic}
                />

                
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=> this.onSubmit(this.state.name, this.state.email, this.state.password)}
                >
                    <Text style={styles.textBtn}>Registrarme</Text>
                </TouchableOpacity>

                <View>
                    <Text>
                        Ya tenes una cuenta?
                        <TouchableOpacity
                        onPress={()=>this.redirect()}> Ingresa aqui</TouchableOpacity>
                    </Text>
                </View>
                {
                    this.state.error !== '' ?
                    <Text>
                        {this.state.error}
                    </Text>
                    : 
                    ''
                }
            </View>
        )
    }
}



export default Register;