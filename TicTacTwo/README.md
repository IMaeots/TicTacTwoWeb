# TicTacTwo - Vanilla JavaScript

A creative twist on the classic Tic-Tac-Toe game implemented with pure vanilla JavaScript, HTML, and CSS.
1 out of 7 TicTacTwos written for uni 2024-2025.

## 🎮 Game Description

TicTacTwo is an advanced version of Tic-Tac-Toe with a unique twist: the game is played on a 5×5 grid, but only a 3×3 section is active at any time. After the first few moves, players can either place new markers or move their existing ones, and even shift the active playing area!

### Features

- **Two Game Modes**:
  - Play against a friend locally
  - Play against the AI
- **Dynamic Gameplay**:
  - Place markers in the first phase
  - Move your markers or the grid in the second phase
- **Time Tracking**: Track the duration of your games
- **Responsive Design**: Play on any device

## 🚀 Getting Started

### Prerequisites

- Any modern web browser (Chrome (preferred), Firefox, Safari, Edge)

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd TicTacTwo
   ```

2. Simply open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Windows
   start index.html
   
   # On Linux
   xdg-open index.html
   ```

Alternatively, you can use any local development server.

## 🎯 How to Play

1. **Start a Game**:
   - Choose "Play Local Game" to play against a friend
   - Choose "Play Against AI" to play against the computer

2. **First Phase (First 4 Moves)**:
   - Players take turns placing their markers (X or O) in the available cells

3. **Second Phase (After 4 Moves)**:
   - Players can either:
     - Place a new marker in an empty cell
     - Select one of their existing markers and move it to an empty cell
     - Use the directional controls to shift the active 3×3 grid

4. **Winning**:
   - Create a line of three of your markers horizontally, vertically, or diagonally
   - If both players create a winning line simultaneously, the game ends in a draw

5. **Reset**:
   - Click the reset button anytime to start a new game

## 🏗️ Project Structure

- `index.html` - Main HTML file
- `styles/main.css` - CSS styling
- `js/` - JavaScript modules:
  - `main.js` - Main entry point and game initialization
  - `gameState.js` - Game state management
  - `gameController.js` - Game logic and interactions
  - `uiBuilder.js` - UI creation and management
  - `aiHelper.js` - AI opponent logic

## 🧩 Game Logic

The game uses a modular architecture:

- **GameState**: Tracks board state, current player, and win conditions
- **GameController**: Handles user interactions and game flow
- **UIBuilder**: Creates and manages the game interface
- **AIHelper**: Implements the computer opponent's moves

## 🛠️ Development

This project uses vanilla JavaScript with ES6 modules. No build process or external dependencies are required.

## 📝 License

All Rights Reserved

## Author

Name: Indrek Mäeots
School email: inmaeo@taltech.ee
