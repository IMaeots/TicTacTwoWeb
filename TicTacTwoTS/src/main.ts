import './styles/main.css'
import GameState from './domain/models/GameState'
import GameController from './domain/controllers/GameController.ts'
import UIBuilder from './domain/utils/UIBuilder.ts'
import { UIElements } from './domain/models/Interfaces.ts'

document.addEventListener("DOMContentLoaded", () => {
  const uiBuilder = new UIBuilder("app")
  const ui = uiBuilder.createGameUI()
  
  setupGameEvents(ui)
})

function setupGameEvents(ui: UIElements): void {
  const { localGameButton, botGameButton } = ui

  localGameButton.addEventListener('click', () => {
    setupGameEnvironment(ui)

    const gameState = new GameState()
    const gameController = new GameController(gameState, ui, false)
    gameController.initializeGame()
  })

  botGameButton.addEventListener('click', () => {
    setupGameEnvironment(ui)

    const gameState = new GameState()
    const gameController = new GameController(gameState, ui, true)
    gameController.initializeGame()
  })
}

function setupGameEnvironment(ui: UIElements): void {
  const {
    gameHelper,
    gameTimer,
    localGameButton,
    botGameButton,
    resetButton,
    gameContainer
  } = ui
  
  localGameButton.style.display = 'none'
  botGameButton.style.display = 'none'
  gameContainer.style.display = 'flex'
  resetButton.style.display = 'block'
  gameHelper.style.display = 'block'
  gameTimer.style.display = 'block'
}
