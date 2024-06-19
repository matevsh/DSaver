import chalk from "chalk";
import dayjs from "dayjs";

export class Logger {
  private static DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
  private static TIMESTAMP_COLOR = "#1bfa66";
  private static log = console.log;

  private static timestamp() {
    return chalk
      .bgHex(this.TIMESTAMP_COLOR)
      .black(` ${dayjs().format(this.DATE_TIME_FORMAT)} `);
  }

  public static info(message: string) {
    this.log(this.timestamp(), chalk.blue("INFO:"), message);
  }

  public static error(message: string) {
    this.log(this.timestamp(), chalk.red("ERROR:"), message);
  }

  public static warn(message: string) {
    this.log(this.timestamp(), chalk.yellow("WARN:"), message);
  }

  public static success(message: string) {
    this.log(this.timestamp(), chalk.green("SUCCESS:"), message);
  }

  public static request(method: string, url: string) {
    this.log(
      this.timestamp(),
      chalk.blue("REQUEST:"),
      chalk.gray(`<${method}>: ${url}`)
    );
  }
}
