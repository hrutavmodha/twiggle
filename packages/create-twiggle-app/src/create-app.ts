import { join } from "path";
import fs from "fs";
import { execSync } from "child_process";

export function copyRecursiveSync(
    src: string,
    dest: string
): void {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats && stats.isDirectory();
    if (isDirectory) {
        fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(function (childItemName) {
            copyRecursiveSync(join(src, childItemName), join(dest, childItemName));
        });
    } else {
      fs.copyFileSync(src, dest);
    }
}   

export async function createApp(
  projectName: string,
  projectPath: string,
  templatePath: string
): Promise<any> {
    if (fs.existsSync(projectPath)) {
        throw new Error(`Error: Directory '${projectName}' already exists.`);
    }   
    try {
        copyRecursiveSync(templatePath, projectPath);
    } catch (error) {
        throw new Error(`Error copying template files: ${error}`);
    }   
    try {
        execSync("npm install", { cwd: projectPath, stdio: "inherit" });
    } catch (error) {
        throw new Error(`Error installing dependencies: ${error}`);
    }
}
