import { View, Text,Dimensions,TouchableOpacity,Modal } from 'react-native'
import React from 'react'
import Calendar from '../Calendar'


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function index(props) {
  return (
    <Modal
    transparent={true}
    visible={props.visible}
    onRequestClose={()=>props.onDismiss()}
    // style={{flex:1,position:'relative',backgroundColor:'gray',flexDirection:'row',justifyContent:'center',alignItems:'center',height:windowHeight,width:windowWidth}}
    
    >
      <TouchableOpacity activeOpacity={1} onPress={props.onDismiss} style={{position:'absolute', top:0,left:0,right:0,bottom:0,height:'100%',width:'100%',backgroundColor:'rgba(0,0,0,0.5)',flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
          <TouchableOpacity activeOpacity={1} style={{width:'90%'}}>

                <Calendar {...props} />
          </TouchableOpacity>
      </TouchableOpacity>

    
    {/* <TouchableOpacity onPress={props.onDismiss} style={{position:'absolute',top:0,left:0,right:0,bottom:0,width:windowWidth,height:windowHeight,backgroundColor:'rgba(0,0,0,0.5)',flexDirection:'row',justifyContent:'center',alignItems:'center',}}> */}
            {/* <TouchableOpacity  activeOpacity={1} style={{width:'90%',height:'50%',backgroundColor:'white',padding:10,borderRadius:10}}>
            </TouchableOpacity> */}

        {/* </TouchableOpacity> */}
    </Modal>
          
    
  )
}