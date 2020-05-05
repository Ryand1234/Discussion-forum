#!/usr/bin/env python3

import os
import re
import sys

if (len(sys.argv) < 2):
    print("USAGE: ")
    print("./find.py <log_file_name> <target_file_name>")
    sys.exit(1)

f = open(sys.argv[2],'a')

with open(sys.argv[1]) as log:
    for line in log.readlines():
        f.write(line);
        res = re.search(r"^Error \[([A-Z_]+)\]: ([a-zA-Z_ ]+)", line.strip())
        if res is not None:
            print("Error: {}".format( res.group(1)))
            print("Detail: {}".format(res.group(2)))
            
f.close()
