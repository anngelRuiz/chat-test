$(function(){
    var socket = io.connect();
    
    // Variables to register
    var $userFormArea   = $('#mainSection');
    var $userForm       = $('#userForm');
    var $userName       = $('#userName');
    var $userAvatar     = $('#avatarBox');
    
    // Variables for UI
    var $messageArea    = $('#chatContainer');    
    // Li
    var $users          = $('#users');
    var $messageForm    = $('#messageForm');
    var $message        = $('#message'); 
    var $chat           =  $('#chat');

    $('#btnMessage').click(function(e) {
        e.preventDefault();
        socket.emit('send message', $message.html());
        $message.html('');
    });

    $($message).on('keydown', function (e) {
        if (e.keyCode == 13 && e.shiftKey) {
            e.preventDefault();
            // $(this).html($(this).html() + "\n");

            $(this).val(function (i, val) {
                return val + '\n';
            });


            /*var el = $message,
                allText = $message.html(),
                currentPos = getCaret(el),
                beforeText = allText.substr(0, currentPos),
                afterText = allText.substr(currentPos);

            $message.html(beforeText + '\n' + afterText);

            setCaretPosition(el, currentPos);*/
        }
        else if (e.keyCode == 13) {
            e.preventDefault();
            socket.emit('send message', $message.html());                
            $message.html('');
        }
    });

    function getCaret(node) {
        if (node.selectionStart) {
            return node.selectionStart;
        } else if (!document.selection) {
            return 0;
        }

        var c = "\001",
            sel = document.selection.createRange(),
            dul = sel.duplicate(),
            len = 0;

        dul.moveToElementText(node);
        sel.text = c;
        len = dul.text.indexOf(c);
        sel.moveStart('character', -1);
        sel.text = "";
        return len;
    }

    function setCaretPosition(elemId, caretPos) {
        var elem = document.getElementById(elemId);

        if (elem != null) {
            if (elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            }
            else {
                if (elem.selectionStart) {
                    elem.focus();
                    elem.setSelectionRange(caretPos, caretPos);
                }
                else
                    elem.focus();
            }
        }
    }

    $('.emoji').click(function () {        
        $message.html($message.html() + '<img src="' + $(this).attr('src') + '" alt="" class="emoji">');        
    });

    socket.on('new message', function(data){
       var date = formatAMPM(new Date());
        $chat.append( '<li style="width:100%" class="bounceIn">' +
                        '<div class="msj macro">' +
           '<div class="box-name">' + data.user + '</div>'+
           '<div class="avatar"><img style="width:100%;" src=" ' + data.photo + '" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ data.msg +'</p>' +
                                '<p><small>'+ date +'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>');  
    });

    $userForm.submit(function(e){
        e.preventDefault();

        var img = $userAvatar.attr('src');
        
            if ($userName.val() == null || $userName.val() == "" || !$userAvatar.attr("src")){
                $('#errorText').html('');
                $('#errorText').html('Please select all the fields');
                $('#errorAlert').fadeIn('slow');
                
            }else{
                socket.emit('new user', { name: $userName.val(), photo: img}, function (data) {
                $userFormArea.hide();
                $messageArea.show(); 
                $userName.val('');                
                });
            }
        
    });

    socket.on('get users', function(data){
        var html = '';
        for(i = 0; i < data.length; i++){
            html += '<li><div class="sp-wave"></div> ' + data[i].name + '</li>';                        
        }   
        $users.html(html);
    });

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }      
});