#!/bin/bash
#usage: ./testData.sh MegaMapFeed 4

while true
do
	echo {\"type\" : \"Event\",\"name\" : \"Test Data\", \
	\"location\" : {\"name\" : \"Sydney\", \"lat\" : -33.859709, \"lng\" : 151.213404},\
	\"connections\" : [\
	{\"lat\" : -31.859709, \"lng\" : 51.213404},\
	{\"lat\" : -35.859709, \"lng\" : 101.213404}\
	]} >> $1
	sleep $2
done