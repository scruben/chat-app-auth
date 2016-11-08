function postNewUser (auth) {

  $.post('/signup', auth, function (data) {
    if (data.status === 'Authorized') {

      localStorage.setItem("tokenId", data.tokenId);
      location = '/index.html';

      // alert(localStorage.getItem("tokenId"));

    } else {
      alert('Not authorized');
    }
  });

}

function logUser (auth) {
  $.ajax
  ({
    url: "/loguser",
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa(auth.user + ":" + auth.pass ));
    },
    success: function (data){
      alert(data);
      localStorage.setItem("tokenId", data.tokenId);
    }
  });
}

$(function () {

  $('#sign_up').click(function () {
    let user = $('#sign_up_user').val();
    let pass1 = $('#sign_up_pass1').val();
    let pass2 = $('#sign_up_pass2').val();
    if (pass1 && pass2 && user) {
      if (pass1 === pass2) {
        postNewUser({user: user, pass: pass1});
      } else {
        alert('Both fields of password do not match!');
      }
    } else {
      alert('Enter the user and the password twice to sign up.');
    }
  });

  $('#log_in').click(function () {
    logUser({user: $('#login_user').val(), pass: $('#login_pass').val()});
  });
});
