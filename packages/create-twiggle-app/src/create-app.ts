import { join, dirname } from 'path'
import fs from 'fs'
import { execSync } from 'child_process'
import inquirer from 'inquirer'

export function copyRecursiveSync(src: string, dest: string): void {
    const exists = fs.existsSync(src)
    const stats = exists && fs.statSync(src)
    const isDirectory = exists && stats && stats.isDirectory()
    if (isDirectory) {
        fs.mkdirSync(dest, { recursive: true })
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(join(src, childItemName), join(dest, childItemName))
        })
    } else {
        fs.copyFileSync(src, dest)
    }
}

export async function createApp(
    projectName: string,
    projectPath: string,
    templatePath: string
): Promise<any> {
    if (fs.existsSync(projectPath)) {
        throw new Error(`Error: Directory '${projectName}' already exists.`)
    }

    const { buildTool } = await inquirer.prompt([
        {
            type: 'list',
            name: 'buildTool',
            message: 'Which build tool would you like to use?',
            choices: ['vite', 'webpack', 'parcel'],
        },
    ])

    try {
        copyRecursiveSync(templatePath, projectPath)

        const configsPath = join(dirname(templatePath), 'configs');
        let configFileName = '';
        let destFileName = '';

        switch (buildTool) {
            case 'vite':
                configFileName = 'vite.config.ts';
                destFileName = 'vite.config.ts';
                break;
            case 'webpack':
                configFileName = 'webpack.config.js';
                destFileName = 'webpack.config.js';
                break;
            case 'parcel':
                configFileName = '.parcelrc';
                destFileName = '.parcelrc';
                break;
        }

        const configSrc = join(configsPath, configFileName);
        const configDest = join(projectPath, destFileName);
        fs.copyFileSync(configSrc, configDest);

        // Update package.json with build tool specific scripts and devDependencies
        const packageJsonPath = join(projectPath, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

        switch (buildTool) {
            case 'vite':
                packageJson.scripts = {
                    "dev": "vite",
                    "build": "vite build",
                    "preview": "vite preview"
                };
                packageJson.devDependencies = {
                    "vite": "^7.1.7",
                    "vite-plugin-twiggle": "^1.0.0"
                };
                break;
            case 'webpack':
                packageJson.scripts = {
                    "build": "webpack"
                };
                packageJson.devDependencies = {
                    "webpack": "^5.0.0",
                    "webpack-cli": "^4.0.0",
                    "ts-loader": "^9.0.0",
                    "typescript": "^5.0.0"
                };
                break;
            case 'parcel':
                packageJson.scripts = {
                    "start": "parcel src/index.html",
                    "build": "parcel build src/index.html"
                };
                packageJson.devDependencies = {
                    "parcel": "^2.0.0",
                    "@parcel/transformer-typescript-tsc": "^2.0.0"
                };
                break;
        }

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    } catch (error) {
        throw new Error(`Error copying template files: ${error}`)
    }

    try {
        execSync('npm install', { cwd: projectPath, stdio: 'inherit' })
    } catch (error) {
        throw new Error(`Error installing dependencies: ${error}`)
    }
}
