function generateSvg(gameName, template, title, subtitle, frame, image, cost, description, levels) {
    const card = template
        .replace('{{TITLE}}', title)
        .replace('{{FRAME}}', frame)
        .replace('{{COST}}', cost)
        .replace('{{VALUE1}}', levels[0])
        .replace('{{VALUE2}}', levels[1])
        .replace('{{VALUE3}}', levels[2])
        .replace('{{VALUE4}}', levels[3])
        .replace('{{VALUE5}}', levels[4])
        .replace('{{VALUE6}}', levels[5])

    return card
}

module.exports = {
    generateSvg
}