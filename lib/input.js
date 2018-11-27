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
      message: "Outdated git config to change:",
      choices: [
        { name: "name", message: "Name" },
        { name: "email", message: "Email" }
      ],
      validate: validateObject
    },
    {
      type: "form",
      name: "new",
      message: "New config to replace the old ones:",
      choices: [
        {
          name: "name",
          message: "Name",
          initial: config["user.name"]
        },
        {
          name: "email",
          message: "Email",
          initial: config["user.email"]
        }
      ],
      validate: validateObject
    },
    { type: "confirm", name: "force", message: "Force push changes to remote?" }
  ])
