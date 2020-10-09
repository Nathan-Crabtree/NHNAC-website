#!/bin/bash
#
# The procedure goes in this script as follows:
# 
# fuser -k <portno>/tcp # obsolete
# cd ~/production/client
# npm install
# npm audit fix
# sendmail
# delete email.txt
# npm run build
# \cp -r ~/production/client/build/* /var/www/html/
# rm -r ~/production/client/build
# service apache2 start
#

FILE=~/script_exec_log.txt
EMAIL=~/production/client/email.txt

if [ -f "$FILE" ]; then
        date >> $FILE        
        echo -e "Note: file already exists. Top logo will not be created.\n" >> $FILE
else
        cd ~
        touch script_exec_log.txt
        echo -e "***********************************************\n" >> $FILE
        echo -e "     ENVIRONMENT SCRIPT EXECUTION LOG FILE     \n" >> $FILE
        echo -e "***********************************************\n\n" >> $FILE
        echo -e "<weekday month day UT timezone>\n" >> $FILE 
        echo -e "<description>\n\n" >> $FILE    
fi

wait

date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": Beginning start_client.sh\n" >> $FILE

service apache2 stop

wait

date >> $FILE 
echo -e ": Successfully waited. Stopped the server.\n" >> $FILE

cd ~/production/client 

date >> $FILE
echo -e ": Directory changed to ~/production/client\n" >> $FILE

date >> $FILE
echo ": (command: npm install) " >> $FILE
npm install >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo ": (command: npm audit fix) " >> $FILE
npm audit fix >> $FILE
echo -e "\n" >> $FILE

echo -e "Subject: Client server restarted\n" >> $EMAIL
echo -e "Client server has successfully updated and restarted.\n" >> $EMAIL
git log >> $EMAIL
echo -e "\n" >> $EMAIL

wait

date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": Created email.txt\n" >> $FILE

wait

date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo ": (command: /usr/sbin/sendmail zanechandy < email.txt) " >> $FILE
/usr/sbin/sendmail zanechandygmail.com < email.txt >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": email successfully sent\n" >> $FILE

date >> $FILE
echo ": (command: rm email.txt) " >> $FILE
rm email.txt >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": email.txt successfully deleted\n" >> $FILE

date >> $FILE
echo -e ": (command: npm run build) " >> $FILE
npm run build >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: \cp -r ~/production/client/build/* /var/www/html/) " >> $FILE
\cp -r ~/production/client/build/* /var/www/html/ >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: rmdir ~/production/client/build) " >> $FILE
rm -r ~/production/client/build >> $FILE
echo -e "\n" >> $FILE

date >> $FILE
echo -e ": Waited successfully. Package dependencies and build folder successfully implemented for client directory. Restarting server...\n" >> $FILE

sudo service apache2 start

