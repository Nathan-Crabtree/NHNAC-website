#!/bin/bash
#
# NOTE: Once the restart scripts for api server and MySQL have been relocated. You'll have to manually run the command "sudo chmod 777 <filename>.sh" 
# for both of those files in /etc/init.d to work properly. - Zane 
#
# The procedure goes in this script as follows:
# 
# \cp -r ~/testing/* ~/staging
# rm dev_to_test.sh
# sendmail
# delete email.txt
# mv ../scripts/startup.sh /etc/init.d/
# mv ../scripts/restart_mysql.sh /etc/init.d/
#

FILE=~/script_exec_log.txt
EMAIL=~/staging/email.txt

date >> $FILE
echo -e ": Starting test_to_stage.sh\n" >> $FILE

date >> $FILE
echo -e ": (command: \cp ~/testing/* ~/staging #waiting) " >> $FILE
\cp -r ~/testing/* ~/staging >> $FILE 

wait

echo -e "\n" >> $FILE

date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": Files successfully moved from testing to staging\n" >> $FILE

date >> $FILE
echo ": (command: ls) " >> $FILE
ls >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

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
echo ": (command: rm dev_to_test.sh) " >> $FILE 
rm dev_to_test.sh >> $FILE
echo -e "\n" >> $FILE

date >> $FILE
echo -e ": Cloned dev_to_test.sh removed successfully\n" >> $FILE 

echo -e "Subject: Transfer to Staging successful\n" >> $EMAIL
echo -e "Files have been successfully transferred from Testing to Staging and are ready to be deployed in Production.\n" >> $EMAIL
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

mv ../scripts/startup.sh /etc/init.d/ >> $FILE

wait

mv ../scripts/restart_mysql.sh /etc/init.d/ >> $FILE

date >> $FILE
echo -e ": Waited successfully. Restart scripts have been moved to /etc/init.d\n" >> $FILE

date >> $FILE
echo -e ": test_to_stage.sh executed successfully. Waiting and returning exit status 0.\n" >> $FILE

wait

exit 0
