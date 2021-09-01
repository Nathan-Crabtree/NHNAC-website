#!/bin/bash
#
# NOTE: This script restarts all servers if the main server crashed. - Zane
#
# The script executes in the following manner:
# 
# cd ~/production/api
# docker-compose restart
# docker restart client
# sendmail
# delete email.txt
# npm run-script build # obselete
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
echo -e ": startup.sh is being executed...\n" >> $FILE

date >> $FILE 
echo -e ": Linux Mint has been restarted. Restarting client and api servers...\n" >> $FILE 

cd ~/production/api

wait 

date >> $FILE
echo -e ": Waited successfully. Changed directory to ~/production/api.\n" >> $FILE

date >> $FILE
echo -e ": (command: docker-compose restart) " >> $FILE
docker-compose restart >> $FILE
echo -e "\n" >> $FILE

wait 

date >> $FILE
echo -e ": (command: docker restart client) " >> $FILE
docker restart client >> $FILE
echo -e "\n" >> $FILE

wait 

echo -e "Subject: Linux Mint has been restarted.\n" >> $EMAIL
echo -e "Linux Mint has rebooted and both servers have successfully restarted.\n" >> $EMAIL
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
echo -e ": Waited successfully. email.txt successfully deleted\n" >> $FILE

date >> $FILE
echo -e ": startup.sh executed successfully. Waiting and returning exit status 0.\n" >> $FILE

wait

exit 0
