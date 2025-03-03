function generateSvg(_, template, title, faction, frame, image, level, _, _) {
    const card = template
        .replace('{{TITLE}}', title)
        .replace('{{FACTION}}', faction)
        .replace('{{LEVEL}}', level)
        .replace('{{FRAME}}', frame)
        .replace('{{IMAGE}}', image)

    return card
}

module.exports = {
    generateSvg
}