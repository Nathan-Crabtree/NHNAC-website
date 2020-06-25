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


### Installing on Linux:

Note: Make sure the distro you’re using fully supports these dependencies.

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

### Installing on Windows:

Note: It is strongly recommended that you complete the entire installation process with “Git Bash”.

To install Git on Windows, please download the installer from the following link: https://git-scm.com/download/win

Afterwards, download the Node.js installer from the following link: https://nodejs.org/en/download/

## Testing to see if Node.js and Git work on your machine 

Once you’ve installed Node.js, you can now check to see if it’s working by looking up the version in the terminal:

```
node -v
``` 

Ensure on your computer after installing Node.js that you also have npm by checking the version:

```
npm -v
```

## Initializing your empty repository folder

In order to initialize your repository folder, you must first create an empty folder that you’ll be working in. You can name it and place anywhere in your OS as you wish.

* Step 1: To initialize your folder, type into your terminal:

```
git init
```

* Step 2: Set your origin link to use the proper SSH protocol to the remote repository by typing in: 

```
git remote add origin git+ssh://git@github.com/Zandy12/NHNAC-website.git
```

## Setting up your SSH key:

The following steps will require your terminal and will contain details about the commands you’re typing in.

* Step 1: Change directory to hidden “.ssh” folder.

```
Cd ~/.ssh
```

Note: On MacOS, the .ssh folder will be located in /Users/<username/.ssh. For Windows, you will have to create .ssh file manually in the root directory (e.g C:\Users\<username>\.ssh).

* Step 2: Create an SSH key.

```
ssh-keygen -t rsa
```

Note: You may leave all the fields blank when prompted, the file name will default to “id_rsa”. For Windows, use “ssh-keygen.exe” (make sure your directory is pointing to C:\Program Files\Git\bin). 

* Step 3) Creating a configuration file for making the connection to GitHub. Note: If you’re on Windows or MacOS, you may skip this step.

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

* Step 4) Provide the SSH key file “id_rsa.pub” (or the custom name of your SSH key) to the Admin at zanechandy@gmail.com to have your SSH key processed and added to the GitHub repository.

Note: Make sure the file has the “.pub” extension.

Once the key has been added, you can test your connection by typing in the terminal:

```
ssh -T git@github.com
```

Note: On Windows, you may need to use nmap which is downloadable at nmap.org.

## Final Steps

After completing all the other steps, you may pull the repository into your local machine by typing in the terminal:

```
git pull origin master
```

Note: Make sure you’re in your designated file directory before you pull.

To set up your environment head into your “api” and “client” directories in the repository folder and type in the command:

```
npm install
```

To run the servers in each directory, simply put in the terminal for both:

```
npm start
```
At this point, your environment is all set and ready for you to start coding! 

Note: At anytime, you may run “npm stop” to stop the servers.
