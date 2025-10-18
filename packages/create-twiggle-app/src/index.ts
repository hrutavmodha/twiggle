import { Command } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { join } from 'path'
import fs from 'fs'
import { execSync } from 'child_process'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs' 

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'))
const version = packageJson.version

const program = new Command()
program
    .name('create-twiggle-app')
    .description('CLI to create a Twiggle project')
    .version(version)

function copyRecursiveSync(src: string, dest: string) {
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

program
    .argument('[project-name]', 'Name of the project')
    .action(async (projectName: any) => {
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

        if (fs.existsSync(projectPath)) {
            console.error(chalk.inverse.red(`Error: Directory '${projectName}' already exists.\n`))
            process.exit(1)
        }

        console.log(chalk.green(`🚀 Creating a new Twiggle app in ${projectPath}\n`))
        console.log(chalk.gray('----------------------------------------\n'))

        const templatePath = join(__dirname, '../template')

        try {
            copyRecursiveSync(templatePath, projectPath)
            console.log(chalk.hex('#32CD32')('✔ Template files copied successfully.'))
        } catch (error) {
            console.error(chalk.inverse.red('Error copying template files:'), error)
            process.exit(1)
        }

        console.log(chalk.hex('#FFFF99')('📦 Installing dependencies... This might take a moment.'))
        try {
            execSync('npm install', { cwd: projectPath, stdio: 'inherit' })
            console.log(chalk.hex('#00CED1')('✔ Dependencies installed successfully.'))
        } catch (error) {
            console.error(chalk.inverse.red('Error installing dependencies: '), error)
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