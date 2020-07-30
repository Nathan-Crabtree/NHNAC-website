#!/bin/bash
#
#
# The procedure goes in this script as follows:
# 
# cd ~/production/api
# npm run-script stop
# \cp -r ~/staging/* ~/production
# rm ~/production/test_to_stage.sh
# npm install
# npm audit fix
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
echo -e ": Beginning stage_to_prod.sh\n" >> $FILE

cd ~/production/api

wait 

date >> $FILE
echo -e ": Waited successfully. Changed directory to ~/production/api\n" >> $FILE

date >> $FILE
echo -e ": (command: npm run-script stop)" >> $FILE
npm run-script stop >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE 
echo -e ": Changed directory to ~/production/api. Successfully waited. Stopped the server\n" >> $FILE 

date >> $FILE
echo -e ": (command: \cp -r ~/staging/* ~\production) " >> $FILE
\cp -r ~/staging/* ~/production >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE
echo -e ": Waited successfully. Files moved from ~/staging to ~/production. Changing directory to ~/production...\n" >> $FILE

cd ~/production

date >> $FILE
echo ": (command: rm test_to_stage.sh) " >> $FILE
rm test_to_stage.sh >> $FILE
echo -e "\n" >> $FILE

date >> $FILE
echo -e ": Cloned test_to_stage.sh removed successfully\n" >> $FILE

cd ~/production/api

date >> $FILE
echo -e ": Changed directory to ~/production/api\n" >> $FILE

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
echo -e ": Package dependencies successfully installed for api directory. Restarting the server...\n" >> $FILE

npm run-script build