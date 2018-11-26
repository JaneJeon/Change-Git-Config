const Git = require("simple-git/promise")
const dotenv = require("dotenv")

exports.default = async () =>
  dotenv.parse(await Git().raw(["config", "--list"]))
