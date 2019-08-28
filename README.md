# Change Git Config

[![npm version](https://badge.fury.io/js/change-git-config.svg)](https://badge.fury.io/js/change-git-config) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=JaneJeon/Change-Git-Config)](https://dependabot.com)

Did you change your email address? Got a new name? You can change those outdated git configurations across *all* of 
your repos at once, *and* make the remote repositories (e.g. GitHub) reflect those changes!

This is an upgrade over the [previous PHP-based solution](https://github.com/JaneJeon/Change-Git-Name) in that a. it doesn't mess up your commit history (uses `git stash` instead), b. it pushes across *all* branches (unlike before, which only pushed `master`), and c. the logging is less cluttered and easier to pinpoint what went wrong where (especially during force pushes).

## Installation
Clone this repository.

## Usage
1. Run `yarn start`
2. Specify a directory. Anything from `~/Projects`, `/Users/home/$project`, to `./blah` flies!
3. Provide the outdated git information you'd like to update (i.e. your previous git config)
4. Check that the new git information looks right
5. (Optional) enable force push
6. ???
7. Profit!

## Warning
Only enable force push with repos that you own or repos where you know the others will be okay with this change!

If your `git` is set to use a non-English language (e.g. Korean), 
```js
git(fullPath).checkIsRepo()
```
can go apeshit for some reason. In that case, try
```bash
echo 'export LANG="en_US" # for git' >> ~/.bash_profile
```

Additionally, the git configurations are case-sensitive, meaning that `hello@example.com` and `Hello@example.com` 
look the same to `git`.

## Testing
You can do a simple integration test (unfortunately interactive in some parts, but a lot of it is still automated) as
 follows:
 - `yarn setup`
    - Provide your GitHub credentials, and modify `scripts/setup.sh` with your GitHub username
 - `yarn start`:
    - Use the following credentials:
        - dir: `./sample`
        - old name: your current git name
        - old email: your current git email
        - new name: something *different* from your current git name
        - new email: something *different* from your current git email
    - Afterwards, you should see the changes reflected on the github repo
 - `yarn teardown`
    - Provide your GitHub credentials, and modify `scripts/teardown.sh` with your GitHub username
