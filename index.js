#!/usr/bin/env node
const { prompt } = require("enquirer")
const profile = require("./lib/profile")

const run = async () => {
  const config = await profile.default()

  const result = await prompt([
    {
      type: "input",
      name: "directory",
      message: "Which directory to search for git repos?",
      initial: __dirname,
      validate: val => val.trim().length
    },
    {
      type: "form",
      name: "old",
      message: "Old git config (usually author name and/or email is enough):",
      choices: [
        { name: "AUTHOR_NAME", message: "Author name" },
        { name: "AUTHOR_EMAIL", message: "Author email" },
        { name: "COMMITTER_NAME", message: "Committer name" },
        { name: "COMMITTER_EMAIL", message: "Committer email" }
      ],
      validate: val => Object.keys(val).length
    },
    {
      type: "form",
      name: "new",
      message: "New git config (usually author name and/or email is enough):",
      choices: [
        {
          name: "AUTHOR_NAME",
          message: "Author name",
          initial: config["user.name"]
        },
        {
          name: "AUTHOR_EMAIL",
          message: "Author email",
          initial: config["user.email"]
        },
        { name: "COMMITTER_NAME", message: "Committer name" },
        { name: "COMMITTER_EMAIL", message: "Committer email" }
      ],
      validate: val => Object.keys(val).length
    },
    { type: "confirm", name: "force", message: "Force push changes to remote?" }
  ])

  console.log(result)
}

run()
