var editor = document.getElementById("editor");
var slideDiv = document.getElementById("slide");
var countSpan = document.getElementById("count");
var leftBtn = document.getElementById("leftBtn");
var rightBtn = document.getElementById("rightBtn");
var fullBtn = document.getElementById("fullBtn");
var previewBox = document.getElementById("previewBox");
var msg = document.getElementById("msg");

var defaultText = "# Slide 1\n## My first heading\nWrite your content here\n\n---\n\n# Slide 2\n## Another heading\n- point one\n- point two\n\n---\n\n# Slide 3\nThe end";

var slides = [];
var current = 0;

// load saved slides from browser memory
var saved = localStorage.getItem("mySlides");
if (saved !== null) {
  editor.value = saved;
} else {
  editor.value = defaultText;
}

// turn markdown of one slide into html
function convert(text) {
  var lines = text.split("\n");
  var html = "";
  var inList = false;
  var inCode = false;

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    // code block
    if (line.trim().indexOf("```") === 0) {
      if (inCode) {
        html += "</pre>";
        inCode = false;
      } else {
        if (inList) { html += "</ul>"; inList = false; }
        html += "<pre>";
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      html += line.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "\n";
      continue;
    }

    // escape html
    line = line.replace(/&/g, "&amp;").replace(/</g, "&lt;");

    // bold, italic, inline code
    line = line.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    line = line.replace(/\*(.+?)\*/g, "<i>$1</i>");
    line = line.replace(/`(.+?)`/g, "<code>$1</code>");

    if (line.match(/^[-*] /)) {
      if (!inList) { html += "<ul>"; inList = true; }
      html += "<li>" + line.substring(2) + "</li>";
      continue;
    }

    if (inList) { html += "</ul>"; inList = false; }

    if (line.indexOf("### ") === 0) {
      html += "<h3>" + line.substring(4) + "</h3>";
    } else if (line.indexOf("## ") === 0) {
      html += "<h2>" + line.substring(3) + "</h2>";
    } else if (line.indexOf("# ") === 0) {
      html += "<h1>" + line.substring(2) + "</h1>";
    } else if (line.trim() !== "") {
      html += "<p>" + line + "</p>";
    }
  }
  if (inList) html += "</ul>";
  if (inCode) html += "</pre>";
  return html;
}

// show the current slide
function showSlide() {
  slides = editor.value.split(/^---$/m);
  if (current >= slides.length) current = slides.length - 1;
  if (current < 0) current = 0;

  slideDiv.innerHTML = convert(slides[current]);
  countSpan.innerText = (current + 1) + " / " + slides.length;

  leftBtn.disabled = (current === 0);
  rightBtn.disabled = (current === slides.length - 1);
}

function goLeft() {
  if (current > 0) {
    current--;
    showSlide();
  }
}

function goRight() {
  if (current < slides.length - 1) {
    current++;
    showSlide();
  }
}

function toggleFull() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    previewBox.requestFullscreen();
  }
}

function saveSlides() {
  localStorage.setItem("mySlides", editor.value);
  msg.innerText = "Saved!";
  setTimeout(function () { msg.innerText = ""; }, 1500);
}

// change button text when full screen changes
document.addEventListener("fullscreenchange", function () {
  if (document.fullscreenElement) {
    fullBtn.innerText = "Exit Full Screen";
  } else {
    fullBtn.innerText = "Full Screen";
  }
});

// buttons
leftBtn.onclick = goLeft;
rightBtn.onclick = goRight;
fullBtn.onclick = toggleFull;
document.getElementById("saveBtn").onclick = saveSlides;
document.getElementById("presentBtn").onclick = function () {
  if (!document.fullscreenElement) {
    previewBox.requestFullscreen();
  }
};
document.getElementById("newBtn").onclick = function () {
  editor.value = "# New Slide\n\n---\n\n# Slide 2";
  current = 0;
  showSlide();
};

// live update while typing
editor.addEventListener("input", showSlide);

// keyboard keys
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key.toLowerCase() === "s") {
    e.preventDefault();
    saveSlides();
  } else if (e.key === "F11") {
    e.preventDefault();
    toggleFull();
  } else if (e.key === "ArrowRight" && document.activeElement !== editor) {
    goRight();
  } else if (e.key === "ArrowLeft" && document.activeElement !== editor) {
    goLeft();
  }
});

showSlide();
