import { Command } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const program = new Command()

program
    .name('create-twiggle-app')
    .description('CLI to create a Twiggle project')
    .version('1.0.0')


function copyRecursiveSync(src: string, dest: string) {
    const exists = fs.existsSync(src)
    const stats = exists && fs.statSync(src)
    const isDirectory = exists && stats && stats.isDirectory() 
    if (isDirectory) {
        fs.mkdirSync(dest, { recursive: true })
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName))
        })
    } else {
        fs.copyFileSync(src, dest)
    }
}
program
    .argument('[project-name]', 'Name of the project')
    .action(async (projectName: any) => {
        console.log(chalk.blue('Welcome to create-twiggle-app!'))

        if (!projectName) {
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'projectName',
                    message: 'What is your project name?',
                    default: 'my-twiggle-app',
                },
            ])
            projectName = answers.projectName
        }

        const projectPath = path.join(process.cwd(), projectName)

        if (fs.existsSync(projectPath)) {
            console.error(chalk.red(`Error: Directory '${projectName}' already exists.`))
            process.exit(1)
        }

        console.log(chalk.green(`Creating a new Twiggle app in ${projectPath}`))

        const templatePath = path.join(__dirname, '../template')


        try {
            copyRecursiveSync(templatePath, projectPath)
            console.log(chalk.green('Template files copied successfully.'))
        } catch (error) {
            console.error(chalk.red('Error copying template files:'), error)
            process.exit(1)
        }


        console.log(chalk.green('Installing dependencies... This might take a moment.'))
        try {
            execSync('npm install', { cwd: projectPath, stdio: 'inherit' })
            console.log(chalk.green('Dependencies installed successfully.'))
        } catch (error) {
            console.error(chalk.red('Error installing dependencies: '), error)
            process.exit(1)
        }

        console.log(chalk.green('Project created successfully!'))
        console.log(chalk.yellow('Next steps:'))
        console.log(chalk.yellow(`  cd ${projectName}`))
        console.log(chalk.yellow('  npm run dev'))
    })

program.parse(process.argv)
