import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button} from 'react-native-paper';

function Edit(props) {

    const data = props.route.params.data;

    const [title, setTitle] = useState(data.title)
    const [body, setBody] = useState(data.body)

    const updateData = () => {
        fetch(`http://192.168.1.104:3000/update/${data.id}`, {
            method:'PUT', 
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({title:title, body:body})
        })
        .then(resp => resp.json())
        .then(data => {
            props.navigation.navigate('Home', {data:data})
        })
        .catch(error => console.log(error))
    }

    return (
    <View>
        <TextInput style = {styles.inputStyle}
            label="Title"
            value= {title}
            mode="outlined"
            onChangeText={text=>setTitle(text)}
        />
        <TextInput style = {{padding:10}}
            label="Description"
            value= {body}
            mode="outlined"
            multiline
            numberOfLines={10}
            onChangeText={text=>setBody(text)}
        />
        <Button 
            style = {{margin:10}}
            icon = "update"
            mode='contained'
            onPress={()=>updateData()}
        >Update article</Button>
    </View>
  )
}

const styles = StyleSheet.create({
    inputStyle: {
        padding:10,
        marginTop:30
    }
})

export default Edit