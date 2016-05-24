#!/usr/bin/env python3
#

# regexp: ^(.+?)\t(.+?)\t(.+?)\t(.+?)\t(.+?)$

import re
import json

f = open("feskills_no_icon.txt", "r")
text = f.read()
f.close()

# print(text)

r = re.compile('^(.+?)\t(.+?)\t(.+?)\t(.+?)\t(.+?)$', re.MULTILINE)

matches = re.findall(r, text)

json_out = "["

for m in matches:
	s = {
		"name": m[0],
		"class": m[1],
		"level": m[2],
		"activation": m[3],
		"effect": m[4]
	}
	# print("{\"skill\":\"" + m[0] + "\",\"class\":\"" + m[1] +"\",\"level\":" + m[2] +",\"activation\":\"" + m[3] +"\",\"effect\":\"" + m[4] +"\"},", end = "")
	json_out += json.dumps(s, sort_keys=True, separators=(',', ':')) + ","

json_out = json_out[:-1]
json_out += "]"

print(json_out)
