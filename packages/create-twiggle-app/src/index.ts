import { Command } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { join } from 'path'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import { createApp } from './create-app'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'))
const version = packageJson.version

const program = new Command()
program.name('create-twiggle-app').description('CLI to create a Twiggle project').version(version)

program.argument('[project-name]', 'Name of the project').action(async (projectName: any) => {
    console.log(chalk.hex('#00FFFF')('✨ Welcome to create-twiggle-app! ✨\n'))
    console.log(chalk.gray('----------------------------------------\n'))
    if (!projectName) {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'What is your project name?\n',
                default: 'my-twiggle-app',
            },
        ])
        projectName = answers.projectName
    }

    const projectPath = join(process.cwd(), projectName)

    console.log(chalk.green(`🚀 Creating a new Twiggle app in ${projectPath}\n`))
    console.log(chalk.gray('----------------------------------------\n'))

    const templatePath = join(__dirname, '..', 'template')

    try {
        await createApp(projectName, projectPath, templatePath)
        console.log(chalk.hex('#32CD32')('✔ Template files copied successfully.'))
        console.log(chalk.hex('#FFFF99')('📦 Installing dependencies... This might take a moment.'))
        console.log(chalk.hex('#00CED1')('✔ Dependencies installed successfully.'))
    } catch (error: any) {
        console.error(chalk.inverse.red(error.message))
        process.exit(1)
    }

    console.log(chalk.green('🎉 Project created successfully!'))
    console.log(chalk.gray('----------------------------------------'))
    console.log(chalk.cyan('👉 Next steps:'))
    console.log(chalk.cyan(`  cd ${projectName}`))
    console.log(chalk.cyan('  npm run dev'))
    console.log(chalk.gray('----------------------------------------'))
})

program.parse(process.argv)
