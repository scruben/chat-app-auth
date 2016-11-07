// let lastMsgTime;

function postUser (text) {
  $.post('/login', {content: text}, function (data) {
    appendMsgs([data]);
  });
}


$(function () {
  $('.messages').val();  //  clear before adding messages from memory
  //  retrieve the last messages
  getLatestMessages();

  //  add a new message
  $('.log_in').click(function () {
    // let text = $('input').val();
    // text && postUser(text);
    // $('input').val('');
    console.log('hi!');
  });

});
