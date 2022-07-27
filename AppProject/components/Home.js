import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, FlatList, NativeAppEventEmitter } from 'react-native';
import { Card, FAB } from 'react-native-paper';

function Home(props) {
    //const [name, setName] = useState('Alexis gaaa')

    /*<Text style = {{color:'red', backgroundColor:'yellow'}}>Welcome to python flask and react ga</Text>
        <Text style = {styles.textStyle}>{name}</Text>
        <Button title='Click' onPress={() => setName("This is changed")}/> */

  const [data, setData] = useState([])
  const [loading, setIsLoading] = useState(true)

  const loadData = () => {
    fetch('http://192.168.1.104:3000/get', {
      method:'GET'
    })
    .then(resp => resp.json())
    .then(article => {
      setData(article)
      setIsLoading(false)
    })
    .catch(error => console.log(error))
  }
  /*useEffect(() => {
      fetch('http://192.168.1.104:3000/get', {
        method:'GET'
      })
      .then(resp => resp.json())
      .then(article => {
        setData(article)
      })
  }, [])*/

  useEffect(() => {
    loadData()
  }, [])


  /*const data = [
      {id:1, title:'First Title', body:'First Body'},
      {id:2, title:'Second Title', body:'Second Body'},
      {id:3, title:'Third Title', body:'Third Body'}
  ]*/

  const clickedItem = (data) => {
    props.navigation.navigate('Details', {data:data})
  }


// <Text>{item.body}</Text>
  const renderData = (item) => {
    return(
      <Card style = {styles.cardStyle}>
          <Text style = {{fontSize:23}} onPress = {() => clickedItem(item)}>{item.title}</Text>
         
      </Card>
    )
  }

  return (
    <View style = {{flex:1}}> 
        <FlatList 
          data={data} 
          renderItem={({item})=>{
            return renderData(item)
          }}
          onRefresh = {() => loadData()}
          refreshing = {loading}
          keyExtractor = {item => `${item.id}`} 
          />

        <FAB 
        style = {styles.fab}
        small = {false}
        icon = "plus"
        theme={{colors:{accent:"green"}}}
        onPress = {() => props.navigation.navigate('Create')}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    /*textStyle: {
        color:'brown',
        padding:10,
        margin:20,
        fontSize:20
    },*/
    cardStyle: {
      margin:10,
      padding:10
    },

    fab: {
      position:'absolute',
      margin:16,
      right:0,
      bottom:0
    }

})
export default Home