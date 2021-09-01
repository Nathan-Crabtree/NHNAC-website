// Node.js script that starts up dev servers with proper terminal commands according to platform
// NOTE: Might have to be ran with sudo if on Mac or Linux. Linux version is currently experimental. - Zane 
//
// Commands ran:
// npm start: react-scripts start
// npm run sass: sass --watch scss/style.scss ../public/css/style.css --style=compressed
// npm test: react-scripts test --env=jsdom
//
const exec = require('child_process').exec;
const os = process.argv[2];

/**
 * displayOutput() function - Used as a callback function in exec() to handle output.
 * Src: https://stackoverflow.com/questions/1880198/how-to-execute-shell-command-in-javascript - Zane
 * 
 * @param {string} error, @param {string} stdout, @param {string} stderr
 */
displayOutput = (error, stdout, stderr) => {
    if (stdout !== '') {
        console.log('stdout: ' + stdout);
    }
    if (stderr !== '') {
        console.log('stderr: ' + stderr);
    }
    if (error !== null) {
        console.log('exec error: ' + error);
    }
}

// Script runs according to platform also for future unique installments like mySQL or Docker
switch(os) {
    case "mac":
        exec(`chmod +x "dev scripts/start_dev_mac.scpt"`, displayOutput);
        exec(`cd "dev scripts" && osascript start_dev_mac.scpt`, displayOutput);
        break;
    case "windows":
        exec(`cd "dev scripts" && start start_dev_windows.bat`, displayOutput);
        break;
    case "linux":
        exec(`cd "dev scripts"`, displayOutput);
        exec(`chmod +x start_dev_linux.sh`, displayOutput);
        exec(`./start_dev_linux.sh`, displayOutput);
        break;
    default:
        console.log('To use start_dev_env.js, Type "node start_dev_env.js <os>" (ex: node start_dev_env.js windows)');
        console.log('<os> options: ');
        console.log('mac');     
        console.log('windows');
        console.log('linux');
        console.log('help');
        break;
} 