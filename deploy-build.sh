#!/bin/bash

yarn run build

git config --global user.name ilaiwi
git config --global user.email ahmad.ilaiwi@gmail.com

function deploy_branch() {
  local branch_name=$1

  git clone --depth=1 --branch "$branch_name" "https://github.com/FoothillSolutions/react-calendar-timeline" ./$branch_name

  rm -rf ./$branch_name/*
  cp -rf ./package.json ./README.md ./LICENSE ./$branch_name/* ./$branch_name

  cd ./$branch_name

  git add --all
  git commit -m "deploy($branch_name): $TRAVIS_COMMIT"
  git push -qf "https://$GH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git"

  cd ..
  
}

deploy_branch "dist"
