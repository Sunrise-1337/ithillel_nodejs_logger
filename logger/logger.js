import fs, { WriteStream } from "node:fs"
import path from "node:path"
import levelsConstants from "../constants/levels.constants.js"
import formatMessage from "./formatter.js"
import EventEmitter from "node:events"
import { WRITE_INFO_LOG_EVENT, WRITE_ERROR_LOG_EVENT, WRITE_WARNING_LOG_EVENT, LOG_EVENT } from "../constants/events.constants.js"
import { Transform } from "node:stream"


class Logger {

    constructor(logPath = 'logs/app.log') {

        this.logPath = logPath

        this.messageEventEmitter = new EventEmitter()
        this.logEventEmitter = new EventEmitter()

        if (!fs.existsSync(path.dirname(this.logPath))) {
            fs.mkdirSync(
                path.dirname(this.logPath), 
                {
                    recursive: true
                }
            )
        }

        this.writeableStream = fs.createWriteStream(this.logPath)

        this.transformStream = new Transform({
            writableObjectMode: true,
            transform({level, msg}, encoding, callback) {
                this.push(formatMessage(level, msg))

                callback()
            }
        })

        this.transformStream.pipe(this.writeableStream)

        this.messageEventEmitter.on(WRITE_INFO_LOG_EVENT, this.__log.bind(this))
        this.messageEventEmitter.on(WRITE_WARNING_LOG_EVENT, this.__log.bind(this))
        this.messageEventEmitter.on(WRITE_ERROR_LOG_EVENT, this.__log.bind(this))

        this.logEventEmitter.on(LOG_EVENT, this.logWritingLogic.bind(this))
    }

    __log(level, msg) {
        console.log('_log method')
        this.logEventEmitter.emit(LOG_EVENT, level, msg)
    }

    logWritingLogic(level, msg) {
        console.log('logEventEmitter emitted')

        setImmediate(() => {
            console.log('writeableStream stream be writting')

            this.transformStream.write({level, msg}, (err) => {
                if (err) {
                    console.error("Error while try to put data to file", err.message)
                }
            })
        })
    }

    info(msg) {
        this.messageEventEmitter.emit(WRITE_INFO_LOG_EVENT, levelsConstants.INFO, msg)
    }


    warning(msg) {
        this.messageEventEmitter.emit(WRITE_WARNING_LOG_EVENT, levelsConstants.WARNING, msg)
    }


    error(msg) {
        this.messageEventEmitter.emit(WRITE_ERROR_LOG_EVENT, levelsConstants.ERROR, msg)
    }
}

export default Logger