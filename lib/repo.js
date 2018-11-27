const os = require("os")
const Git = require("simple-git/promise")
const debug = require("debug")

exports.update = async (repo, config) => {
  const git = Git(repo).silent(true)
  debug("git-config:repo:updating")(repo)

  // https://stackoverflow.com/a/23517639
  await git.stash()

  // https://stackoverflow.com/a/4494037
  const aftermath = await git.raw([
    "filter-branch",
    "--setup",
    `OLD_NAME="${config.old.name}"
    OLD_EMAIL="${config.old.email}"
    NEW_NAME="${config.new.name}"
    NEW_EMAIL="${config.new.email}"`,
    "-f",
    "--env-filter",
    // I feel physically sick looking at this
    `if [ ! -z "$OLD_NAME" ] && [ ! -z "$NEW_NAME" ] && [ "$OLD_NAME" != "$NEW_NAME" ]
    then
      if [ "$GIT_AUTHOR_NAME" = "$OLD_NAME" ]
      then
        GIT_AUTHOR_NAME=$NEW_NAME
        echo "(author name) $OLD_NAME -> $NEW_NAME "
      fi
      if [ "$GIT_COMMITTER_NAME" = "$OLD_NAME" ]
      then
        GIT_COMMITTER_NAME=$NEW_NAME
        echo "(committer name) $OLD_NAME -> $NEW_NAME "
      fi
    fi
    if [ ! -z "$OLD_EMAIL" ] && [ ! -z "$NEW_EMAIL" ] && [ "$OLD_EMAIL" != "$NEW_EMAIL" ]
    then
      if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
      then
        GIT_AUTHOR_EMAIL=$NEW_EMAIL
        echo "(author email) $OLD_EMAIL -> $NEW_EMAIL "
      fi
      if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
      then
        GIT_COMMITTER_EMAIL=$NEW_EMAIL
        echo "(committer email) $OLD_EMAIL -> $NEW_EMAIL "
      fi
    fi`,
    "--",
    "--all"
  ])
  for (const line of aftermath.split(os.EOL))
    debug("git-config:repo:updated")(line)

  try {
    await git.stash(["pop"])
  } catch (e) {}
}

exports.push = async repo => {
  try {
    // https://stackoverflow.com/a/10479068
    await Git(repo).raw(["push", "--all", "origin", "--force"])
    debug("git-config:repo:push")("force pushed all branches in repo " + repo)
  } catch (e) {
    debug("git-config:repo:push")("failed to push to remote in repo " + repo)
  }
}
