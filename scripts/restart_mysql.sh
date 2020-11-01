#!/bin/sh
# 
# The script executes the following command:
#
# /usr/local/mysql/bin/mysqld_safe -user=mysql &
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
echo -e ": Waited successfully. MySQL has been restarted...\n" >> $FILE

date >> $FILE
/usr/local/mysql/bin/mysqld_safe -user=mysql & >> $FILE
echo -e ": \n" >> $FILE
