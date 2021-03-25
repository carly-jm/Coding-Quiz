const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Who invented JavaScript?',
    answers: [
      { text: 'Brendan Eich', correct: true },
      { text: 'Tim Berners-Lee', correct: false }
    ]
  },
  {
    question: 'What is a prompt box?',
    answers: [
      { text: 'a box that allows user to input information', correct: true },
      { text: 'a box that tells the user what to do', correct: false },
      { text: 'a box with a picture', correct: false },
      { text: 'a box for doing math ', correct: false }
    ]
  },
  {
    question: 'What wouldnt be considered an undefined value?',
    answers: [
      { text: 'Variable in code that doesnt exist', correct: false },
      { text: 'variable not assigned to a value', correct: false },
      { text: 'property doesnt exist', correct: false },
      { text: 'variable doesnt have the correct amount of characters', correct: true }
    ]
  },
  {
    question: 'What is a type of pop up box?',
    answers: [
      { text: 'alert', correct: true },
      { text: 'confirm', correct: true },
      { text: 'prompt', correct: true }
    ]
  }
]