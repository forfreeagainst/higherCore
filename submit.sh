#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git pull origin main
git add .
git commit -m "docs: 删除算法相关，单独抽离"
git push origin main