/**
 * quiz.js — Lightweight self-marking quiz widget.
 *
 * Usage:
 *   <div class="quiz" data-quiz="myquiz">
 *     <h3>Knowledge Check</h3>
 *     <div class="quiz-question" data-correct="b">
 *       <p>Question text?</p>
 *       <ul class="quiz-options">
 *         <li><label><input type="radio" name="myquiz-q0" value="a"> Option A</label></li>
 *         <li><label><input type="radio" name="myquiz-q0" value="b"> Option B (correct)</label></li>
 *       </ul>
 *       <div class="quiz-feedback"></div>
 *     </div>
 *     <!-- more .quiz-question divs ... -->
 *     <button class="quiz-btn" data-quiz-submit="myquiz">Check Answers</button>
 *     <div class="quiz-score"></div>
 *   </div>
 */

(function () {
  'use strict';

  const EXPLANATIONS = {};  // optional: populated per-lesson via window.quizExplanations

  function init() {
    document.querySelectorAll('[data-quiz-submit]').forEach(btn => {
      btn.addEventListener('click', () => {
        const quizId = btn.dataset.quizSubmit;
        const quiz = document.querySelector(`[data-quiz="${quizId}"]`);
        if (!quiz) return;
        gradeQuiz(quiz, quizId, btn);
      });
    });
  }

  function gradeQuiz(quiz, quizId, btn) {
    const questions = quiz.querySelectorAll('.quiz-question');
    let correct = 0;
    let answered = 0;

    questions.forEach((q, idx) => {
      const name = `${quizId}-q${idx}`;
      const selected = quiz.querySelector(`input[name="${name}"]:checked`);
      const feedback = q.querySelector('.quiz-feedback');
      const labels = q.querySelectorAll('.quiz-options label');

      // Clear previous state
      labels.forEach(l => l.classList.remove('correct', 'incorrect'));
      if (feedback) { feedback.classList.remove('show', 'correct', 'incorrect'); }

      if (!selected) return;
      answered++;

      const rightAnswer = q.dataset.correct;
      const explanationKey = `${quizId}-q${idx}`;
      const explanation = (window.quizExplanations || {})[explanationKey] || '';

      // Highlight all labels
      labels.forEach(l => {
        const val = l.querySelector('input').value;
        if (val === rightAnswer) l.classList.add('correct');
        else if (val === selected.value && val !== rightAnswer) l.classList.add('incorrect');
      });

      if (selected.value === rightAnswer) {
        correct++;
        if (feedback) {
          feedback.textContent = '✓ Correct!' + (explanation ? ' ' + explanation : '');
          feedback.className = 'quiz-feedback show correct';
        }
      } else {
        if (feedback) {
          feedback.textContent = '✗ Not quite.' + (explanation ? ' ' + explanation : '');
          feedback.className = 'quiz-feedback show incorrect';
        }
      }
    });

    const scoreEl = quiz.querySelector('.quiz-score');
    if (scoreEl && answered > 0) {
      const pct = Math.round((correct / questions.length) * 100);
      scoreEl.innerHTML = `<strong>Score: ${correct} / ${questions.length}</strong> (${pct}%)`;
      if (pct === 100) scoreEl.innerHTML += ' — Perfect!';
      else if (pct >= 70) scoreEl.innerHTML += ' — Good. Re-read the sections you missed.';
      else scoreEl.innerHTML += ' — Review the lesson and try again.';
      scoreEl.classList.add('show');
    }

    // Disable the button after grading
    btn.disabled = true;
    btn.textContent = 'Answers Checked';
    btn.style.background = '#888';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
