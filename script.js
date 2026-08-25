let keywordData = [];

// Load JSON + localStorage
fetch("keywords.json")
.then(res => res.json())
.then(data => {
  keywordData = data.keywords;

  let saved = JSON.parse(localStorage.getItem("userKeywords")) || [];
  keywordData = [...keywordData, ...saved];

  displayKeywords();
});

// Generate
function generate() {
  const keyword = document.getElementById("keyword").value.trim();
  const titles = document.getElementById("titles");
  const hashtags = document.getElementById("hashtags");

  titles.innerHTML = "";
  hashtags.innerHTML = "";

  if(keyword===""){
    alert("Enter keyword");
    return;
  }

  const templates = [
    `This ${keyword} Trick Will Shock You 😱`,
    `Top 5 ${keyword} Secrets 🔥`,
    `How I Mastered ${keyword} Fast 🚀`,
    `${keyword} Hack That Works 💯`,
    `Don't Try ${keyword} Before Watching This 😳`
  ];

  for(let i=0;i<5;i++){
    let random = templates[Math.floor(Math.random()*templates.length)];
    let li = document.createElement("li");
    li.innerText = random;
    titles.appendChild(li);
  }

  const baseTags = ["#viral","#trending","#shorts"];
  const keywordTags = keyword.split(" ").map(w=>"#"+w);

  let randomExtra = keywordData[Math.floor(Math.random()*keywordData.length)];
  let extraTags = randomExtra.split(" ").map(w=>"#"+w);

  hashtags.innerText = [...keywordTags,...extraTags,...baseTags].join(" ");
}

// Copy
function copyText(){
  let text = document.getElementById("hashtags").innerText;
  navigator.clipboard.writeText(text);
  alert("Copied!");
}

// Add keyword
function addKeyword(){
  let newKey = document.getElementById("newKeyword").value.trim();
  if(newKey===""){
    alert("Enter keyword");
    return;
  }

  let saved = JSON.parse(localStorage.getItem("userKeywords")) || [];
  saved.push(newKey);

  localStorage.setItem("userKeywords",JSON.stringify(saved));

  keywordData.push(newKey);

  document.getElementById("newKeyword").value="";
  displayKeywords();
}

// Show keywords
function displayKeywords(){
  let list = document.getElementById("keywordList");
  list.innerHTML="";

  keywordData.forEach((key,index)=>{
    let li = document.createElement("li");
    li.innerHTML = `${key} <span class="delete" onclick="deleteKeyword(${index})">❌</span>`;
    list.appendChild(li);
  });
}

// Delete keyword
function deleteKeyword(index){
  keywordData.splice(index,1);

  localStorage.setItem("userKeywords",JSON.stringify(keywordData));

  displayKeywords();
}

// Export JSON
function exportJSON(){
  const dataStr = JSON.stringify({keywords: keywordData}, null, 2);
  const blob = new Blob([dataStr], {type:"application/json"});
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "keywords.json";
  a.click();
}
