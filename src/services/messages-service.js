/**
 * Sends a message
 * @param sender sender user id
 * @param receiver receiver user id
 * @param message message to send
 */
export const sendMessage = (sender, receiver, message) => {
  // TODO : replace with API call
  const messageObject = {sender, receiver, message};
  console.log("Send message: " + JSON.stringify(messageObject));
}

/**
 * Sends an attachment
 * @param sender sender user id
 * @param receiver receiver user id
 * @param attachment attachment to send
 */
export const sendAttachment = (sender, receiver, attachment) => {
  // TODO : replace with API call
  const messageObject = {sender, receiver, attachment};
  console.log("Send message: " + JSON.stringify(messageObject));
}

/**
 * Fetches the list of messages exchanges between two users
 * @param sender
 * @param receiver
 * @returns {({receiver, attachment: string, sender, sentOn: number, _id: number, message: string}|{receiver, attachment: string, sender, sentOn: number, _id: number, message: string})[]}
 */
export const getMessages = (sender, receiver) => {
  // TODO : replace with API call
  const sentMessages = [
    {_id: 0, sender, receiver, sentOn: 3, attachment: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Atkinson_Rowan.jpg/800px-Atkinson_Rowan.jpg", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo quis turpis posuere ultrices. Quisque ac elit in turpis sollicitudin interdum. Donec vehicula sollicitudin mauris, ac porttitor nibh. Curabitur non pellentesque quam, in cursus erat. In ornare ex commodo odio iaculis venenatis. Ut non auctor lorem. Nam bibendum odio at est aliquam, eget eleifend odio sollicitudin. Ut pulvinar sodales condimentum. Morbi tincidunt, ipsum at porttitor lacinia, nisl magna molestie nulla, ornare molestie quam quam eu tellus. Maecenas nec mi in massa malesuada ornare. Donec massa arcu, dignissim non est vel, tristique convallis risus. Integer luctus luctus lobortis. Integer id scelerisque velit."},
  ];
  for (let i = 2; i < 100; i+=2) {
    sentMessages.push({_id: i, sender, receiver, sentOn: i, message: `Some sent message ${i}`, attachment: ""});
  }

  const receivedMessages = [
    {_id: 1, sender: receiver, receiver: sender, sentOn: 1, attachment: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Atkinson_Rowan.jpg/800px-Atkinson_Rowan.jpg", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo quis turpis posuere ultrices. Quisque ac elit in turpis sollicitudin interdum. Donec vehicula sollicitudin mauris, ac porttitor nibh. Curabitur non pellentesque quam, in cursus erat. In ornare ex commodo odio iaculis venenatis. Ut non auctor lorem. Nam bibendum odio at est aliquam, eget eleifend odio sollicitudin. Ut pulvinar sodales condimentum. Morbi tincidunt, ipsum at porttitor lacinia, nisl magna molestie nulla, ornare molestie quam quam eu tellus. Maecenas nec mi in massa malesuada ornare. Donec massa arcu, dignissim non est vel, tristique convallis risus. Integer luctus luctus lobortis. Integer id scelerisque velit."},
  ]
  for (let i = 3; i < 100; i+=2) {
    receivedMessages.push({_id: i, sender: receiver, receiver: sender, sentOn: i, message: `Some received message ${i}`, attachment: ""});
  }

  let messages = [...sentMessages, ...receivedMessages];
  return messages;
}