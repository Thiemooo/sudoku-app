#!/usr/bin/env sh

# abort on errors
set -e

PUSH_URL=$(git remote get-url origin --push)

# build
yarn build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'Deploy Sudoku-App 🍪'

git push -f "$PUSH_URL" master:gh-pages

cd -