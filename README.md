Schedule Parser
===============

Schedule Parser es un script que permite extraer los horarios del SIASE en formato JSON.
Muestra de salida: 

`[
  {
    "fullName": "CULTURA DE LA LENGUA INGLESA",
    "shortName": "CULING",
    "days": [
      {
        "weekdayNumber": 1,
        "turn": 5,
        "group": "012",
        "classroom": "1205",
        "startTime": "10:20",
        "endTime": "11:10"
      },
      ...
 ]`

## Funcionamiento

Hay dos maneras de usar el script, una fea y una no tan fea:

1. Descargar la página completa,  e inyectar Zepto mediante la etiqueta script. Utilizar la consola y hacer copy-paste del
script en la frame. (fea)
2. Utilizar el complemento de Chrome. (no tan fea)

## Escuelas compatibles

* FIME
* Prepa 7
* ...

## Notas
Código en ingles para practicar :p
Para que el complemento de Chrome funcione hay que estar en la misma página del horario y esperar a que cargue.