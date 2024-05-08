// This is node.js code and we are telling node.js to connect with mongodb database//

const mongoose = require("mongoose" /*helper which connect your backend-part to database,*/);
const plm = require(/*passport used for authencitation & authorization, local means creating your own signin & sigup feature wihout onClick (help Nahi lena of google or github or facebook or twitter) */ "passport-local-mongoose");

//below is setup connection for connecting mongoDB with mongoose//
//127.0.0.1(loalhost):27017(port):-losthost is your computer system ka address and port is mongodb ka by default port(number) to connect with mongodb datase it 27017
mongoose.connect("mongodb://127.0.0.1:27017/Auth_Ps_1");

const userSchema = mongoose.Schema(
  /*a particular enity*/ {
    username: String, //property of particular entity//
    password: String, //property of particular entity//
    secret: String, //property of particular entity//
  }
);

userSchema.plugin(plm);

module.exports = mongoose./*kandah, user a kandah in amazon*/ model(
  "user" /*model name*/,
  userSchema /*specifies what fields each document will have and what types of data those fields can hold.*/
);
