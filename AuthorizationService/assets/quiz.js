/* Shared quiz widget — used by all lessons */
(function () {
  function initQuiz(container) {
    container.querySelectorAll('.quiz-q').forEach(function (qEl) {
      var buttons = qEl.querySelectorAll('.quiz-option');
      var feedback = qEl.querySelector('.quiz-feedback');
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (btn.disabled) return;
          buttons.forEach(function (b) { b.disabled = true; });
          var correct = btn.dataset.correct === 'true';
          btn.classList.add(correct ? 'correct' : 'wrong');
          if (!correct) {
            buttons.forEach(function (b) {
              if (b.dataset.correct === 'true') b.classList.add('correct');
            });
          }
          if (feedback) {
            feedback.textContent = correct
              ? (btn.dataset.explanation || '✓ Correct.')
              : (qEl.querySelector('[data-correct="true"]').dataset.explanation || '✗ Not quite.');
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.quiz').forEach(initQuiz);
  });
})();
