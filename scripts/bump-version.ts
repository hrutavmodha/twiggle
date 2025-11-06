import fs from 'fs'
import path from 'path'

const bumpVersion = (version: string, type: 'major' | 'minor' | 'patch'): string => {
    const [major, minor, patch] = version.split('.').map(Number)
    switch (type) {
        case 'major':
            return `${major + 1}.0.0`
        case 'minor':
            return `${major}.${minor + 1}.0`
        case 'patch':
            return `${major}.${minor}.${patch + 1}`
        default:
            throw new Error(`Invalid bump type: ${type}`)
    }
}

const main = () => {
    const [, , packageName, bumpType] = process.argv as [
        string,
        string,
        string,
        'major' | 'minor' | 'patch',
    ]

    if (!packageName || !bumpType) {
        console.error('Usage: node scripts/version-bump.js <package-name> <major|minor|patch>')
        process.exit(1)
    }

    const packagesDir = path.resolve(process.cwd(), 'packages')
    const packageJsonPath = path.join(packagesDir, packageName, 'package.json')

    if (!fs.existsSync(packageJsonPath)) {
        console.error(`Package not found: ${packageName}`)
        process.exit(1)
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    const oldVersion = packageJson.version
    const newVersion = bumpVersion(oldVersion, bumpType)
    packageJson.version = newVersion

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4) + '\n')

    console.log(`Bumped ${packageName} from ${oldVersion} to ${newVersion}`)
}

main()
