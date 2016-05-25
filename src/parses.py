#!/usr/bin/env python3
#

# regexp: ^(.+?)\t(.+?)\t(.+?)\t(.+?)\t(.+?)$ /gm/

import re
import json

f = open("skills_raw.txt", "r")
text = f.read()
f.close()

# print(text)

r = re.compile('^(.+?)\t(.+?)\t(.+?)\t(.+?)\t(.+?)$', re.MULTILINE)

matches = re.findall(r, text)

arr = []

for m in matches:
	s = {
		"name": m[0].lower(),
		"class": m[1].lower(),
		"level": m[2],
		"activation": m[3],
		"effect": m[4]
	}

	arr.append(s)

json_out = json.dumps(arr, sort_keys=True, separators=(',', ':'))

print(json_out)
