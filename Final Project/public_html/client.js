function logout() {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == XMLHttpRequest.DONE) {
      if (httpRequest.status == 200) {
  }
}
  }
httpRequest.open('GET', '/logout/', true);
  httpRequest.send();
}

function login() {
  var httpRequest = new XMLHttpRequest();

  let u = document.getElementById('usernameLogin').value;
  let p = document.getElementById('passwordLogin').value;

  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == XMLHttpRequest.DONE) {
      if (httpRequest.status == 200) {
        if (httpRequest.responseText == 'SUCCESS') {
          window.location = './welcome.html';
        } else {
          alert('FAILED TO LOGIN 1');
        }
      } else {
        alert('FAILED TO LOGIN 2');
      }
    }
  }

  httpRequest.open('GET', '/login/' + u + '/' + encodeURIComponent(p), true);
  httpRequest.send();
}

  function createAccount() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          window.location = './login.html';
        } else { alert('ERROR'); }
      }
    }

    let u = document.getElementById('usernameCreate').value;
    let p = document.getElementById('passwordCreate').value;
    let n = document.getElementById('name').value;
    let b = document.getElementById('bio').value;
    let e = document.getElementById('email').value;

    httpRequest.open('GET', '/create/' + u + '/' + encodeURIComponent(p) + '/' +
    n + '/' + b + '/' + e + '/', true);
    httpRequest.send();
  }

  function searchServices(){
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      return false;
    }

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status == 200) {
          console.log(httpRequest.responseText);
        }
      }
    }

    //creating the JSON string
    var searchKey = document.getElementById('searchServiceBar').value;
    console.log("key"+searchKey)

    let url = '/search/services/'+searchKey;
    httpRequest.open('GET', url);
    httpRequest.send();

  }
