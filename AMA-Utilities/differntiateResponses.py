import os
import sys
responsefile = sys.argv[1]
command = "grep -o  '[0123456789]*@c.us\|attend\|busy\|not\|\s0' " + \
    responsefile + " > dummy.txt"
os.system(command)
fd = open("dummy.txt", "r")
fl = open("lowraters.txt", "w")
fu = open("uppraters.txt", "w")
responses = fd.readlines()
users = []
for s in responses:
    if(s.find("@c.us") != -1):
        for user in users:
            fu.write(user)  # add numbers in uppraters
        users = []
        users.append(s)
    else:
        for user in users:
            fl.write(user)  # add numbers in lowraters
        users = []
for user in users:
    fu.write(user)  # add remaining numbers in uppraters
fd.close()
fl.close()
fu.close()
os.system("rm dummy.txt")
