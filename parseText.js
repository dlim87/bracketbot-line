const validBrackets = ['1.9', '2.9', '3.9', '4.9', '5.9',
'1.8', '2.8', '3.8', '4.8', '5.8',
'1.7', '2.7', '3.7', '4.7', '5.7',
'1.6', '2.6', '3.6', '4.6', '5.6',
'SCL9','SCL8','SCL7','SCL6']

 const parseText = (text) => {
  const trimmedText = text.trim().split(' ')
  const textCommand = trimmedText[0].toLowerCase()

  if (textCommand === "!check" || textCommand === "!update") {
    const textBracket = trimmedText[1].toUpperCase()
    let textObject = {}
    textObject['type'] = textCommand.slice(1)

    if(validBrackets.includes(textBracket)) {
      textObject['bracket'] = textBracket
      return textObject
    }
    
    return "please choose a valid bracket"
  }

  return false
}

module.exports = parseText