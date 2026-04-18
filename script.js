function goTo(id){
  document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

function toggleAuth(){
  document.getElementById("authBox").classList.toggle("hidden");
}

function sendMessage(){
  let input = userInput.value;
  chatBox.innerHTML += `<p><b>You:</b> ${input}</p>`;

  let reply = "I'm here for you 💙";

  if(input.includes("sad")) reply="I'm sorry you're feeling sad.";
  if(input.includes("anxious")) reply="Take a deep breath.";
  if(input.includes("stress")) reply="Let's slow things down.";

  setTimeout(()=>{
    chatBox.innerHTML += `<p><b>AI:</b> ${reply}</p>`;
  },500);

  userInput.value="";
}

function saveJournal(){
  const text = journalText.value;
  const user = localStorage.getItem("user") || "Anonymous";
  const date = new Date().toLocaleDateString();

  document.getElementById("journalDate").innerText = date;
  document.getElementById("journalUser").innerText = user;

  // insight
  if(text.includes("stress") || text.includes("tired")){
    journalInsight.innerText = "You might be feeling overwhelmed. Try taking a break 💙";
  } else if(text.includes("happy")){
    journalInsight.innerText = "You seem to be in a good space ✨";
  } else {
    journalInsight.innerText = "Keep expressing your thoughts freely.";
  }
}

function checkMood(){
  const mood = document.getElementById("moodSelect").value;
  const result = document.getElementById("moodResult");

  let message = "";

  if(mood === "Happy" || mood === "Motivated"){
    message = "✨ You're in a positive space right now. Keep nurturing this energy and doing what makes you feel good.";
  }
  else if(mood === "Calm"){
    message = "🌊 You seem balanced and at peace. This is a great time to reflect or enjoy the moment.";
  }
  else if(mood === "Neutral"){
    message = "🧘 You're in a steady state. Maybe try journaling or a small activity to shift your mood positively.";
  }
  else if(mood === "Sad" || mood === "Lonely"){
    message = "💙 It seems like you're feeling low. You're not alone — try expressing your thoughts or talking it out.";
  }
  else if(mood === "Anxious" || mood === "Overwhelmed"){
    message = "🫧 Your mind might be racing right now. Try slowing down — take a deep breath and focus on the present.";
  }
  else if(mood === "Stressed"){
    message = "⚡ You might be under pressure. Break things into small steps and give yourself space to breathe.";
  }
  else if(mood === "Tired"){
    message = "🌙 Your body and mind need rest. It's okay to pause and recharge.";
  }

  result.innerText = message;

  // 🌊 Emotional background
  if(mood === "Happy") document.body.style.background = "#0ea5e9";
  else if(mood === "Calm") document.body.style.background = "#0284c7";
  else if(mood === "Sad") document.body.style.background = "#020617";
  else if(mood === "Anxious") document.body.style.background = "#1e293b";
}

let recognition;

function startVoice(){
  const status = document.getElementById("voiceStatus");

  // Check browser support
  if (!('webkitSpeechRecognition' in window)) {
    alert("Voice recognition not supported in this browser");
    return;
  }

  recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  status.innerText = "🎤 Listening...";

  recognition.start();

  recognition.onresult = function(event){
    const transcript = event.results[0][0].transcript;

    document.getElementById("userInput").value = transcript;

    status.innerText = "✅ Heard: " + transcript;

    // OPTIONAL: auto send message
    sendMessage();
  };

  recognition.onerror = function(){
    status.innerText = "❌ Error capturing voice";
  };

  recognition.onend = function(){
    setTimeout(()=>{
      status.innerText = "";
    }, 2000);
  };
}