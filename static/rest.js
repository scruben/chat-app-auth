// let lastMsgTime;

function postMsg (text) {
  $.post('/messages', {content: text}, function (data) {
    appendMsgs([data]);
  });
}

//  function receives array to add messages to index.html
function appendMsgs (msgsArr) {
  if (msgsArr.length) {
    let last = msgsArr.length - 1;
    lastMsgTime = msgsArr[last].timestamp;
    for (let i = last; i >= 0; i--) {
      let msg = msgsArr[i];
      let timeStr = new Date(+msg.timestamp).toLocaleTimeString();
      let $div = $('<div class="message">');
      $('.messages').append(`
        <div class="message">
          <div class="time">${timeStr}</div>
          <div>${msg.content}<div>
        </div>
      `);
      keepScrolled('.messages');
    }
  }
}

function getLatestMessages () {
  let url = '/messages';
  $.get(url, appendMsgs);
  keepScrolled('.messages');
}

// keep the scroll at the bottom of the element
function keepScrolled(elementId) {
  $(elementId).animate({ scrollTop: $(elementId)[0].scrollHeight}, 100);
}

$(function () {
  $('.messages').val();  //  clear before adding messages from memory

  // check for authorization
  if (localStorage.getItem("tokenId") !== undefined) {
    //  retrieve the last messages
    getLatestMessages();

    //  add a new message
    $('.send_button').click(function () {
      let text = $('input').val();
      text && postMsg(text);
      $('input').val('');
    });

    $(".text_input").keyup(function(event){
      if (event.keyCode == 13) {
          $('button').click();
      }
    });

    $('.log_out').click(function () {
      localStorage.setItem("tokenId", undefined);
      location = '/';
    });

  } else {
    location = '/login.html';
  }
});
