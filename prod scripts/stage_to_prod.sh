#!/bin/bash
#
# The procedure goes in this script as follows:
# 
# docker stop api # obsolete
# docker rm api # obsolete
# cd ~/production/api
# docker-compose down
# npm run-script stop # obsolete
# \cp -r ~/staging/* ~/production
# \cp -r /home/mint/api/* ~/production/api
# npm install
# npm audit fix
# sendmail
# delete email.txt
# npm run-script build # obsolete
# docker run -d -p xxxx:xxxx --name api api # obsolete
# docker-compose up -d
#

FILE=~/script_exec_log.txt
EMAIL=~/production/api/email.txt

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
echo -e ": Beginning stage_to_prod.sh\n" >> $FILE

cd ~/production/api

wait 

date >> $FILE
echo -e ": Waited successfully. Changed directory to ~/production/api\n" >> $FILE

date >> $FILE
echo -e ": (command: docker-compose down) " >> $FILE
docker-compose down >> $FILE
echo -e "\n" >> $FILE

wait 

date >> $FILE 
echo -e ": Waited successfully. Stopped and deleted api docker container.\n" >> $FILE 

date >> $FILE
echo -e ": (command: \cp -r ~/staging/* ~\production) " >> $FILE
\cp -r ~/staging/* ~/production >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE
echo -e ": Waited successfully. Files copied from ~/staging to ~/production.\n" >> $FILE

date >> $FILE
echo -e ": (command: \cp -r /home/mint/api/* ~/production/api) " >> $FILE
\cp -r /home/mint/api/* ~/production/api >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE
echo -e ": Waited successfully. Files copied from ~/home/mint/api to ~/production/api.\n" >> $FILE

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

echo -e "Subject: Files transfered to Production from Staging. API server restarted\n" >> $EMAIL
echo -e "Files have been successfully transferred from Staging to Production and API server has restarted.\n" >> $EMAIL
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
echo -e ": (command: docker-compose up -d) " >> $FILE
docker-compose up -d >> $FILE
echo -e "\n" >> $FILE

date >> $FILE
echo -e ": stage_to_prod.sh executed successfully. Waiting and returning exit status 0.\n" >> $FILE

wait

exit 0