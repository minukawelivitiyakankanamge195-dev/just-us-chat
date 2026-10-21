const form = document.getElementById("chatForm");
const input = document.getElementById("message");
const messages = document.getElementById("messages");
const photo = document.getElementById("photo");

function addMessage(text = "", imageUrl = "") {
  const welcome = messages.querySelector(".welcome");

  if (welcome) {
    welcome.remove();
  }

  const bubble = document.createElement("div");
  bubble.className = "bubble mine";

  if (imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Photo";
    bubble.appendChild(img);
  }

  if (text) {
    const content = document.createElement("div");
    content.textContent = text;
    bubble.appendChild(content);
  }

  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = input.value.trim();

  if (!text) return;

  addMessage(text);

  input.value = "";
  input.focus();
});

photo.addEventListener("change", function() {
  const file = photo.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please choose an image.");
    photo.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("Photo must be under 5 MB.");
    photo.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {
    addMessage("", event.target.result);
  };

  reader.readAsDataURL(file);

  photo.value = "";
});
