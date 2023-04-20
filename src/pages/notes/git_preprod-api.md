---
layout: $/layouts/post.astro
title: Deploy API on preprod
description: Deploy API on preprod
tags:
  - git
  - api
date: 2023-04-18
---

# 

## Commands list

```bash
git checkout master
git stash # to keep local changes
git pull --rebase -p origin master # to rebase on remote master with history
git checkout PF-109
git rebase -r master # to rebase on local master
git push -f # to force push on remote branch due to rebase (history changed)
git checkout master
git pull --rebase -p origin master
git checkout -b preprod # create preprod branch
git push -u origin preprod # push preprod branch on remote
git stash pop # to get back local changes

# sur serveur preprod
git fetch origin # get remote branches
git checkout preprod
```