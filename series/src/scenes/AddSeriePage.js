import React, { Component } from "react"
import { 
  View, 
  Text, 
  Picker, 
  TextInput, 
  StyleSheet, 
  Slider,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert
} from "react-native"
import FormRow from '../components/FormRow'
import { connect } from "react-redux"
import { setField, saveSerie, editSerie, clearField } from '../actions'

class AddSeriePage extends Component {

  state = { isLoading: false }

  componentWillMount() {
    if (this.props.navigation.state.params) {
      const { serie } = this.props.navigation.state.params
      console.log(serie)
      this.props.editSerie(serie)
      this.setState({ isLoading: false })
    } else {
      this.props.clearField()
    }
  }

  async saveSerie() {
    this.setState({ isLoading: true })
    try {
      console.log(this.props.serieForm)
      await this.props.saveSerie(this.props.serieForm)
      this.props.navigation.navigate('ListaSeries')
    } catch (error) {
      Alert.alert('Erro!', 
      'Não foi possível salvar a série nesse momento. Tente novamente')
    } finally {
      this.setState({ isLoading: false })
    }
  }

  renderButtonAdd() {
    if (this.state.isLoading)
      return <ActivityIndicator size='large' />

    return <Button title='Adicionar' onPress={() => this.saveSerie()} />
  }

  render() {
    const { title, img, gender, rate, description } = this.props.serieForm;
    return (
      <KeyboardAvoidingView behavior='padding' enabled keyboardVerticalOffset={150} >
        <ScrollView>
          <FormRow>
            <TextInput style={styles.input}
              placeholder="Título"
              value={title}
              onChangeText={value => this.props.setField('title', value)}
            />
          </FormRow>

          <FormRow>
            <TextInput style={styles.input}
              placeholder="URL da imagem"
              value={img}
              onChangeText={value => this.props.setField('img', value)}
            />
          </FormRow>

          <FormRow> 
            <Picker
              selectedValue={gender}
              style={{ height: 50, width: '100%' }}
              onValueChange={itemValue => this.props.setField('gender', itemValue)}>
              <Picker.Item label="Ação" value="Action" />
              <Picker.Item label="Romance" value="Romance" />
              <Picker.Item label="Comédia" value="Comedy" />
            </Picker>
          </FormRow>

          <FormRow>
            <View>
              <View style={styles.rateContainer}>
                <Text>Nota</Text>
                <Text>{rate}</Text>
              </View>
              <Slider
                maximumValue={100}
                value={rate}
                onValueChange={value => this.props.setField('rate', value)} 
                step={5}/>
            </View>
          </FormRow>

          <FormRow>
            <TextInput style={styles.input} multiline
              numberOfLines={4}
              placeholder="Descrição"
              value={description}
              onChangeText={value => this.props.setField('description', value)}
            />
          </FormRow>
          {this.renderButtonAdd()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 5,
    fontSize: 16
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const mapStateToProps = state => {
  return {
    serieForm: state.serieFormReducer
  }
}

export default connect(
  mapStateToProps, 
  { setField, saveSerie, editSerie, clearField }
)(AddSeriePage);
