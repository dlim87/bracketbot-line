const parseText = require('./parseMessage.js')
const validBrackets = ['1.9', '2.9', '3.9', '4.9', '5.9',
'1.8', '2.8', '3.8', '4.8', '5.8',
'1.7', '2.7', '3.7', '4.7', '5.7',
'1.6', '2.6', '3.6', '4.6', '5.6',
'SCL9','SCL8','SCL7','SCL6']

describe('Message parsing tests', ()=>{
  test('Empty string',()=>{
    expect(parseText("").toBe(false))
  })
  test('Random chatter',()=>{
    expect(parseText("lorem ipsum").toBe(false))
  })
  test.each(validBrackets)('check %s',bracket=>{
      expect(parseText("check "+bracket)).toBe({'type':'check','bracket':bracket})
  })
  test('invalid check',()=>{
    expect(parseText("check 1.5")).toBe("please choose a valid bracket")
  })
  test.each(validBrackets)('update %s', bracket=>{
    expect(parseText("update "+bracket)).toBe({'type':'update','bracket':bracket})
  })
  test('invalid update',()=>{
    expect(parseText("update SCL4")).toBe("please choose a valid bracket")
  })
})