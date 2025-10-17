---
title: Introduction
---

# Introduction to Twiggle

Twiggle is a lightweight, reactive UI micro-framework for building web applications. It is designed to be simple, efficient, and flexible, giving you the control to build your application your way.

## Philosophy

Twiggle was born out of the desire for a simpler, more direct way to build reactive user interfaces. While full-blown frameworks like React and Angular are powerful, they often come with a steep learning curve and a lot of boilerplate. Twiggle takes a different approach by providing a minimal set of tools that you can use to build your application from the ground up.

At its core, Twiggle is built on two key principles:

1.  **Direct DOM Manipulation**: Twiggle does not use a virtual DOM. Instead, it directly manipulates the DOM, which can be more efficient in many cases and leads to a smaller bundle size.
2.  **Simple Reactivity**: Twiggle's reactivity model is designed to be easy to understand and use. There are no complex rules or concepts to learn. You create a piece of state, and your UI automatically updates when it changes.

## Prerequisites

Before you can start building applications with Twiggle, you need to make sure you have the following installed:

-   **Node.js**: Twiggle is a JavaScript framework and requires Node.js to run. You can download it from the [official Node.js website](https://nodejs.org/). We recommend using the latest LTS version.
-   **npm, yarn, or pnpm**: You will also need a package manager to install Twiggle and other dependencies. You can use npm (which comes with Node.js), yarn, or pnpm.

## Getting Started

The easiest way to get started with Twiggle is by using the `create-twiggle-app` CLI. This command-line tool will create a new Twiggle project for you with all the necessary files and configurations.

To create a new project, run the following command in your terminal:

```bash
npm create twiggle-app@latest my-twiggle-app
```

This will create a new directory called `my-twiggle-app` with the following structure:

```
my-twiggle-app/
├── index.html
├── src/
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── tsconfig.json
```

Once the project is created, you can navigate into the directory and start the development server:

```bash
cd my-twiggle-app
npm run dev
```

This will start a development server at `http://localhost:5173`, where you can see your new Twiggle application in action.