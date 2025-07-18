
document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('start-button');
  const startScreen = document.getElementById('start-screen');
  const quizContainer = document.getElementById('quiz-container');
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  const nextButton = document.getElementById('next-button');
  const resultEl = document.getElementById('result');

  const questions = [
    {
      text: "你最享受工作中哪種挑戰？",
      options: {
        A: "深入研究技術規格",
        B: "找出產品最佳效能",
        C: "和不同合作夥伴協作",
        D: "想用 ARM 技術實現 AI 點子",
        E: "設計小巧低功耗產品",
        F: "打造吸引市場的行銷活動",
        G: "我都覺得蠻有趣的，但沒有特定偏好"
      }
    },
    {
      text: "以下哪句話最像你？",
      options: {
        A: "「規格文件是我的愛讀物！」",
        B: "「多跑幾次 Benchmark，總有驚喜！」",
        C: "「合作夥伴越多越好！」",
        D: "「AI 無所不在，我想用它做更多事。」",
        E: "「嵌入式是未來！」",
        F: "「品牌就是武器！」",
        G: "「我只是喜歡看新東西。」"
      }
    },
    {
      text: "參加 ARM 活動時，你最期待什麼？",
      options: {
        A: "聽最新核心技術分享",
        B: "看效能數字比較",
        C: "認識合作夥伴或客戶",
        D: "找靈感做 AI 專案",
        E: "詢問嵌入式或 IoT 應用",
        F: "看行銷案例或品牌佈局",
        G: "只是想看看新科技"
      }
    }
  ];

  const results = {
    A: "你是【核心大師 Core Master】\n熱衷研究核心架構，技術宅無誤！",
    B: "你是【效能狙擊手 Performance Sniper】\n追求極致效能，Benchmark 愛好者！",
    C: "你是【生態鏈領航員 Ecosystem Navigator】\n擅長合作聯盟、業務或 PM 類型！",
    D: "你是【AI 鍊金師 AI Alchemist】\n熱愛 AI 創新應用！",
    E: "你是【嵌入式忍者 Embedded Ninja】\nIoT / MCU / Edge Computing 專家！",
    F: "你是【市場行銷策士 Marketing Strategist】\n精通市場趨勢、品牌打造！",
    G: "你是【科技熱情使者 Tech Enthusiast】\n對科技好奇，但不偏技術或業務！",
    MULTI: "你是【多面向達人 Multi-Talent】\n橫跨多領域，無法歸類！"
  };

  let currentQuestion = 0;
  let answers = [];

  function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.innerText = q.text;
    optionsEl.innerHTML = '';
    for (const key in q.options) {
      const label = document.createElement('label');
      label.innerHTML = `<input type='radio' name='option' value='${key}'/> ${key}. ${q.options[key]}`;
      optionsEl.appendChild(label);
    }
    nextButton.style.display = 'block';
  }

  function showResult() {
    const count = {};
    answers.forEach(a => count[a] = (count[a] || 0) + 1);
    let resultKey = Object.keys(count).find(k => count[k] >= 2) || 'MULTI';
    quizContainer.style.display = 'none';
    resultEl.innerText = results[resultKey];
    resultEl.style.display = 'block';
  }

  nextButton.addEventListener('click', () => {
    const selected = document.querySelector("input[name='option']:checked");
    if (!selected) return alert("請選擇一個選項！");
    answers.push(selected.value);
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    showQuestion();
  });
});
