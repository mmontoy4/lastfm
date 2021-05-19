var myAPI_key="062e9a51720da9c3c4e2bce4aaf4e5ab";
var myshared_secret="d28efddba401878b2c80f6f252f43a65";

var url = window.location.href; // or window.location.href for current url
var captured = /token=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
var result = captured ? captured : 'myDefaultValue';

//console.log(captured);

//Calcular API SIG

//CÁCULO DE API_SIG


function calculateApiSig(params) {

    //Crec que només necessitem apikey, token i secret i no necessitem params, els podem treure de sessionStorage
    //Calcula l'apiSig a partir dels valors d'abans...
   var stringActual = "";
   var arrayKeysParams = [];


    Object.keys(params).forEach(function (key) {
        arrayKeysParams.push(key); // Get list of object keys
    });
    arrayKeysParams.sort(); // Alphabetise it

    arrayKeysParams.forEach(function (key) {
        stringActual = stringActual + key + params[key]; // build string
    });

    console.log("Mi primer chorizo:" , stringActual);

    stringActual = stringActual + myshared_secret;
    console.log("Mi primer chorizo con shared:" , stringActual);

    console.log("Mi primer chorizo con shared limpio :" , stringActual);


    var hashed_sec = md5(unescape(encodeURIComponent(stringActual)));
    console.log("La apiSig es: " + hashed_sec);

    return hashed_sec; // Returns signed POSTable objec */

}

//PETICIÓN

function calculateApiSignatureStack() {

    // Set elsewhere but hacked into this example:
  //  var apisigGetSession;
    var data = {
        'token': Utf8.encode(captured),
        'api_key': "062e9a51720da9c3c4e2bce4aaf4e5ab",
         'method': 'auth.getSession'
    };

    data["api_sig"] = calculateApiSig( data);

    data["format"] = "json";

    console.log("DATa", data);
    var last_url="http://ws.audioscrobbler.com/2.0/?";

    $.ajax({
        type: "GET",
        url: last_url,
       data:data,
        dataType: 'json',
        //"success" gets called when the returned code is a "200" (successfull request). "error" gets called whenever another code is returned (e.g. 404, 500).
        success: function(res){
            //No caldria aquesta instrucció perque ja guaredem els que ens convé en sessionStorage
         //   data['method'] = res;
        //->     last_fm_data[method] = res;
           // var  myresposta = JSON.parse(res);
            console.log("Resposta: Name " + res.session.name);// Should return session key.
            console.log("Resposta: Key " + res.session.key);

            //store session key for further authenticate operations...
            sessionStorage.setItem("mySessionUser", res.session.name);
            sessionStorage.setItem("mySessionKey", res.session.key);
        },
        error : function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log('Error - ' + errorMessage);
        }
    });
}
