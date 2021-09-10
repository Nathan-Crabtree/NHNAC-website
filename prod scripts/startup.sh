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

source set_env_vars.sh
source functions.sh

EMAIL=~/production/api/email.txt

draw_logo

wait 

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": startup.sh is being executed...\n" >> $LOG_FILE

date >> $LOG_FILE 
printf ": Linux Mint has been restarted. Restarting client and api servers...\n" >> $LOG_FILE 

cd ~/production/api

wait 

date >> $LOG_FILE
printf ": Waited successfully. Changed directory to ~/production/api.\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: docker-compose restart) " >> $LOG_FILE
docker-compose restart >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait 

date >> $LOG_FILE
printf ": (command: docker restart client) " >> $LOG_FILE
docker restart client >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait 

printf "Subject: Linux Mint has been restarted.\n" >> $EMAIL
printf "Linux Mint has rebooted and all servers have successfully restarted.\n\n" >> $EMAIL
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
printf ": startup.sh executed successfully. Waiting and returning exit status 0.\n" >> $LOG_FILE

wait

exit 0
