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
# CI=true npm run build
# \mv -r ~/production/client/build ~/production/client/public-html
# cd ../
# docker build -t client client
# docker run -d -p $PORT:$PORT --name client client 
# \cp -r ~/production/client/build/* /var/www/html/ # obsolete
# rm -r ~/production/client/build 
# service apache2 start # obsolete
#

source functions.sh

EMAIL=~/production/client/email.txt

draw_logo

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": Beginning start_client.sh\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: docker stop client) " >> $LOG_FILE
docker stop client >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": (command: docker rm client) " >> $LOG_FILE
docker rm client >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE 
printf ": Successfully waited. Stopped and removed client docker container.\n" >> $LOG_FILE

cd ~/production/client 

date >> $LOG_FILE
printf ": Directory changed to ~/production/client\n" >> $LOG_FILE

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

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

printf "Subject: Client server restarted\n" >> $EMAIL
printf "Client server has successfully updated and restarted.\n\n" >> $EMAIL
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
printf ": (command: CI=true npm run build) " >> $LOG_FILE
CI=true npm run build >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: \mv -r ~/production/client/build ~/production/client/public-html) " >> $LOG_FILE
\mv -r ~/production/client/build ~/production/client/public-html >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: cd ../) " >> $LOG_FILE
cd ../ >> $LOG_FILE
printf "\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: docker build -t client client) " >> $LOG_FILE
docker build -t client client >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully. Docker image built for client.\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: docker run -d -p $PORT:$PORT --name client client) " >> $LOG_FILE
docker run -d -p $PORT:$PORT --name client client >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully. Client docker container created and running.\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: rmdir ~/production/client/build) " >> $LOG_FILE
rm -r ~/production/client/build >> $LOG_FILE
printf "\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": start_client.sh executed successfully. Waiting and returning exit status 0.\n" >> $LOG_FILE

wait

exit 0

