#!/bin/sh
#
# NOTE: This script only restarts the API server. Front-end will be already taken care by automatic apache restart. - Zane
#
# The script executes in the following manner:
# 
# cd ~/prodcution/api
# sendmail
# delete email.txt
# npm run-script build
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
echo -e "startup.sh is being executed...\n" >> $FILE

date >> $FILE 
echo -e ": Linux Mint has been restarted. Running start_api.sh...\n" >> $FILE 

echo -e "Subject: Linux Mint has been restarted.\n" >> $EMAIL
echo -e "Linux Mint has rebooted and both servers have successfully restarted.\n" >> $EMAIL
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

cd ~/production/api

date >> $FILE 
echo -e ": Changed directory to ~/production/api. Running npm install and restarting the server...\n" >> $FILE 

npm run-script build
