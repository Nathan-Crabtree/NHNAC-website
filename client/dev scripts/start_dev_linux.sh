#!/bin/bash
#
# Runs "npm start", "npm run sass", and "npm test" separately on 3 different tabs in Bash terminal.
# NOTE: Hasn't been tested. Currently experimental.
# Use 'printf "\\033c"' to clear terminal (development purposes). - Zane
#
echo "Please type in the directory of your client folder (ex. ~/zane/NHNAC-website/client): "
read DIR

# Src: https://stackoverflow.com/questions/226703/how-do-i-prompt-for-yes-no-cancel-input-in-a-linux-shell-script - Zane
while true; do
    read -p "Are you sure you want to use \"$DIR\"? (Y/N): " yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

# God... this was such a b*$#@ to put together
chmod +x linux/genericscripttobash.sh
cd linux
gnome-terminal --tab --working-directory $DIR -- ./genericscripttobash.sh "npm start"
gnome-terminal --tab --working-directory $DIR -- ./genericscripttobash.sh "npm run sass"
gnome-terminal --tab --working-directory $DIR -- ./genericscripttobash.sh "npm test"