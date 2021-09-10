#!/bin/bash
#
# NOTE: Once the restart scripts for api server and MySQL have been relocated. You'll have to manually run the command "sudo chmod 777 <filename>.sh" 
# for both of those files in /etc/init.d to work properly. - Zane 
#
# The procedure goes in this script as follows:
# 
# docker rmi api # obsolete
# docker rmi client
# \cp -r ~/testing/* ~/staging
# cd ~/staging
# mkdir ~/staging/client (if doesn't exist)
# \cp -r ~/client/* ~/staging/client
# \cp -r ~/api/* ~/staging/api
# ls
# sendmail
# delete email.txt
# \cp -r ~/staging/"prod scripts"/startup.sh /etc/init.d/
# \cp -r ~/staging/"prod scripts"/restart_mysql.sh /etc/init.d/
# docker build -t api api # obsolete
#

source functions.sh

EMAIL=~/staging/email.txt
DIR=~/staging/client

draw_logo

wait 

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": Starting test_to_stage.sh\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: docker rmi client) " >> $LOG_FILE
docker rmi client >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully. Old docker image for client removed.\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: \cp ~/testing/* ~/staging) " >> $LOG_FILE
\cp -r ~/testing/* ~/staging >> $LOG_FILE 
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully. Files successfully moved from testing to staging.\n" >> $LOG_FILE

cd ~/staging

date >> $LOG_FILE
echo ": Directory changed to ~/staging\n" >> $LOG_FILE

if [ -d "$DIR" ]; then
    date >> $LOG_FILE
    echo ": Client folder already exists, will not be creating.\n" >> $LOG_FILE
else 
    date >> $LOG_FILE
    printf ": (command: mkdir client) " >> $LOG_FILE
    mkdir client >> $LOG_FILE 
    printf "\n" >> $LOG_FILE
fi

wait 

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: \cp -r ~/client/* ~/staging/client) " >> $LOG_FILE
\cp -r ~/client/* ~/staging/client >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully. Files copied from ~/client/ to ~/staging/client.\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: \cp -r ~/api/* ~/staging/api) " >> $LOG_FILE
\cp -r ~/api/* ~/staging/api >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully. Files copied from ~/api to ~/staging/api.\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: ls) " >> $LOG_FILE
ls >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

printf "Subject: Transfer to Staging successful\n" >> $EMAIL
printf "Files have been successfully transferred from Testing to Staging and are ready to be deployed in Production.\n\n" >> $EMAIL
printf "=============== GIT LOG ====================\n\n" >> $EMAIL
cat $GIT_LOG >> $EMAIL
printf "\n" >> $EMAIL

wait

date >> $LOG_FILE
printf ": Waited successfully. Created email.txt\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: /usr/sbin/sendmail zanechandy < email.txt) " >> $LOG_FILE
/usr/sbin/sendmail zanechandygmail.com < email.txt >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully. email has been sent\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: rm email.txt) " >> $LOG_FILE
rm email.txt >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully. email.txt has been deleted\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: \cp -r ~/staging/'prod scripts'/startup.sh /etc/init.d) " >> $LOG_FILE
\cp -r ~/staging/"prod scripts"/startup.sh /etc/init.d/ >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": (command: \cp -r ~/staging/'prod scripts'/restart_mysql.sh /etc/init.d) " >> $LOG_FILE
\cp -r ~/staging/"prod scripts"/restart_mysql.sh /etc/init.d/ >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait 

date >> $LOG_FILE
printf ": Waited successfully. Restart scripts have been moved to /etc/init.d\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": test_to_stage.sh executed successfully. Waiting and returning exit status 0.\n" >> $LOG_FILE

wait

exit 0
