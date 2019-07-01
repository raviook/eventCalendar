var TodayTime=new Date();
var EventCalendar={
    DaysName:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    MonthsName:['January','February','March','April','May','June','July','August','September','October','November','December'],
    CurrentMonth:'',
    CurrentYear:'',
    GetDayNumberOfFirstDate:function(){
        var firstDateOfMonth = EventCalendar.MonthsName[EventCalendar.CurrentMonth] + " " + 1 + " " + EventCalendar.CurrentYear; 
        var firstDateOfMonthWithDayName = new Date(firstDateOfMonth).toDateString(); 
        var dayName = firstDateOfMonthWithDayName.substring(0, 3);
        var dayNumber = EventCalendar.DaysName.indexOf(dayName);
        return dayNumber;
    },
    GetDaysInMonth:function(){
        return new Date(EventCalendar.CurrentYear,EventCalendar.CurrentMonth+1,0).getDate();
    },
    DragEvent:function(){
        $('.event').on("dragstart", function (event) {
            var dt = event.originalEvent.dataTransfer;
            dt.setData('Text', $(this).attr('id'));
        });
        $('table td').on("dragenter dragover drop", function (event) {	
           event.preventDefault();
           if (event.type === 'drop') {
                  var data = event.originalEvent.dataTransfer.getData('Text',$(this).attr('id'));
                  de=$('#'+data).detach();
                  de.appendTo($(this));	
           };
           });
    },
    CreateCalendar:function(numberOfDaysInMonth,firstDayOfMonth){
        var table = document.createElement('table');    
        var tr = document.createElement('tr');
        for(var col=0; col<=6; col++){
            var td = document.createElement('td');
            var gun = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
            td.innerHTML = gun[col];
            tr.appendChild(td);
        }
        table.appendChild(tr);
        //Second row
        tr = document.createElement('tr');
        var col;
        for(col=0; col<=6; col++){
            if(col == firstDayOfMonth){
                break;
            }
            var td = document.createElement('td');
            td.innerHTML = "";
            tr.appendChild(td);
        }


        var count = 1;      
        for(; col<=6; col++){
            var td = document.createElement('td');
            td.innerHTML = count+'<br/><span class="event" id='+count+' draggable="true"><span>Event '+count+'</span></span>'+'<br/>';
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr); 


        //other rows 
        for(var row=3; row<=7; row++){
            tr = document.createElement('tr');
            for(var col=0; col<=6; col++){
                if(count > numberOfDaysInMonth){
                    table.appendChild(tr);
                    return table;
                }
                var td = document.createElement('td');
                td.innerHTML = count;
                count++;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        return table;
    }
}

EventCalendar.CurrentMonth=TodayTime.getMonth();
EventCalendar.CurrentYear=TodayTime.getFullYear();
$('#monthYearBanner').html(EventCalendar.MonthsName[EventCalendar.CurrentMonth]+' '+EventCalendar.CurrentYear);
var tableData=EventCalendar.CreateCalendar(EventCalendar.GetDaysInMonth(),EventCalendar.GetDayNumberOfFirstDate());
$('#cal-dates').html(tableData);
EventCalendar.DragEvent();
$('#prevMonth').click(function(){
    TodayTime.setMonth(EventCalendar.CurrentMonth-1);
    EventCalendar.CurrentMonth=TodayTime.getMonth();
    EventCalendar.CurrentYear=TodayTime.getFullYear();
    $('#monthYearBanner').html(EventCalendar.MonthsName[EventCalendar.CurrentMonth]+' '+EventCalendar.CurrentYear);
    tableData=EventCalendar.CreateCalendar(EventCalendar.GetDaysInMonth(),EventCalendar.GetDayNumberOfFirstDate());
    $('#cal-dates').html(tableData);
});
$('#currentMonth').click(function(){
    TodayTime=new Date();
    EventCalendar.CurrentMonth=TodayTime.getMonth();
    EventCalendar.CurrentYear=TodayTime.getFullYear();
    console.log(TodayTime);
    console.log(EventCalendar.GetDaysInMonth());
    $('#monthYearBanner').html(EventCalendar.MonthsName[EventCalendar.CurrentMonth]+' '+EventCalendar.CurrentYear);
    tableData=EventCalendar.CreateCalendar(EventCalendar.GetDaysInMonth(),EventCalendar.GetDayNumberOfFirstDate());
    $('#cal-dates').html(tableData);
});
$('#nextMonth').click(function(){
    TodayTime.setMonth(EventCalendar.CurrentMonth+1);
    EventCalendar.CurrentMonth=TodayTime.getMonth();
    EventCalendar.CurrentYear=TodayTime.getFullYear();
    $('#monthYearBanner').html(EventCalendar.MonthsName[EventCalendar.CurrentMonth]+' '+EventCalendar.CurrentYear);
    tableData=EventCalendar.CreateCalendar(EventCalendar.GetDaysInMonth(),EventCalendar.GetDayNumberOfFirstDate());
    $('#cal-dates').html(tableData);
});