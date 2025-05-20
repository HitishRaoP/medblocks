import chalk from "chalk";
import figlet from "figlet";

const bannerText = figlet.textSync(
    "MEDBLOCKS",
    {
        font: "ANSI Shadow",
        horizontalLayout: 'full',
        verticalLayout: 'full',
        whitespaceBreak: true,
    }
);

console.log(chalk.cyan.bold(bannerText));