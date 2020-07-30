#!/bin/bash
#
#
# build.sh
#
# Note: before running script, make sure you have an SSH key setup for accessing github repo
# Note: run script with sudo
# Note: after running script, use "chmod +x *" in scripts folder (make sure to have it unlocked). 
# place startup.sh into /etc/init.d and schedule cronjob for dev_to_test.sh
#
# The script executes in the following way:
#
# sudo apt-get update
# sudo apt install apache2
# sudo apt install git
# sudo apt install nodejs
# sudo apt install npm
# sudo apt install ssmtp
# cd ~
# mkdir testing staging production
# cd testing
# git init 
# git remote add origin git+ssh://git@github.com/Zandy12/NHNAC-website.git
# git pull origin master
# cd ~/production
# git init 
# git remote add origin git+ssh://git@github.com/Zandy12/NHNAC-website.git
# sudo mv startup.sh /etc/init.d
#

FILE=~/script_exec_log.txt
EMAIL=~/production/api/email.txt

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
echo -e "build.sh is being executed...\n" >> $FILE

date >> $FILE
echo -e ": (command: sudo apt-get update) " >> $FILE
sudo apt-get update >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: sudo apt install apache2) " >> $FILE
sudo apt install apache2 >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: sudo apt install git) " >> $FILE
sudo apt install git >> $FILE 
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: sudo apt install nodejs) " >> $FILE
sudo apt install nodejs >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: sudo apt install npm) " >> $FILE
sudo apt install npm >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: sudo apt install ssmtp) " >> $FILE
sudo apt install ssmtp >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

cd ~
date >> $FILE
echo -e ": Changed directory to ~\n" >> $FILE

date >> $FILE
echo -e ": (command: mkdir testing staging production) " >> $FILE
mkdir testing staging production >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

cd testing
date >> $FILE
echo -e ": Changed directory to ~/testing\n" >> $FILE

date >> $FILE
echo -e ": (command: git init) " >> $FILE
git init >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: git remote add origin git+ssh://git@github.com/Zandy12/NHNAC-website.git) " >> $FILE
git remote add origin git+ssh://git@github.com/Zandy12/NHNAC-website.git >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: git pull origin master) " >> $FILE
git pull origin master >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

cd ~/production
date >> $FILE
echo -e ": Changed directory to ~/production\n" >> $FILE

date >> $FILE
echo -e ": (command: git init) " >> $FILE
git init >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: git remote add origin git+ssh://git@github.com/Zandy12/NHNAC-website.git) " >> $FILE
git remote add origin git+ssh://git@github.com/Zandy12/NHNAC-website.git >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: sudo mv startup.sh /etc/init.d) " >> $FILE
sudo mv startup.sh /etc/init.d >> $FILE
echo -e "\n" >> $FILE

date >> $FILE
exit 0 >> $FILE
echo -e "\n" >> $FILE