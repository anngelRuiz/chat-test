var $userName       = $('#userName');
var $userAvatar     = $('#avatarBox');

$(document).ready(function(){
            
    setTimeout(function(){
        $('#infoAlert').fadeIn('slow');
    }, 2500);
    
});

setInterval(updateScroll, 1000);

function updateScroll() {
    var element = document.getElementById("chat");
    element.scrollTop = element.scrollHeight;
}


$('#userName[type="text"]').keyup(function (evt) {
    var txt = $(this).val();
    // Regex taken from php.js (http://phpjs.org/functions/ucwords:569)
    $(this).val(txt.replace(/^(.)|\s(.)/g, function ($1) { return $1.toUpperCase(); }));
});


$("#userName").keyup(function(){
    $("#errorAlert").fadeOut("fast");
});

$('.avatar-img').click(function(){
    $srcValue = $(this).attr('src');
    $('#avatarBox').attr('src', $srcValue).fadeIn();
    $('#avatarsModal').modal('toggle');
    $('#errorAlert').fadeOut('slow');
});

$('#btnEmojis').click(function(){
    if($(this).hasClass('up')){
        $('#box-emojis').removeClass().addClass('fadeOutDown' + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
        $(this).removeClass('up');                
        $('#box-emojis').css("visibility", "hidden");        
    }else{
        $('#box-emojis').removeClass().addClass('fadeInUp' + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
        // $('#box-emojis').css("display", "flex");
        $('#box-emojis').css("visibility", "visible");  
        $(this).addClass('up');        
    }
});

/*
var me = {};
me.avatar = "https://openclipart.org/download/3037/fiferjim-Raccoon.svg";

var you = {};
you.avatar = "https://lh3.googleusercontent.com/I2s0G1ScLJSckbeybwALT-fs6E6TbqCHV7y5iOWaIT-Si1u762qVWYDo6rzYbvvtLKE=rw";

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}            

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time){
    if (time === undefined){
        time = 0;
    }
    var control = "";
    var date = formatAMPM(new Date());
    
    if (who == "me"){
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +                                
                  '</li>';
    }
    setTimeout(
        function(){                        
            $("#chatContainer ul").append(control).scrollTop($("#chatContainer ul").prop('scrollHeight'));
        }, time);
    
}

function resetChat(){
    $("#chatContainer ul").empty();
}

$(".mytext").on("keydown", function(e){
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            insertChat("me", text);              
            $(this).val('');
        }
    }
});

$('body > div > div > div:nth-child(2) > span').click(function(){
    $(".mytext").trigger({type: 'keydown', which: 13, keyCode: 13});
})

//-- Clear Chat
resetChat();

//-- Print Messages
insertChat("me", "Hello Anngel...", 0);  
insertChat("you", "Hi, Armando", 1500);
insertChat("me", "What would you like to talk about today?", 3500);
insertChat("you", "Have you seen a meme ?",7000);
insertChat("me", "Of course mai friend", 9500);
insertChat("you", "Yeah", 12000);
*/

//-- NOTE: No use time on insertChat.