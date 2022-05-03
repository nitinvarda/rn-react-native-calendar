import { months, weekDay, weekDays } from "../Constants"





export const getNextYearsData = (year) =>{
    var years = []
    for(let i=0;i<21;i++){
        years.push(Number(year)+i);
    }
    return years.sort()

}
export const getPreviousYearsData = (year) =>{

    var years = []
    for(let i=0;i<21;i++){
        years.push(Number(year)-i);
    }
    return years.sort()
}
export const getMonthsData = (year,month) =>{

    const date = new Date(year,month,1)
    const dateObject =[]

    
    for(let i=0;i<months(year)[month].days;i++){
        const nextDate = new Date(date.getTime() + (i*24*60*60*1000))
        const currentDate = nextDate.getDate()
        const month = nextDate.getMonth()
        const year = nextDate.getFullYear()
        const isoFormat = `${year}-${month+1 < 9 ? `0${month+1}` : month+1}-${currentDate < 9 ? `0${currentDate}`  : currentDate}`
        dateObject.push({
            fullDateObject : nextDate,
            date:nextDate.getDate(),
            month:nextDate.getMonth(),
            day:weekDay[nextDate.getDay()],
            dayNumber:nextDate.getDay(),
            isoFormat:isoFormat
    

        })
        
    }

    return dateObject
}

export const openMonthCalendar = (year,month) =>{

    const date = getMonthsData(year,month)
    const Sunday = date.filter((d)=>d.day==='Sunday')
    const Monday = date.filter((d)=>d.day==='Monday')
    const Tuesday = date.filter((d)=>d.day==='Tuesday')
    const Wednesday = date.filter((d)=>d.day==='Wednesday')
    const Thursday = date.filter((d)=>d.day==='Thursday')
    const Friday = date.filter((d)=>d.day==='Friday')
    const Saturday = date.filter((d)=>d.day==='Saturday')
    
    const gettingFirstDay = [
        Sunday.filter(d=>d.date==1),
        Monday.filter(d=>d.date==1),
        Tuesday.filter(d=>d.date==1),
        Wednesday.filter(d=>d.date==1),
        Thursday.filter(d=>d.date==1),
        Friday.filter(d=>d.date==1),
        Saturday.filter(d=>d.date==1)
    ]
    
    const firstDayNumber = gettingFirstDay.filter(day=>day.length > 0).flat()[0].dayNumber
    const onlySundays = {
        name:'SUN',
        data:date.filter((d)=>d.day==='Sunday')
    }
    const onlyMondays = {
        name:'Mon',
        data:date.filter((d)=>d.day==='Monday')
    }
    const onlyTuesdays = {
        name:'Tue',
        data:date.filter((d)=>d.day==='Tuesday')
    }
    const onlyWednesdays = {
        name:'Wed',
        data:date.filter((d)=>d.day==='Wednesday')
    }
    const onlyThursdays = {
        name:'Thu',
        data:date.filter((d)=>d.day==='Thursday')
    }
    const onlyFridays = {
        name:'Fri',
        data:date.filter((d)=>d.day==='Friday')
    }
    const onlySaturdays= {
        name:'Sat',
        data:date.filter((d)=>d.day==='Saturday')
    }
    
    const monthD = weekDay.map((day,index)=>{
        if(index >=firstDayNumber){
            return({
                name:day.substring(0,2),
                data:date.filter(d=>d.day===day)
            })
        }
        else{
            return({
                name:day.substring(0,2),
                data:[{},...date.filter((d)=>d.day===day)]
            })
        }
    })
    

    return monthD

}
export const getWeekCalendar = (date) =>{
       
    const firstDate ={
        [weekDay[date.getDay()]]:{
        fullDateObject : date,
        date:date.getDate(),
        month:date.getMonth(),
        year:date.getFullYear(),
        isoFormat:date.toISOString().substring(0,10)
        }

    }
    
    const currentDay = weekDay.indexOf(Object.keys(firstDate)[0])
    

    const dates= []
    for(let i=currentDay===0 ? currentDay : -currentDay; dates.length <= 6;i++){
    
        dates.push(i)
     

    }
    

    const datesObject = {}

    dates.map(d=>{
        const da = getDate(date,d)
        datesObject[da.day] = da
    })
    const datesToObject = {...datesObject}
    
    const test = weekDays.map(week=>{
        
        return {...datesToObject[week.day],code:week.code}
    })
    
    return test
    
}
export const checkForMultipleMonths = (date) =>{
    const nextWeek =   getWeekCalendar(date)
    const nextSunday = nextWeek.filter(date=>date.day==='Sunday')[0]
    const nextSaturday = nextWeek.filter(date=>date.day==='Saturday')[0]
   
    if(nextSunday.date > nextSaturday.date ){
        return({
            firstMonth:months(nextSunday.year)[nextSunday.month].name,
            secondMonth:months(nextSunday.year)[nextSaturday.month].name
        })
        
    }
    else{
        return null
    }
}


export const nextMonth = () =>{
    if(month===11){
        setMonth(0)
        setYear(year+1)
        openMonthCalendar(year+1,0)
        
    }
    else{
        setMonth(month+1)
        openMonthCalendar(year,month+1)

    }



}

export const previousMonth = () =>{

    if(month===0){
        setMonth(11)
        setYear(year-1)
        openMonthCalendar(year-1,11)
        
        
    }
    else{

        setMonth(month-1)
        openMonthCalendar(year,month-1)
    }
   
}




export const nextWeek = (dates) =>{
    
    const Monday = dates.filter(date=>date.day==='Monday')[0]
    const Saturday = dates.filter(date=>date.day==='Saturday')[0]

    const nD = new Date(Saturday.year,Saturday.month,Saturday.date+1)

    checkForMultipleMonths(nD)

    return nD
    
    
    
}

export const previousWeek = (dates) =>{
    
    const Sunday = dates.filter(date=>date.day==='Sunday')[0]

    const nD = new Date(Sunday.year,Sunday.month,Sunday.date-1)

    return nD
    

}



export const compareDates = (currentDate,{year,month,date}) =>{
    
    const checkingDate = `${currentDate.year}-${currentDate.month}-${currentDate.date}`
    const selectedDate = `${year}-${month}-${date}`
    if(checkingDate===selectedDate){
        return true
    }
    return false

}
export const highlightToday = (currentDate)=>{
    const checkingDate = `${currentDate.year}-${currentDate.month}-${currentDate.date}`
    const today = new Date()
    const selectedDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
    
    if(checkingDate===selectedDate){
        return true
    }
    return false

}


export  const getDate = (date,days) =>{

   
    const nextDate = new Date(date.getTime() + (days*24*60*60*1000))
    const nextDateObject = {
        fullDateObject : nextDate,
        date:nextDate.getDate(),
        month:nextDate.getMonth(),
        year:nextDate.getFullYear(),
        day:weekDay[nextDate.getDay()],
        isoFormat:`${nextDate.getFullYear()}-${nextDate.getMonth()+1 < 10 ? `0${nextDate.getMonth()+1}` : nextDate.getMonth()+1}-${nextDate.getDate() < 10 ? `0${nextDate.getDate()}` : nextDate.getDate()}`
        

    }
   
    return nextDateObject
}