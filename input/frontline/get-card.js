const fs = require('fs')

function base64File(path) {
    const content = fs.readFileSync(path, { encoding: 'base64' })

    return 'data:image/png;base64,' + content
}

function cardImage(name) {
    return base64File(`input/frontline/images/${name}.png`)
}

function generateSvg(_, template, title, faction, frame, image, level, _, _) {
    const card = template
        .replace('{{TITLE}}', title)
        .replace('{{FACTION}}', cardImage(faction))
        .replace('{{LEVEL}}', level)
        .replace('{{FRAME}}', frame)
        .replace('{{IMAGE}}', image)

    return card
}

module.exports = {
    generateSvg
}