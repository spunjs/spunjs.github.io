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
mv dist/* .
rm -rf dist/
git add --all
git commit -a -m 'Deploying'
git checkout develop
gulp
