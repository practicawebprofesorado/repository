// main.js actualizado: carga dinámicamente vistas y activa menú lateral en vistas con menú-lateral

// Función para cargar fragmento HTML en selector con control de scroll
async function loadContent(selector, file, shouldScrollTop = true) {
  const container = document.querySelector(selector);
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    container.innerHTML = await res.text();
    // Scroll al inicio solo si shouldScrollTop es true
    if (shouldScrollTop) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  } catch (e) {
    container.innerHTML = `<p>Error al cargar ${file}: ${e.message}</p>`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// Inicializar menú lateral cuando exista
function initLateralMenu() {
  const menuLinks = document.querySelectorAll('#menu-lateral a');
  menuLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Carga cabecera y pie de página
loadContent('#menu', 'components/header.html', false);
loadContent('#footer', 'components/footer.html', false);

// Carga la vista según el hash
async function loadView() {
  const view = location.hash.slice(1) || 'home';
  await loadContent('#content', `views/${view}.html`, true);
  // Inicializa menú lateral si existe en la vista (HTML, JS, CSS, UX/UI)
  if (document.querySelector('#menu-lateral')) {
    initLateralMenu();
  }
}

// Eventos de carga inicial y cambio de hash
window.addEventListener('DOMContentLoaded', loadView);
window.addEventListener('hashchange', loadView);

//Autoevaluacion
  const correctAnswers = {
      1: "hypertext markup language",
      2: "b",
      3: "video",
      4: ["header", "article", "section"],
      5: ["display", "position", "float"],
      6: "112",
      7: "cursor",
      8: "b",
      9: ["number", "string", "boolean", "undefined"],
      10: "stopPropagation",
      11: ["push", "pop", "shift"],
      12: "b",
      13: ["usable", "desirable", "findable"],
      14: "2",
      15: "7",
      16: "a"
  };
  const answerLabels = {
      1: "HyperText Markup Language",
      3: "&lt;video&gt;",
      5: "display, position, float",
      6: "112",
      7: "cursor",
      10: "stopPropagation()",
      11: "push(), pop(), shift()",
      14: "2 segundos",
      15: "7"
  };
  function clearOptionStyles(container) {
      if (!container) return;
      const labels = container.querySelectorAll('label');
      labels.forEach(label => {
          label.classList.remove('option-correct', 'option-incorrect', 'option-expected');
      });
  }
  function clearSelectOptionStyles(select) {
      if (!select) return;
      Array.from(select.options).forEach(option => {
          option.classList.remove('option-correct', 'option-incorrect', 'option-expected');
      });
  }
  function clearInputStyles(input) {
      if (!input) return;
      input.classList.remove('option-correct', 'option-incorrect');
  }
  function clearLabel(questionNumber) {
      const labelDiv = document.getElementById(`label-${questionNumber}`);
      if (labelDiv) labelDiv.innerHTML = "";
  }
  function validateQuestion(questionNumber) {
      // Limpieza previa
      if (document.getElementById(`options${questionNumber}`)) clearOptionStyles(document.getElementById(`options${questionNumber}`));
      if (document.getElementById(`question${questionNumber}`) && document.getElementById(`question${questionNumber}`).tagName === "SELECT") clearSelectOptionStyles(document.getElementById(`question${questionNumber}`));
      if (document.getElementById(`question${questionNumber}`) && document.getElementById(`question${questionNumber}`).tagName === "INPUT") clearInputStyles(document.getElementById(`question${questionNumber}`));
      clearLabel(questionNumber);

      let isCorrect = false;
      let labelDiv = document.getElementById(`label-${questionNumber}`);
      switch(questionNumber) {
          // TEXTBOX
          case 1: case 6: case 15:
              const answerText = document.getElementById(`question${questionNumber}`).value.trim().toLowerCase();
              const inputElement = document.getElementById(`question${questionNumber}`);
              isCorrect = answerText === correctAnswers[questionNumber];
              inputElement.classList.add(isCorrect ? 'option-correct' : 'option-incorrect');
              if (isCorrect) {
                  labelDiv.innerHTML = `<span class="show-label label-correct">CORRECTO</span>`;
              } else {
                  labelDiv.innerHTML = `<span class="show-label label-incorrect">INCORRECTO. Respuesta correcta: <b>${answerLabels[questionNumber]}</b></span>`;
              }
              break;
          // RADIO BUTTON
          case 2: case 8: case 12: case 16:
              const answerRadio = document.querySelector(`input[name="question${questionNumber}"]:checked`);
              const optionsRadio = document.getElementById(`options${questionNumber}`).querySelectorAll('label');
              let radioCorrect = false;
              optionsRadio.forEach(label => {
                  const input = label.querySelector('input');
                  if (input.checked && input.value === correctAnswers[questionNumber]) {
                      label.classList.add('option-correct');
                      radioCorrect = true;
                  } else if (input.checked && input.value !== correctAnswers[questionNumber]) {
                      label.classList.add('option-incorrect');
                  } else if (!input.checked && input.value === correctAnswers[questionNumber]) {
                      label.classList.add('option-expected');
                  }
              });
              isCorrect = answerRadio && answerRadio.value === correctAnswers[questionNumber];
              if (isCorrect) {
                  labelDiv.innerHTML = `<span class="show-label label-correct">CORRECTO</span>`;
              } else {
                  labelDiv.innerHTML = `<span class="show-label label-incorrect">INCORRECTO</span>`;
              }
              break;
          // COMBO BOX
          case 3: case 7: case 10: case 14:
              const answerCombo = document.getElementById(`question${questionNumber}`).value;
              const selectElement = document.getElementById(`question${questionNumber}`);
              isCorrect = answerCombo === correctAnswers[questionNumber];
              selectElement.classList.add(isCorrect ? 'option-correct' : 'option-incorrect');
              if (isCorrect) {
                  labelDiv.innerHTML = `<span class="show-label label-correct">CORRECTO</span>`;
              } else {
                  labelDiv.innerHTML = `<span class="show-label label-incorrect">INCORRECTO. Respuesta correcta: <b>${answerLabels[questionNumber]}</b></span>`;
              }
              break;
          // CHECKBOX
          case 4: case 9: case 13:
              const checkedBoxes = document.querySelectorAll(`input[name="question${questionNumber}"]:checked`);
              const optionsCheck = document.getElementById(`options${questionNumber}`).querySelectorAll('label');
              const correctCheck = correctAnswers[questionNumber];
              let allCorrect = true;
              optionsCheck.forEach(label => {
                  const input = label.querySelector('input');
                  if (input.checked && correctCheck.includes(input.value)) {
                      label.classList.add('option-correct');
                  } else if (input.checked && !correctCheck.includes(input.value)) {
                      label.classList.add('option-incorrect');
                      allCorrect = false;
                  } else if (!input.checked && correctCheck.includes(input.value)) {
                      label.classList.add('option-expected');
                      allCorrect = false;
                  }
              });
              // También es incorrecto si faltan correctas
              isCorrect = Array.from(checkedBoxes).map(cb => cb.value).every(val => correctCheck.includes(val)) && checkedBoxes.length === correctCheck.length;
              if (isCorrect) {
                  labelDiv.innerHTML = `<span class="show-label label-correct">CORRECTO</span>`;
              } else {
                  labelDiv.innerHTML = `<span class="show-label label-incorrect">INCORRECTO</span>`;
              }
              break;
          // SELECTION BOX MULTIPLE
          case 5: case 11:
              const selectMultiple = document.getElementById(`question${questionNumber}`);
              const selectedMulti = Array.from(selectMultiple.selectedOptions).map(option => option.value);
              const correctMulti = correctAnswers[questionNumber];
              let allCorrectMulti = true;
              Array.from(selectMultiple.options).forEach(option => {
                  if (selectedMulti.includes(option.value) && correctMulti.includes(option.value)) {
                      option.classList.add('option-correct');
                  } else if (selectedMulti.includes(option.value) && !correctMulti.includes(option.value)) {
                      option.classList.add('option-incorrect');
                      allCorrectMulti = false;
                  } else if (!selectedMulti.includes(option.value) && correctMulti.includes(option.value)) {
                      option.classList.add('option-expected');
                      allCorrectMulti = false;
                  }
              });
              isCorrect = selectedMulti.length === correctMulti.length && selectedMulti.every(val => correctMulti.includes(val));
              if (isCorrect) {
                  labelDiv.innerHTML = `<span class="show-label label-correct">CORRECTO</span>`;
              } else {
                  labelDiv.innerHTML = `<span class="show-label label-incorrect">INCORRECTO</span>`;
              }
              break;
      }
      return isCorrect;
  }
  function calculateSectionScore(start, end) {
      let sectionScore = 0;
      for(let i = start; i <= end; i++) {
          if(validateQuestion(i)) sectionScore++;
      }
      return sectionScore;
  }
  function validateAll() {
      let score = 0;
      for(let i = 1; i <= 16; i++) {
          if(validateQuestion(i)) score++;
      }
      const percentage = (score / 16) * 100;
      document.getElementById('result').innerHTML = `
          <h3>Resultados:</h3>
          <div class="section-score">Puntuación total: ${score}/16 (${percentage.toFixed(2)}%)</div>
          <div class="section-score">HTML: ${calculateSectionScore(1, 4)}/4</div>
          <div class="section-score">CSS: ${calculateSectionScore(5, 8)}/4</div>
          <div class="section-score">JavaScript: ${calculateSectionScore(9, 12)}/4</div>
          <div class="section-score">Usabilidad: ${calculateSectionScore(13, 16)}/4</div>
      `;
  }


