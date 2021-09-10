#!/bin/bash
# Functions

# Checks if log file logo and key are created or not. Draws if haven't.
draw_logo() 
{
    if [ -f "$LOG_FILE" ]; then
            date >> $LOG_FILE        
            printf "Note: LOG_FILE already exists. Top logo will not be created.\n" >> $LOG_FILE
    else
            cd ~
            touch script_exec_log.txt
            printf "***********************************************\n" >> $LOG_FILE
            printf "     ENVIRONMENT SCRIPT EXECUTION LOG LOG_FILE     \n" >> $LOG_FILE
            printf "***********************************************\n\n" >> $LOG_FILE
            printf "<weekday month day UT timezone>\n" >> $LOG_FILE 
            printf "<description>\n\n" >> $LOG_FILE    
    fi
}