const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");

function sendMessage(){
	const message = userInput.value;
	// Display user's message
	displayMessage("User", message);
	// Call OpenAI API to get chatbot's response
	getChatBotResponse(message);
	// Clear user's input
	userInput.value = "";
}

function displayMessage(sender, message){
	const messageElement = document.createElement("div");
	messageElement.classList.add("message", sender);
	// wrap the message in a <p> tag
	const messageParagraph = document.createElement("p");
	messageParagraph.innerText = message;
	// append the <p> tag to the message element
	messageElement.appendChild(messageParagraph);
	chatLog.appendChild(messageElement);
}

function getChatbotResponse(userMessage){
	// make request to your server with the user's response
	fetch("/getChatbotResponse", {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({ userMessage }),
	})
	.then(response => response.json())
	.then(data => {
		// display chatbot's response
		displayMessage("chatbot", data.chatbotResponse);
	})
	.catch(error => console.error("Error:", error));
}
