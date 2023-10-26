#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

rm -rf dist

# 安装
pnpm i

# 构建
pnpm run build

mkdir dist
mkdir dist/client
mkdir dist/server
mkdir dist/server/build

mv packages/client/dist dist/client
mv packages/server/build dist/server
cp packages/server/ecosystem.config.js dist/server/ecosystem.config.js
cp packages/server/package.json dist/server/package.json
cp packages/server/package-lock.json dist/server/package-lock.json
