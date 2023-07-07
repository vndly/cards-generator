const fs = require('fs')
const template = fs.readFileSync('input/template.svg', 'utf-8')
const json = JSON.parse(fs.readFileSync('input/input.json', 'utf-8'))

for (const entry of json) {
    generateCard(
        entry.name,
        entry.title,
        cardFrame(entry.frame),
        cardImage(entry.image),
        entry.subtitle,
        entry.description,
        entry.levels,
    )
}

function base64File(path) {
    const content = fs.readFileSync(path, { encoding: 'base64' })

    return 'data:image/png;base64,' + content
}

function cardFrame(name) {
    return base64File(`frames/${name}.png`)
}

function cardImage(name) {
    return base64File(`images/${name}.png`)
}

function levelChip(level, index) {
    return `<circle style="fill:#cbc1be;fill-opacity:1;stroke:#cabeb6;stroke-width:1;stroke-linejoin:round;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke markers fill" id="levelout${index + 1}" cx="${333.67 - (24 * index)}" cy="42.348" r="10" /><text style="font-style:normal;font-weight:normal;font-size:15.8746px;line-height:1.25;font-family:sans-serif;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.264574" x="${328.87 - (24 * index)}" y="48.152" id="levelin${index + 1}"><tspan sodipodi:role="line" id="tspanlevel1" style="font-size:15.8746px;stroke-width:0.264574" x="${328.87 - (24 * index)}" y="48.152">${level}</tspan></text>`
}

function descriptionLine(text, index) {
    return `<tspan sodipodi:role="line" style="font-size:14.8167px;stroke-width:0.26458" x="42" y="${375.52 + (18.52 * index)}" id="tspanline${index + 1}">${text}</tspan>`
}

function generateCard(name, title, frame, image, subtitle, description, levels) {
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

    let levelsTag = ''

    for (let i = 0; i < levels.length; i++) {
        if (levelsTag) {
            levelsTag += '\n\t\t\t'
        }

        levelsTag += levelChip(levels[i], i)
    }

    card = card.replace('{{LEVELS}}', levelsTag)

    fs.writeFileSync(`svg/${name}`, card)
}