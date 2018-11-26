const fs = require("fs")
const path = require("path")
const git = require("simple-git/promise")

// https://stackoverflow.com/a/50121975
exports.getRepos = async dir => {
  const repos = []

  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file)
    if (!fs.lstatSync(fullPath).isDirectory()) continue

    try {
      repos.push(
        (await git(fullPath)
          .silent(true)
          .checkIsRepo())
          ? fullPath
          : await getRepos(fullPath)
      )
    } catch (e) {}
  }

  return repos
}
