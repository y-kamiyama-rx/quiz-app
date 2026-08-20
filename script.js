const questions = [
  {
    question: "光の三原色に含まれないものはどれ？",
    choices: ["赤", "緑", "青", "黄"],
    correctIndex: 3,
    explanationJa: "光の三原色は「赤・緑・青」です。これらを混ぜ合わせることであらゆる色を作ることができます。黄色は三原色には含まれません。",
    explanationEn: "The three primary colors of light are red, green, and blue. Mixing them can create any color. Yellow is not one of the three primary colors of light."
  },
  {
    question: "1週間は何日でしょう？",
    choices: ["5日", "6日", "7日", "8日"],
    correctIndex: 2,
    explanationJa: "1週間は7日です。月曜日から日曜日までの7つの曜日で構成されています。",
    explanationEn: "A week consists of 7 days, from Monday through Sunday."
  },
  {
    question: "2020年代に人口が世界で最も多いとされる国はどこでしょう？",
    choices: ["中国", "インド", "アメリカ", "インドネシア"],
    correctIndex: 1,
    explanationJa: "国連の推計によると、2023年頃にインドの人口が中国を上回り、世界で最も人口が多い国となりました。",
    explanationEn: "According to United Nations estimates, India's population surpassed China's around 2023, making it the most populous country in the world."
  },
  {
    question: "健康な人の平熱として一般的な体温はどれに近いでしょう？",
    choices: ["30℃", "33℃", "36℃", "40℃"],
    correctIndex: 2,
    explanationJa: "人間の平熱はおよそ36℃前後とされています。個人差はありますが、36〜37℃程度が一般的な範囲です。",
    explanationEn: "The average human body temperature is around 36°C. It varies slightly by person, but 36–37°C is generally considered normal."
  },
  {
    question: "平年（うるう年でない年）の1年は何日でしょう？",
    choices: ["364日", "365日", "366日", "367日"],
    correctIndex: 1,
    explanationJa: "平年は365日です。うるう年には2月29日が加わり、366日になります。",
    explanationEn: "A common year has 365 days. In a leap year, an extra day (February 29) is added, making it 366 days."
  },
  {
    question: "地球上で最も面積が広い海洋はどれでしょう？",
    choices: ["大西洋", "太平洋", "インド洋", "北極海"],
    correctIndex: 1,
    explanationJa: "太平洋は地球上で最も広い海洋で、地球の全表面積の約3分の1を占めています。",
    explanationEn: "The Pacific Ocean is the largest ocean on Earth, covering about one-third of the planet's total surface area."
  },
  {
    question: "人体で最も大きな臓器はどれでしょう？",
    choices: ["肝臓", "心臓", "肺", "皮膚"],
    correctIndex: 3,
    explanationJa: "人体で最も大きな臓器は皮膚です。体全体を覆っており、体温調節や外部からの保護などの役割を担っています。",
    explanationEn: "The skin is the largest organ in the human body. It covers the entire body and plays roles such as regulating temperature and protecting against external elements."
  },
  {
    question: "三角形の内角の和は何度でしょう？",
    choices: ["90度", "180度", "270度", "360度"],
    correctIndex: 1,
    explanationJa: "三角形の内角の和は180度です。これはどんな形の三角形でも変わらない基本的な性質です。",
    explanationEn: "The sum of the interior angles of a triangle is always 180 degrees, regardless of the triangle's shape."
  },
  {
    question: "日本で最も標高が高い山はどれでしょう？",
    choices: ["富士山", "北岳", "穂高岳", "槍ヶ岳"],
    correctIndex: 0,
    explanationJa: "日本で最も標高が高い山は富士山で、標高はおよそ3776メートルです。",
    explanationEn: "The highest mountain in Japan is Mt. Fuji, standing at approximately 3,776 meters."
  },
  {
    question: "虹は一般的に何色とされているでしょう？",
    choices: ["5色", "6色", "7色", "8色"],
    correctIndex: 2,
    explanationJa: "虹は一般的に7色（赤・橙・黄・緑・青・藍・紫）とされていますが、色の数え方は文化によって異なる場合もあります。",
    explanationEn: "A rainbow is commonly said to have 7 colors (red, orange, yellow, green, blue, indigo, and violet), though this can vary by culture."
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionNumberEl = document.getElementById("question-number");
const totalQuestionsEl = document.getElementById("total-questions");
const questionTextEl = document.getElementById("question-text");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const scoreTextEl = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");

totalQuestionsEl.textContent = questions.length;

function renderQuestion() {
  answered = false;
  const current = questions[currentQuestionIndex];

  questionNumberEl.textContent = currentQuestionIndex + 1;
  questionTextEl.textContent = current.question;

  choicesEl.innerHTML = "";
  current.choices.forEach((choiceText, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choiceText;
    btn.addEventListener("click", () => selectAnswer(index));
    choicesEl.appendChild(btn);
  });

  feedbackEl.classList.add("hidden");
  feedbackEl.innerHTML = "";
  nextBtn.classList.add("hidden");
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const current = questions[currentQuestionIndex];
  const isCorrect = selectedIndex === current.correctIndex;

  if (isCorrect) {
    score++;
  }

  const choiceButtons = choicesEl.querySelectorAll(".choice-btn");
  choiceButtons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === current.correctIndex) {
      btn.classList.add("correct");
    } else if (index === selectedIndex) {
      btn.classList.add("incorrect");
    }
  });

  const resultLabel = isCorrect
    ? "正解！ / Correct!"
    : "不正解… / Incorrect…";

  feedbackEl.innerHTML = `
    <p class="feedback-result ${isCorrect ? "correct" : "incorrect"}">${resultLabel}</p>
    <p class="feedback-explanation-ja">${current.explanationJa}</p>
    <p class="feedback-explanation-en">${current.explanationEn}</p>
  `;
  feedbackEl.classList.remove("hidden");

  nextBtn.classList.remove("hidden");
  nextBtn.textContent =
    currentQuestionIndex === questions.length - 1 ? "結果を見る" : "次の問題へ";
}

function goToNext() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreTextEl.textContent = `${questions.length}問中 ${score}問正解でした！`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quizScreen.classList.remove("hidden");
  resultScreen.classList.add("hidden");
  renderQuestion();
}

nextBtn.addEventListener("click", goToNext);
restartBtn.addEventListener("click", restartQuiz);

renderQuestion();
