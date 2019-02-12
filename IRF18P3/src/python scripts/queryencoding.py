from sys import argv, exit
import urllib2
# import re
import goslate
import codecs
#from googletrans import Translator
# from textblob import TextBlob

speacialChar = ['^', '!', '{', '?', '\\', '||', ' ', '*', ':', '/', ']', '}', '+', '"', '&&', '-', '(', ')', '~', '[']
if len(argv) != 4:
    print ("Please provide all arguments\npython queryencoding.py <queries.txt path> <o/p file> <core name bm25/dfr/svm>")
    exit(0)

prefix = 'http://' + 'localhost' + ':' + '8983' + '/solr/' + argv[3] + '/select?q='
tail = '&fl=id%2Cscore&wt=json&indent=true&rows=20'
urls = []

def formatSpecialChar(text):
    for char in speacialChar:
        if char in text:
            text = text.replace(char, '\\' + char)
    return text

with codecs.open(argv[1], encoding='utf-8') as queries:
    for query in queries.read().splitlines():
        split = query.split(' ', 1)
        text = split[1]

        if split[1].startswith("lang:"):
            text = text[7:]

        gs = goslate.Goslate()
        # translator = Translator()

      #  print(text)
        en = formatSpecialChar(gs.translate(text, 'en'))
        de = formatSpecialChar(gs.translate(text, 'de'))
        ru = formatSpecialChar(gs.translate(text, 'ru'))


        # esc=re.escape(translator.translate(text, dest='en'))
        # en = formatSpecialChar(translator.translate(text, dest='en'))
        # de = formatSpecialChar(translator.translate(text, dest='de'))
        # ru = formatSpecialChar(translator.translate(text, dest='ru'))

        # en = re.escape(gs.translate(text, 'en'))
        # de = re.escape(gs.translate(text, 'de'))
        # ru = re.escape(gs.translate(text, 'ru'))

        q = en + ' OR ' + de + ' OR ' + ru

        if split[1].startswith("lang:"):
            q = split[1][0:7] + ' ' + q

        q = urllib2.quote(q.encode('utf-8'))
        url = prefix + q + tail
        urls.append((split[0], url))

with open(argv[2], 'w') as output:
    for url in urls:
        output.write(url[0] + ' ' + url[1] + '\n')
    output.close()
exit(0)