import React, { Component } from 'react';
import { auth, db } from '../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Image, FlatList } from "react-native";


class Perfil extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            nuevaPassword: "",
            nombreDeUsuario: "",
            usuarioLogueado: null,
            posteos: [],
            mostrarpost: true,
        };
    }

    componentDidMount() {
        console.log(this.props);
        const user = auth.currentUser;

        if (user) {
            this.setState({ usuarioLogueado: user.email });

            db.collection('users').where("owner", "==", user.email).onSnapshot(
                docs => {
                    let userData = [];
                    docs.forEach(doc => {
                        userData.push({
                            id: doc.id,
                            data: doc.data()
                        });
                    });
                    this.setState({ data: userData });
                }
            );

            db.collection("posts").where("owner", "==", user.email).onSnapshot(
                docs => {
                    let posteosQuieroMostrar = [];
                    docs.forEach(doc => {
                        posteosQuieroMostrar.push({
                            id: doc.id,
                            data: doc.data()
                        });
                    });
                    this.setState({ posteos: posteosQuieroMostrar });
                }
            );
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    logout() {
        auth.signOut();
        this.props.navigation.navigate('Login');
    }

    deletePost(id) {
        db.collection('posts').doc(id).delete()
            .then(() => {
                this.setState({ mostrarpost: false });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        if (!this.state.usuarioLogueado) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <View style={styles.conteiner1}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.info}>
                            <Text> {item.data.userName}</Text>
                            <Image style={styles.profileImage} source={{ uri: item.data.urlImagen }} />
                            <Text> {this.state.usuarioLogueado} </Text>
                            <Text> {item.data.miniBio} </Text>
                            <Text> Posteos: {this.state.posteos.length} </Text>
                        </View>
                    )}
                />

                <Text> Mis posteos</Text>
                <FlatList
                    data={this.state.posteos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.conteinerView}>
                            <Post dataPost={item} navigation={this.props.navigation} />
                            <TouchableOpacity style={styles.button} onPress={() => this.deletePost(item.id)}>
                                <Text style={styles.textButton}> Eliminar post </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <TouchableOpacity style={styles.button} onPress={() => this.logout()}>
                    <Text> Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    conteiner1 : {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 10,
        padding: 10,
    },
    info: {
        alignItems: 'center',
        marginBottom: 15,
        height: 150,
    },
    conteinerView: {
        flex: 2,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 20, 
        paddingVertical: 15, 
        paddingHorizontal:10,
        borderWidth: 1, 
        borderColor: "#ccc",
        borderStyle: 6, 
        marginVertical: 10, 
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#fff',
    },
    postImage: {
        width: '100%', 
        height: 200,
    },

    input: {
        height: 20, 
        paddingVertical: 15, 
        paddingHorizontal:10,
        borderWidth: 1, 
        borderColor: "#ccc",
        borderStyle: 6, 
        marginVertical: 10, 
    },
    button: {
        backgroundColor: "rgb(99 71 239)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745",
    },
    textButton: {
        color: 'white'
    },
})

export default Perfil;