const parseText = require('./parseText.js')
const validBrackets = ['1.9', '2.9', '3.9', '4.9', '5.9',
'1.8', '2.8', '3.8', '4.8', '5.8',
'1.7', '2.7', '3.7', '4.7', '5.7',
'1.6', '2.6', '3.6', '4.6', '5.6',
'SCL9','SCL8','SCL7','SCL6']

describe('Message parsing tests', ()=>{
  test('Empty string',()=>{
    expect(parseText("")).toEqual(false)
  })
  test('Random chatter',()=>{
    expect(parseText("lorem ipsum")).toBe(false)
  })
  test.each(validBrackets)('check %s',bracket=>{
      expect(parseText("!check "+bracket)).toEqual({'type':'check','bracket':bracket})
  })
  test('invalid check',()=>{
    expect(parseText("!check 1.5")).toEqual("please choose a valid bracket")
  })
  test.each(validBrackets)('update %s', bracket=>{
    expect(parseText("!update "+bracket)).toEqual({'type':'update','bracket':bracket})
  })
  test('trailing space', ()=>{
    expect(parseText("!check 5.9 ")).toEqual({'type':'check','bracket':'5.9'})
  })
  test('trailing junk', () =>{
    expect(parseText("!check 5.8 5.9")).toEqual({'type':'check', 'bracket':'5.8'})
  })
  test('invalid update',()=>{
    expect(parseText("!update SCL4")).toEqual("please choose a valid bracket")
  })
})