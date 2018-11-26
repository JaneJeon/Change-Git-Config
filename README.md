## Gotchas
If your git is set to use a non-English language (e.g. Korean), 
```js
git(fullPath).checkIsRepo()
```
can go apeshit for some reason. In that case, try
```bash
echo 'export LANG="en_US" # for git' >> ~/.bash_profile
```
