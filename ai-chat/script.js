// ai-chat/script.js
// The askAI helper: sends one message to the OpenAI API and returns the reply.
// The API key comes from config.js (loaded before this file), never from here.

const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

async function askAI(question) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + OPENAI_API_KEY
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: question }]
    })
  });

  if (!response.ok) throw new Error("HTTP " + response.status);

  const data = await response.json();
  return data.choices[0].message.content;
}

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = "msg " + who;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function handleSend() {
  const question = input.value.trim();
  if (question === "") return;

  addMessage(question, "user");
  input.value = "";
  addMessage("Thinking...", "ai");

  try {
    const answer = await askAI(question);
    chat.lastChild.textContent = answer;
  } catch (err) {
    chat.lastChild.innerHTML = '<span class="error">Error: ' + err.message + "</span>";
  }
}

sendBtn.addEventListener("click", handleSend);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSend();
});
