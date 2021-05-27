# Mini Last FM

> A continuació, explicaré de manera resumida el funcionament i contingut de la meva pàgina.

## Portada principal
![](https://i.imgur.com/mv6w6Af.png)
> Aquesta és la portada principal de la pàgina web.
> A part de la barra de navegació (en aquest cas és decorativa, no funcional), tenim el botó: *Login*.

### Funcionalitat del botó Login
> Aquest botó el que farà serà el següent:
* Al fer clic, tot seguit ens redirigirà a la nostra API de Last FM.
* Si no em entrat prèviament al nostre compte, ens demanarà autenticar-nos.
* Un cop consentim el ús de la app:
![](https://i.imgur.com/Rqdc0ip.png)
* Ens tornarà a redirigir, aquest cop a la pàgina principal.

## Pàgina principal
![](https://i.imgur.com/ptSVNs8.png)
> Té la estética semblant a la pàgina inicial, aquest cop però amb 5 botons que realitzaràn una sèrie de peticions a la API de Last FM.
#### Botó: Informació artista
>Aquest botó farà una petició que ens contestarà el nom de la cantant i el seu MBID.
#### Botó: Millors álbums del artista
>Aquest botó farà una petició que ens contestarà els noms dels 10 álbums més coneguts la cantant.
#### Botó: Informació sobre mi
>Mostra el meu nom d'usuari i el meu nom real.
#### Botó: Artista més famós internacionalment
>Mostra el nom del artista més escoltat actualment a Espanya.
#### Botó: Col·laboracions
>Mostra les col·laboracions que ha realitzat la cantant a lo llarg de la seva carrera.

## Console log
>La meva app també mostra informació al console log relativa a les connexions realitzades:
>
![](https://i.imgur.com/jfEVEYm.png)
