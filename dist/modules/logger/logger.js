import chalk from "chalk";
import dayjs from "dayjs";
export class Logger {
    static timestamp() {
        return chalk
            .bgHex(this.TIMESTAMP_COLOR)
            .black(` ${dayjs().format(this.DATE_TIME_FORMAT)} `);
    }
    static info(message) {
        this.log(this.timestamp(), chalk.blue("INFO:"), message);
    }
    static error(message) {
        this.log(this.timestamp(), chalk.red("ERROR:"), message);
    }
    static warn(message) {
        this.log(this.timestamp(), chalk.yellow("WARN:"), message);
    }
    static success(message) {
        this.log(this.timestamp(), chalk.green("SUCCESS:"), message);
    }
    static request(method, url) {
        this.log(this.timestamp(), chalk.blue("REQUEST:"), chalk.gray(`<${method}>: ${url}`));
    }
}
Logger.DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
Logger.TIMESTAMP_COLOR = "#1bfa66";
Logger.log = console.log;
