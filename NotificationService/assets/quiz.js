// quiz.js — self-grading multiple-choice quiz widget
// Usage: add data-answer="N" (0-based index) to each .quiz-question element

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.quiz-question').forEach(function (question) {
    var correctIndex = parseInt(question.dataset.answer, 10);
    var options = question.querySelectorAll('.quiz-option');

    options.forEach(function (option, i) {
      option.addEventListener('click', function () {
        if (question.dataset.answered) return; // prevent re-answering
        question.dataset.answered = 'true';

        // always reveal the correct answer
        options[correctIndex].classList.add('correct');

        var feedback = question.querySelector('.feedback');
        if (i === correctIndex) {
          feedback.textContent = '✓ Correct.';
          feedback.classList.add('feedback-correct');
        } else {
          option.classList.add('selected-incorrect');
          feedback.textContent = '✗ Not quite — the correct answer is highlighted above.';
          feedback.classList.add('feedback-incorrect');
        }
      });
    });
  });
});
