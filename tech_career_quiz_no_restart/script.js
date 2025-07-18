
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const endActions = document.getElementById("end-actions");

const quizData = [
  {
    question: "你最享受工作中哪種挑戰？",
    options: [
      "深入研究技術規格",
      "找出產品最佳效能",
      "和不同合作夥伴協作",
      "想用 ARM 技術實現 AI 點子",
      "設計小巧低功耗產品",
      "打造吸引市場的行銷活動",
      "我都覺得蠻有趣的，但沒有特定偏好"
    ],
    types: ["A", "B", "C", "D", "E", "F", "G"]
  },
  {
    question: "參加 ARM 活動時，你最期待什麼？",
    options: [
      "聽最新核心技術分享",
      "看效能數字比較",
      "認識合作夥伴或客戶",
      "找靈感做 AI 專案",
      "詢問嵌入式或 IoT 應用",
      "看行銷案例或品牌佈局",
      "只是想看看新科技"
    ],
    types: ["A", "B", "C", "D", "E", "F", "G"]
  },
  {
    question: "以下哪句話最像你？",
    options: [
      "「規格文件是我的愛讀物！」",
      "「多跑幾次 Benchmark，總有驚喜！」",
      "「合作夥伴越多越好！」",
      "「AI 無所不在，我想用它做更多事。」",
      "「嵌入式是未來！」",
      "「品牌就是武器！」",
      "「我只是喜歡看新東西。」"
    ],
    types: ["A", "B", "C", "D", "E", "F", "G"]
  }
];

const results = {
  A: { title: "核心大師 Core Master", description: "熱衷研究核心架構，技術宅無誤！" },
  B: { title: "效能優化王 Performance Pro", description: "對數據敏感，調效讓你超有成就感！" },
  C: { title: "生態協作者 Ecosystem Partner", description: "擅長跨界溝通，是最佳連結者！" },
  D: { title: "AI 鍊金師 AI Alchemist", description: "熱愛 AI 創新應用！" },
  E: { title: "嵌入式工程師 Embedded Hero", description: "小巧低功耗設計就是你的浪漫！" },
  F: { title: "品牌造浪者 Brand Builder", description: "你用創意講好產品故事！" },
  G: { title: "多面向達人 Versatile Explorer", description: "每種路線都願意嘗試，是萬用角色！" }
};

let currentQuestion = 0;
let answers = [];

startBtn.addEventListener("click", () => {
  document.getElementById("start-screen").hidden = true;
  quizContainer.hidden = false;
  showQuestion();
});

function showQuestion() {
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <h2>${q.question}</h2>
    ${q.options.map((opt, i) => `
      <label><input type="radio" name="answer" value="${q.types[i]}" /> ${opt}</label><br>
    `).join("")}
    <br><button class="btn" onclick="nextQuestion()">下一題</button>
  `;
}

function nextQuestion() {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return;
  answers.push(selected.value);
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizContainer.hidden = true;
  resultContainer.hidden = false;

  const counts = answers.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const top = sorted[0];
  const result = (top[1] >= 2) ? results[top[0]] : results["G"];

  resultContainer.innerHTML = `
    <h2>你是【${result.title}】</h2>
    <p>${result.description}</p>
  `;
  endActions.hidden = false;
}
