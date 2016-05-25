#!/usr/bin/env python3
#

import sys
import json

def put(s):
	print("%15s: " % s, end="")

if len(sys.argv) < 2:
	sys.exit(0)

pars = ["weapons", "promotes_to", "promotes_from", "ables", "unit", "onlys"]

arr = {}

s = {
	"weapons": [],
	"promotes_to": [],
	"promotes_from": [],
	"ables": [],
	"unit": [],
	"onlys": []
}

while True:
	put("name")
	name = input()
	if name == "end":
		break

	for x in pars:
		put(x)
		tmp = input()
		if len(tmp) > 0:
			s[x] = tmp.split(',')
		else:
			s[x] = []

	arr[name] = s

json_out = json.dumps(arr, sort_keys=True, separators=(',', ':'))

of = open(sys.argv[1], "w")

of.write(json_out)
of.close()

print("\n\nSaved")
