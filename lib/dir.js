const fs = require("fs")
const path = require("path")
const Git = require("simple-git/promise")
const resolve = require("untildify")

// https://stackoverflow.com/a/50121975
const getReposRec = async dir => {
  const repos = []

  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file)
    if (!fs.lstatSync(fullPath).isDirectory()) continue

    try {
      if (await Git(fullPath).checkIsRepo()) repos.push(fullPath)
      else repos.push(...(await getReposRec(fullPath)))
    } catch (err) {
      console.error(err)
    }
  }

  return repos
}

exports.getRepos = async dir => getReposRec(resolve(dir))
