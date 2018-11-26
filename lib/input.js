const { prompt } = require("enquirer")
const path = require("path")

const validateString = str => str.trim().length > 0
const validateObject = obj =>
  Object.values(obj).filter(prop => validateString(prop)).length > 0

exports.read = async config =>
  prompt([
    {
      type: "input",
      name: "dir",
      message: "Which directory to search for git repos?",
      initial: path.dirname(__dirname),
      validate: validateString
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
      validate: validateObject
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
      validate: validateObject
    },
    { type: "confirm", name: "force", message: "Force push changes to remote?" }
  ])
