const git = require("simple-git/promise")
const dotenv = require("dotenv")

exports.default = async () =>
  dotenv.parse(await git().raw(["config", "--list"]))
