#!/usr/bin/env python3
#

import sys
import json

def put(s):
	print("%15s: " % s, end="")

if len(sys.argv) < 2:
	sys.exit(0)

pars = ["name", "weapons", "promotes_to", "promotes_from", "ables", "unit", "onlys"]

s = {
	"name": "",
	"weapons": [],
	"promotes_to": [],
	"promotes_from": [],
	"ables": [],
	"unit": "",
	"onlys": []
}

json_out = "["

while True:
	finish = False
	for x in pars:
		put(x)
		if type(s[x]) is list:
			s[x] = input().split(',')
		else:
			s[x] = input()

		if s['name'] == "end":
			finish = True
			break

	if finish:
		break

	json_out += json.dumps(s, sort_keys=True, separators=(',', ':')) + ","

json_out = json_out[:-1]
json_out += "]\n"


of = open(sys.argv[1], "w")

of.write(json_out)
of.close()

print("Saved")
