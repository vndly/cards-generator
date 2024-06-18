const fs = require('fs')

function base64File(path) {
    const content = fs.readFileSync(path, { encoding: 'base64' })

    return 'data:image/png;base64,' + content
}

function costChip(gameName, cost) {
    const parts = cost.split('@')
    const size = parts[1]
    const image = base64File(`input/${gameName}/images/cost.png`)

    return `<image width="49.398" height="22.048" preserveAspectRatio="none" xlink:href="${image}" id="image" x="299.62" y="298.56" />
    <text style="font-style:normal;font-weight:normal;font-size:10.5833px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264571" text-anchor="end" dominant-baseline="middle" x="342.74" y="311" id="text">
    <tspan sodipodi:role="line" id="text" style="font-size:${size}px;stroke-width:0.264571" x="342.74" y="311">${parts[0]}</tspan></text>`
}

function descriptionLine(text, index) {
    return `<tspan sodipodi:role="line" style="font-size:14px;stroke-width:0.26458" x="42" y="${375.52 + (18.52 * index)}" id="tspanline${index + 1}">${text}</tspan>`
}

function generateSvg(gameName, template, title, subtitle, frame, image, cost, description, levels) {
    let card = template
        .replace('{{TITLE}}', title)
        .replace('{{SUBTITLE}}', subtitle)
        .replace('{{FRAME}}', frame)
        .replace('{{IMAGE}}', image)

    let descriptionTag = ''

    for (let i = 0; i < description.length; i++) {
        if (descriptionTag) {
            descriptionTag += '\n\t\t\t'
        }

        descriptionTag += descriptionLine(description[i], i)
    }

    card = card.replace('{{DESCRIPTION}}', descriptionTag)

    return card.replace('{{COST}}', costChip(gameName, cost))
}

module.exports = {
    generateSvg
}