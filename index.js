import http from "node:http"

const server = http.createServer(),
      APP_PORT = 3000;

// Запуск скрипта
server.on('request', solution1)
// server.on('request', solution2)
server.listen(APP_PORT)

// Решения

let requestsCounter = 0;

function solution1 (req, res) {
    requestsCounter++

    if (requestsCounter === 10) {
        requestsCounter = 0

        writeJSONResponseHead(res, 500)

        return res.end()
    }

    const randomDelay = getRandomNumber(1, 3)

    setTimeout(() => {
        writeJSONResponseHead(res, 200)

        res.end(
            JSON.stringify({
                message: 'You were lucky this time'
            })
        )
    }, randomDelay * 1000)
}

function solution2 (req, res) {
    const randomValue = Math.random();

    if (randomValue <= 0.1) {
        requestsCounter = 0

        writeJSONResponseHead(res, 500)

        return res.end()
    }
    
    const randomDelay = getRandomNumber(1, 3)

    setTimeout(() => {
        writeJSONResponseHead(res, 200)

        return res.end(
            JSON.stringify({
                message: 'You were lucky this time'
            })
        )
    }, randomDelay * 1000)
}


// Служебные функции

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function writeJSONResponseHead(res, status) {
    res.writeHead(status, {
        "content-type": 'application/json'
    })
}