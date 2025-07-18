
const questions = [
  {
    question: "你偏好哪種工作方式？",
    options: ["獨立作業", "團隊合作", "彈性自由"],
  },
  {
    question: "你最感興趣的領域是？",
    options: ["系統設計", "產品開發", "資料分析"],
  },
  {
    question: "你解決問題時通常依賴？",
    options: ["邏輯推理", "創意思維", "數據與實驗"],
  }
];

const results = {
  A: "你是穩健的系統架構師，擅長掌控全局與技術框架！",
  B: "你是創新的產品設計師，擁有敏銳直覺與使用者思維！",
  C: "你是精準的數據分析師，善於從資料中發掘洞察！",
  D: "你是多面向達人，能靈活應對科技圈各種挑戰！"
};

let currentQuestion = 0;
let answers = [];

document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  showQuestion();
});

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => selectAnswer(idx));
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(index) {
  answers.push(index);
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";
  document.getElementById("end-screen").style.display = "block";

  const count = [0, 0, 0];
  answers.forEach(i => count[i]++);
  const max = Math.max(...count);
  const maxIndex = count.indexOf(max);
  const resultKey = count.filter(c => c === 1).length === 3 ? "D" : ["A", "B", "C"][maxIndex];
  document.getElementById("result").textContent = results[resultKey];
}

function restartQuiz() {
  currentQuestion = 0;
  answers = [];
  document.getElementById("result-container").style.display = "none";
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
}
