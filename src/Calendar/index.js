import React, { useEffect, useState,useRef } from 'react'
import {Dimensions, TouchableOpacity,View, Text,Modal,FlatList,PanResponder} from 'react-native'
import Dialog from '../components/Dialog';
import { months } from '../Constants';
import { getMonthsData, getNextYearsData, getPreviousYearsData, getYearsOption, openMonthCalendar } from '../utils';
import PropTypes from 'prop-types'



const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const Colors = {
    primary:'#ff5a3d'
}
export default function index(props) {
   
    
   
    const [dates,setDates] = useState([])
    const [openCalendar,setOpenCalendar] = useState(false)
    const [date,setDate] = useState(new Date())
    const [dateNumber,setDateNumber] = useState(date.getDate())
    const [month,setMonth] = useState(date.getMonth())
    const [year,setYear] = useState(date.getFullYear())
    const [monthsData,setMonthsData] = useState(months(year))


    const [showMonths,setShowMonths] = useState(false)
    const [showYears,setShowYears] = useState(false)
    const [yearsToShow,setYearsToShow] = useState([])
   
    const [twoMonths,setTwoMonths] = useState(null)
    const [items,setItems] = useState(props.items || {
       
            "2022-04-22": [
                {
                    "id": "ISFWbXIc6LYAXS66ugtC",
                    "prepTime": "2h 30m 3s",
                    "duration": "undefined",
                    "@context": "https://schema.org/",
                    "calories": "",
                    "author": "Team RIKU",
                    "mealType": "BREAKFAST",
                    "eventSchedule": {
                        "startDate": "2022-03-31",
                        "byDay": "https://schema.org/Thursday",
                        "@type": "Schedule"
                    },
                    "addedBy": {
                        "username": "Nitin Varda",
                        "id": "anN22w0JeCRX4LrhDlST8TLNVdo2"
                    },
                    "cookTime": "1h 30m",
                    "imageUrl": "data:image/jpeg;base64,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",
                    "name": "Testing Recipe New",
                    "@type": "Event"
                }
            ],
            "2022-04-26": [
                {
                    "id": "QBdalQKhDP9Drr7XwGny",
                    "prepTime": "PT10M",
                    "duration": "PT70M",
                    "@context": "https://schema.org/",
                    "calories": "328 kcal",
                    "eventSchedule": {
                        "startDate": "2022-04-19",
                        "byDay": "https://schema.org/Tuesday",
                        "@type": "Schedule"
                    },
                    "addedBy": {
                        "username": "Nitin Varda",
                        "id": "anN22w0JeCRX4LrhDlST8TLNVdo2"
                    },
                    "cookTime": "PT60M",
                    "imageUrl": "https://www.vegrecipesofindia.com/wp-content/uploads/2021/11/gajar-halwa-carrot-halwa.jpg",
                    "name": "Gajar ka Halwa | Carrot Halwa",
                    "@type": "Event",
                    "mealType": "BREAKFAST",
                    "author": "Dassana Amit"
                }
            ]
        
    })


    const [monthData,setMonthData] = useState([])
    useEffect(()=>{
        if(props.currentDate){
            const newDate = new Date(props.currentDate)
  
            setDate(newDate)
            setDateNumber(newDate.getDate())
            setMonth(newDate.getMonth())
            setYear(newDate.getFullYear())

        }
        // getWeekCalendar(date)
        getMonthsData(year,month)
    },[props])


   

    const getMonthsData=(year,month)=>{
        const monthData = openMonthCalendar(year,month)
      
        setMonthData(monthData)

  
    }

    
   

   
    const goToToday = () =>{
        const todayDate = new Date()
        setDate(todayDate)
        setDateNumber(todayDate.getDate())
        setMonth(todayDate.getMonth())
        setYear(todayDate.getFullYear())
        setMonthData(openMonthCalendar(todayDate.getFullYear(),todayDate.getMonth()))
    }

    const nextMonth = () =>{
        if(month===11){
            setMonth(0)
            setYear(year+1)
            openMonthCalendar(year+1,0)
            getMonthsData(year+1,0)
            
        }
        else{
            setMonth(month+1)
            openMonthCalendar(year,month+1)
            getMonthsData(year,month+1)
    
        }
    }

    const previousMonth = () =>{

        if(month===0){
            setMonth(11)
            setYear(year-1)
            openMonthCalendar(year-1,11)
            getMonthsData(year-1,11)
            
            
        }
        else{
    
            setMonth(month-1)
            openMonthCalendar(year,month-1)
            getMonthsData(year,month-1)
        }
        
    }    
    
  
    const onDayPress = (date)=>{
        
        const newDate = new Date(date.isoFormat)

        setDate(newDate)
        setDateNumber(newDate.getDate())
        setMonth(newDate.getMonth())
        setYear(newDate.getFullYear())
        props.onDayPress(newDate)
        props.onDismiss()
        
    
    }

    const selectedMonth = (month,index) => {
     
       
        getMonthsData(year,index)
        const newDate = new Date(year,index,dateNumber)
  
        setDate(newDate)
        setDateNumber(newDate.getDate())
        setMonth(newDate.getMonth())
        setYear(newDate.getFullYear())
        setShowMonths(false)


    }




    const getYears = () =>{
    
        setYearsToShow(getPreviousYearsData(year))
        setShowYears(true)
    }

    const selectedYear = (year)=>{
        getMonthsData(year,month)
        const newDate = new Date(year,month,dateNumber)
  
        setDate(newDate)
        setDateNumber(newDate.getDate())
        setMonth(newDate.getMonth())
        setYear(newDate.getFullYear())
        setShowYears(false)
        setShowMonths(false)
        

    }


    const previousSetYears = () =>{
        setYearsToShow(getPreviousYearsData(yearsToShow[0]))
        
    }
    
    
    const nextSetYears = () =>{
        setYearsToShow(getNextYearsData(yearsToShow[yearsToShow.length-1]))

    }

    const goToCurrentYear = () =>{
        setYearsToShow(getPreviousYearsData(new Date().getFullYear()))
    }
    

  return (
    <View style={{flexDirection:'column',justifyContent:'center',backgroundColor:'white',width:'100%',height:400,padding:20,borderRadius:10}}
    >
        {showMonths ? 
        showYears ? (
            <View style={{flex:1}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity onPress={previousSetYears} style={{flex:0.5,          flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                
                    <Text style={{fontSize:20}}>{'<'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToCurrentYear} style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>Current year</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextSetYears} style={{flex:0.5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    
                    <Text style={{fontSize:20}}>{'>'}</Text>

                </TouchableOpacity>

                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

            
                <FlatList
                data={yearsToShow}
                key="yearsToShow"
                keyExtractor={(item,index)=>index}
                numColumns={3}
                
                renderItem={({item,index})=>{
                    return(
                        <TouchableOpacity onPress={()=>selectedYear(item)} style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',height:40,}}>
                            <Text style={{
                                borderWidth:year===item ? 1 : (new Date()).getFullYear()===item ? 1 :0 ,
                                padding:10,
                                borderColor:year===item ? Colors.primary : 'black'
                                }}>{item}</Text>
                        </TouchableOpacity>
                    )
                }}

                />
                    </View>

            </View>
        ) :(
            <View style={{flex:1}}>
                <TouchableOpacity onPress={getYears}>
                <Text style={{fontSize:22,color:props.selectedDateColor}}>{year}</Text>
                    </TouchableOpacity> 
                <FlatList
                data={monthsData} 
                key="monthsData"
                keyExtractor={(item,index)=>index}
                numColumns={2}
                renderItem={({item,index})=>{
             
                    return(
                    <TouchableOpacity onPress={()=>selectedMonth(item.name,index)} style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',height:50,}}>
                        <Text style={{borderWidth:index==month ? 1 : 0,padding:10,borderColor:props.selectedDateColor}}>{item.name}</Text>
                    </TouchableOpacity>
                )}}
                />
            </View>
        ) : (
            <>
        <View style={{flexDirection:'row',}}>
                <TouchableOpacity onPress={()=>setShowMonths(true)} style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontWeight:'bold',fontSize:22}} >{months(year)[month]?.name} {year}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={previousMonth} style={{flex:0.5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                  
                    <Text style={{fontSize:20}}>{'<'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToToday} style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Text>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextMonth} style={{flex:0.5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    
                    <Text style={{fontSize:20}}>{'>'}</Text>

                </TouchableOpacity>
        </View>
        <View  style={{flexDirection:'row',justifyContent:'space-between',marginTop:15}}>
                {monthData.map((day,index)=>(
                    <View key={index}>
                        <Text style={{textAlign:'center'}}>{day.name}</Text>
                        <View>
                            {day.data.length > 0 && day.data.map((date,dateIndex)=>{
                             
                                return(
                                <TouchableOpacity key={dateIndex} onPress={()=>onDayPress(date)} style={{
                                    marginVertical:7,
                                    alignItems:'center',
                                    width:40,
                                    height:40,
                                    borderRadius:40/2,
                                    backgroundColor:date.date===dateNumber ? Colors.primary : 'transparent',
                                    padding:8
                                    }} >
                                    <Text style={{
                                        color:date.date===dateNumber ? 'white' : day.name=='Su' ? 'red' : 'black' ,
                                        fontWeight:day.name=='Su' ? 'bold' : 'normal',
                                        
                                        //   padding:5,
                                        

                                        }}>{date.date}</Text>
                                        {items[date.isoFormat] && <View style={{
                                            height:5,
                                            width:5,
                                            backgroundColor:date.date===dateNumber ? 'white' : Colors.primary,borderRadius:5/2}} />}
                                        
                                </TouchableOpacity>
                            )})}
                        </View>
                    </View>
                ))}
        </View>
        </>
        )}
    </View>
  )
}

index.defaultProps={
    onDismiss:()=>{},
    onDayPress:()=>{},
    selectedDateColor:Colors.primary,
}

index.propTypes ={
    onDayPress:PropTypes.func,
    onDismiss:PropTypes.func,
    items:PropTypes.object,
    selectedDateColor:PropTypes.string,
}