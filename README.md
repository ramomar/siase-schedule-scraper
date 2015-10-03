Schedule Parser
===============

Schedule Parser es un script que permite extraer los horarios del SIASE en formato JSON.
Muestra de salida:

`
[
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
  }
  ...
]
`

## Funcionamiento

Navegar hacia la página del horario y hacer copy-paste en la consola de desarrollador.

## Usos
* Crear carpetas de manera automática.
* Mostrar tu horario en tu reloj.

## Escuelas compatibles

* FIME
* Prepa 7
* ...

## Notas
Probado en Google Chrome  44.0.2403.89 y Safari  8.0.7.
