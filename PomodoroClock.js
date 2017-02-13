$(document).ready(function(){

  var alarm = new Audio('https://www.soundjay.com/phone/telephone-ring-03a.mp3');
  var sessionNum = parseInt($('#sessionTime').html());
  var breakNum = parseInt($('#breakTime').html());
  var count = sessionNum;
  var breakCount = breakNum;

  $('#reset,#session,#currentTime').hide();
 
  $('#currentTime').html(count); 

  $('#sessionSub').on('click',function(){
    if(sessionNum>0){
      sessionNum-=1;
      $('#sessionTime').html(sessionNum);
    }
  });

  $('#sessionAdd').on('click',function(){
    sessionNum+=1;
    $('#sessionTime').html(sessionNum);
  });

  $('#breakSub').on('click',function(){
    if(breakNum >0){
      breakNum-=1;
      $('#breakTime').html(breakNum);
    }
  });

  $('#breakAdd').on('click',function(){
    breakNum+=1;
    $('#breakTime').html(breakNum);
  });
  
  $('#reset').on('click',function(){
    count = sessionNum;
    breakCount = breakNum;

    $('#sessionTime').html(sessionNum);
    $('#breakTime').html(breakNum);

    $('#startBtn, #sessionSub, #sessionAdd, #breakSub, #breakAdd').show();
    $('#currentTime, #session, #break,#reset').hide();
    $('.clock').on('click',startClock);
    $('.clock').css({'border-color':'green'});
    $(".clock").hover(
      function(){
        $(this).css("background-color", "green");
      }, function(){$(this).css('background-color','transparent')});
  });
  
  $('.clock').on('click',startClock);
  
  function startClock(){
    alarm.play();
    alarm.pause();
    
    $('.clock').off('click',startClock);
    
    $(".clock").hover(function(){
      $(this).css("background-color", "transparent");
    });

    var counter = setInterval(timer,1000);
    count = sessionNum*60;
    breakCount= breakNum*60;

    function timer(){
      $('#startBtn,#sessionSub, #sessionAdd, #breakSub, #breakAdd').hide();
      $('#currentTime,#session').show();

      if(count>0){
        count-=1;
      }
      if(count===0){
        alarm.play();
        $('#currentTime').html(timeConvert(breakCount));
        clearInterval(counter);
        var startBreak = setInterval(breakTimer,1000);
      }

      function timeConvert(time){
        if(time%60>=10){
          return (Math.floor(time/60)+':'+time%60);
        }
        else{
          return (Math.floor(time/60)+':0'+time%60);
        }
      }

      $('#currentTime').html(timeConvert(count));

      function breakTimer(){
        $('#session').hide();
        $('#break').show();
        $('.clock').css('border-color','blue');
        $('#currentTime').html(timeConvert(breakCount));
        
        if(breakCount>0){
          breakCount -=1;
        }
        if(breakCount===0){
         alarm.play();
         clearInterval(startBreak);
         $('#currentTime').html(timeConvert(breakCount));
         $('#reset').show()
       }
     }
   }
 }
});