#
# build.sh
#
# Note: before running script, make sure you have an SSH key setup for accessing github repo
# Note: run script with sudo
# Note: after running script, use "chmod +x *" in scripts folder (make sure to have it unlocked). 
# place startup.sh into /etc/init.d and schedule cron job using "crontab -e" for dev_to_test.sh. Insert at bottom of crontab file: "0 0 * * * cd ~/testing; ./dev_to_test.sh".
# Steps:
# 1) before running script, make sure you have an SSH key setup for accessing github repo, 
# also have the latest full MySQL Community Server .tar.xz file downloaded from https://dev.mysql.com/downloads/mysql/.
# 2) run script with sudo
# 3) after running script, use "chmod +x *" in scripts folder (make sure to have it unlocked).
# 4) place startup.sh into /etc/init.d and schedule cron job using "crontab -e" for dev_to_test.sh. Insert at bottom of crontab file: "0 0 * * * cd ~/testing; ./dev_to_test.sh".
# 5) run stage_to_prod.sh and start_client.sh as soon as the staging folder is populated.
#
# MYSQL COMMANDS KNOWN TO WORK WITH GENERIC LINUX (DO NOT USE SUDO):
# bin/mysqld_safe --user=mysql &
# mysql -u root -p -h127.0.0.1
# bin/mysqladmin -u root -p shutdown
# 
# The script executes in the following way:
#
# sudo apt-get update
# sudo apt install apache2
# sudo apt install git
# sudo apt install nodejs
# sudo apt install npm
# sudo apt install ssmtp
# +++++++ NEEDS TO BE ADDED TO SCRIPT ++++++++
# groupadd mysql
# useradd -r -g mysql -s /bin/false mysql
# cd /usr/local
# prompt file location and name of mysql file here
# tar xvf <path_and_name_to_mysql_file>.tar.xz
# ln -s /usr/local/<mysql_filename> mysql
# cd mysql
# mkdir mysql-files
# chown mysql:mysql mysql-files
# chmod 750 mysql-files
# chmod -R 777 /tmp
# chmod -R 777 /usr/local/mysql
# bin/mysqld --initialize --user=mysql #Note: Here you'll receive a default password, be sure to have that remembered.
# bin/mysql_ssl_rsa_setup
# +++++++++++++++++++++++++++++++++++++++++++
# cd ~
# mkdir testing staging production
# cd testing
# cd ~/production
# git init 
# git remote add origin git+ssh://git@github.com/Zandy12/NHNAC-website.git
# sudo mv startup.sh /etc/init.d
# mv startup.sh /etc/init.d
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
