# TicTacTwo - TypeScript Edition

A creative twist on the classic Tic-Tac-Toe game implemented with TypeScript, HTML, and CSS.
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
- **TypeScript Benefits**:
  - Type safety and better code organization
  - Interfaces for clear component communication
  - Enhanced development experience with IntelliSense

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- Any modern web browser (Chrome (preferred), Firefox, Safari, Edge)

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd TicTacTwoTS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

### Building for Production

```bash
npm run build
```

The compiled files will be available in the `dist` directory.

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
- `src/` - Source code:
  - `main.ts` - Application entry point
  - `styles/` - CSS styling
  - `domain/` - Core game logic:
    - `models/` - Data structures and interfaces
    - `controllers/` - Game control logic
    - `utils/` - Helper utilities like UI and AI
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration

## 🧩 Game Logic

The game uses a strongly-typed modular architecture:

- **GameState**: Tracks board state, current player, and win conditions
- **GameController**: Handles user interactions and game flow
- **UIBuilder**: Creates and manages the game interface
- **AIHelper**: Implements the computer opponent's moves
- **Interfaces**: Defines TypeScript interfaces for all components

## 🛠️ Development

This project uses:
- TypeScript for type-safe JavaScript
- Vite for fast development and optimized builds
- ES modules for code organization

## 📝 License

All Rights Reserved

## Author

Name: Indrek Mäeots
School email: inmaeo@taltech.ee
