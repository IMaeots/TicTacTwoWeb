import { UIElements } from '../models/Interfaces';

export default class UIBuilder {
  private rootElement: HTMLElement;

  constructor(rootElementId: string) {
    const element = document.getElementById(rootElementId);
    if (!element) {
      throw new Error(`Element with ID "${rootElementId}" not found`);
    }
    this.rootElement = element;
  }

  public createGameUI(): UIElements {
    this.createHeading();
    const gameHelper = this.createGameHelper();
    const gameTimer = this.createTimer();
    const { 
      gameContainer, 
      moveUpButton, 
      moveDownButton, 
      moveLeftButton, 
      moveRightButton, 
      gameBoard 
    } = this.createGameContainer();
    
    const { 
      localGameButton, 
      botGameButton, 
      resetButton 
    } = this.createMenuControls();
    
    document.body.classList.add('visible');
    
    return {
      gameHelper,
      gameTimer,
      gameBoard,
      gameContainer,
      moveUpButton,
      moveDownButton,
      moveLeftButton,
      moveRightButton,
      localGameButton,
      botGameButton,
      resetButton
    };
  }

  private createHeading(): HTMLHeadingElement {
    const heading = document.createElement("h1");
    heading.textContent = "TicTacTwo with TypeScript by IMaeots";
    this.rootElement.appendChild(heading);
    return heading;
  }

  private createGameHelper(): HTMLParagraphElement {
    const gameHelper = document.createElement("p");
    gameHelper.id = "gameHelper";
    gameHelper.textContent = "X's Turn";
    gameHelper.style.display = 'none';
    this.rootElement.appendChild(gameHelper);
    return gameHelper;
  }

  private createTimer(): HTMLDivElement {
    const timerElement = document.createElement("div");
    timerElement.id = "gameTimer";
    timerElement.classList.add("game-timer");
    timerElement.textContent = "00:00";
    timerElement.style.display = 'none';
    this.rootElement.appendChild(timerElement);
    
    return timerElement;
  }

  private createGameContainer(): {
    gameContainer: HTMLDivElement;
    moveUpButton: HTMLButtonElement;
    moveDownButton: HTMLButtonElement;
    moveLeftButton: HTMLButtonElement;
    moveRightButton: HTMLButtonElement;
    gameBoard: HTMLDivElement;
  } {
    const gameContainer = document.createElement("div");
    gameContainer.className = "game-container";
    gameContainer.style.display = 'none';
    this.rootElement.appendChild(gameContainer);

    const moveUpButton = this.addDirectionButton(gameContainer, "moveUp", "↑");

    const middleLayer = document.createElement("div");
    middleLayer.className = "middle-layer";
    gameContainer.appendChild(middleLayer);

    const moveLeftButton = this.addDirectionButton(middleLayer, "moveLeft", "←");

    const gameBoard = document.createElement("div");
    gameBoard.id = "gameBoard";
    middleLayer.appendChild(gameBoard);

    const moveRightButton = this.addDirectionButton(middleLayer, "moveRight", "→");

    const moveDownButton = this.addDirectionButton(gameContainer, "moveDown", "↓");
    
    return { 
      gameContainer, 
      moveUpButton, 
      moveDownButton, 
      moveLeftButton, 
      moveRightButton,
      gameBoard 
    };
  }
  
  private addDirectionButton(
    parent: HTMLElement, 
    id: string, 
    symbol: string
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.id = id;
    button.className = "grid-control";
    button.textContent = symbol;
    button.disabled = true;
    parent.appendChild(button);
    return button;
  }

  private createMenuControls(): {
    localGameButton: HTMLButtonElement;
    botGameButton: HTMLButtonElement;
    resetButton: HTMLButtonElement;
  } {
    const menuControls = document.createElement("div");
    menuControls.className = "menu-controls";
    this.rootElement.appendChild(menuControls);
    
    // Add local game button
    const localGameButton = this.addMenuButton(menuControls, "localGame", "Local Two Player");
    
    // Add bot game button
    const botGameButton = this.addMenuButton(menuControls, "botGame", "VS Computer");
    
    // Add reset button (initially hidden)
    const resetButton = this.addMenuButton(menuControls, "reset", "Reset Game");
    resetButton.style.display = 'none';
    
    return { localGameButton, botGameButton, resetButton };
  }
  
  private addMenuButton(
    parent: HTMLElement, 
    id: string, 
    text: string
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.id = id;
    button.className = "menu-button";
    button.textContent = text;
    parent.appendChild(button);
    return button;
  }
}
