# Adding Code To The Repository

When adding code to the repository, it's important to follow this procedure (which you may already know) to avoid creating issues on the master branch and will help
making the process of deploying code a more pleasant experience. :)

If you have any questions, please feel free to reach out to me at zanechandy@gmail.com.

Thanks. - Zane

## Fork the repository 

The option to fork any repository on Github is on the top-right of the User Interface. When editing the code, you can only do so on your forked repository.

## Download the repository into your development environment

Make sure you have a designated folder that  on your work computer to insert the repository into. 

In your terminal (make sure your directory is pointing to the proper folder), type:

```
git clone git+ssh://git@github.com/<username>/NHNAC-website.git
```
*Note: Replace <username> with your actual Github account username.*

When the command process is complete, you should have the repo files in your folder.

## Track the original repository as a remote of the fork

*Note: This snippet of text was copied over from https://jarv.is/notes/how-to-pull-request-fork-github/*

*This step is technically optional, but important if you plan to continue contributing to a project in the future, so we might as well…*

Once you’ve forked a repository, changes to the original (or “upstream”) repository are not pushed to your fork. We need to tell the new repository to follow changes made upstream to keep it fresh via remotes.

Switch directories to the forked repository you just cloned and run the following commands. Replace the last part of the first line with the original repository clone URL — similar to the how you grabbed the URL in step 2, but this isn’t the one with your username.

This links the fork back to the original repository as a remote, which we’ll name upstream, and then fetch it.

```
git remote add --track master upstream git@github.com:facebook/react-native.git
git fetch upstream
```

## Catching up your forked repository with the original if you're falling behind on commits

To make your repository even again with the original if your flagged on Github for falling n commits behind, simply type both of these commands sequentially:

```
git fetch upstream
```

```
git pull upstream master
```

*Note: Make sure you are switched to the master branch in your local repository before running these commands.*

## Creating a new branch to store your code using Git

Now to add code to the codebase, you must first create a seperate branch from the master. You can do this by typing in your terminal:

```
 git checkout -b <branch-name>
```

*Note: Replace <branch-name> with whatever the name of the new branch is that you wish to name it.*

## Committing code to your newly created branch

Side note, two important Git commands you will be using are:

```
git status
```

and

```
git diff
```

Both of these commands show the actual changes you've made to your branch when updating it and what isn't committed yet. "git diff" provides a bit more 
information.

## Adding new files

To add a new or changed file to the repository, type in your terminal the following code:

```
git add <new-file>
```

*Note: Replace <new-file> with the new or changed file you would like to commit.*

Also, you can use:

```
git add .
```

which bascially commits everything that exists within the folder, including the new or edited files.

## Committing new files

To commit a new or edited file to the repository, type in your terminal the following command:

```
git commit -m "<message>"
```

*Note: Please change <message> with the commit change note you would like to associate with your change(s).*

## Pushing your code to the remote repository.

To finally add your code to the forked repository existing in your account, type into your terminal:

```
 git push origin <branch-name>
```

*Note: Replace <branch-name> with the name of your created branch in the beginning of the documentation.*

## Creating a pull request on the Github website.

On your browser, go to the link where your forked repository exists. Click on "Pull Request", and then click on the option "Compare and Pull Request". When
typing in your changes information, make sure to have your "base" and "base fork" linked to the original repository over at 
https://github.com/crystal-spider/NHNAC-website. Also, make sure your "head fork" and "compare" are properly linked in your forked repository. 

When you're all set and you feel confident that all the information for your pull request is correct and is properly documented, click "Create Pull Request".

After that, you should be all set and I will take over and review your code on my side :)






