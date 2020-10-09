#!/bin/bash
#
#
# The procedure goes in this script as follows:
# 
# git pull origin master
# cd ~/staging
# ./scripts/test_to_stage.sh
#

FILE=~/script_exec_log.txt

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
echo -e ": Beginning dev_to_test.sh\n" >> $FILE

date >> $FILE
echo -e ": (command: git pull origin master) " >> $FILE
git pull origin master >> $FILE
echo -e "\n" >> $FILE

wait

date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": dev_to_test.sh executed successfully\n" >> $FILE

cd ~/staging

date >> $FILE
echo -e ": Changed directory to ~/staging. Waiting and returning exit status 0.\n" >> $FILE

./scripts/test_to_stage.sh

wait

exit 0
