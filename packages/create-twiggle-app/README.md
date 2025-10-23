# Create Twiggle App

`create-twiggle-app` is the official command-line interface (CLI) tool meticulously designed to provide a streamlined and efficient way to bootstrap new Twiggle projects. It automates the initial setup of your development environment, including project structure, build configurations, and essential dependencies, allowing you to focus immediately on developing your Twiggle application without the hassle of manual configuration. This tool is built to adhere to best practices and seamlessly integrates with the Twiggle ecosystem, ensuring a consistent and optimized starting point for all your projects.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/hrutavmodha/twiggle/blob/main/LICENSE)
[![Version](https://img.shields.io/badge/version-0.0.1-brightgreen)](https://www.npmjs.com/package/create-twiggle-app)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The process of initiating a new frontend project can often be time-consuming and prone to inconsistencies due to repetitive configuration tasks. `create-twiggle-app` addresses this challenge by offering a robust solution for generating a fully functional Twiggle project with a single command. It intelligently sets up the build system (Vite), configures TypeScript, and integrates the `vite-plugin-twiggle`, ensuring that your project is not only ready for immediate development but also optimized for performance and maintainability. This CLI tool is an invaluable asset for developers of all experience levels, providing a consistent and high-quality foundation for Twiggle applications.

---

## Features

`create-twiggle-app` is engineered for simplicity, efficiency, and developer convenience, offering a range of features to enhance your Twiggle development workflow:

**Example End-to-End Workflow:**

- **Integrated Build System (Vite):** Comes pre-configured with Vite, a next-generation frontend tooling that provides an extremely fast development server with Hot Module Replacement (HMR) and highly optimized production builds.
- **Seamless Twiggle Plugin Integration:** Automatically sets up and configures `vite-plugin-twiggle` within your new project, ensuring that JSX syntax is correctly transformed for Twiggle's runtime and that reactive expressions are enabled out-of-the-box, eliminating manual configuration steps.
- **Automated Dependency Management:** Handles the installation of all necessary project dependencies. It intelligently uses your preferred package manager (npm, Yarn, or pnpm) to ensure a smooth setup process.
- **Interactive Command-Line Prompts:** Provides a user-friendly interactive experience, guiding you through the project creation process with clear and concise prompts for essential information like the project name.
- **TypeScript-First Approach:** Generates projects with full TypeScript support, including a pre-configured `tsconfig.json` file. This enables type-safe development, enhancing code quality and reducing common errors.

---

## Installation

`create-twiggle-app` is designed to be used without global installation, leveraging `npx`, `yarn create`, or `pnpm create`. This approach ensures that you always utilize the latest version of the scaffolding tool, benefiting from the most recent features and bug fixes.

To initiate a new Twiggle project, execute one of the following commands in your terminal:

**Using `npm` (recommended):**

```bash
npx create-twiggle-app my-twiggle-app
```

**Using `Yarn`:**

```bash
yarn create twiggle-app my-twiggle-app
```

**Using `pnpm`:**

```bash
pnpm create twiggle-app my-twiggle-app
```

**Note:** Replace `my-twiggle-app` with your desired project name. If you omit the project name from the command, the CLI will engage an interactive prompt to ask for it.

---

## Usage

Upon executing the project creation command, `create-twiggle-app` performs a series of automated steps to prepare your new Twiggle application:

1.  **Project Name Confirmation:** If a project name was not provided as a command-line argument, the CLI will interactively prompt you to enter one.
2.  **Directory Creation:** A new directory bearing your specified project name will be created in the current working directory.
3.  **Template File Copying:** The essential template files, which define the foundational structure and initial code of your Twiggle application, are copied into the newly created project directory.
4.  **Dependency Installation:** All required project dependencies, as specified in the template's `package.json`, are automatically installed using your detected or preferred package manager.
5.  **Post-Creation Instructions:** The CLI will provide clear instructions on how to navigate into your newly created project directory and initiate the development server.

**Example End-to-End Workflow:**

```bash
# Initiate a new Twiggle project named 'my-first-twiggle-app'
npx create-twiggle-app my-first-twiggle-app

# Navigate into your newly created project directory
cd my-first-twiggle-app

# Start the development server to begin coding
npm run dev
```

Once the development server is active, your Twiggle application will typically be accessible in your web browser at `http://localhost:5173`. If port `5173` is already in use, Vite will automatically select an alternative available port.

---

## Project Structure

A newly generated Twiggle project provides a clean, logical, and extensible directory structure designed for clarity and ease of development:

```
my-twiggle-app/
├── index.html
├── src/
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

- **`index.html`**: The main HTML file that serves as the entry point for your Twiggle application. It includes the necessary `<div id="root"></div>` where your Twiggle app will be mounted.
- **`src/`**: This directory houses all your application's source code.
    - **`App.tsx`**: The root component of your Twiggle application. This is where you'll typically start building your user interface and compose other components.
    - **`main.tsx`**: The primary entry point for your Twiggle application. It's responsible for importing your root `App` component and rendering it into the DOM.
- **`.gitignore`**: A standard Git configuration file that specifies intentionally untracked files and directories (e.g., `node_modules`, build outputs) that Git should ignore.
- **`package.json`**: The manifest file for your project. It contains metadata about your project, lists its dependencies, and defines various scripts for development, building, and testing.
- **`tsconfig.json`**: The TypeScript configuration file. It defines compiler options and specifies the root files and compilation options required for your TypeScript project.
- **`vite.config.ts`**: The Vite configuration file. This is where you can customize Vite's behavior, add additional plugins, configure build options, and more. It comes pre-configured with `vite-plugin-twiggle`.
- **`README.md`**: This very file, providing a comprehensive overview and guide for your Twiggle project.

---

## Available Scripts

The `package.json` in your newly created Twiggle project includes several convenient scripts to manage your development workflow:

- **`npm run dev`**
  This command initiates the development server powered by Vite. It offers an incredibly fast startup time and features Hot Module Replacement (HMR), which allows you to see changes to your code reflected in the browser instantly without requiring a full page reload. This script is ideal for active development.

    ```bash
    npm run dev
    ```

- **`npm run build`**
  Executes the production build process using Vite. This command compiles, optimizes, and bundles your Twiggle application into the `dist` directory, preparing it for deployment to a production environment. The output is highly optimized for performance and size.

    ```bash
    npm run build
    ```

- **`npm run preview`**
  After building your application for production, this command allows you to serve the optimized production build locally. It's an excellent way to test how your application will behave in a production-like environment before actual deployment.

    ```bash
    npm run preview
    ```

---

## Customization

The project generated by `create-twiggle-app` serves as a robust foundation. You can further tailor it to meet your specific project requirements through various customization options:

- **Vite Configuration (`vite.config.ts`):**
  Modify this file to adjust Vite's default behavior. You can add other Vite plugins (e.g., for image optimization, SVG loading), configure proxy rules, or fine-tune build options such as chunking strategies and asset handling.

- **TypeScript Configuration (`tsconfig.json`):**
  Update the `tsconfig.json` file to align with your team's or project's specific TypeScript linting rules, stricter type checking, or module resolution preferences.

- **Extending Your Application:**
  Expand your application's functionality by creating new Twiggle components, organizing them into logical directories, and defining routes using Twiggle's built-in router for multi-page navigation within your single-page application.

- **Styling Solutions:**
  Integrate your preferred CSS frameworks or preprocessors. For example, you can add Tailwind CSS, Sass, Less, or PostCSS and configure their respective build processes within `vite.config.ts`.

---

## Troubleshooting

Encountering any issues during project creation or while developing your Twiggle application is a normal part of the development process. Here are some common problems and their solutions:

- **`Error: Directory 'projectName' already exists.`**:
  This error indicates that a folder with the specified project name already exists in the directory where you are attempting to create the new project. To resolve this, either choose a different project name or manually delete the existing folder before retrying the `create-twiggle-app` command.

- **Dependency Installation Failures**:
    - **Verify Node.js and Package Manager Installation:** Ensure that Node.js and your chosen package manager are correctly installed and accessible in your system's PATH.
    - **Check Internet Connection:** A stable internet connection is required to download dependencies.
    - **Manual Installation:** Navigate into your newly created project directory and attempt to run `npm install` (or `yarn install`, `pnpm install`) manually to see more detailed error messages.

- **Build or Development Server Errors**:
    - **Review Terminal Output:** Carefully examine the error messages displayed in your terminal. They often provide precise clues about the root cause of the problem.
    - **Confirm Dependencies:** Ensure all project dependencies are correctly installed and up-to-date.
    - **Configuration Check:** Double-check your `vite.config.ts` and `tsconfig.json` files for any syntax errors or misconfigurations.

- **`__dirname` / `__filename` issues (for CLI development):**
  If you are directly modifying the source code of `create-twiggle-app` itself, be aware that `__dirname` and `__filename` are not directly available in ES Module contexts. To correctly resolve paths, you should derive them using `import.meta.url`:

    ```typescript
    import { dirname } from 'path'
    import { fileURLToPath } from 'url'

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    ```

For any further assistance or if you encounter persistent issues, please refer to the comprehensive Twiggle documentation or report a detailed issue on the official [GitHub Issues page](https://github.com/hrutavmodha/twiggle/issues).

---

## Development

For individuals interested in contributing to the `create-twiggle-app` CLI tool or gaining a deeper understanding of its internal workings, follow these steps to set up your development environment:

1.  **Clone the Monorepo:**
    `create-twiggle-app` is an integral part of the larger Twiggle monorepo. Begin by cloning the entire repository:

    ```bash
    git clone https://github.com/hrutavmodha/twiggle.git
    cd twiggle
    ```

2.  **Install Dependencies:**
    Navigate to the `create-twiggle-app` package directory and install all its development and runtime dependencies:

    ```bash
    cd packages/create-twiggle-app
    npm install
    ```

3.  **Build the CLI:**
    To compile the TypeScript source code of the CLI into executable JavaScript, run the build script:

    ```bash
    npm run build
    ```

4.  **Test Locally:**
    To test your local modifications to `create-twiggle-app` without publishing it, you can use `npm link`:

    ```bash
    # In the packages/create-twiggle-app directory
    npm link

    # Then, in any directory where you wish to test creating a new Twiggle app
    create-twiggle-app my-test-app
    ```

    This will allow you to execute your locally linked version of `create-twiggle-app`.

---

## Contributing

Contributions to `create-twiggle-app` are highly valued and encouraged! We welcome bug reports, feature requests, and code contributions that help improve the tool. Please consult the main [CONTRIBUTING.md](https://github.com/hrutavmodha/twiggle/blob/main/CONTRIBUTING.md) file located in the monorepo root for comprehensive guidelines on how to contribute effectively to the Twiggle project.

Before submitting a pull request, please ensure that you have:

- Adhered to the project's established coding style and conventions.
- Crafted clear, concise, and descriptive commit messages.
- Added new tests or updated existing ones to cover your changes.
- Verified that all existing tests pass successfully.

---

## License

`create-twiggle-app` is open-source software, freely available under the terms of the [MIT License](./LICENSE).
