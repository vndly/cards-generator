const fs = require('fs')

function base64File(path) {
    const content = fs.readFileSync(path, { encoding: 'base64' })

    return 'data:image/png;base64,' + content
}

function cardImage(name) {
    return base64File(`input/frontline/images/${name}.png`)
}

function generateSvgUnit(_, template, templateName, title, faction, frame, image, cost, description, levels) {
    const card = template
        .replace('{{TITLE}}', title.toUpperCase())
        .replace('{{FACTION}}', cardImage(faction))
        .replace('{{LEVEL}}', cost)
        .replace('{{LEVEL_X}}', 345 - ((parseInt(cost) === 10) ? 15 : 0))
        .replace('{{FRAME}}', frame)
        .replace('{{IMAGE}}', image)

    return card
}

function generateSvg(_, template, templateName, title, faction, frame, image, cost, description, levels) {
    if (templateName === 'template_unit') {
        return generateSvgUnit(_, template, templateName, title, faction, frame, image, cost, description, levels)
    }
}

module.exports = {
    generateSvg
}