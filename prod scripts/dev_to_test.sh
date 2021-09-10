#!/bin/bash
#
# The procedure goes in this script as follows:
# 
# cd ~/testing
# git pull origin master
# \cp -r ~/"prod scripts"/* ~/testing/"prod scripts"
# git log
# cd ~/testing/"prod scripts"
# chmod +x *
# ./test_to_stage.sh
#

source set_env_vars.sh
source functions.sh

draw_logo

wait 

date >> $LOG_FILE 
printf ": Waited successfully\n" >> $LOG_FILE 

date >> $LOG_FILE
printf ": Beginning dev_to_test.sh. Changing directory to ~/testing.\n" >> $LOG_FILE

cd ~/testing

date >> $LOG_FILE
printf ": Changed directory to ~/testing\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: git pull origin master) " >> $LOG_FILE
git pull origin master >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully.\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: \cp -r ~/'prod scripts'/* ~/testing/'prod scripts') " >> $LOG_FILE
\cp -r ~/"prod scripts"/* ~/testing/"prod scripts" >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully.\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: git log) " >> $LOG_FILE
git log >> $GIT_LOG >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully.\n" >> $LOG_FILE

cd ~/testing/"prod scripts"

date >> $LOG_FILE
printf ": Changed directory to ~/testing/'prod scripts'.\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: chmod +x *) " >> $LOG_FILE
chmod +x * >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully.\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": dev_to_test.sh executed successfully. Waiting and returning exit status 0.\n" >> $LOG_FILE

./test_to_stage.sh

wait

exit 0
