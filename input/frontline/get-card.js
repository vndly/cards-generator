const fs = require('fs')

function base64File(path) {
    const content = fs.readFileSync(path, { encoding: 'base64' })

    return 'data:image/png;base64,' + content
}

function cardImage(name) {
    return base64File(`input/frontline/images/${name}.png`)
}

function generateSvgUnit(template, templateName, title, faction, frame, image, cost, description, levels) {
    const card = template
        .replace('{{TITLE}}', title.toUpperCase())
        .replace('{{FACTION}}', cardImage(faction))
        .replace('{{LEVEL}}', cost)
        .replace('{{LEVEL_X}}', 345 - ((parseInt(cost) === 10) ? 15 : 0))
        .replace('{{FRAME}}', frame)
        .replace('{{IMAGE}}', image)

    return card
}

function generateSvgHelp(template, templateName, title, faction, frame, image, cost, description, levels) {
    const card = template
        .replace('{{IMAGE}}', image)

    return card
}

function generateSvgBattlefieldBack(template, templateName, title, faction, frame, image, cost, description, levels) {
    const card = template
        .replace('{{IMAGE}}', image)

    return card
}

function descriptionLine(text, index) {
    return `<tspan sodipodi:role="line" style="font-size:14px;stroke-width:0.26458" x="42" y="${375.52 + (18.52 * index)}" id="tspanline${index + 1}">${text}</tspan>`
}

function generateSvgTactic(template, templateName, title, subtitle, frame, image, cost, description, levels) {
    let descriptionTag = ''

    for (let i = 0; i < description.length; i++) {
        if (descriptionTag) {
            descriptionTag += '\n\t\t\t'
        }

        descriptionTag += descriptionLine(description[i], i)
    }

    const card = template
        .replace('{{TITLE}}', title)
        .replace('{{SUBTITLE}}', subtitle)
        .replace('{{DESCRIPTION}}', descriptionTag)
        .replace('{{FRAME}}', frame)
        .replace('{{IMAGE}}', image)

    return card
}

function generateSvg(_, template, templateName, title, subtitle, frame, image, cost, description, levels) {
    if (templateName === 'template_help') {
        return generateSvgHelp(template, templateName, title, subtitle, frame, image, cost, description, levels)
    } else if (templateName === 'template_unit') {
        return generateSvgUnit(template, templateName, title, subtitle, frame, image, cost, description, levels)
    } else if (templateName === 'template_battlefield_back') {
        return generateSvgBattlefieldBack(template, templateName, title, subtitle, frame, image, cost, description, levels)
    } else if (templateName === 'template_tactic') {
        return generateSvgTactic(template, templateName, title, subtitle, frame, image, cost, description, levels)
    }
}

module.exports = {
    generateSvg
}