#!/usr/bin/env node
const { Input, Dir, Config, Repo } = require("./lib")
const debug = require("debug")

const run = async () => {
  const config = await Config.default()
  debug("git-config:config")(config)

  const input = await Input.read(config)
  debug("git-config:input")(input)

  const repos = await Dir.getRepos(input.dir)
  debug("git-config:repos")(repos)
  if (!repos.length) {
    console.error("No repos found in specified directory")
    process.exit(1)
  }

  for (const repo of repos) {
    await Repo.update(repo, input)
    if (input.force) await Repo.push(repo)
  }
}

run().catch(console.error)
