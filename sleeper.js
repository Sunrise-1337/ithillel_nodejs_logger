const sleeper = async (time) => {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

export default sleeper