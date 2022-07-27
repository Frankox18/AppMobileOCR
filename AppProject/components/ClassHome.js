import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

export class ClassHome extends Component {

    state = {
        name:"Parwiz Forogh"
    }

  render() {
    return (
        <View>
            <Text style = {{fontSize:20, color:'purple'}}>Hello From Class</Text>
            <Text style = {{paddingTop:20, fontSize:20}}>{this.state.name}</Text>
            <Button title='Click Me' onPress={()=>this.setState({name:"This is changed"})}/>
        </View>
    )
  }
}

export default ClassHome