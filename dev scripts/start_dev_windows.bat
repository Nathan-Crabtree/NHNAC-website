:: Runs "npm start", "npm run sass", and "npm test" separately on 3 different windows in Windows command prompt.
@echo off

:: Prompt user to type in full directory location of client folder 
set /p dir="Please type in the entire directory path of your client folder (ex. C:\dev\NHNAC-website\client): "
set /p confirmation="Are you sure you want to use "%dir%"? (Y/N): "
IF "%confirmation%"=="Y" ( echo Directory successfully located. && pause )
IF "%confirmation%"=="y" ( echo Directory successfully located. && pause )
IF "%confirmation%"=="N" ( echo Please restart the program to re-enter your directory. && pause && exit )
IF "%confirmation%"=="n" ( echo Please restart the program to re-enter your directory. && pause && exit )

start cmd.exe @cmd /k "cd %dir% && npm start"
start cmd.exe @cmd /k "cd %dir% && npm run sass"
start cmd.exe @cmd /k "cd %dir% && npm test"

exit