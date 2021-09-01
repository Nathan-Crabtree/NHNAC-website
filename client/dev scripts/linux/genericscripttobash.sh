#!/bin/bash
# Src: https://stackoverflow.com/questions/3512055/avoid-gnome-terminal-close-after-script-execution
# Src: https://www.futurelearn.com/info/courses/linux-for-bioinformatics/0/steps/202962 - Zane
echo "Starting servers..."
$1
exec bash