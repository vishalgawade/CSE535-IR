from os.path import isfile, join, basename, splitext, exists
from subprocess import call
from sys import argv,exit
from os import listdir, makedirs

if len(argv) != 3:
  print ("Please provide all arguments\npython trec_run.py  <model result directory path> <qrel.txt>")
  exit(0)
#array of paths of all files in directory
onlyfiles = [ join(argv[1], f) for f in listdir(argv[1]) if isfile(join(argv[1],f)) ]
#print(files)
#concatenation of path,result folder inside model result folder
rp = join(argv[1], 'TREC_Result')
#onlyfiles = [f for f in listdir(argv[1]) if isfile(join(argv[1], f))]
#create directory if not present
if not exists(rp):
    makedirs(rp)

for f in onlyfiles:
  #getting model results filename
  fname = splitext(basename(f))[0]
  #print(name)
  #forming path trec result path + filename
  frpath = join(rp, fname)
  #print(frpath)
  with open(frpath+".txt", 'w') as output:
    call(['trec_eval', '-q', '-c', '-M', '20', argv[2], f], stdout=output)
