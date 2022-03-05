# LocalBizz

## Overview
The main purpose of LocalBizz is to provide a platform to Freelancers to offer services to people. Freelancers can create their profiles on LocalBizz and we also give the option to edit the information later. The customers can search up freelancers by the name of the service, name of the category, or by description. The customers can contact freelancers through the contact information provided by them. <br>
<br>

# Functionality

This project allows user sign ups and signins. The server uses cookies to authenticate and validate sessions. Passwords are hashed using `sha512` algorithm and then a `salt` is added for increased security. Most functionality are on the server side as `client.js` primarily sends http requests to the server. 
### Used tools

HTML, CSS, JavaScript (jQuery), Node.js, MongoDB

# How to use

### Install these before running it locally
* Make sure that run `npm update` to upgrade to the latest version
* Run  `npm install node express mongoose body-parser cookie-parser crypto` to install all necessary modules
* Go to [`Install MongoDB Community Edition`](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) and follow the instructions to start `MongoDB`

Then, clone the repo with: `git clone https://github.com/AlFarabiDHK/CSC-337-Final-Project.git`

You can use the lastest versions of each module to run this project

Now, run `node server.js` and go to [`localhost:80`](http://localhost:80/) to use the app

## Link
You can also visit this link to see how the site works:
 http://167.172.147.63/

