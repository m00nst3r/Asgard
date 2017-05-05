from urllib.request import urlopen
import xmltodict
import json

last_day_currency_url = "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"
last_90_days_currency_url = "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml"


def load_currency_from_ecb(link):
    url_file = urlopen(link)
    data = url_file.read()
    url_file.close()

    jsonObject = json.loads(json.dumps(xmltodict.parse(data)))

    return jsonObject['gesmes:Envelope']['Cube']['Cube']


print(load_currency_from_ecb(last_day_currency_url))
print(load_currency_from_ecb(last_90_days_currency_url))
