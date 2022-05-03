import { View, Text,Dimensions } from 'react-native'
import React from 'react'


const windowHeight = Dimensions.get('window').height;
export default function Dialog(props) {
  return props.visible && (
    <View style={{flex:1,position:'absolute',top:0,left:0,right:0,bottom:0,width:'100%',height:windowHeight,backgroundColor:'gray'}}>
      <Text>Dialog</Text>
    </View>
  )
}