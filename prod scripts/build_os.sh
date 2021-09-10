#!/bin/bash
#
# NOTE: This script is meant for reading only is constantly being revised. Has not been tested or known to work. - Zane
#
# Steps:
# 1) before running script, make sure you have an SSH key setup for accessing github repo, 
# also have the latest full MySQL Community Server .tar.xz LOG_FILE downloaded from https://dev.mysql.com/downloads/mysql/.
# 2) run script with sudo
# 3) after running script, use "chmod +x *" in ~/testing/"prod scripts" folder along with restart_mysql.sh and startup.sh in /etc/init.d (make sure to have it unlocked). 
# 4) configure the /etc/ssmtp/ssmtp.conf LOG_FILE for sending emails (refer to https://wiki.archlinux.org/title/SSMTP).
# 5) schedule cron job using "crontab -e" for dev_to_test.sh. Insert at bottom of crontab LOG_FILE: "0 0 * * * cd ~/testing; ./dev_to_test.sh".
# 6) implement security features for apache and mysql. configure firewall settings and enable SSH remote access.
# note: whenever enabling SSH remote access for Linux server, make sure to combine it with a VPN.
# 7) create docker-compose.yml, Dockerfiles and .env.production files for api and client folders at home (~) for environment variables.
# 8) run stage_to_prod.sh and start_client.sh as soon as the staging folder is populated.
# 9) implement extra security features for the server if you can.
#
# MYSQL COMMANDS KNOWN TO WORK WITH GENERIC LINUX (DO NOT USE SUDO):
# bin/mysqld_safe --user=mysql &
# mysql -u root -p -h127.0.0.1
# bin/mysqladmin -u root -p shutdown
# 
# NOTE: Docker works best with automated scripts when running as "docker" user. - Zane
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
# prompt LOG_FILE location and name of mysql LOG_FILE here
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
# cp "prod scripts"/startup.sh /etc/init.d
# cp "prod scripts"/restart_mysql.sh /etc/init.d
#

source set_env_vars.sh
source functions.sh

draw_logo

wait 

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf "build_os.sh is being executed...\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: apt-get update) " >> $LOG_FILE
apt-get update >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: rm /etc/apt/preferences.d/nosnap.pref) " >> $LOG_FILE
rm /etc/apt/preferences.d/nosnap.pref >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: apt update) " >> $LOG_FILE
apt update >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: apt install snapd) " >> $LOG_FILE
apt install snapd >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: snap install docker) " >> $LOG_FILE
snap install docker >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: docker volume create portainer_data) " >> $LOG_FILE
docker volume create portainer_data >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer) " >> $LOG_FILE
docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: apt install apache2) " >> $LOG_FILE
apt install apache2 >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: apt install git) " >> $LOG_FILE
apt install git >> $LOG_FILE 
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: apt install nodejs) " >> $LOG_FILE
apt install nodejs >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: apt install npm) " >> $LOG_FILE
apt install npm >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: apt install ssmtp) " >> $LOG_FILE
apt install ssmtp >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: apt install wget) " >> $LOG_FILE
apt install wget >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: wget https://download.teamviewer.com/download/linux/teamviewer_amd64.deb) " >> $LOG_FILE
wget https://download.teamviewer.com/download/linux/teamviewer_amd64.deb >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: groupadd mysql) " >> $LOG_FILE
groupadd mysql >> $LOG_FILE
printf "\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: useradd -r -g mysql -s /bin/false mysql) " >> $LOG_FILE
useradd -r -g mysql -s /bin/false mysql >> $LOG_FILE
printf "\n" >> $LOG_FILE

cd /usr/local

date >> $LOG_FILE
printf ": changed directory to /usr/local\n" >> $LOG_FILE

read -p "Please enter the full LOG_FILE-name and path for your MySQL download (be sure to include .tar.xz): " VARFILENAME_AND_PATH

date >> $LOG_FILE
printf ": (command: tar xvf '$VARFILENAME_AND_PATH') " >> $LOG_FILE
tar xvf $VARFILENAME_AND_PATH >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

read -p "Please enter the only full LOG_FILE-name your MySQL download (be sure to include .tar.xz): " VARFILENAME_ONLY

date >> $LOG_FILE
printf ": (command: ln -s /usr/local/'$VARFILENAME_ONLY' mysql) " >> $LOG_FILE
ln -s /usr/local/$VARFILENAME_ONLY mysql >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

cd mysql >> $LOG_FILE

date >> $LOG_FILE
printf ": Changed directory to mysql\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: mkdir mysql-files) " >> $LOG_FILE
mkdir mysql-files >> $LOG_FILE
printf "\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: chown mysql:mysql mysql-files) " >> $LOG_FILE
chown mysql:mysql mysql-files >> $LOG_FILE
printf "\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: chmod 750 mysql-files) " >> $LOG_FILE
chmod 750 mysql-files >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: chmod -R 777 /tmp) " >> $LOG_FILE
chmod -R 777 /tmp >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: chmod -R 777 /var) " >> $LOG_FILE
chmod -R 777 /var >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

# These need to be ran manually after mysql has been installed:
# bin/mysqld --initialize --user=mysql # Note: Here you'll receive a default password, be sure to have that remembered.
# bin/mysql_ssl_rsa_setup

cd ~

date >> $LOG_FILE
printf ": Changed directory to ~\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: mkdir development testing staging production) " >> $LOG_FILE
mkdir development testing staging production >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

cd testing

date >> $LOG_FILE
printf ": Changed directory to testing\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: git init) " >> $LOG_FILE
git init >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: git remote add origin git+ssh://git@github.com/Zandy12/NHNAC-website.git) " >> $LOG_FILE
git remote add origin git+ssh://git@github.com/Zandy12/NHNAC-website.git >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: git pull origin master) " >> $LOG_FILE
git pull origin master >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

cd ~/production

date >> $LOG_FILE
printf ": Changed directory to ~/production\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: git init) " >> $LOG_FILE
git init >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: git remote add origin git+ssh://git@github.com/Zandy12/NHNAC-website.git) " >> $LOG_FILE
git remote add origin git+ssh://git@github.com/Zandy12/NHNAC-website.git >> $LOG_FILE
printf "\n" >> $LOG_FILE

wait

date >> $LOG_FILE
printf ": Waited successfully\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: cp 'prod scripts'/startup.sh /etc/init.d) " >> $LOG_FILE
cp "prod scripts"/startup.sh /etc/init.d >> $LOG_FILE
printf "\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": (command: cp 'prod scripts'/startup.sh /etc/init.d) " >> $LOG_FILE
cp "prod scripts"/restart_mysql.sh /etc/init.d >> $LOG_FILE
printf "\n" >> $LOG_FILE

date >> $LOG_FILE
printf ": build.sh executed successfully. Waiting and returning exit status 0.\n" >> $LOG_FILE

wait

exit 0
