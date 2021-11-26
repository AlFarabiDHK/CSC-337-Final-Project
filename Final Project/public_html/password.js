var crypto = require('crypto');

var hash = crypto.createHash('sha512');

var toHash = 'password' + Math.floor(Math.random() * 1000000000000);
data = hash.update(toHash, 'utf-8');
gen_hash = data.digest('hex');

console.log('to hash : ' + toHash)
console.log('  hash  : ' + gen_hash);

function login() {
    let u = $('#usernameLogin').val();
    let p = $('#passwordLogin').val();
    $.get(
      '/login/' + u + '/' + encodeURIComponent(p),
      (data, status) => {
          alert(data);
          if (data == 'LOGIN') {
            window.location.href = '/index.html';
          }
    });
  }
  function createAccount() {
    let u = $('#usernameCreate').val();
    let p = $('#passwordCreate').val();
    $.get(
      '/create/' + u + '/' + encodeURIComponent(p),
      (data, status) => {
          alert(data);
    });
  }