#!/usr/bin/env node
const { Input, Dir, Profile } = require("./lib")

const run = async () => {
  const config = await Profile.default()
  const input = await Input.read(config)

  const repos = await Dir.getRepos(input.dir)
  if (!repos.length) {
    console.log("No repos found in specified directory")
    process.exit(1)
  }

  console.log(repos)
}

run()
