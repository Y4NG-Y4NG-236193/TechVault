# 🚀 Git & GitHub Commands (Single Page Cheatsheet)

## 🔧 Setup
git config --global user.name "Your Name"        # set global username
git config --global user.email "your@email.com" # set global email

---

## 📁 Init / Clone
git init                                         # initialize git in project
git clone https://github.com/username/repo.git   # copy repo from GitHub
git remote add origin <url>                      # connect local repo to remote
git remote -v                                    # view remote URLs

---

## 📦 Basic Workflow
git add .                                        # stage all changes
git add file.txt                                 # stage specific file
git commit -m "message"                          # save snapshot with message
git push                                         # push to remote (default branch)
git push origin main                             # push to specific branch
git pull                                         # fetch + merge changes
git pull origin main                             # pull from specific branch

---

## 🔍 Status / Logs
git status                                       # show current changes
git log                                          # full commit history
git log --oneline                                # compact history
git diff                                         # show code differences

---

## 🌿 Branching
git branch                                       # list branches
git branch feature-name                          # create branch
git checkout feature-name                        # switch branch
git checkout -b feature-name                     # create + switch branch
git switch feature-name                          # modern switch branch
git switch -c feature-name                       # create + switch (modern)
git branch -d feature-name                       # delete branch
git branch -m new-name                           # rename branch

---

## 🔀 Merge / Rebase
git merge feature-name                           # merge branch into current
git rebase main                                  # reapply commits on top of main
git rebase --continue                            # continue rebase after fix
git rebase --abort                               # cancel rebase

---

## ⬇️ Fetch
git fetch                                        # download changes (no merge)
git fetch origin                                 # fetch from specific remote

---

## ⚠️ Undo / Reset
git reset file.txt                               # unstage file
git reset --soft HEAD~1                          # undo commit (keep changes staged)
git reset --mixed HEAD~1                         # undo commit (unstage changes)
git reset --hard HEAD~1                          # delete commit + changes
git restore file.txt                             # discard file changes
git restore --staged file.txt                    # unstage file (modern)

---

## 🧹 Clean
git clean -f                                     # remove untracked files
git clean -fd                                    # remove untracked files + folders

---

## 📌 Stash
git stash                                        # save changes temporarily
git stash pop                                    # restore and remove stash
git stash list                                   # list saved stashes
git stash apply                                  # restore stash (keep copy)

---

## 🔐 Tags
git tag                                          # list tags
git tag v1.0                                     # create tag
git push origin v1.0                             # push tag to remote
git tag -d v1.0                                  # delete tag locally

---

## 🔗 Remote
git remote add origin <url>                      # add remote repo
git remote remove origin                         # remove remote
git remote rename origin upstream                # rename remote

---

## 🔄 Sync Fork
git remote add upstream <url>                    # add original repo
git fetch upstream                               # fetch updates
git merge upstream/main                          # merge updates

---

## 📤 Force Push (Danger)
git push --force                                 # overwrite remote history
git push --force-with-lease                      # safer force push

---

## 📄 .gitignore (example)
node_modules/                                    # ignore dependencies
.env                                             # ignore environment variables
dist/                                            # ignore build output

---

## ⚡ Quick Flow (Most Used)
git checkout -b feature                          # create feature branch
git add .                                        # stage changes
git commit -m "update"                           # commit changes
git push origin feature                          # push branch

## Commit Message Format:

feat: new feature
fix: bug fix
docs: documentation
refactor: code improvement