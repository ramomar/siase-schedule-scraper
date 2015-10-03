from os import read, makedirs
from sys import argv, exit
import json

if (len(argv) < 3):
    print("Uso:\npython create_folders.py horario.json path")
    exit(1)

json_file = open(argv[1], "r")
schedule = json.loads(json_file.read())

for course in schedule:
    print("Creating folder '%s'" % course['shortName'])
    makedirs(argv[2] + "/" + course['shortName'])
