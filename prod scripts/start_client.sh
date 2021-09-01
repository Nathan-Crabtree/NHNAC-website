#!/bin/bash
#
# The procedure goes in this script as follows:
# 
# docker stop client
# docker rm client
# fuser -k <portno>/tcp # obsolete
# cd ~/production/client
# npm install
# npm audit fix
# sendmail
# delete email.txt
# npm run build
# \mv -r ~/production/client/build ~/production/client/public-html
# docker run -d -p 80:80 --name client client 
# \cp -r ~/production/client/build/* /var/www/html/ # obsolete
# rm -r ~/production/client/build 
# service apache2 start # obsolete
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

date >> $FILE
echo ": (command: docker stop client) " >> $FILE
docker stop client >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE
echo ": (command: docker rm client) " >> $FILE
docker rm client >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE 
echo -e ": Successfully waited. Stopped and removed client docker container.\n" >> $FILE

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

wait

date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

echo -e "Subject: Client server restarted\n" >> $EMAIL
echo -e "Client server has successfully updated and restarted.\n" >> $EMAIL
git log >> $EMAIL
echo -e "\n" >> $EMAIL

wait

date >> $FILE
echo -e ": Waited successfully. Created email.txt\n" >> $FILE

date >> $FILE
echo ": (command: /usr/sbin/sendmail zanechandy < email.txt) " >> $FILE
/usr/sbin/sendmail zanechandygmail.com < email.txt >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE
echo -e ": Waited successfully. email successfully sent\n" >> $FILE

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
echo -e ": (command: \mv -r ~/production/client/build ~/production/client/public-html) " >> $FILE
\mv -r ~/production/client/build ~/production/client/public-html >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: docker run -d -p 80:80 --name client client) " >> $FILE
docker run -d -p 80:80 --name client client >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE
echo -e ": Waited successfully. Client docker container created and running.\n" >> $FILE

date >> $FILE
echo -e ": (command: rmdir ~/production/client/build) " >> $FILE
rm -r ~/production/client/build >> $FILE
echo -e "\n" >> $FILE

date >> $FILE
echo -e ": start_client.sh executed successfully. Waiting and returning exit status 0.\n" >> $FILE

wait

exit 0

