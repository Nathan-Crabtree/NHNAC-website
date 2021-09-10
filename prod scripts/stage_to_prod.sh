#!/bin/bash
#
# The procedure goes in this script as follows:
# 
# docker stop api # obsolete
# docker rm api # obsolete
# \cp -r ~/staging/* ~/production
# cd ~/production/api
# docker-compose down
# npm run-script stop # obsolete
# npm install
# npm audit fix
# sendmail
# delete email.txt
# npm run-script build # obsolete
# docker run -d -p xxxx:xxxx --name api api # obsolete
# docker-compose up -d
#

source set_env_vars.sh
source functions.sh

EMAIL=~/production/api/email.txt

draw_logo

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": Beginning stage_to_prod.sh\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: \cp -r ~/staging/* ~\production) " >> $LOG_FILE
\cp -r ~/staging/* ~/production >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully. Files copied from ~/staging to ~/production.\n" >> $LOG_FILE

cd ~/production/api

wait 

date >> $LOG_FILE
printf ": Waited successfully. Changed directory to ~/production/api\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: docker-compose down) " >> $LOG_FILE
docker-compose down >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait 

date >> $LOG_FILE 
printf ": Waited successfully. Stopped and deleted api docker container.\n" >> $LOG_FILE 

date >> $LOG_FILE
printf ": (command: npm install) " >> $LOG_FILE
npm install >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: npm audit fix) " >> $LOG_FILE
npm audit fix >> $LOG_FILE
printf "\n" >> $LOG_FILE

printf "Subject: Files transfered to Production from Staging. API server restarted\n" >> $EMAIL
printf "Files have been successfully transferred from Staging to Production and API server has restarted.\n\n" >> $EMAIL
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
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": email.txt has been deleted\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: docker-compose up -d) " >> $LOG_FILE
docker-compose up -d >> $LOG_FILE
printf "\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": stage_to_prod.sh executed successfully. Waiting and returning exit status 0.\n" >> $LOG_FILE

./start_client.sh

wait

exit 0