'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
// import parseText from './parseText.js'
// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  console.log(event)
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  let returnmessage
  const validBrackets = ['1.9', '2.9', '3.9', '4.9', '5.9',
  '1.8', '2.8', '3.8', '4.8', '5.8',
  '1.7', '2.7', '3.7', '4.7', '5.7',
  '1.6', '2.6', '3.6', '4.6', '5.6',
  'SCL9','SCL8','SCL7','SCL6']
  
  function parseText(text) {
    const trimmedText = text.trim().split(' ')
    const textCommand = trimmedText[0].toLowerCase()
    if (textCommand==="!check"||textCommand==="!update"){
      const textBracket = trimmedText[1].toUpperCase()
      let textObject = {}
      textObject['type']=textCommand.slice(1)
      
      if(validBrackets.includes(textBracket)) {
        textObject['bracket'] = textBracket
      }
      else return "please choose a valid bracket"
      return textObject
    }
    else return false
  }
  const incomingMessage = parseText(event.message.text)
  if(incomingMessage === false) returnmessage = "invalid request"
  else if (typeof incomingMessage==="string") returnmessage= incomingMessage
  else returnmessage =`${incomingMessage['type']}ing ${incomingMessage['bracket']}`
  
  // returnmessage = event.message.text.includes("test")?event.message.text:"sorry, I don't understand"
  console.log("====== sending response ======")
  console.log(returnmessage)

  const response = { type: 'text', text: returnmessage };
  // use reply API
  return client.replyMessage(event.replyToken, response);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

