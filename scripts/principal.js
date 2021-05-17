var myAPI_key="062e9a51720da9c3c4e2bce4aaf4e5ab";
var myshared_secret="d28efddba401878b2c80f6f252f43a65";

var url = window.location.href; // or window.location.href for current url
var captured = /token=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
var result = captured ? captured : 'myDefaultValue';

console.log(captured);

//Calcular API SIG
