# FGF Reddit Alerts

## Context

The [FreeGameFindings subreddit](https://www.reddit.com/r/FreeGameFindings/hot/) lists games that become free to get. This script will be useful for you if, like me:

- you remember to browse the subreddit only now and then, only to realize that all the interesting links are expired
-  you only look for more known, popular games

This script parses the front page of the [FreeGameFindings subreddit](https://www.reddit.com/r/FreeGameFindings/hot/) and mails you whenever a new post with more than 60 upvotes (you can change this to your liking of course) pops up. This script is meant to be used as a Google App Script, making it easy to run periodically and integrate with emails.

## Installation

### Step 1 - Importing the script to your own Google account
There are two ways to do it, namely the *command line way* and the *browser way*.

#### Via the command line
Install [clasp](https://github.com/google/clasp) (this requires having npm installed, which is bundled with [Node.js](https://nodejs.org/en/download/)
```
sudo npm i @google/clasp -g
```

Then, you will need to enable the [Google Scripts API](https://script.google.com/home/usersettings) on your Google account. Once this is done, you can login with clasp:
```
clasp login
```
You can now `cd` into this directory and create a Google App Script project from the command line:
```
clasp create --title "FGF Parser" --type standalone
```
Then push it online:
```
clasp push
```
And finally open it in your browser:
```
clasp open
```
You can now jump to step 2 !

#### Via browser

Go to the [Google App Scripts homepage](https://script.google.com/home), click the **+** icon to create a new project, name it, and copy the content of the script in this repository to the newly created `Code.gs` file.

### Step 2 - Variables and manual run

You now have the script before your eyes, but you need to edit two variables before running it:

- Change the `TARGET_EMAIL` variable to the email address you want to notify
- (optional) Change the `SCORE_THRESHOLD` to your preferred number of upvotes needed to trigger the script

You now have to manually run the script for the first time in order to be able to grant it the necessary permissions (I could not find a way to do it from the command line, contributions are welcome). Select `Run > Run function > main`. 

Note: the script requires Google Drive access since it keeps track of the posts for which it already notified you in a Google Sheet.

### Step 3 - Set triggers

Go to the [Trigger Page](https://script.google.com/home/triggers) and click Add a trigger. There you can select to run the function `main` on time-driven triggers, for example once every 2 hours.

You're set, you'll never miss a hot free game again !

