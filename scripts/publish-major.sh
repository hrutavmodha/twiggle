#!/bin/bash
set -e

echo "Linting..."
npm run lint

echo "Formatting..."
npm run format

echo "Building..."
npm run build

echo "Testing..."
npm run test

echo "Bumping version to major..."
npm run version:all:major

echo "Publishing..."
npm run publish:all
