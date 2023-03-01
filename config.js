const fs = require("fs")
const chalk = require("chalk")

global.reloadFile = (file, options = {}) => {
    nocache(file, module => console.log(`File "${file}" has updated`))
}

// Rest Api
global.APIs = {
	zenz: 'https://zenzapi.xyz',
}

// Apikey
global.APIKeys = {
	'https://zenzapi.xyz': 'YOURAPIKEY',
}

// Other
global.options = {
    autoRead: true,
    mute: false,
    public: false
}

global.prefa = /^[zZ#$+.?_&<>!/\\]/
global.owner = ["6281269734000"]
global.sessionName = {
    legacy: "/tmp/killua-legacy",
    multi: "/tmp/killua-multi"
}

global.packname = "Sewa Bot PM 6281269734000"
global.author = "📢 Bot Multi Device\nSubscribe YT XienDaeMon"

global.mess = (type, m) => {
    let msg = {
        owner: 'Perintah ini hanya dapat digunakan oleh Owner!',
        group: 'Perintah ini hanya dapat digunakan di group!',
        private: 'Perintah ini hanya dapat digunakan di private chat!',
        admin: 'Perintah ini hanya dapat digunakan oleh admin group!',
        botAdmin: 'Bot bukan admin, tidak dapat mengakses fitur tersebut',
        bot: 'Fitur ini hanya dapat diakses oleh Bot',
        dead: 'Fitur ini sedang dimatikan!',
        media: 'Reply media',
        error: "No Results Found"
    }[type]
    if (msg) return m.reply(msg, m.from, { quoted: m })
}

function nocache(module, cb = () => {}) {
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update File "${file}"`))
})