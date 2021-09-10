#!/bin/bash
# 
# The script executes the following command:
#
# /usr/local/mysql/bin/mysqld_safe -user=mysql &
#

source set_env_vars.sh
source functions.sh

draw_logo

wait 

date >> $LOG_FILE
printf ": Waited successfully. MySQL has been restarted...\n" >> $LOG_FILE

date >> $LOG_FILE
/usr/local/mysql/bin/mysqld_safe -user=mysql & >> $LOG_FILE
printf ": \n" >> $LOG_FILE
