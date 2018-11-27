#!/usr/bin/env bash
curl -u $USER https://api.github.com/user/repos -d "{\"name\": \"test\", \"private\": true}"
mkdir sample
cd sample
git init
git remote add origin https://github.com/$USER/test.git
echo 'module.exports = "aaa"' > hello.js
git add .
git commit -m "first commit of the main branch"
git push --set-upstream origin master
echo "node_modules" > .gitignore
git add .
git commit -m "second commit of the main branch"
git push
git checkout -b "sticky"
echo 'console.log("bbb")' >> hello.js
git add .
git commit -m "first commit of the secondary branch"
git push --set-upstream origin sticky
git checkout master
echo 'console.log("bbb")' >> hello.js
git add .
git commit -m "third commit of the main branch"
git push
