var myAPI_key="062e9a51720da9c3c4e2bce4aaf4e5ab";
var myshared_secret="d28efddba401878b2c80f6f252f43a65";

var url = window.location.href; // or window.location.href for current url
var captured = /token=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
var result = captured ? captured : 'myDefaultValue';
let nomArtista = null;
let mbid = null;
let nomAlbum = null;
let mbidAlbum = null;
let nomUsuari = null;
let nomDePila = null;
let artistaMesFamos = null;
var MyAPI_sig = null;
var MyAPI_sk = null;
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

    MyAPI_sig = hashed_sec;

    return hashed_sec; // Returns signed POSTable objec */

}

//PETICIÓN

$(document).ready(function(){

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
            nomUsuari = res.session.name;
            MyAPI_sk = res.session.key;
            $("#nomUsuari").text(nomUsuari);
        },
        error : function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log('Error - ' + errorMessage);
        }
    });
});
  function infoArtista(){

    var data = {
        'token': Utf8.encode(captured),
        'api_key': "062e9a51720da9c3c4e2bce4aaf4e5ab",
        'artist' : "Doja Cat",
        'autocorrect' : 1,
         'method': 'artist.getinfo'
    };
    //console.log(tupu);
    //data["api_sig"] = calculateApiSig( data);

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
            //console.log("Resposta: Name " + res.artist.name);// Should return session key.
            //console.log("Resposta: Key " + res.artist.mbid);
            nomArtista = res.artist.name;
            mbid = res.artist.mbid;

            //store session key for further authenticate operations...
            sessionStorage.setItem("mySessionUser", res.artist.name);
            sessionStorage.setItem("mySessionKey", res.artist.mbid);
            $("#nomArtista").text("Nom: "+res.artist.name);
            $("#mbidArtista").text("MBID: "+res.artist.mbid);
        },
        error : function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log('Error - ' + errorMessage);
        }
    });

  }

  function millorsAlbumsArtista(){
    var data = {
        'token': Utf8.encode(captured),
        'api_key': "062e9a51720da9c3c4e2bce4aaf4e5ab",
        'artist' : "Doja Cat",
        'autocorrect' : 1,
         'method': 'artist.getTopAlbums'
    };

    //data["api_sig"] = calculateApiSig( data);

    data["format"] = "json";

    //console.log("DATa", data);
    var last_url="http://ws.audioscrobbler.com/2.0/?";

    $.ajax({
        type: "GET",
        url: last_url,
        data:data,
        dataType: 'json',

        //Si la peticio ha anat bé, passara les dades de la resposta (200 OK) a la variable res, agafaré les que m'interessin
        //i les aniré imprimint a un div amb el id corresponent de la pagina html principal.
        success: function(res){

            var string = "";
            //let foto = null;
            for (var i=0; i<= 10; i++)
            {
              console.log(res.topalbums.album[i]);

              //Aquest if el que fa es, com tinc tots els noms del album concatenats, fico una coma i un espai, i en cas de que
              //sigui el últim album un punt final.
              if(i!=10){
                string += "Nom: "+res.topalbums.album[i].name+", ";
              }else{
                  string += "Nom: "+res.topalbums.album[i].name+".";
              }


            }
            $("#nomAlbum").text(string);

        },
        error : function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log('Error - ' + errorMessage);
        }
    });

  }

  function infoUsuari(){

    var data = {
        'user' : "mmontoy4",
        'api_key': "062e9a51720da9c3c4e2bce4aaf4e5ab",
        'method' : 'user.getInfo'
    };

    //data["api_sig"] = calculateApiSig( data);

    data["format"] = "xml";

    //console.log("DATa", data);
    var last_url="http://ws.audioscrobbler.com/2.0/?";

    $.ajax({
        type: "GET",
        url: last_url,
        data:data,
        dataType: 'xml',

        //Si la peticio ha anat bé, passara les dades de la resposta (200 OK) a la variable res, agafaré les que m'interessin
        //i les aniré imprimint a un div amb el id corresponent de la pagina html principal.
        success: function(res){

            //nomDePila = res.user.realname;

            $(res).find("lfm").find("user").each(function(index,element){
              console.log($(element).find("realname").text());
              $("#nomDePila").text($(element).find("realname").text());
              //console.log($(element).find("binding[name='latitud']").find("literal").text());
              //console.log($(element).find("binding[name='longitud']").find("literal").text());
});

            //$("#nomDePila").text("El meu nom de pila"+res.user.realname);

        },
        error : function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log('Error - ' + errorMessage);
        }
    });

  }
  function millorArtistaEspanya(){

    var data = {
        'country' : "spain",
        'limit' : 1,
        'api_key': "062e9a51720da9c3c4e2bce4aaf4e5ab",
        'method' : 'geo.getTopArtists'
    };

    //data["api_sig"] = calculateApiSig( data);

    data["format"] = "xml";

    //console.log("DATa", data);
    var last_url="http://ws.audioscrobbler.com/2.0/?";

    $.ajax({
        type: "GET",
        url: last_url,
        data:data,
        dataType: 'xml',

        //Si la peticio ha anat bé, passara les dades de la resposta (200 OK) a la variable res, agafaré les que m'interessin
        //i les aniré imprimint a un div amb el id corresponent de la pagina html principal.
        success: function(res){

            //nomDePila = res.user.realname;

            $(res).find("lfm").find("topartists").each(function(index,element){
                console.log($(element).find("artist").find("name").text());
              //console.log($(element).find("binding[name='latitud']").find("literal").text());
              //console.log($(element).find("binding[name='longitud']").find("literal").text());
              $("#artistaMesFamos").text($(element).find("artist").find("name").text());
            });


            //$("#nomDePila").text("El meu nom de pila"+res.user.realname);

        },
        error : function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log('Error - ' + errorMessage);
        }
    });

  }

  //Artist info

  function httpReq() { // Información sobre David Gahan
       var xhttp = new XMLHttpRequest();
       xhttp.onreadystatechange = function () {
           if (this.readyState == 0) {
               console.log("0:request not initialized");
           } else if (this.readyState == 1) {
               console.log("1:server connection established");
           } else if (this.readyState == 2) {
               console.log("2:request received");
           } else if (this.readyState == 3) {
               console.log("3:processing request");
           }
           try { // le pongo un try catch
               if (this.readyState == 4 && this.status == 200) { // esto es que la consulta está perfectamente
                   console.log("4:request finished and response is ready");
                   //  document.getElementById("demo").innerHTML = this.responseText;
                   imprmir(this);
               }
           } catch (error) {
               console.log(error);
           }
       };
       xhttp.open("GET", "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Doja%20Cat&api_key=062e9a51720da9c3c4e2bce4aaf4e5ab", true);
       xhttp.send();


   }


   function imprmir(xml) {
       var i;
       var xmlDoc = xml.responseXML;
       var table = "<tr><th>Name</th><th>Url</th></tr>";
       var x = xmlDoc.getElementsByTagName("artist");
       for (i = 0; i < x.length; i++) {
           table += "<tr><td>" +
               x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +

               "</td><td>" +

               x[i].getElementsByTagName("url")[0].childNodes[0].nodeValue +
               "</td><td> </tr>";


       }
       document.getElementById("imprimir").innerHTML = table;
   }

//Artist info JSON

window.onload = function()  { //Información sobre M. L. Gore


        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 0) {
                console.log("0:request not initialized");
            } else if (this.readyState == 1) {
                console.log("1:server connection established");
            } else if (this.readyState == 2) {
                console.log("2:request received");
            } else if (this.readyState == 3) {
                console.log("3:processing request");
            }
            try { // le pongo un try catch
                if (this.readyState == 4 && this.status == 200) { // esto es que la consulta está perfectamente
                    console.log("4:request finished and response is ready");
                    //  document.getElementById("demo").innerHTML = this.responseText;
                    imprimir2(this.response);
                }
            } catch (error) {
                console.log(error);
            }
        };
        xhttp.responseType = 'json';
        xhttp.open("GET", "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Doja%20Cat&api_key=062e9a51720da9c3c4e2bce4aaf4e5ab&format=json", true);
        xhttp.send();


    }




function imprimir2(dades){ // Pone el nombre del artista
 console.log(dades);

 var txt = "";

 txt = "<h1>  " +dades.artist.name +"</h1>";
    document.getElementById("imprimir2").innerHTML = txt;
}
