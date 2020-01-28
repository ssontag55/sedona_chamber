#loader and updator for mapbox dataset
#simple view api to Geojson
#sontag SUmmer 2016
#mapblender.com
#walksedona.com

#virtualenv -p /usr/local/bin/python2.7 ENV
#source ENV/bin/activate


#depdencies
import base64,sys
import json,string

import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning
from xml.etree import ElementTree

import os
import shutil
#import time 
#from dateutil.parser import parse
#from datetime import datetime, timedelta


#open jsonfile

#jsonfile = open('data/gallery.json', 'w')

jsonfile = open('/var/chroot/home/content/19/12215219/html/artwalk/restaurants/data/gallery.json', 'w')
jsonfile.write("""{"type": "FeatureCollection","features": [""");

##jsonfile.write("""{"type": "FeatureCollection","features": [{"type":"Feature","properties":{"id":"marker-ingzj0s2a","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.790137,34.863415],"type":"Point"},"id":"0d6f6ea6bc6e0d5d6579ac5d20928f32"},{"type":"Feature","properties":{"title":"Suggested Walking Route","description":"<a href=\\"http://www.hillsidesedona.net/\\" target=\\"_blank\\"><img src=\\"http://sedona.simpleviewcrm.com/images//listings/Hillside-160x160.jpg\\" height=\\"160\\" width=\\"160\\"></a><br><a href=\\"http://www.hillsidesedona.net/\\" target=\\"_blank\\">Visit Site for More Info!</a><br>7 Minute Walk ","stroke":"#548cba","stroke-width":8,"stroke-opacity":1,"marker-color":"","marker-size":"","marker-symbol":""},"geometry":{"coordinates":[[-111.763637,34.858441],[-111.763443,34.858751],[-111.763167,34.859015],[-111.76292,34.85928],[-111.762569,34.859579],[-111.762379,34.859788],[-111.762196,34.860012],[-111.762011,34.860378],[-111.761842,34.860763],[-111.761606,34.861423],[-111.761585,34.861637],[-111.761512,34.861802],[-111.761448,34.861868],[-111.761424,34.861971],[-111.761335,34.862114],[-111.761488,34.86222],[-111.761577,34.862183],[-111.761668,34.862218],[-111.761579,34.862449],[-111.761896,34.862543],[-111.762084,34.862601],[-111.762172,34.862629],[-111.762472,34.862739],[-111.762759,34.862827],[-111.762891,34.862557]],"type":"LineString"},"id":"11d4565e656e4b794a06c93253c24016"},{"type":"Feature","properties":{"id":"marker-ingzkv4hb","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.822602,34.85528],"type":"Point"},"id":"1cecd36a7ae0eba23bbd536cdfe62508"},{"type":"Feature","properties":{"id":"marker-ingz46rf5","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.782584,34.862433],"type":"Point"},"id":"244fb19259cc1b87d2aedee0ae3b7869"},{"type":"Feature","properties":{"id":"marker-io29lwpc0","title":"Parking Available ","description":"Parking only available on weekends and after 5pm.","marker-size":"medium","marker-color":"#1f1f1f","marker-symbol":"parking"},"geometry":{"coordinates":[-111.761802,34.870072],"type":"Point"},"id":"25894bb15f6acaaf2eb6825fd217d4b8"},{"type":"Feature","properties":{"title":"To Uptown Walking Route","description":"<br> 20 Minute Walk","stroke":"#72BF61","stroke-width":8,"stroke-opacity":1,"marker-color":"","marker-size":"","marker-symbol":""},"geometry":{"coordinates":[[-111.762768,34.862834],[-111.76288,34.862867],[-111.763191,34.862986],[-111.763516,34.863122],[-111.763714,34.863371],[-111.763806,34.863736],[-111.763741,34.864174],[-111.76343,34.865079],[-111.763339,34.865347],[-111.763312,34.865596],[-111.763374,34.865889],[-111.763258,34.865994],[-111.763097,34.866098],[-111.762719,34.866296],[-111.762448,34.866535],[-111.762263,34.866692],[-111.762121,34.866881],[-111.762043,34.866971],[-111.76196,34.867108],[-111.761853,34.867301],[-111.76162,34.867871],[-111.761362,34.868571],[-111.761223,34.868915],[-111.761094,34.869207],[-111.760946,34.869606],[-111.760667,34.870061],[-111.760209,34.870635],[-111.759675,34.871102],[-111.758924,34.87167],[-111.757671,34.872537]],"type":"LineString"},"id":"331646fa1d9b675b8006dc9712d478af"},{"type":"Feature","properties":{"id":"marker-ingzq6fag","title":"Parking Available","description":"","marker-size":"medium","marker-color":"#1f1f1f","marker-symbol":"parking"},"geometry":{"coordinates":[-111.760917,34.871146],"type":"Point"},"id":"36addeb6be8bd951fcb7a9d4cc536440"},{"type":"Feature","properties":{"title":"Sedona History Walk","description":"<a href=\\"http://visitsedona.com/walk-sedona/\\" target=\\"_blank\\"><img src=\\"https://walksedona.com/assets/historywalk.jpg\\" height=\\"160\\" width=\\"160\\"></a><br>Follow signs along 89A<b><br><a href=\\"http://visitsedona.com/walk-sedona/\\" target=\\"_blank\\">More Info</a></b>","stroke":"#7C4A35","stroke-width":8,"stroke-opacity":1},"geometry":{"coordinates":[[-111.761968,34.86698],[-111.761858,34.867183],[-111.761735,34.867467],[-111.76163,34.867731],[-111.76152,34.868032],[-111.761429,34.86829],[-111.761365,34.868468],[-111.761298,34.868604],[-111.761276,34.868655]],"type":"LineString"},"id":"3baeb2c39f7ef123f403933018808701"},{"type":"Feature","properties":{"id":"marker-in83gumv6","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.815524,34.861496],"type":"Point"},"id":"3c6e253a4b3c08ca922f6e875765b84c"},{"type":"Feature","properties":{"id":"marker-ingyufij2","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.76104,34.870096],"type":"Point"},"id":"3fd7adfd2f1cceb6857e89d59fbc9e7c"},{"type":"Feature","properties":{"id":"marker-in80r62d4","title":"Hillside Parking","description":"<a href=\\"http://www.hillsidesedona.net\\" target=\\"_blank\\"><img src=\\"http://sedona.simpleviewcrm.com/images//listings/Hillside-160x160.jpg\\" height=\\"160\\" width=\\"160\\"></a><br><div id=\\"linksite\\"><a href=\\"http://visitsedona.com/arts-and-culture-listing/hillside-sedona/\\" target=\\"_blank\\">Visit website for more info!</a></div><div id=\\"direc\\"><a target=\\"_blank\\">Get Directions!</a></div>","marker-size":"medium","marker-color":"#1f1f1f","marker-symbol":"parking"},"geometry":{"coordinates":[-111.763438,34.858509],"type":"Point"},"id":"40b84ef319f8ecc9c60c424f0855b0fc"},{"type":"Feature","properties":{"title":"Suggested Walking Route","description":"<br> 10 Minute Walk","stroke":"#72BF61","stroke-width":8,"stroke-opacity":1},"geometry":{"coordinates":[[-111.79539,34.863881],[-111.795708,34.863847],[-111.795982,34.863818],[-111.796317,34.863784],[-111.796695,34.863743],[-111.797097,34.863698],[-111.797874,34.86362],[-111.798134,34.863597],[-111.798633,34.863539],[-111.79924,34.863474],[-111.799691,34.863423],[-111.799908,34.8634],[-111.800364,34.863351],[-111.801095,34.863274],[-111.802155,34.863159],[-111.802863,34.863067],[-111.803522,34.863001],[-111.803889,34.86296],[-111.8042,34.862929],[-111.804785,34.862872]],"type":"LineString"},"id":"417a90e949007172aa18543ae6bbe469"},{"type":"Feature","properties":{"id":"marker-io4ry7m60","title":"History Walk Plaque","description":"<a href=\\"http://visitsedona.com/walk-sedona/\\" target=\\"_blank\\"><img src=\\"https://walksedona.com/assets/historywalk.jpg\\" height=\\"160\\" width=\\"160\\"></a><br><a href=\\"http://visitsedona.com/walk-sedona/\\" target=\\"_blank\\">More Info</a></b>","marker-size":"small","marker-color":"#6c6c6c","marker-symbol":"camera"},"geometry":{"coordinates":[-111.761933,34.866987],"type":"Point"},"id":"512c7a389707a6994cc944659a063202"},{"type":"Feature","properties":{"id":"marker-ingyll3b0","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.763224,34.862777],"type":"Point"},"id":"54a827f6b0b23a6e973197244e6362d2"},{"type":"Feature","properties":{"id":"marker-ingyx2n53","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.763996,34.85801],"type":"Point"},"id":"5a047cc62a78ac3d09ffb7fa76708582"},{"type":"Feature","properties":{"id":"marker-in8260491","title":"Harkin's Theatre","description":"<br>Parking Available<br><div id=\\"direc\\"><a target=\\"_blank\\">Get Directions!</a></div>","marker-size":"medium","marker-color":"#6c6c6c","marker-symbol":"cinema"},"geometry":{"coordinates":[-111.796893,34.863089],"type":"Point"},"id":"659f2f2cd3d5437b5a821de61f92af42"},{"type":"Feature","properties":{"id":"marker-in7ty2ia5","title":"Mary D Fisher Theatre","description":"<br><a href=\\"http://www.sedonafilmfestival.org/\\" target=\\"_blank\\">Visit website for more info!</a><div id=\\"direc\\"><a target=\\"_blank\\">Get Directions!</a></div>","marker-size":"","marker-color":"#e7857f","marker-symbol":"cinema"},"geometry":{"coordinates":[-111.795835,34.864382],"type":"Point"},"id":"6de424adaf69ec391c0956ffc7709df6"},{"type":"Feature","properties":{"id":"marker-ingzlgxmc","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.822047,34.856779],"type":"Point"},"id":"6f6fa9ec3bd68e2bb5c4d7968b176b1d"},{"type":"Feature","properties":{"id":"marker-in83g2x94","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.791494,34.863758],"type":"Point"},"id":"79a0278376b4795ae441b9dfe7c7f2fd"},{"type":"Feature","properties":{"id":"marker-in80msol3","title":"Coffee Pot Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Verde Lynx Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.79504,34.864097],"type":"Point"},"id":"80dc5e13de8446dac42b4c643ac6e331"},{"type":"Feature","properties":{"id":"marker-ingzf0ua8","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.806278,34.862834],"type":"Point"},"id":"8bae5970b5a1df4b4bec646e4f439417"},{"type":"Feature","properties":{"title":"Uptown Walking Route","description":"<br> 15 Minute Walk","stroke":"#7286A7","stroke-width":8,"stroke-opacity":1,"marker-color":"","marker-size":"","marker-symbol":""},"geometry":{"coordinates":[[-111.761636,34.868708],[-111.761544,34.868695],[-111.761252,34.869553],[-111.761185,34.869964],[-111.761201,34.870684],[-111.761153,34.874326],[-111.761121,34.876289],[-111.761008,34.877921],[-111.7614,34.877992],[-111.761802,34.877974]],"type":"LineString"},"id":"91c9c2ed4856dcc01a10d3be5d47c6c7"},{"type":"Feature","properties":{"id":"marker-ingyzpvs4","title":"Verde Lynx Bus Stop (Parking)","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a><br>Parking Available ","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.772949,34.8444],"type":"Point"},"id":"9501e65858df05f476d552975b2a14dd"},{"type":"Feature","properties":{"id":"marker-ingzp4o0f","title":"Parking Available ","description":"","marker-size":"medium","marker-color":"#1f1f1f","marker-symbol":"parking"},"geometry":{"coordinates":[-111.75997,34.871883],"type":"Point"},"id":"9af64bf1730f60340b38a2436af4da86"},{"type":"Feature","properties":{"id":"marker-io4s1fl52","title":"History Walk Plaque","description":"<a href=\\"http://visitsedona.com/walk-sedona/\\" target=\\"_blank\\"><img src=\\"https://walksedona.com/assets/historywalk.jpg\\" height=\\"160\\" width=\\"160\\"></a><br><a href=\\"http://visitsedona.com/walk-sedona/\\" target=\\"_blank\\">More Info</a></b>","marker-size":"small","marker-color":"#6c6c6c","marker-symbol":"camera"},"geometry":{"coordinates":[-111.761252,34.868615],"type":"Point"},"id":"9de495348de6e3e0ffb3c69e21c94715"},{"type":"Feature","properties":{"id":"marker-io4s109f1","title":"History Walk Plaque","description":"<a href=\\"http://visitsedona.com/walk-sedona/\\" target=\\"_blank\\"><img src=\\"https://walksedona.com/assets/historywalk.jpg\\" height=\\"160\\" width=\\"160\\"></a><br><a href=\\"http://visitsedona.com/walk-sedona/\\" target=\\"_blank\\">More Info</a></b>","marker-size":"small","marker-color":"#6c6c6c","marker-symbol":"camera"},"geometry":{"coordinates":[-111.761585,34.867783],"type":"Point"},"id":"abc0990f657966edcfc689a9ac4bdfdd"},{"type":"Feature","properties":{"id":"marker-in81c3mc7","title":"Uptown Parking Available","description":"<br><div id=\\"direc\\"><a target=\\"_blank\\">Get Directions!</a></div>","marker-size":"medium","marker-color":"#1f1f1f","marker-symbol":"parking"},"geometry":{"coordinates":[-111.760197,34.872664],"type":"Point"},"id":"adbd36d6f1195340ae7e0680ec3a2810"},{"type":"Feature","properties":{"id":"marker-ingz84mr6","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.815001,34.861368],"type":"Point"},"id":"b4b8594076561097d326cfa3212dcee0"},{"type":"Feature","properties":{"title":"West Sedona Walking Route","description":"<br> 16 Minute Walk","stroke":"#548cba","stroke-width":8,"stroke-opacity":1},"geometry":{"coordinates":[[-111.783219,34.862645],[-111.784316,34.862781],[-111.786068,34.862999],[-111.787701,34.863212],[-111.788914,34.863362],[-111.790744,34.863579],[-111.791039,34.863614],[-111.79131,34.863652],[-111.791844,34.86372],[-111.79291,34.86386],[-111.793145,34.863886],[-111.793365,34.863916],[-111.793736,34.863939],[-111.793986,34.86395],[-111.794192,34.863948],[-111.794699,34.86394],[-111.795378,34.86389]],"type":"LineString"},"id":"bc184ced80891eec5240e471ed312bd7"},{"type":"Feature","properties":{"id":"marker-ingzat9e7","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.799181,34.863364],"type":"Point"},"id":"c75d98bb621ec8910e7723ece2208d33"},{"type":"Feature","properties":{"id":"marker-in81m66q9","title":"Tlaquepaque Parking","description":"<a href=\\"http://www.tlaq.com\\" target=\\"_blank\\"><img src=\\"http://sedona.simpleviewcrm.com/images//listings/tlaq0.jpg\\" height=\\"160\\" width=\\"160\\"></a><br><div id=\\"linksite\\"><a href=\\"http://visitsedona.com/arts-and-culture-listing/tlaquepaque-arts-crafts-village/\\" target=\\"_blank\\">Visit website for more info!</a></div><div id=\\"direc\\"><a target=\\"_blank\\">Get Directions!</a></div>","marker-size":"medium","marker-color":"#1f1f1f","marker-symbol":"parking"},"geometry":{"coordinates":[-111.763411,34.862579],"type":"Point"},"id":"ca05fa4ddd8852cf986bfb4d6709a522"},{"type":"Feature","properties":{"id":"marker-in80ixwm2","title":"Parking Available","description":"<br><div id=\\"direc\\"><a target=\\"_blank\\">Get Directions!</a></div>","marker-size":"medium","marker-color":"#1f1f1f","marker-symbol":"parking"},"geometry":{"coordinates":[-111.784939,34.863157],"type":"Point"},"id":"caacc13b7fcaf2ea1d7c4b0891c8905a"},{"type":"Feature","properties":{"id":"marker-ingzmn65d","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.828294,34.85042],"type":"Point"},"id":"caed5b1192130206fb26db4ad67a488e"},{"type":"Feature","properties":{"id":"marker-in83gkiu5","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.804524,34.86275],"type":"Point"},"id":"cf0e75731d4ffa38a8f00941af15cdfc"},{"type":"Feature","properties":{"title":"To Dry Creek Walking Route","description":"<br> 12 Minute Walk","stroke":"#7286A7","stroke-width":8,"stroke-opacity":1},"geometry":{"coordinates":[[-111.804811,34.862872],[-111.805896,34.862736],[-111.80688,34.862635],[-111.807303,34.862581],[-111.807892,34.862517],[-111.80891,34.862414],[-111.809433,34.862364],[-111.810021,34.862304],[-111.810467,34.862252],[-111.811063,34.862183],[-111.811828,34.862099],[-111.812882,34.861954],[-111.813936,34.861791],[-111.814226,34.861716],[-111.814617,34.861619],[-111.815154,34.861463],[-111.815591,34.86132],[-111.815832,34.861238]],"type":"LineString"},"id":"cfd1e02dde7860e4c617e7bb995266ae"},{"type":"Feature","properties":{"id":"marker-ingyol5l1","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.760053,34.872675],"type":"Point"},"id":"d9339d876dd066da25ddf8eea8a53a20"},{"type":"Feature","properties":{"id":"marker-ingzh2ii9","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.794643,34.863793],"type":"Point"},"id":"d9af6668b4c8363259307036a23289c5"},{"type":"Feature","properties":{"id":"marker-ingzt57qh","title":"Parking Available ","description":"","marker-size":"medium","marker-color":"#1f1f1f","marker-symbol":"parking"},"geometry":{"coordinates":[-111.763789,34.868661],"type":"Point"},"id":"d9e41222dd21fcbe87cc8987ecfae090"},{"type":"Feature","properties":{"id":"marker-in83f76t3","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.783453,34.862755],"type":"Point"},"id":"dbe8540df02356f4393e3bb42e0bf03a"},{"type":"Feature","properties":{"id":"marker-in817ybo6","title":"Sedona Heritage Museum","description":"<a href=\\"http://sedonamuseum.org/\\" target=\\"_blank\\"><img src=\\"http://sedona.simpleviewcrm.com/images//listings/Jordan-house-fixed-800-x-600-Chamber.jpg\\" height=\\"160\\" width=\\"160\\"></a><br><a href=\\"http://sedonamuseum.org/\\" target=\\"_blank\\">Visit Site for more Info!</a><div id=\\"direc\\"><a target=\\"_blank\\">Get Directions!</a></div>","marker-size":"medium","marker-color":"#6c6c6c","marker-symbol":"museum"},"geometry":{"coordinates":[-111.762258,34.878035],"type":"Point"},"id":"e6c7197627862858fa2fc3e03d44c89e"},{"type":"Feature","properties":{"id":"marker-ingzn3wfe","title":"Verde Lynx Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.828216,34.850806],"type":"Point"},"id":"efdc6ffa0cf9c3591e2a28ab1bb50327"},{"type":"Feature","properties":{"id":"marker-in83eduv2","title":"Rodeo Bus Stop","description":"<br><a href=\\"http://cottonwoodaz.gov/media/pdf/Lynx-Guide.pdf\\" target=\\"_blank\\">Lynx Bus Schedule</a>","marker-size":"small","marker-color":"#f5c272","marker-symbol":"bus"},"geometry":{"coordinates":[-111.800858,34.863446],"type":"Point"},"id":"f06bac6260c60ae2c763a24e8eff6c75"},{"type":"Feature","properties":{"id":"marker-in81eiyt8","title":"Chamber of Commerce Visitor Center","description":"<a href=\\"http://www.sedonachamber.com/\\" target=\\"_blank\\"><img src=\\"http://sedona.simpleviewcrm.com/images//listings/CoC0.jpg\\" height=\\"140\\" width=\\"160\\"></a><br><a href=\\"http://www.sedonachamber.com\\" target=\\"_blank\\">Visit website for more info!</a><div id=\\"direc\\"><a target=\\"_blank\\">Get Directions!</a></div>","marker-size":"medium","marker-color":"#6c6c6c","marker-symbol":"star"},"geometry":{"coordinates":[-111.761743,34.868655],"type":"Point"},"id":"f6365dfe494995d3f80bc3ca245be9aa"},{"type":"Feature","properties":{"id":"marker-ingzvxo9i","title":"Parking Available ","description":"","marker-size":"medium","marker-color":"#1f1f1f","marker-symbol":"parking"},"geometry":{"coordinates":[-111.760024,34.870061],"type":"Point"},"id": "fb5c583d5a78f0d533501fae998040ef"},""");

companyList = "";

#cat  39 art
cat = 23
#subcat
subcat = [124,125,283]

#simplview API url
svurl = 'http://sedona.simpleviewcrm.com/webapi/listings/xml/listings.cfm'


#loop through categories and create geojson from values
for subcatid in subcat:

	pstdata = {'action': 'getListings', 'username': 'SedonaMaps_API','password': 'cart0gr@phick!', 'pagenum': '1','pagesize': '200', 'filters': '<FILTERGROUP> <ANDOR>OR</ANDOR><FILTERS><ITEM><FILTERTYPE>EQUAL TO</FILTERTYPE><FIELDCATEGORY>LISTING</FIELDCATEGORY><FILTERVALUE>'+str(subcatid)+'</FILTERVALUE><FIELDNAME>SubCatID</FIELDNAME></ITEM></FILTERS></FILTERGROUP>'}

	responsePost = requests.post(svurl, data=pstdata)
	
	treeXML = ElementTree.fromstring(responsePost.content)

	for recordelement in treeXML[0]:
		try:

			individualID = recordelement.find('LISTINGID').text;
			companyName = recordelement.find('SORTCOMPANY').text;
			photo = str(recordelement.find('IMGPATH').text)+str(recordelement.find('PHOTOFILE').text);
			websiteURL = str(recordelement.find('WEBURL').text);

			#print photo;
			listingdata = {'action': 'getListing', 'username': 'SedonaMaps_API','password': 'cart0gr@phick!', 'LISTINGID': individualID};
			individualInfo = requests.post(svurl, data=listingdata);

			listingXML = ElementTree.fromstring(individualInfo.content);

			if(listingXML[0].find('ACCTSTATUS').text=='Active'):
				#could check for update but now just create everything
				#print listingXML[0].find('LASTUPDATED').text;
				
				TBmember = '';
				gpslocation = '';

				for itemNode in listingXML[0].find('ADDITIONALINFORMATION'):
					
					if(itemNode.find('NAME').text == 'Tourism Bureau'):
						TBmember = itemNode.find('VALUE').text;
					
					if(itemNode.find('NAME').text == 'GPS Coordinates'):
						gpslocation= itemNode.find('VALUE').text;

				
				#create json node filter celest and other
				if(gpslocation != '' and gpslocation != None and TBmember == 'Yes' and individualID != '2453' and companyName not in companyList):

					print companyName
					#print individualID
					#print gpslocation
					
					if(listingXML[0].find('LASTUPDATED').text != None):					
						companyList += '\n'+companyName +", ("+listingXML[0].find('LASTUPDATED').text+")";

					if(recordelement.find('PHOTOFILE').text != None):
						description = """<a href=\\\""""""+websiteURL+"""\\" target=\\"_blank\\"><img src=\\\""""""+photo+"""\\" height=\\"160\\" width=\\"160\\"></a><br><div id=\\"linksite\\"><a href=\\\""""""+websiteURL+"""\\" target=\\"_blank\\">Visit Site for More Info!</a></div><div id=\\"direc\\"><a target=\\"_blank\\">Get Directions!</a></div>""";
					else:
						description = """<br><div id=\\"linksite\\"><a href=\\\""""""+websiteURL+"""\\" target=\\"_blank\\">Visit website for more info!</a></div><div id=\\"direc\\"><a target=\\"_blank\\">Get Directions!</a></div>""";
					

					jsonfile.write("""{
					      "type": "Feature",
					      "properties": {
					        "id": "marker-"""+individualID+"""",
					        "title": \""""+companyName+"""\",
					        "description": \""""+description+"""\",
					        "marker-size": "medium",
					        "marker-color": "#1087bf",
					        "marker-symbol": "art-gallery"
					      },"geometry": {"coordinates": ["""+
					          gpslocation.split(',')[1]+""",
					          """+gpslocation.split(',')[0]+"""
					        ],"type": "Point"
					      },"id": """+individualID+"""
					    },""""");
					
					#switch coordindates
					#gpslocation.split(',')[0];
					#gpslocation.split(',')[1];
		except:
			print "Error Accessing API.."
				
#remove last comma
jsonfile.seek(-1, os.SEEK_END)
jsonfile.truncate()
jsonfile.write("""],"id": "sedonachamber.gallery"}""");

#send email
import smtplib

#seems like this doesn't always work
try:
	#server = smtplib.SMTP('smtpout.secureserver.net', 465)
	#server.connect()
	#server.login("stephen@mapblender.org", "Imfromnh55")

	server = smtplib.SMTP('relay-hosting.secureserver.net')

	fromaddr = "stephen@mapblender.org";
	#toaddr = ["sontag.stephen@gmail.com","stephen.sontag@rpsgroup.com"];
	toaddr = ["sontag.stephen@gmail.com","sc.sedonachamber@gmail.com","stephen.sontag@rpsgroup.com"];

	msg = string.join((
	        "From: %s" % fromaddr,
	        "To: %s" % toaddr,
	        "Subject: %s" % "Gallery List Updated",
	        "",
	        "The following list has been processed\n"+companyList), "\r\n");

	server.sendmail(fromaddr, toaddr, msg)
	server.quit()
	print "Email Sent"

except:
	print "Email server not working"

jsonfile.close()

shutil.copy('/var/chroot/home/content/19/12215219/html/artwalk/restaurants/data/gallery.json', '////var//chroot//home//content//19//12215219//html//artwalk//publicart//data//gallery.json')

shutil.copy('/var/chroot/home/content/19/12215219/html/artwalk/restaurants/data/gallery.json', '////var//chroot//home//content//19//12215219//html//artwalk//green//data//gallery.json')

shutil.copy('/var/chroot/home/content/19/12215219/html/artwalk/restaurants/data/gallery.json', '////var//chroot//home//content//19//12215219//html//artwalk//galleries//data//gallery.json')

shutil.copy('/var/chroot/home/content/19/12215219/html/artwalk/restaurants/data/gallery.json', '////var//chroot//home//content//19//12215219//html//artwalk//art//data//gallery.json')

shutil.copy('/var/chroot/home/content/19/12215219/html/artwalk/restaurants/data/gallery.json', '////var//chroot//home//content//19//12215219//html//artwalk//parks//data//gallery.json')

shutil.copy('/var/chroot/home/content/19/12215219/html/artwalk/restaurants/data/gallery.json', '////var//chroot//home//content//19//12215219//html//artwalk//data//gallery.json')

shutil.copy('/var/chroot/home/content/19/12215219/html/artwalk/restaurants/data/gallery.json', '////var//chroot//home//content//19//12215219//html//artwalk//traffic//data//gallery.json')

shutil.copy('/var/chroot/home/content/19/12215219/html/artwalk/restaurants/data/gallery.json', '////var//chroot//home//content//19//12215219//html//getaround//data//gallery.json')

sys.exit()
