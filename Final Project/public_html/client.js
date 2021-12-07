
function edit() {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == XMLHttpRequest.DONE) {
      if (httpRequest.status == 200) {
        console.log(httpRequest.response);
    }
  }
}

let u = document.getElementById('usernameLogin').value;

let url = '/edit/' + u;
 httpRequest.open('GET', url, true);
  httpRequest.send();
}

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
    let pName = document.getElementById('pName').value;
    let catagory = document.getElementById('serviceCategory').value;
    let price = document.getElementById('price').value;
    console.log(pName);
    var url ='/create/' + u + '/' + encodeURIComponent(p) + '/'
   + pName + '/' +  n + '/' + b + '/' + e + '/' + catagory + '/' +
   price + '/';

   console.log(url);
    httpRequest.open('GET',url, true);
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
          var responseArray = JSON.parse(httpRequest.responseText);
          if (responseArray.length==0){
            document.getElementById('searchResults').innerHTML="<h3>Sorry this service is not available. Try searching something else!</h3>";
          }else{
            var resultsString=constructSearchResult(responseArray);
            document.getElementById('searchResults').innerHTML=resultsString;
          }


          }


        }
      }

    var searchKey = document.getElementById('searchServiceBar').value;


    let url = '/search/services/'+searchKey;
    httpRequest.open('GET', url);
    httpRequest.send();

  }

  function constructSearchResult(responseArray){
    var resultsString=""
    for (var i=0;i<responseArray.length;i++){
      var response = responseArray[i];
      var serviceName = response.name;
      var personName = response.personName;
      var serviceType = response.class;
      var description = response.bio;
      var contact= response.contact;
      var price = response.price;
      resultsString+="<div class='search'>";
      resultsString+="<h3>Service: "+serviceName+"</h3><br>";
      resultsString+="Freelancer Name: "+personName+"<br>";
      resultsString+="Service Category: "+serviceType+"<br>";
      resultsString+="Description: "+description+"<br>";
      resultsString+="Contact: <a href=mailto:"+contact+">"+ contact+"</a><br>";
      resultsString+="Price: "+price+"<br></div>";
    }

    return resultsString;

  }

  function login() {
    var httpRequest = new XMLHttpRequest();

    let u = document.getElementById('usernameLogin').value;
    let p = document.getElementById('passwordLogin').value;

    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState == XMLHttpRequest.DONE) {
        if (httpRequest.status == 200) {
          if (httpRequest.responseText != false) {
            window.location="welcome.html";

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

function getSellerInfo(){
  var httpRequest = new XMLHttpRequest();
  if (!httpRequest) {
    return false;
  }

  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status == 200) {
        var response = JSON.parse(httpRequest.responseText);
        makeWelcomePage(response);

        }


      }
    }
  let url = '/welcome/';
  httpRequest.open('GET', url);
  httpRequest.send();

}
  function makeWelcomePage(response){
    var serviceName = response.name;
    var personName = response.personName;
    var serviceType = response.class;
    var description = response.bio;
    var contact= response.contact;
    var price = response.price;


    document.getElementById('welcomeService').innerText= serviceName;
    document.getElementById('welcomeName').innerText= personName;
    document.getElementById('welcomeCategory').innerText= serviceType;
    document.getElementById('welcomeDescription').innerText= description;
    document.getElementById('welcomeContact').innerText= contact;
    document.getElementById('welcomePrice').innerText= price;

    var editDivs= document.getElementsByClassName('editDiv');
    for(let i=0;i<editDivs.length;i++){
      editDivs[i].innerHTML="";
    }


  }

  function editSellerInformation(){
    serviceName = document.getElementById('welcomeService').innerText;
    personName = document.getElementById('welcomeName').innerText;
    serviceType = document.getElementById('welcomeCategory').innerText;
    description = document.getElementById('welcomeDescription').innerText;
    contact = document.getElementById('welcomeContact').innerText;
    price = document.getElementById('welcomePrice').innerText;
    console.log(typeof(description));

    var editDivs=document.getElementsByClassName('editDiv');
    editDivs[0].innerHTML="<input class='searchBar editBar' id='editServiceName' 'type='text' value='" + serviceName + "'>";
    editDivs[1].innerHTML="<input class='searchBar editBar' id='editPersonName' 'type='text' value='" + personName + "'>";
    editDivs[3].innerHTML="<input class='searchBar editBar' id='editDescription' 'type='text' value='" + description + "'>";
    editDivs[4].innerHTML="<input class='searchBar editBar' id='editContact' 'type='text' value='" + contact + "'>";
    editDivs[5].innerHTML="<input class='searchBar editBar' id='editPrice' 'type='text' value='" + price + "'>";
    console.log(editDivs[3].innerHTML);
    var editCategory="";

    editCategory+='<select class="searchBar editBar" name="serviceCategory" id="editServiceCategory" required>';
    editCategory+='<option value="development">IT & Development</option>';
    editCategory+='<option value="design">Design & Creative</option>';
    editCategory+='<option value="sales">Sales & Marketing</option>';
    editCategory+='<option value="writing">Writing & Translation</option>';
    editCategory+='<option value="support">Admin & Customer Support</option>';
    editCategory+='<option value="finance">Finance</option>';
    editCategory+='<option value="legal">Legal</option>';
    editCategory+='<option value="engineering">Engineering & Architecture</option>';
    editCategory+='<option value="homeService">Home Services</option>';
    editCategory+='<option value="other">Other</option>';
    editCategory+='</select>';
    document.getElementById('editWelcomeCategory').innerHTML=editCategory;
    document.getElementById('saveChangesdiv').innerHTML='<button id="saveChanges" onclick="submitEditedInfo();" class="Button" type="button" name="button">Save Changes</button>';

  }

  function submitEditedInfo(){
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      return false;
    }
  
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status == 200) {
          
  
          }
  
  
        }
      }
      s = document.getElementById('editServiceName').value;
      p = document.getElementById('editPersonName').value;
      e = document.getElementById('editServiceCategory');
      type = e.options[e.selectedIndex].text;
      d = document.getElementById('editDescription').value;
      c = document.getElementById('editContact').value;
      price = document.getElementById('editPrice').value;

      var editDivs= document.getElementsByClassName('editDiv');

      for(let i=0;i<editDivs.length;i++){
      editDivs[i].innerHTML="";
    }

    var welcomeDivs= document.getElementsByClassName('WelcomeDivs');

      for(let i=0;i<welcomeDivs.length;i++){
      welcomeDivs[i].innerHTML="";
    }



    let url = '/edit/'+s+'/'+p+'/'+type+'/'+d+'/'+c+'/'+price+'/';
    httpRequest.open('GET', url);
    httpRequest.send();
  
  }
