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

echo "Bumping version to patch..."
npm run version:all:patch

echo "Publishing..."
npm run publish:all
