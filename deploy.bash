#!/bin/bash

DIR=$(dirname $(readlink -f ${BASH_SOURCE[@]}))

cd $DIR

hasChanges="`git status --porcelain`"

if [ -n "$hasChanges" ];then
  echo "Changes were found!  All changes must be checked in before deploying."
  exit 1
fi

gulp

git checkout master
cp -R dist/* .
rm -rf dist/
git add --all
git commit -a -m 'Deploying'
git push origin master
git checkout develop
gulp
