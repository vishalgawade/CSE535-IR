from sys import argv, exit
import json
from urllib2 import urlopen

# Make sure we have the correct command line arguments
if len(argv) < 4:
    print ("Please provide all arguments \npython solr_trec.py <Formatted Query File> (!) <O/p folder> <model name bm25/dfr/svm>>")
    exit(0)

urls = []  # (id, url) format

with open(argv[1]) as queries:
    for query in queries.read().splitlines():
        split = query.split(' ', 1)
        urls.append((split[0], split[1]))

for url in urls:
    # output = open(argv[3] + '/' + str(int(url[0])) + '.txt', 'w')
    output = open(argv[3] + '/' + argv[4] + '.txt', 'a')
    data = urlopen(url[1])
    docs = json.load(data)['response']['docs']

    rank = 0
    for doc in docs:
        output.write(
            url[0] + ' ' + 'Q0' + ' ' + str(doc['id']) + ' ' + str(rank) + ' ' + str(doc['score']) + ' ' + argv[
                4] + '\n')
        rank += 1

    output.close()
exit(0)
