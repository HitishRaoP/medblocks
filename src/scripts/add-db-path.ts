import path from "path";
import fs from "fs";

const envVarName = 'DB_PATH';
const envVarValue = 'file://' + path.resolve(__dirname,"../", 'db', 'database');
const envFilePath = path.join(__dirname, "../", '.env');

function addEnvVariable() {
    try {
        const envContent = fs.readFileSync(envFilePath, 'utf8');

        if (envContent.includes(`${envVarName}=`)) {
            console.log(`${envVarName} already exists in the .env file.`);
        } else {
            fs.appendFileSync(envFilePath, `\n${envVarName}=${envVarValue}`, 'utf8');
            console.log(`${envVarName} has been added to the .env file.`);
        }
    } catch (error) {
        console.error('Error while adding environment variable:', error);
    }
}

addEnvVariable();
