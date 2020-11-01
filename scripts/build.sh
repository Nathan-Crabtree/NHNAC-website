#! bin/bash
#
# build.sh
#
# Steps:
# 1) before running script, make sure you have an SSH key setup for accessing github repo, 
# also have the latest full MySQL Community Server .tar.xz file downloaded from https://dev.mysql.com/downloads/mysql/.
# 2) run script with sudo
# 3) after running script, use "chmod +x *" in ~/testing/scripts folder along with restart_mysql.sh and startup.sh in /etc/init.d (make sure to have it unlocked). 
# 4) schedule cron job using "crontab -e" for dev_to_test.sh. Insert at bottom of crontab file: "0 0 * * * cd ~/testing; ./dev_to_test.sh".
# 5) implement security features for apache and mysql. Configure firewall settings and enable SSH remote access.
# note: whenever enabling SSH remote access for Linux server, make sure to combine it with OpenVPN.
# 6) run stage_to_prod.sh and start_client.sh as soon as the staging folder is populated.
# 7) implement extra security features for the server if you can.
#
# MYSQL COMMANDS KNOWN TO WORK WITH GENERIC LINUX (DO NOT USE SUDO):
# bin/mysqld_safe --user=mysql &
# mysql -u root -p -h127.0.0.1
# bin/mysqladmin -u root -p shutdown
# 
# The script executes in the following way:
#
# apt-get update
# rm /etc/apt/preferences.d/nosnap.pref
# apt update
# apt install snapd
# snap install docker
# docker volume create portainer_data
# docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
# apt install apache2
# apt install git
# apt install nodejs
# apt install npm
# apt install ssmtp
# apt install wget
# wget https://download.teamviewer.com/download/linux/teamviewer_amd64.deb
# apt install -y ./teamviewer_amd64.deb
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
# chmod -R 777 /var
# chown mysql:mysql /usr/local/mysql -h
# snap install mysql-workbench-community
# bin/mysqld --initialize --user=mysql #Note: Here you'll receive a default password, be sure to have that remembered.
# bin/mysql_ssl_rsa_setup
# cd ~
# mkdir testing staging production
# cd testing
# git init 
# git remote add origin git+ssh://git@github.com/Zandy12/NHNAC-website.git
# git pull origin master
# cp /scripts/startup.sh /etc/init.d
# cp /scripts/restart_mysql.sh /etc/init.d
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
echo -e ": (command: apt-get update) " >> $FILE
apt-get update >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: rm /etc/apt/preferences.d/nosnap.pref) " >> $FILE
rm /etc/apt/preferences.d/nosnap.pref >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: apt update) " >> $FILE
apt update >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: apt install snapd) " >> $FILE
apt install snapd >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: snap install docker) " >> $FILE
snap install docker >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: docker volume create portainer_data) " >> $FILE
docker volume create portainer_data >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer) " >> $FILE
docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: apt install apache2) " >> $FILE
apt install apache2 >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: apt install git) " >> $FILE
apt install git >> $FILE 
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: apt install nodejs) " >> $FILE
apt install nodejs >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: apt install npm) " >> $FILE
apt install npm >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: apt install ssmtp) " >> $FILE
apt install ssmtp >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: apt install wget) " >> $FILE
apt install wget >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: wget https://download.teamviewer.com/download/linux/teamviewer_amd64.deb) " >> $FILE
wget https://download.teamviewer.com/download/linux/teamviewer_amd64.deb >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: groupadd mysql) " >> $FILE
groupadd mysql >> $FILE
echo -e "\n" >> $FILE

date >> $FILE
echo -e ": (command: useradd -r -g mysql -s /bin/false mysql) " >> $FILE
useradd -r -g mysql -s /bin/false mysql >> $FILE
echo -e "\n" >> $FILE

date >> $FILE
echo -e ": (command: cd /usr/local) " >> $FILE
cd /usr/local >> $FILE
echo -e "\n" >> $FILE

read -p "Please enter the full file-name and path for your MySQL download (be sure to include .tar.xz)" VARFILENAME_AND_PATH

date >> $FILE
echo -e ": (command: tar xvf ${VARFILENAME_AND_PATH}) " >> $FILE
tar xvf ${VARFILENAME_AND_PATH} >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

read -p "Please enter the only full file-name your MySQL download (be sure to include .tar.xz)" VARFILENAME_ONLY

date >> $FILE
echo -e ": (command: ln -s /usr/local/${VARFILENAME_ONLY} mysql) " >> $FILE
ln -s /usr/local/${VARFILENAME_ONLY} mysql >> $FILE
echo -e "\n" >> $FILE

wait
date >> $FILE
echo -e ": Waited successfully\n" >> $FILE

date >> $FILE
echo -e ": (command: cd mysql) " >> $FILE
cd mysql >> $FILE
echo -e "\n" >> $FILE

date >> $FILE
echo -e ": (command: mkdir mysql-files) " >> $FILE
mkdir mysql-files >> $FILE
echo -e "\n" >> $FILE

date >> $FILE
echo -e ": (command: chown mysql:mysql mysql-files) " >> $FILE
chown mysql:mysql mysql-files >> $FILE
echo -e "\n" >> $FILE

date >> $FILE
echo -e ": (command: chmod 750 mysql-files) " >> $FILE
chmod 750 mysql-files >> $FILE
echo -e "\n" >> $FILE


date >> $FILE
echo -e ": (command: chmod -R 777 /tmp) " >> $FILE
chmod -R 777 /tmp >> $FILE
echo -e "\n" >> $FILE


date >> $FILE
echo -e ": (command: chmod -R 777 /var) " >> $FILE
chmod -R 777 /var >> $FILE
echo -e "\n" >> $FILE

# These need to be ran manually after mysql has been installed:
# bin/mysqld --initialize --user=mysql # Note: Here you'll receive a default password, be sure to have that remembered.
# bin/mysql_ssl_rsa_setup

cd ~
date >> $FILE
echo -e ": Changed directory to ~\n" >> $FILE

date >> $FILE
echo -e ": (command: mkdir development testing staging production) " >> $FILE
mkdir development testing staging production >> $FILE
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
echo -e ": (command: cp scripts/startup.sh /etc/init.d) " >> $FILE
cp scripts/startup.sh /etc/init.d >> $FILE
echo -e "\n" >> $FILE

date >> $FILE
echo -e ": (command: cp scripts/startup.sh /etc/init.d) " >> $FILE
cp scripts/restart_mysql.sh /etc/init.d >> $FILE
echo -e "\n" >> $FILE

date >> $FILE
echo -e ": build.sh executed successfully. Waiting and returning exit status 0.\n" >> $FILE

wait

exit 0
