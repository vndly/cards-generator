const fs = require('fs')

function descriptionLine(text, index) {
    return `<tspan sodipodi:role="line" style="font-size:14px;stroke-width:0.26458" x="42" y="${375.52 + (18.52 * index)}" id="tspanline${index + 1}">${text}</tspan>`
}

function generateSvg(gameName, template, title, subtitle, frame, image, cost, description, levels) {
    const card = template
        .replace('{{TITLE}}', title)
        .replace('{{FRAME}}', frame)

    let descriptionTag = ''

    for (let i = 0; i < description.length; i++) {
        if (descriptionTag) {
            descriptionTag += '\n\t\t\t'
        }

        descriptionTag += descriptionLine(description[i], i)
    }

    return card.replace('{{DESCRIPTION}}', descriptionTag)
}

module.exports = {
    generateSvg
}