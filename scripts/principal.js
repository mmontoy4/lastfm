let myAPI_key = "062e9a51720da9c3c4e2bce4aaf4e5ab";
let myshared_secret = "d28efddba401878b2c80f6f252f43a65";

let url = window.location.href; // or window.location.href for current url
let captured = /token=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
let result = captured ? captured : 'myDefaultValue';
let nomArtista = null;
let mbid = null;
let nomAlbum = null;
let mbidAlbum = null;
let nomUsuari = null;
let nomDePila = null;
let artistaMesFamos = null;
let MyAPI_sig = null;
let MyAPI_sk = null;
//console.log(captured);

//Calcular API SIG

//CÁCULO DE API_SIG

/**
 * Aquesta funció el que fa és calcular el APISIG, codi que es genera i caduca per cada sessió.
 * Si recarregues la pàgina l'has de tornar a generar.
 *  @param {array} params - Passa els paràmetres necessaris per calcular el apisig.
 *  @return hashed_sec - És el apiSig.
 **/

function calculateApiSig(params) {

    //Crec que només necessitem apikey, token i secret i no necessitem params, els podem treure de sessionStorage
    //Calcula l'apiSig a partir dels valors d'abans...
    let stringActual = "";
    let arrayKeysParams = [];


    Object.keys(params).forEach(function (key) {
        arrayKeysParams.push(key); // Get list of object keys
    });
    arrayKeysParams.sort(); // Alphabetise it

    arrayKeysParams.forEach(function (key) {
        stringActual = stringActual + key + params[key]; // build string
    });

    console.log("Mi primer chorizo:", stringActual);

    stringActual = stringActual + myshared_secret;
    console.log("Mi primer chorizo con shared:", stringActual);

    console.log("Mi primer chorizo con shared limpio :", stringActual);


    let hashed_sec = md5(unescape(encodeURIComponent(stringActual)));
    console.log("La apiSig es: " + hashed_sec);

    MyAPI_sig = hashed_sec;

    return hashed_sec; // Returns signed POSTable objec */

}

//PETICIÓN

/**
 * Aquesta funció s'executa quan se recarrega la pàgina principal.html
 * Ens mostra el nom d'usuari de la sessió i el session key.
 * @param {array} data - Conté totes les dades necesàries per per la concatenació amb la url arrel per realitzar la petició.
 */

$(document).ready(function () {

    // Set elsewhere but hacked into this example:
    //  var apisigGetSession;
    let data = {
        'token': Utf8.encode(captured),
        'api_key': "062e9a51720da9c3c4e2bce4aaf4e5ab",
        'method': 'auth.getSession'
    };

    data["api_sig"] = calculateApiSig(data);

    data["format"] = "json";

    console.log("DATa", data);
    let last_url = "http://ws.audioscrobbler.com/2.0/?";

    $.ajax({
        type: "GET",
        url: last_url,
        data: data,
        dataType: 'json',
        //"success" gets called when the returned code is a "200" (successfull request). "error" gets called whenever another code is returned (e.g. 404, 500).
        success: function (res) {
            console.log("Resposta: Name " + res.session.name);// Should return session key.
            console.log("Resposta: Key " + res.session.key);

            //store session key for further authenticate operations...
            sessionStorage.setItem("mySessionUser", res.session.name);
            sessionStorage.setItem("mySessionKey", res.session.key);
            nomUsuari = res.session.name;
            MyAPI_sk = res.session.key;
            $("#nomUsuari").text(nomUsuari);
        },
        error: function (xhr, status, error) {
            let errorMessage = xhr.status + ': ' + xhr.statusText
            console.log('Error - ' + errorMessage);
        }
    });
});

/**
 * Fa la petició jQuery en format JSON, mètode artist.getinfo
 *  * @param {array} data - Conté totes les dades necesàries per per la concatenació amb la url arrel per realitzar la petició.
 */
function infoArtista() {

    let data = {
        'token': Utf8.encode(captured),
        'api_key': "062e9a51720da9c3c4e2bce4aaf4e5ab",
        'artist': "Doja Cat",
        'autocorrect': 1,
        'method': 'artist.getinfo'
    };
    //console.log(tupu);
    //data["api_sig"] = calculateApiSig( data);

    data["format"] = "json";

    console.log("DATa", data);
    let last_url = "http://ws.audioscrobbler.com/2.0/?";

    $.ajax({
        type: "GET",
        url: last_url,
        data: data,
        dataType: 'json',
        //"success" gets called when the returned code is a "200" (successfull request). "error" gets called whenever another code is returned (e.g. 404, 500).
        success: function (res) {
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
            $("#nomArtista").text("Nom: " + res.artist.name);
            $("#mbidArtista").text("MBID: " + res.artist.mbid);
        },
        error: function (xhr, status, error) {
            let errorMessage = xhr.status + ': ' + xhr.statusText
            console.log('Error - ' + errorMessage);
        }
    });

}

/**
 * Fa la petició jQuery en format JSON, mètode artist.getTopAlbums
 *  @param {array} data - Conté totes les dades necesàries per per la concatenació amb la url arrel per realitzar la petició.
 */

function millorsAlbumsArtista() {
    let data = {
        'token': Utf8.encode(captured),
        'api_key': "062e9a51720da9c3c4e2bce4aaf4e5ab",
        'artist': "Doja Cat",
        'autocorrect': 1,
        'method': 'artist.getTopAlbums'
    };

    //data["api_sig"] = calculateApiSig( data);

    data["format"] = "json";

    //console.log("DATa", data);
    let last_url = "http://ws.audioscrobbler.com/2.0/?";

    $.ajax({
        type: "GET",
        url: last_url,
        data: data,
        dataType: 'json',

        //Si la peticio ha anat bé, passara les dades de la resposta (200 OK) a la variable res, agafaré les que m'interessin
        //i les aniré imprimint a un div amb el id corresponent de la pagina html principal.
        success: function (res) {

            let string = "";
            //let foto = null;
            for (let i = 0; i <= 10; i++) {
                console.log(res.topalbums.album[i]);

                //Aquest if el que fa es, com tinc tots els noms del album concatenats, fico una coma i un espai, i en cas de que
                //sigui el últim album un punt final.
                if (i !== 10) {
                    string += "Nom: " + res.topalbums.album[i].name + ", ";
                } else {
                    string += "Nom: " + res.topalbums.album[i].name + ".";
                }


            }
            $("#nomAlbum").text(string);

        },
        error: function (xhr, status, error) {
            let errorMessage = xhr.status + ': ' + xhr.statusText
            console.log('Error - ' + errorMessage);
        }
    });

}

/**
 * Fa la petició jQuery en format XML, mètode user.getInfo
 * @param {array} data - Conté totes les dades necesàries per per la concatenació amb la url arrel per realitzar la petició.
 */
function infoUsuari() {

    let data = {
        'user': "mmontoy4",
        'api_key': "062e9a51720da9c3c4e2bce4aaf4e5ab",
        'method': 'user.getInfo'
    };

    //data["api_sig"] = calculateApiSig( data);

    data["format"] = "xml";

    //console.log("DATa", data);
    let last_url = "http://ws.audioscrobbler.com/2.0/?";

    $.ajax({
        type: "GET",
        url: last_url,
        data: data,
        dataType: 'xml',

        //Si la peticio ha anat bé, passara les dades de la resposta (200 OK) a la variable res, agafaré les que m'interessin
        //i les aniré imprimint a un div amb el id corresponent de la pagina html principal.
        success: function (res) {

            //nomDePila = res.user.realname;

            $(res).find("lfm").find("user").each(function (index, element) {
                console.log($(element).find("realname").text());
                $("#nomDePila").text($(element).find("realname").text());
                //console.log($(element).find("binding[name='latitud']").find("literal").text());
                //console.log($(element).find("binding[name='longitud']").find("literal").text());
            });

            //$("#nomDePila").text("El meu nom de pila"+res.user.realname);

        },
        error: function (xhr, status, error) {
            let errorMessage = xhr.status + ': ' + xhr.statusText
            console.log('Error - ' + errorMessage);
        }
    });

}

/**
 * Fa la petició jQuery en format XML, mètode geo.getTopArtists
 * @param {array} data - Conté totes les dades necesàries per per la concatenació amb la url arrel per realitzar la petició.
 */

function millorArtistaEspanya() {

    let data = {
        'country': "spain",
        'limit': 1,
        'api_key': "062e9a51720da9c3c4e2bce4aaf4e5ab",
        'method': 'geo.getTopArtists'
    };

    //data["api_sig"] = calculateApiSig( data);

    data["format"] = "xml";

    //console.log("DATa", data);
    let last_url = "http://ws.audioscrobbler.com/2.0/?";

    $.ajax({
        type: "GET",
        url: last_url,
        data: data,
        dataType: 'xml',

        //Si la peticio ha anat bé, passara les dades de la resposta (200 OK) a la variable res, agafaré les que m'interessin
        //i les aniré imprimint a un div amb el id corresponent de la pagina html principal.
        success: function (res) {

            //nomDePila = res.user.realname;

            $(res).find("lfm").find("topartists").each(function (index, element) {
                console.log($(element).find("artist").find("name").text());
                //console.log($(element).find("binding[name='latitud']").find("literal").text());
                //console.log($(element).find("binding[name='longitud']").find("literal").text());
                $("#artistaMesFamos").text($(element).find("artist").find("name").text());
            });


            //$("#nomDePila").text("El meu nom de pila"+res.user.realname);

        },
        error: function (xhr, status, error) {
            let errorMessage = xhr.status + ': ' + xhr.statusText
            console.log('Error - ' + errorMessage);
        }
    });

}

/**
 * Fa la petició XMLHttpRequest en format XML, mètode artist.getinfo
 * @param {array} data - Conté totes les dades necesàries per per la concatenació amb la url arrel per realitzar la petició.
 */

function httpReq() { // Información sobre David Gahan
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 0) {
            console.log("0:request not initialized");
        } else if (this.readyState === 1) {
            console.log("1:server connection established");
        } else if (this.readyState === 2) {
            console.log("2:request received");
        } else if (this.readyState === 3) {
            console.log("3:processing request");
        }
        try { // le pongo un try catch
            if (this.readyState === 4 && this.status === 200) { // 200 OK
                console.log("4:request finished and response is ready");
                imprmir(this);
            }
        } catch (error) {
            console.log(error);
        }
    };
    xhttp.open("GET", "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Doja%20Cat&api_key=062e9a51720da9c3c4e2bce4aaf4e5ab", true);
    xhttp.send();


}

/**
 * Aquesta funció imprimeix els resultats de la resposta XMLHttpRequest
 * @param xml - És la resposta
 */

function imprmir(xml) {
    let i;
    let xmlDoc = xml.responseXML;
    let table = "<tr><th>Name</th><th>Url</th></tr>";
    let x = xmlDoc.getElementsByTagName("artist");
    for (i = 0; i < x.length; i++) {
        table += "<tr><td>" +
            x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue +

            "</td><td>" +

            x[i].getElementsByTagName("url")[0].childNodes[0].nodeValue +
            "</td><td> </tr>";


    }
    document.getElementById("imprimir").innerHTML = table;
}

/**
 * Fa la petició XMLHttpRequest en format XML, mètode artist.getinfo
 */

window.onload = function () {


    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 0) {
            console.log("0:request not initialized");
        } else if (this.readyState === 1) {
            console.log("1:server connection established");
        } else if (this.readyState === 2) {
            console.log("2:request received");
        } else if (this.readyState === 3) {
            console.log("3:processing request");
        }
        try { // le pongo un try catch
            if (this.readyState === 4 && this.status === 200) { // 200 OK
                console.log("4:request finished and response is ready");
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


/**
 * Aquesta funció imprimeix els resultats de la resposta XMLHttpRequest
 * @param dades - És la resposta
 */

function imprimir2(dades) { // Passa el nom del artista
    console.log(dades);

    let txt = "";

    txt = "<h1>  " + dades.artist.name + "</h1>";
    document.getElementById("imprimir2").innerHTML = txt;
}
