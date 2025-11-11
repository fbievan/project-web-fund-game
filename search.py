import json
file = open('words.json',"r")
data = json.load(file)
print(data)