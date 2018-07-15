Schedule Scraper 
===============

<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/10622989/10264645/bb5fd5e4-6a01-11e5-8590-b2e31bf60741.gif">
</p>

El SIASE es un sistema desarrollado por la Universidad Autónoma de Nuevo León para dar servicio a sus alumnos; tiene la capacidad para mostrar horarios y revisar calificaciones, entre otras cosas.

Schedule Scraper es un script que permite extraer los horarios del SIASE en formato JSON.

Muestra de salida:

`[
  {
    "longName": "PROGRAMACION DE SISTEMAS ADAPTATIVOS",
    "shortName": "SISTADA",
    "sessions": [
      {
        "weekday": 2,
        "turn": 1,
        "group": "001",
        "classroom": "9105",
        "startTime": "7:00",
        "endTime": "7:50"
      },
      {
        "weekday": 2,
        "turn": 2,
        "group": "001",
        "classroom": "9105",
        "startTime": "7:50",
        "endTime": "8:40"
      },
      {
        "weekday": 2,
        "turn": 3,
        "group": "001",
        "classroom": "9105",
        "startTime": "8:40",
        "endTime": "9:30"
      },
      {
        "weekday": 2,
        "turn": 10,
        "group": "206",
        "classroom": "4204",
        "startTime": "15:20",
        "endTime": "16:10"
      },
      {
        "weekday": 2,
        "turn": 11,
        "group": "206",
        "classroom": "4204",
        "startTime": "16:10",
        "endTime": "17:00"
      }
    ],
    "frequency": 5
  },
  ...
]`

## Funcionamiento

Navegar hacia la página del horario y hacer copy-paste en la consola de desarrollador.

## Usos
* Crear carpetas para guardar los documentos de tus materias.
* Mostrar el horario en tu [smartwatch](https://cloud.githubusercontent.com/assets/10622989/10264092/94bf0998-69c8-11e5-89de-de357baf294b.png).
* Experimentos.
* etc.

## Escuelas compatibles

* FIME.
* FARQ.
* Medicina.
* Químicas.
* Prepa 7.
* *En teoría debería de funcionar en todas las dependencias porque la sección del horario es igual para todos... EN TEORÍA*.

## Notas
Siéntete con la confianza de escribirme a omaarg  gmail com.
