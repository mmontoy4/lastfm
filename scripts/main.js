  var myapplication_name="api doc";
  var myAPI_key="062e9a51720da9c3c4e2bce4aaf4e5ab";
  var myshared_secret="d28efddba401878b2c80f6f252f43a65";

  /**
   * Aquesta funció el que fa és redirigir-nos de la api de last fm a la nostra pàgina principal.html
   * @param url - És la url que canviarem de la barra de navegació del nostre navegador per redireccionar-nos a principal.html
    */

  function loginLastFm(){
  			/*
  			params api_key ( my api key)
  			cb the web that goes when user is authenticated relative path ( depends on the server is launched): http://localhost:3000/mainpage.ht*/
  			var url= 'http://www.last.fm/api/auth/?api_key=062e9a51720da9c3c4e2bce4aaf4e5ab&cb=https://mmontoy4.github.io/lastfm/principal.html';

  			window.location.replace(url);
  }
