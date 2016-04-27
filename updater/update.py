#loader and updator for mapbox dataset


import base64
import json

import responses

from mapbox.services.datasets import Datasets


username = 'sedonachamber'
layerid = 'sedonachamber.pmj9fija'
mbkey = 'pk.eyJ1Ijoic2Vkb25hY2hhbWJlciIsImEiOiJjaW13Zmp3cGswMzd0d2tsdXBnYmVjNmRjIn0.PlcjviLrxQht-_tBEbQQeg'

#access_token = 'pk.{0}.test'.format(base64.b64encode(b'{"u":"sedonachamber"}').decode('utf-8'))

