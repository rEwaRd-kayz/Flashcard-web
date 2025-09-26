const addBtn = document.getElementById('addBtn');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const subjectSelect = document.getElementById('subject');
const filterSelect = document.getElementById('filterSubject');
const flashcardsDiv = document.getElementById('flashcards');

// helper: make a safe CSS class name from subject
function slugifySubject(subject) {
  return subject.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  }

  // load from localStorage
  let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
  renderFlashcards();

  // add new flashcard
  addBtn.addEventListener('click', () => {
    const question = questionInput.value.trim();
      const answer = answerInput.value.trim();
        const subject = subjectSelect.value;

          if (!question || !answer || !subject) {
              alert('Please enter question, answer, and select a subject!');
                  return;
                    }

                      flashcards.push({ question, answer, subject });
                        localStorage.setItem('flashcards', JSON.stringify(flashcards));
                          questionInput.value = '';
                            answerInput.value = '';
                              subjectSelect.value = '';
                                renderFlashcards();
                                });

                                filterSelect.addEventListener('change', renderFlashcards);

                                function renderFlashcards() {
                                  const filter = filterSelect.value;
                                    flashcardsDiv.innerHTML = '';

                                      // iterate full array so index is the real index in flashcards[]
                                        flashcards.forEach((card, index) => {
                                            if (filter !== 'All' && card.subject !== filter) return;

                                                const subjectClass = slugifySubject(card.subject);
                                                    const cardDiv = document.createElement('div');
                                                        cardDiv.className = `flashcard ${subjectClass}`;
                                                            cardDiv.dataset.index = index; // store real index for deletion
                                                                cardDiv.innerHTML = `
                                                                      <p class="content"><strong>${card.subject}</strong><br>${card.question}</p>
                                                                            <button class="delete-btn">X</button>
                                                                                `;

                                                                                    // flip card (toggle between question and answer)
                                                                                        cardDiv.addEventListener('click', (e) => {
                                                                                              if (e.target.classList.contains('delete-btn')) return;
                                                                                                    const content = cardDiv.querySelector('.content');
                                                                                                          const isNowFlipped = cardDiv.classList.toggle('flipped');
                                                                                                                content.innerHTML = `<strong>${card.subject}</strong><br>${isNowFlipped ? card.answer : card.question}`;
                                                                                                                    });

                                                                                                                        // delete button (use stored index so deletion matches original array)
                                                                                                                            const deleteBtn = cardDiv.querySelector('.delete-btn');
                                                                                                                                deleteBtn.addEventListener('click', (e) => {
                                                                                                                                      e.stopPropagation(); // prevent flip
                                                                                                                                            const idx = Number(cardDiv.dataset.index);
                                                                                                                                                  // remove the flashcard at idx
                                                                                                                                                        flashcards.splice(idx, 1);
                                                                                                                                                              localStorage.setItem('flashcards', JSON.stringify(flashcards));
                                                                                                                                                                    renderFlashcards();
                                                                                                                                                                        });

                                                                                                                                                                            flashcardsDiv.appendChild(cardDiv);
                                                                                                                                                                              });
                                                                                                                                                                              }