var TodayTime=new Date();
var notificationHtml='<a href="www.google.com" target="_blank"><img src="fb_logo.png" style="width:20px; height:20px" alt="fb_logo"><span>&#215;#fb_num#</span></a>'+
'<a href="www.google.com" target="_blank"><img src="insta_logo.png" style="width:20px; height:20px" alt="insta_logo"><span>&#215;#insta_num#</span></a> '+
'<a href="www.google.com" target="_blank"><img src="google_logo.png" style="width:20px; height:20px" alt="google_logo"><span>&#215;#google_num#</span></a>';
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
    OrderData:['{"day":1,"fb":2,"insta":3,"google":3}','{"day":12,"fb":12,"insta":13,"google":14}','{"day":30,"fb":20,"insta":30,"google":35}'],
    GetNotificationHtml:function(dayNum){
        
        var tempHtml=notificationHtml;
        $.each(EventCalendar.OrderData, function(index, item) {
            var obj = JSON.parse(item);
            if(obj.day==dayNum){
                tempHtml=tempHtml.replace('#fb_num#',obj.fb);
                tempHtml=tempHtml.replace('#insta_num#',obj.insta);
                tempHtml=tempHtml.replace('#google_num#',obj.google);
               return false;
            }
        });
        return tempHtml;
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
            var notificationData=this.GetNotificationHtml(count);
            console.log(notificationData);
            td.innerHTML = count+'<br/><div class="event" id='+count+' draggable="true">'+notificationData+'</div>'+'<br/>';
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
    EventCalendar.DragEvent();
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
    EventCalendar.DragEvent();
});
$('#nextMonth').click(function(){
    TodayTime.setMonth(EventCalendar.CurrentMonth+1);
    EventCalendar.CurrentMonth=TodayTime.getMonth();
    EventCalendar.CurrentYear=TodayTime.getFullYear();
    $('#monthYearBanner').html(EventCalendar.MonthsName[EventCalendar.CurrentMonth]+' '+EventCalendar.CurrentYear);
    tableData=EventCalendar.CreateCalendar(EventCalendar.GetDaysInMonth(),EventCalendar.GetDayNumberOfFirstDate());
    $('#cal-dates').html(tableData);
    EventCalendar.DragEvent();
});