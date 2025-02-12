import chalk from "chalk";
import levelsConstants from "../constants/levels.constants.js";

function formatMessage(level, msg) {
    return getMessageBody(level, msg) + '\n'
}

function getMessageBody(level, msg) {
    const timestemp = new Date().toISOString()

    if (msg instanceof Error) {
        return chalk.red(`[${timestemp}], ERROR: ${msg.message}, from exception of type ${msg.name}`)
    }

    switch(level) {
        case levelsConstants.INFO:
            return chalk.blue(`[${timestemp}], INFO: ${msg}`)

        case levelsConstants.WARNING:
            return chalk.yellow(`[${timestemp}], WARNING: ${msg}`)

        case levelsConstants.ERROR:
            return chalk.red(`[${timestemp}], ERROR: ${msg}`)

        default:
            return chalk.gray(`[${timestemp}], UNKNOW: ${msg}`)

    }
}

export default formatMessage