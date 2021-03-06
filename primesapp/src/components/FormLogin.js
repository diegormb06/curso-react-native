import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { 
  modificaEmail, 
  modificaSenha, 
  autenticaUsuario,
} from '../actions/AutenticacaoAction';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator
} from 'react-native';

const bg = require('../img/bg.png');

class formLogin extends Component {

  _autenticaUsuario() {
    const { email, senha } = this.props;
    this.props.autenticaUsuario({email, senha});
  }

  renderbtnAcessar() {
    if (this.props.loadingBtnActive) {
      return <ActivityIndicator size='large' />
    }

    return (
      <Button
        title='Acessar'
        color='#115E54'
        onPress={() => this._autenticaUsuario()}
      />
    )
  }

  render() {
    return (
      <ImageBackground source={bg} style={styles.imgBackground}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>PrimeZap</Text>
          </View>
          <View style={styles.inputsLogin}>
            <TextInput
              value={this.props.email}
              style={styles.inputs}
              placeholder='Email'
              placeholderTextColor='#fff'
              onChangeText={email => { this.props.modificaEmail(email) }}
            />

            <TextInput
              value={this.props.senha}
              style={styles.inputs}
              placeholder='Senha'
              placeholderTextColor='#fff'
              secureTextEntry
              onChangeText={senha => { this.props.modificaSenha(senha) }}
            />
            <Text style={{ color: '#FF4500', textAlign: 'center', fontSize: 18}}>{this.props.erroLogin}</Text>
            <TouchableOpacity onPress={() => { Actions.cadastro(); }}>
              <Text style={styles.textoCadastro}>Ainda não tem cadastro? Cadastre-se.</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonAction}>
            {this.renderbtnAcessar()}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsLogin: {
    flex: 2
  },
  buttonAction: {
    flex: 2,
    justifyContent: 'center'
  },
  title: {
    fontSize: 25,
    color: '#fff'
  },
  inputs: {
    fontSize: 20,
    height: 45,
    color: '#000'
  },
  textoCadastro: {
    fontSize: 20,
    color: '#fff'
  }
})

const mapStateToProps = state => (
  {
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    erroLogin: state.AutenticacaoReducer.erroLogin,
    loadingBtnActive: state.AutenticacaoReducer.loadingBtnActive
  }
)

export default connect(
  mapStateToProps, 
  { 
    modificaEmail, 
    modificaSenha, 
    autenticaUsuario
  }
)(formLogin);
