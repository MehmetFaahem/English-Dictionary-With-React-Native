import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as Speech from 'expo-speech'

export default function App() {

  const [newWord, setNewWord] = useState('')
  const [checkedWord, setCheckedWord] = useState('')
  const [definition, setDefinition] = useState('')
  const [example, setExample] = useState('')
  const [synonym, setSynonim] = useState('')
  const [antonym, setAntonym] = useState('')

  const searchWord = (enteredWord) =>{
    setNewWord(enteredWord)
  }

  const read = () =>{
    Speech.speak(checkedWord)
  }

  const clear = () =>{
    setNewWord('')
  }

  const getInfo = () =>{


    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + newWord

    return fetch(url)
        .then((data)=>{
          return data.json()
        })
        .then((response)=>{
          var word = response[0].word
          setCheckedWord(word)

          var def = response[0].meanings[0].definitions[0].definition
          setDefinition(def)

          var example = response[0].meanings[0].definitions[0].example
          setExample(example)

          var synonym = response[0].meanings[0].definitions[0].synonims
          setSynonim(synonym)

          var antonym = response[0].meanings[0].definitions[0].antonyms
          setAntonym(antonym)
        })
  }


  return (
    <View style={styles.container}>

    <ScrollView>

      <View style={styles.imagewrapper}>
        <Image source={require('./assets/Images/Dictionary.png')} style={styles.image}/>
      </View>
      <View style={styles.inputwrapper}>

        <TouchableOpacity onPress={
            ()=>{getInfo()}
          }>
          <FontAwesome 
          name="search" 
          size={30} 
          style={styles.searchbutton}
          color="white"
          />
        </TouchableOpacity>
        
        <TextInput 
        placeholder='Search Your Word'
        textAlign='left'
        clearButtonMode='always'
        style={styles.input}
        onChangeText={searchWord}
        value={newWord}
        />

        <TouchableOpacity onPress={
            ()=>{getInfo()}
          }>

          <AntDesign name="login"
          size={24}
          color="white"
          style={styles.gobutton}/>

        </TouchableOpacity>

      </View>

      <View style={{flexDirection: 'row', paddingHorizontal: 20,
       paddingTop: 15, justifyContent: 'space-between', alignItems: 'center'}}>

       <TouchableOpacity style={{flexDirection: 'row', paddingHorizontal: 20,
       paddingTop: 15}} onPress={clear}>
          <Text style={{color: 'white',
          fontWeight: 'bold', paddingRight: 5, fontSize: 15}}>Clear</Text>
          <MaterialIcons name="highlight-remove" size={24} color="white" />
       </TouchableOpacity>

       <TouchableOpacity style={{flexDirection: 'row', paddingHorizontal: 20,
       paddingTop: 15}} onPress={read}>
          <Text style={{color: 'white',
          fontWeight: 'bold', paddingRight: 5, fontSize: 15}}>Read</Text>
          <Entypo name="sound" size={20} color="white" />
       </TouchableOpacity>
       

      </View>

      <View style={{paddingHorizontal: 20, paddingTop: 20, flexDirection: 'colum'}}>

        <View style={{flexDirection: 'row', borderBottomWidth: 2, borderColor: 'white', paddingBottom: 6}}>
          <Text style={{color: '#0080ff', fontSize: 20, fontWeight: 'bold', paddingBottom: 6
          }}>Entered Word:</Text>

          <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white',
          alignItems: 'center', paddingLeft: 6}} >{checkedWord}</Text>
        </View>

        <View style={{flexDirection: 'colum', borderBottomWidth: 2, borderColor: 'white', paddingBottom: 9,
        paddingTop: 6}}>  
          <Text style={{color: '#0080ff', fontSize: 20, fontWeight: 'bold',
          paddingBottom: 6}}>Definition:</Text>

          <Text style={{fontWeight: 'medium', fontSize: 20, color: 'white',
          alignItems: 'center'}} >{definition}</Text>
        </View>

        <View style={{flexDirection: 'colum', borderBottomWidth: 2, borderColor: 'white', paddingBottom: 9,
        paddingTop: 6}}>  
          <Text style={{color: '#0080ff', fontSize: 20, fontWeight: 'bold',
          paddingBottom: 6}}>Example:</Text>

          <Text style={{fontWeight: 'medium', fontSize: 20, color: 'white',
          alignItems: 'center'}} >{example}</Text>

        </View>  

        <View style={{flexDirection: 'colum', borderBottomWidth: 2, borderColor: 'white', paddingBottom: 9,
        paddingTop: 6}}>  
          <Text style={{color: '#0080ff', fontSize: 20, fontWeight: 'bold',
          paddingBottom: 6}}>Synonym:</Text>

          <Text style={{fontWeight: 'medium', fontSize: 20, color: 'white',
          alignItems: 'center'}} >{synonym}</Text>
        </View> 

        <View style={{flexDirection: 'colum', borderBottomWidth: 2, borderColor: 'white', paddingBottom: 9,
        paddingTop: 6}}>  
          <Text style={{color: '#0080ff', fontSize: 20, fontWeight: 'bold',
          paddingBottom: 6}}>Antonym:</Text>

          <Text style={{fontWeight: 'medium', fontSize: 20, color: 'white',
          alignItems: 'center'}} >{antonym}</Text>
        </View> 

        <Text
        style={{
          color: '#b3ab98',
          textAlign: 'center',
          paddingTop: 36,
          fontSize: 12
        }}
        >Your Data Will Appear On Blank Fields After Pressing The Enter Button. If there is no example, synonym and antonym for a word, those will not show</Text>

        
      </View>

      

      <StatusBar style="auto"/>

    </ScrollView>  

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#161717',
    flex: 1
  },
  image:{
    height: 100,
    width: 180
  },
  imagewrapper:{
    alignItems: 'center',
    paddingVertical: 45
  },
  input:{
    borderWidth: 5,
    padding: 10,
    borderColor: '#0080ff',
    color: 'white',
    width: 220,
    borderBottomEndRadius: 17,
    borderTopEndRadius: 17
  },
  inputwrapper:{
    alignItems: 'center',
    flexDirection:'row',
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  searchbutton:{
    paddingRight: 13
  },
  gobutton:{
    paddingLeft: 13
  }
});
