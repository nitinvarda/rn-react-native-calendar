export const months  = (year) =>([{
    name:"January",
    days:31
},{
    name:"February",
    days:(year%4==0 ? 29 :28)
},{
    name:"March",
    days:31
},{
    name:"April",
    days:30
},{
    name:"May",
    days:31
},{
    name:"June",
    days:30
},{
    name:"July",
    days:31
},{
    name:"August",
    days:31
},{
    name:"September",
    days:30
},{
    name:"October",
    days:31
},{
    name:"November",
    days:30
},{
    name:"December",
    days:31
}])


export const weekDay = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ]

export  const weekDays = [
    {
        day:"Sunday",
        code:'SUN'
    },
    {
        day:"Monday",
        code:'MON'
    },
    {
        day: "Tuesday",
        code:'TUE'
    },
    {
        day :"Wednesday",
        code:'WED'
    },
    {
        day:"Thursday",
        code:'THU'
    },
    {
        day:"Friday",
        code:'FRI'
    },
    {
        day : "Saturday",
        code:'SAT'
    }
]

export const Colors = {
    primary:'#ff5a3d'
}