import fs from "node:fs"
import path from "node:path"
import levelsConstants from "../constants/levels.constants.js"
import formatMessage from "./formatter.js"
import EventEmitter from "node:events"
import { WRITE_INFO_LOG_EVENT, WRITE_ERROR_LOG_EVENT, WRITE_WARNING_LOG_EVENT } from "../constants/events.constants.js"


class Logger {

    constructor(logPath = 'logs/app.log') {

        this.logPath = logPath
        this.eventEmitter = new EventEmitter()

        if (!fs.existsSync(path.dirname(this.logPath))) {
            fs.mkdirSync(
                path.dirname(this.logPath), 
                {
                    recursive: true
                }
            )
        }

        this.eventEmitter.on(WRITE_INFO_LOG_EVENT, this.__log.bind(this))
        this.eventEmitter.on(WRITE_WARNING_LOG_EVENT, this.__log.bind(this))
        this.eventEmitter.on(WRITE_ERROR_LOG_EVENT, this.__log.bind(this))
    }

    __log(level, msg) {
        
        // if(process.env.APP_ENV === 'local') {
        //     console.log(formattedMsg)
        // } else {
        //     fs.appendFile(this.logPath, `${formattedMsg} \n`, (err) => {
        //         if (err) {
        //             console.error("Error while try to put data to file", err.message)
        //         }
        //     })
        // }

        setImmediate(() => {
            const formattedMsg = formatMessage(level, msg)

            fs.appendFile(this.logPath, `${formattedMsg} \n`, (err) => {
                if (err) {
                    console.error("Error while try to put data to file", err.message)
                }
            })
        })
    }

    info(msg) {
        this.eventEmitter.emit(WRITE_INFO_LOG_EVENT, levelsConstants.INFO, msg)
    }


    warning(msg) {
        this.eventEmitter.emit(WRITE_WARNING_LOG_EVENT, levelsConstants.WARNING, msg)
    }


    error(msg) {
        this.eventEmitter.emit(WRITE_ERROR_LOG_EVENT, levelsConstants.ERROR, msg)
    }
}

export default Logger