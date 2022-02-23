#!/bin/sh

# Convert to UTF-8

temp_file_utf8=$(mktemp)
iconv -f iso-8859-1 -t utf-8 $1 > $temp_file_utf8

# Replace heading line

temp_file_utf8_noheading=$(mktemp)
tail -n +2 $temp_file_utf8 > $temp_file_utf8_noheading

temp_file_utf8_newheading=$(mktemp)
echo "id,bodyid,municipality,confirmed,category,status,daysUntilClosedOrNow,daysUntilFirstBodyResponse,updatedSinceSent,app" > $temp_file_utf8_newheading

cat $temp_file_utf8_noheading >> $temp_file_utf8_newheading

# Convert to JSON

./csv-json.py -i $temp_file_utf8_newheading -o $2 -f pretty

rm $temp_file_utf8
rm $temp_file_utf8_noheading
rm $temp_file_utf8_newheading
