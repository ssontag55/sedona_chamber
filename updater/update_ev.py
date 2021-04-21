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

#import time 
#from dateutil.parser import parse
#from datetime import datetime, timedelta


#open jsonfile
jsonfile = open('ev3.json', 'w')
#jsonfile = open('/home/ompi62ut5c1y/public_html/artwalk/data/ev.json', 'w');
jsonfile.write("""{"type": "FeatureCollection","features": [""");

companyList = "";

# 257	Air Transportation / Airports / Shuttles			
# 259	Bus/Charter/Limo/Taxi/Parking			
# 260	Rental Vehicles / Trailers		
# Travel Services					
# 151	Destination Marketing Orgs				
# 439	Reservations / Information 				
# 155	Travel Agencies & Destination Services				


subcat = [211]

#simplview API url
svurl = 'http://sedona.simpleviewcrm.com/webapi/listings/xml/listings.cfm'


#loop through categories and create geojson from values
for subcatid in subcat:
	# , 'filters': '<FILTERGROUP> <ANDOR>OR</ANDOR><FILTERS><ITEM><FILTERTYPE>EQUAL TO</FILTERTYPE><FIELDCATEGORY>LISTING</FIELDCATEGORY><FILTERVALUE>'+str(subcatid)+'</FILTERVALUE><FIELDNAME>SubCatID</FIELDNAME></ITEM></FILTERS></FILTERGROUP>'
	pstdata = {'action': 'getListings', 'username': 'SedonaMaps_API','password': 'cart0gr@phick!', 'pagenum': '1','pagesize': '200'}

	responsePost = requests.post(svurl, data=pstdata)
	
	treeXML = ElementTree.fromstring(responsePost.content)

	total = 0; 
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
				evStation = False
				for itemNode in listingXML[0].find('AMENITIES'):
					
					# print(itemNode.find('NAME').text.find('EV'))
					if itemNode.find('NAME').text == 'EV Charging Station':
					 	evLocation= itemNode.find('VALUE').text;
					 	total = total+1;
						print(total);
						evStation = True

				for itemNode in listingXML[0].find('ADDITIONALINFORMATION'):
					if(itemNode.find('NAME').text == 'Tourism Bureau'):
						TBmember = itemNode.find('VALUE').text;
					if(itemNode.find('NAME').text == 'GPS Coordinates'):
						gpslocation= itemNode.find('VALUE').text;


				if(gpslocation != '' and gpslocation != None and TBmember == 'Yes' and evStation == True and companyName not in companyList):

					print companyName.encode("UTF-8")
					if(listingXML[0].find('LASTUPDATED').text != None):					
						companyList += '\n'+companyName +", ("+listingXML[0].find('LASTUPDATED').text+")";

					if(recordelement.find('PHOTOFILE').text != None):
						description = """<a href=\\\""""""+websiteURL+"""\\" target=\\"_blank\\"><img src=\\\""""""+photo+"""\\" height=\\"160\\" width=\\"160\\"></a><br></div><div id=\\"linksite\\"><a href=\\\""""""+websiteURL+"""\\" target=\\"_blank\\">Visit Site for More Info!</a><div id=\\"direc\\"><a target=\\"_blank\\">Get Directions!</a></div>""";
					else:
						description = """<br><div id=\\"linksite\\"><a href=\\\""""""+websiteURL+"""\\" target=\\"_blank\\">Visit website for more info!</a></div><div id=\\"direc\\"><a target=\\"_blank\\">Get Directions!</a></div>""";
					
					jsonfile.write("""{
					      "type": "Feature",
					      "properties": {
					        "id": "marker-"""+individualID+"""",
					        "title": \""""+companyName.encode("UTF-8")+"""\",
					        "description": \""""+description+"""\",
					        "marker-size": "medium",
					        "marker-color": "#66f5ff",
					        "marker-symbol": "fuel"
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
jsonfile.write("""],"id": "sedonachamber.ev"}""");

#send email
# import smtplib

# #seems like this doesn't always work
# try:

# 	server = smtplib.SMTP_SSL('mail.mapdizzle.com', 465)
# 	# server = smtplib.SMTP_SSL('smtpout.secureserver.net', 465)
# 	# server = smtplib.SMTP('relay-hosting.secureserver.net')

# 	fromaddr = "Stephen Sontag<stephen@mapblender.org>";

# 	server = smtplib.SMTP('mail.mapdizzle.com');
# 	server.login("sontag@mapdizzle.com", "Imfromnh55#");
	
# 	# toaddr = ["sontag.stephen@gmail.com","sc.sedonachamber@gmail.com"];
# 	toaddr = ["sontag.stephen@gmail.com","stephen.sontag@rpsgroup.com"];

# 	msg = string.join((
# 	        "From: %s" % fromaddr,
# 	        "To: %s" % toaddr,
# 	        "Subject: %s" % "Transporation List Updated",
# 	        "",
# 	        "The following list has been processed\n"+companyList), "\r\n");

# 	server.sendmail(fromaddr, toaddr, msg)
# 	server.quit()
# 	print "Email Sent"

# except:

# 	print "Email server not working" 

jsonfile.close()
import shutil


# shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/trans.json', '/////home//ompi62ut5c1y//public_html//artwalk//galleries//data//trans.json')

# shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/trans.json', '/////home//ompi62ut5c1y//public_html//artwalk//art//data//trans.json')

# shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/trans.json', '/////home//ompi62ut5c1y//public_html//artwalk//parking//data//trans.json')

# shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/trans.json', '/////home//ompi62ut5c1y//public_html//artwalk//restaurants//data//trans.json')

# shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/trans.json', '/////home//ompi62ut5c1y//public_html//getaround//lodging//data//trans.json')

# shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/trans.json', '////home//ompi62ut5c1y//public_html//getaround//data//trans.json')

# shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/trans.json', '////home//ompi62ut5c1y//public_html//getaround//bike//data//trans.json')

# shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/trans.json', '////home//ompi62ut5c1y//public_html//getaround//what2do//data//trans.json')

# shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/trans.json', '////home//ompi62ut5c1y//public_html//getaround//retail//data//trans.json')

# shutil.copy('/home/ompi62ut5c1y/public_html/artwalk/data/trans.json', '////home//ompi62ut5c1y//public_html//getaround//Secret7//data//trans.json')

print "Files Copied"

sys.exit()