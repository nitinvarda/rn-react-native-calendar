# rn-react-native-calendar

This is a calendar package for react native

## Installation

```sh
npm install rn-react-native-calendar
```

## Note


 


## Week Calendar Usage

```js
import {WeekCalendar} from "rn-react-native-calendar"


const App =()=>{
    const items = {
        '2022-04-28':{},
        '2022-05-03':{}
    }
    return(
        <View>
            <WeekCalendar items={items} itemsOnThisDate={(items)=>console.log(items)} />
        </View>
    )
}






```
![Screenshot_20220503_185314 (1)](https://user-images.githubusercontent.com/56512897/166462395-d9b3fcb3-f5d3-44a9-a147-51ba18dae41a.jpg)

### Week Calendar Props
| Prop | description  | type |defualt value  | 
| ------- | --- | --- | ----|
| items | items which you want to be marked on calendar | object | {} |
| buttonColor | color on left and right button background | string  |'#FFEADF' |
| selectedDateColor | selected date background Color | string  |'#ff5a3d' |
| todayDateColor | today's date backgroundColor | string  |'gray' |
| itemsOnThisDate | callback which triggers when you click on date with items data | function  | (item)=>{ } |

## CalendarModal Usage

```js
import {CalendarModal} from "rn-react-native-calendar"

const App =()=>{
    const [showCalendar,setShowCalendar] = useState(false)
     const [date,setDate] = useState(new Date())
    const items = {
        '2022-04-28':{},
        '2022-05-03':{}
    }
    const onDayPressChanges = (date)=>{
    
    return(
        <View>
            <CalendarModal 
            items={items}
             currentDate={date} 
            visible={showCalendar} 
            onDayPress={(date)=>onDayPressChanges(date)} 
            onDismiss={()=>setShowCalendar(false)} 
            selectedDateColor={'#ff5a3d'}
            
            />
        </View>
    )
}

```

### CalendarModal Props
| Prop | description  | type |defualt value  | 
| ------- | --- | --- | ----|
| items | items which you want to be marked on calendar | object | {} |
| visible | should show calendar modal or not  | boolean  | false |
| selectedDateColor | selected date background Color | string  |'#ff5a3d' |
| onDayPress | callback triggered when a day is pressed | function  | (data)=>{ } |
| onDismiss | callback which triggers when calendar modal closes | function  | ()=>{ }|


![Screenshot_20220503_182451_com example (1)](https://user-images.githubusercontent.com/56512897/166461619-e1a29858-0313-4721-94ae-1f45135e4cce.jpg)
![Screenshot_20220503_182454_com example](https://user-images.githubusercontent.com/56512897/166461800-d929ae5c-6824-4886-b92a-c414a309582a.jpg)
![Screenshot_20220503_182459_com example](https://user-images.githubusercontent.com/56512897/166461795-c2a34678-0643-4276-8fb8-ed2bc1ba9623.jpg)





## Contributing

feel free to contribute 

## License

MIT
