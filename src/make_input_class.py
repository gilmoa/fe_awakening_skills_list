#!/usr/bin/env python3
#

import sys

def put(s):
	print("%15s: " % s, end="")

if len(sys.argv) < 2:
	sys.exit(0)

pars = ["name", "weapons", "promotes_to", "promotes_from", "ables", "unit", "onlys"]

outs = ""

while True:
	finish = False
	for x in pars:
		put(x)
		x = input()

		if x == "end":
			finish = True
			break

		outs += x + '\n'

	if finish:
		break

of = open(sys.argv[1], "a")

of.write(outs)
of.close()

print("Saved")
