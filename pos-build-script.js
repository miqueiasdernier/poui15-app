const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const appName = packageJson.name;
const distPath = path.join(__dirname, "dist");
const protheusDistPath = path.join(distPath, "protheus_dist");
const appDistPath = path.join(protheusDistPath, appName);
const zipFilePath = path.join(protheusDistPath, `${appName}.app`);
const destinationPath = path.join("Backend Protheus", `${appName}.app`);

console.log(`App name set to: ${appName}`);

// Remove the protheus_dist directory if it exists
if (fs.existsSync(protheusDistPath)) {
  fs.rmSync(protheusDistPath, { recursive: true, force: true });
}

// Create the protheus_dist directory
fs.mkdirSync(protheusDistPath, { recursive: true });

// Copy the browser folder to the app name folder
fs.mkdirSync(appDistPath, { recursive: true });
fs.cpSync(path.join(distPath, appName), appDistPath, {
  recursive: true,
});

// Change directory to the protheus_dist folder and zip the contents
execSync(`cd ${protheusDistPath} && zip -r ${zipFilePath} ${appName}`);

// Copy the zipped file to the destination folder
fs.copyFileSync(zipFilePath, destinationPath);

console.log(`Zipped ${appName} to ${destinationPath}`);
