const fs = require('fs')
const path = require('path')
const Git = require('simple-git/promise')
const resolve = require('untildify')

const getReposRec = async dir => {
  if (!fs.lstatSync(dir).isDirectory()) return []
  if (await Git(dir).checkIsRepo()) return [dir]

  const repos = []
  for (const subDir of fs.readdirSync(dir))
    repos.push(...(await getReposRec(path.join(dir, subDir))))

  return repos
}

exports.getRepos = async dir => getReposRec(resolve(dir))
