# -*- coding: utf-8 -*-
#loader and updator for mapbox dataset
#simple view api to Geojson
#sontag SUmmer 2016
#mapblender.com
#walksedona.com

#virtualenv -p /usr/local/bin/python2.7 ENV
# local C:\Python27
#source ENV/bin/activate


#depdencies
import base64,sys
import json,string

import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning
from xml.etree import ElementTree

import os

#open jsonfile
#jsonfile = open('what2do.json', 'w')
jsonfile = open('/home/ompi62ut5c1y/public_html/artwalk/data/what2do.json', 'w');
jsonfile.write("""{"type": "FeatureCollection","features": [""");

companyList = "";

# 370	Casinos / Gaming					
# 376	Family Entertainment					
# 432	Festivals & Events					
# 334	Museums					
# 372	Night Clubs / Musical Entertainment 					
# 141	Parks / Gardens					
# 142	Railroads					
# 373	Theaters / Dinner Theaters					
# 374	Wineries / Wine Tasting					
# 144	Zoos / Farms

	
subcat = [370,376,432,334,372,141,142,373,374,144,219,446,221,448,431,449,222,451,450,447,355,220]

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


				#create json node
				if(gpslocation != '' and gpslocation != None and TBmember == 'Yes'):

					#for unicode print companyName.encode("UTF-8")
					print companyName.encode("UTF-8")
					if(listingXML[0].find('LASTUPDATED').text != None):					
						companyList += '\n'+companyName +", ("+listingXML[0].find('LASTUPDATED').text+")";

					if(recordelement.find('PHOTOFILE').text != None):
						description = """<a href=\\\""""""+websiteURL+"""\\" target=\\"_blank\\"><img src=\\\""""""+photo+"""\\" height=\\"160\\" width=\\"160\\"></a><br></div><div id=\\"linksite\\"><a href=\\\""""""+websiteURL+"""\\" target=\\"_blank\\">Visit Site for More Info!</a><div id=\\"direc\\"><a target=\\"_blank\\">Get Directions!</a></div>""";
					else:
						description = """<br><div id=\\"linksite\\"><a href=\\\""""""+websiteURL+"""\\" target=\\"_blank\\">Visit website for more info!</a></div><div id=\\"direc\\"><a target=\\"_blank\\">Get Directions!</a></div>""";
					
					symbolename = 'school'

					if(subcatid == 220):
						symbolename = 'golf'
					elif(subcatid == 355):
						symbolename = 'skiing'
					#elif(subcatid == 222):
					#	symbolename = 'horse-riding'
					elif(subcatid == 446):
						symbolename = 'bicycle'
					elif(subcatid == 144):
						symbolename = 'zoo'
					elif(subcatid == 141):
						symbolename = 'playground'
					elif(subcatid == 142):
						symbolename = 'rail-metro'
					#elif(subcatid == 221):
					#	symbolename = 'mountain'
					#elif(subcatid == 449):
					#	symbolename = 'mountain'
					elif(subcatid == 334):
						symbolename = 'museum'
					elif(subcatid == 334):
						symbolename = 'alcohol-shop'
					#elif(subcatid == 448):
					#symbolename = 'aquarium'
					elif(subcatid == 372):
						symbolename = 'bar'
					elif(subcatid == 373):
						symbolename = 'theatre'
					#elif(subcatid == 432):
					#	symbolename = 'stadium'
					elif(subcatid == 431):
						symbolename = 'building'

					jsonfile.write("""{
					      "type": "Feature",
					      "properties": {
					        "id": "marker-"""+individualID+"""",
					        "title": \""""+companyName.encode("UTF-8")+"""\",
					        "description": \""""+description+"""\",
					        "marker-size": "medium",
					        "subcat": \""""+str(subcatid)+"""\",
					        "marker-color": "#E44100",
					        "marker-symbol": \""""+str(symbolename)+"""\"
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
jsonfile.write("""],"id": "sedonachamber.restaurant"}""");

#send email
import smtplib

#seems like this doesn't always work
try:

	server = smtplib.SMTP_SSL('mail.mapdizzle.com', 465)
	# server = smtplib.SMTP_SSL('smtpout.secureserver.net', 465)
	# server = smtplib.SMTP('relay-hosting.secureserver.net')

	fromaddr = "Stephen Sontag<stephen@mapblender.org>";

	server = smtplib.SMTP('mail.mapdizzle.com');
	server.login("sontag@mapdizzle.com", "Imfromnh55#");
	
	toaddr = ["sontag.stephen@gmail.com","sc.sedonachamber@gmail.com"];
	# toaddr = ["sontag.stephen@gmail.com","stephen.sontag@rpsgroup.com"];

	msg = string.join((
	        "From: %s" % fromaddr,
	        "To: %s" % toaddr,
	        "Subject: %s" % "What to Do List Updated",
	        "",
	        "The following list has been processed\n"+companyList), "\r\n");

	server.sendmail(fromaddr, toaddr, msg)
	server.quit()

	print "Email Sent"
except:

	print "Email server not working"

jsonfile.close()
import shutil

shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/what2do.json', '/////home//ompi62ut5c1y//public_html//artwalk//galleries//data//what2do.json')

shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/what2do.json', '/////home//ompi62ut5c1y//public_html//artwalk//art//data//what2do.json')

shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/what2do.json', '/////home//ompi62ut5c1y//public_html//artwalk//parking//data//what2do.json')

shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/what2do.json', '/////home//ompi62ut5c1y//public_html//artwalk//restaurants//data//what2do.json')

shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/what2do.json', '/////home//ompi62ut5c1y//public_html//getaround//lodging//data//what2do.json')

shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/what2do.json', '////home//ompi62ut5c1y//public_html//getaround//data//what2do.json')

shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/what2do.json', '////home//ompi62ut5c1y//public_html//getaround//bike//data//what2do.json')

shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/what2do.json', '////home//ompi62ut5c1y//public_html//getaround//what2do//data//what2do.json')

shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/what2do.json', '////home//ompi62ut5c1y//public_html//getaround//retail//data//what2do.json')

shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/what2do.json', '////home//ompi62ut5c1y//public_html//getaround//Secret7//data//what2do.json')

print "Files Copied"

sys.exit()