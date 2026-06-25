/**
 * quiz.js — reusable quiz widget for CI/CD lessons
 *
 * Usage:
 *   new Quiz('quiz-container-id', questions)
 *
 * questions = [
 *   {
 *     q: 'Question text?',
 *     options: ['A', 'B', 'C', 'D'],   // all options same word-count ideally
 *     answer: 1,                         // 0-based index of correct option
 *     explanation: 'Why this is right'
 *   }, ...
 * ]
 */
class Quiz {
  constructor(containerId, questions) {
    this.container = document.getElementById(containerId);
    this.questions = questions;
    this.answered  = new Array(questions.length).fill(false);
    this.scores    = new Array(questions.length).fill(null);
    this._render();
  }

  _render() {
    this.container.innerHTML = '';
    this.questions.forEach((q, i) => {
      const div = document.createElement('div');
      div.className = 'question';
      div.id = `q-${i}`;

      const prompt = document.createElement('p');
      prompt.textContent = `${i + 1}. ${q.q}`;
      div.appendChild(prompt);

      const opts = document.createElement('div');
      opts.className = 'options';

      q.options.forEach((text, j) => {
        const btn = document.createElement('button');
        btn.className = 'opt-btn';
        btn.textContent = text;
        btn.dataset.qi = i;
        btn.dataset.oi = j;
        btn.addEventListener('click', () => this._pick(i, j));
        opts.appendChild(btn);
      });

      div.appendChild(opts);

      const fb = document.createElement('div');
      fb.className = 'feedback';
      fb.id = `fb-${i}`;
      div.appendChild(fb);

      this.container.appendChild(div);
    });

    this.scoreEl = document.createElement('div');
    this.scoreEl.className = 'quiz-score';
    this.scoreEl.id = 'quiz-score';
    this.container.appendChild(this.scoreEl);
  }

  _pick(qi, oi) {
    if (this.answered[qi]) return;
    this.answered[qi] = true;

    const correct = oi === this.questions[qi].answer;
    this.scores[qi] = correct;

    const qEl = document.getElementById(`q-${qi}`);
    const btns = qEl.querySelectorAll('.opt-btn');

    btns.forEach((b, j) => {
      b.disabled = true;
      if (j === this.questions[qi].answer) b.classList.add('correct');
      else if (j === oi && !correct)       b.classList.add('wrong');
    });

    const fb = document.getElementById(`fb-${qi}`);
    if (correct) {
      fb.textContent = `✓ ${this.questions[qi].explanation}`;
      fb.className = 'feedback ok';
    } else {
      const correctText = this.questions[qi].options[this.questions[qi].answer];
      fb.textContent = `✗ Correct answer: "${correctText}". ${this.questions[qi].explanation}`;
      fb.className = 'feedback err';
    }

    if (this.answered.every(Boolean)) this._showScore();
  }

  _showScore() {
    const total   = this.questions.length;
    const correct = this.scores.filter(Boolean).length;
    const pct     = Math.round((correct / total) * 100);

    let msg = '';
    if (pct === 100) msg = 'Perfect — all correct!';
    else if (pct >= 80) msg = 'Great work — minor gaps to revisit.';
    else if (pct >= 60) msg = 'Solid start — review the incorrect answers above.';
    else msg = 'Keep at it — re-read the lesson and try the quiz again.';

    this.scoreEl.textContent = `${correct}/${total} correct (${pct}%) — ${msg}`;
    this.scoreEl.style.display = 'block';
  }
}
