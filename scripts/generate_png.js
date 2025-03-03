const fs = require('fs')
const { argv } = require('process')
const gameName = argv[2]
const helpers = require(`../input/${gameName}/get-card`)

fs.readdir(`input/${gameName}/cards`, (_, files) => {
    files.forEach(file1 => {
        fs.readdir(`input/${gameName}/cards/${file1}`, (_, files) => {
            files.forEach(file2 => {
                processFile(file1, file2, gameName)
            })
        })
    })
})

function processFile(file1, file2, gameName) {
    const json = JSON.parse(fs.readFileSync(`input/${gameName}/cards/${file1}/${file2}`, 'utf-8'))

    for (const entry of json) {
        const path = `${file1}/${file2.replace('.json', '')}/`

        console.log(`Generating card: ${entry.name}...`);

        const template = fs.readFileSync(`input/${gameName}/templates/template_card.svg`, 'utf-8')

        const card = helpers.generateSvg(
            gameName,
            template,
            entry.title,
            entry.subtitle,
            cardFrame(entry.frame),
            cardImage(entry.image),
            entry.cost ?? '',
            entry.description,
            entry.levels
        )

        generateSvg(
            path,
            `${entry.name}.svg`,
            card,
        )

        convertSvg2Png(`${path}${entry.name}`)
    }
}

function convertSvg2Png(name) {
    const exec = require('child_process').execSync
    exec(`inkscape --export-width=375 --export-height=525 --export-type=png --export-filename="temp/png/${name}.png" "temp/svg/${name}.svg"`)
}

function base64File(path) {
    const content = fs.readFileSync(path, { encoding: 'base64' })

    return 'data:image/png;base64,' + content
}

function cardFrame(name) {
    return base64File(`input/${gameName}/images/frames/${name}.png`)
}

function cardImage(name) {
    return base64File(`input/${gameName}/images/${name}.png`)
}

function generateSvg(path, name, card) {
    try {
        fs.mkdirSync(`temp/png/${path}`, { recursive: true })
    } catch (e) {
        // ignore
    }

    try {
        fs.mkdirSync(`temp/svg/${path}`, { recursive: true })
    } catch (e) {
        // ignore
    }

    fs.writeFileSync(`temp/svg/${path}${name}`, card)
}