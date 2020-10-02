# Development Environment Set-Up Guide

## Overview

Below is a step of instructions for setting up and getting started with developing for the NHNAC website. The following steps will take you through installing the proper dependencies on your computer and preparing your development environment. Any questions please email zanechandy@gmail.com. Thanks. - Zane 

## Getting started: Installing all the proper global dependencies

### Installing on MacOS:

*Note: Git should be installed on your MacOS by default. To check the version on your computer, type in the following command:*

```
git —version
```

If Git is not installed, you can download the installer at: https://sourceforge.net/projects/git-osx-installer/.

When you’re assured that Git is installed and properly working, you’ll now need to install Node.js by visiting this link: https://nodejs.org/en/download/.

Once you’ve installed Node.js, you can now check to see if it’s working by looking up the version in the terminal:

```
node -v
``` 

Ensure on your computer after installing Node.js that you also have npm by checking the version:

```
npm -v
```

After installing Node.js, it is now time to install MySQL. Please follow the instructions provided in this link: https://dev.mysql.com/doc/mysql-osx-excerpt/5.7/en/osx-installation-pkg.html

*Note: If you are getting an error that is preventing you from launching the .dmg file due to a security block, you will have to go to "Security & Privacy" General settings in "System Preferences" and click "Open anyways" at the bottom where it notifies you that a file has been prevented from being opened.*

Make sure you remember your password while setting it up via installation. 

When you've finished installing, you can start the server with the MySQL preference pane in "System Preferences".

To connect and interact with the server, you'll need the MySQL shell that is provided here with installation instructions: https://dev.mysql.com/doc/refman/5.7/en/installing-mysql-shell-osx-quick.html

Once you've installed MySQL shell, to connect to the server in your terminal type:

```
cd /usr/local/mysql/bin
```

and

```
./mysql -u root -p
```

You'll be prompted the password that you've initially set up via installation. MySQL will be running by default on localhost:3306.

*Note: You can also use MySQL Workbench on MacOS by downloading it here: https://dev.mysql.com/downloads/workbench/ . Be sure to have "MacOS" selected as your Operating System.*

### Installing on a Generic Linux kernel:

*Note: Make sure the distro you’re using fully supports these dependencies.*

To install Git on Linux, type in the following command in your terminal:

```
sudo apt install git
```

Afterwards, you will now need to install Node.js on your machine. 

Type in the following command to install NVM (Node Version Manager):

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Check to see if NVM is working by typing:

```
command -v nvm
```

The terminal should output “nvm” if the installation is successful. To install the latest version of node on your machine, type:

```
nvm install node
```

To install MySQL in Linux, you will have to download the binaries here: https://dev.mysql.com/downloads/mysql/. Make sure to have "Linux - Generic" selected as your Operating System. Be sure to download a "Compressed TAR archive" file. Usually it is near the top of the list.

*Note: For further assistance with installing MySQL on Linux, you can visit the official online documentation by Oracle provided here: https://dev.mysql.com/doc/refman/8.0/en/binary-installation.html*

Keep in mind the location where your file was downloaded (Usually it's ~/Downloads/<filename>.tar.xz).

In your terminal you'll have to type in the following commands:

```
shell> sudo groupadd mysql
shell> sudo useradd -r -g mysql -s /bin/false mysql
shell> cd /usr/local
shell> sudo tar xvf <path_and_name_to_mysql_file>.tar.xz
shell> sudo ln -s /usr/local/<mysql_filename> mysql
shell> cd mysql
shell> sudo mkdir mysql-files
shell> sudo chown mysql:mysql mysql-files
shell> sudo chmod 750 mysql-files
shell> sudo chmod -R 777 /tmp
shell> sudo chmod -R 777 /usr/local/mysql
shell> sudo bin/mysqld --initialize --user=mysql #Note: Here you'll receive a default password, be sure to have that remembered.
shell> sudo bin/mysql_ssl_rsa_setup
```

Once you've completed installing MySQL, you can start the server with this command:

```
shell> bin/mysqld_safe --user=mysql &
```

You can shutdown the server with this command:

```
bin/mysqladmin -u root -p shutdown
```

*KNOWN ISSUE: From personal experience with using "bin/mysqladmin" in Linux Mint 20, the only way to get any command working with it is to use "-u root -p" before adding an argument.*

To connect to the server, use the following command: 

```
mysql -u root -p -h127.0.0.1
```

Here you'll be prompted the password. Once you're in, you will have to reset the password with the following SQL command:

```
ALTER USER 'root'@'localhost' IDENTIFIED BY '<type_new_password_here>';
```

MySQL will running by default on localhost:3306.

### Installing on Windows:

*Note: It is mandatory that you complete the entire installation process on Windows with “Git Bash”.*

To install Git on Windows, please download the installer from the following link: https://git-scm.com/download/win.

Afterwards, download the Node.js installer from the following link: https://nodejs.org/en/download/.

To install MySQL on Windows, you'll have to download the installer here: https://dev.mysql.com/doc/refman/8.0/en/windows-installation.html/.

The setup type doesn't matter as long as you're installing the server. When prompted config type for the server, use "Development Computer". Have the port number set to 3306. 

Be sure you remember your password. 

You can connect to the server easily by starting either application: "MySQL Shell" or "MySQL Workbench".

## Testing to see if Node.js and Git work on your machine 

Once you’ve installed Node.js, you can now check to see if it’s working by looking up the version in the terminal:

```
node -v
``` 

Ensure on your computer after installing Node.js that you also have npm by checking the version:

```
npm -v
```

## Forking and cloning your empty repository folder

In order to initialize your repository folder, you must first create an empty folder that you’ll be working in. You can name it and place anywhere in your OS as you wish. 

*Note: Before following these steps, make sure you've forked the head repository at https://www.github.com/Zandy12/NHNAC-website.git. If you need to know to how fork, please read "How To Properly Add Code To The Repository.md"*

Set your origin link to use the proper SSH protocol to the remote repository by typing in: 

```
git remote add origin https://github.com/<username>/NHNAC-website.git
```

*Note: Replace <username> with your actual Github account username.*

## Setting up your SSH key (Optional):

The following steps will require your terminal and will contain details about the commands you’re typing in.

* Step 1: Change directory to hidden “.ssh” folder.

```
Cd ~/.ssh
```

*Note: On MacOS, the .ssh folder will be located in /Users/<username/.ssh. For Windows, you will have to create .ssh file manually in the root directory (e.g C:\Users\<username>\.ssh).*

* Step 2: Create an SSH key.

```
ssh-keygen -t rsa
```

*Note: You may leave all the fields blank when prompted, the file name will default to “id_rsa”. For Windows, use “ssh-keygen.exe” (make sure your directory is pointing to C:\Program Files\Git\bin).* 

* Step 3) Creating a configuration file for making the connection to GitHub. 

*Note: If you’re on Windows or MacOS, you may skip this step.*

```
touch ~/.ssh/config
```

Inside the “config” file, type in:

```
Host github.com
 Hostname ssh.github.com
 Port 443
```

Save it and exit.

* Step 4) Provide the SSH key file “id_rsa.pub” (or the custom name of your SSH key) to admin at zanechandy@gmail.com to have your SSH key processed and added to the GitHub repository.

*Note: Make sure the file has the “.pub” extension.*

Once the key has been added, you can test your connection by typing in the terminal:

```
ssh -T git@github.com
```

*Note: On Windows, you may need to use nmap which is downloadable at nmap.org.*

## Final Steps

After completing all the other steps, you may pull the repository into your local machine by typing in the terminal:

```
git clone https://github.com/<username>/NHNAC-website.git
```

*Note: Make sure you’re in your designated file directory before you clone and replace <username> with your actual Github account username.*

To set up your environment head into your “api” and “client” directories in the repository folder and type in the command:

```
npm install
```

To run the servers in each directory, simply put in the terminal for both:

```
npm start
```

To run jest testing inside the development environment for both servers, type in the terminal:

```
npm test
```

To run the sass preprocessor while working on the front-end, type in the terminal:

```
sass --watch scss/style.css ../public/css/style.css --style=compressed
```

At this point, your environment is all set and ready for you to start coding! 