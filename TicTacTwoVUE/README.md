# TicTacTwo - Vue Edition

A creative twist on the classic Tic-Tac-Toe game implemented with Vue 3, TypeScript, and CSS.
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
- **Vue.js Benefits**:
  - Component-based architecture
  - Reactive state management with Pinia
  - Vue Router for navigation between views
  - TypeScript integration for type safety

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn
- Any modern web browser (Chrome (preferred), Firefox, Safari, Edge)

### Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd TicTacTwoVUE
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

- `src/` - Source code:
  - `main.ts` - Application entry point
  - `App.vue` - Root Vue component
  - `assets/` - Static assets and styles
  - `components/` - Reusable Vue components
  - `views/` - Page components for different routes
  - `domain/` - Game logic:
    - `models/` - Data structures and interfaces
    - `stores/` - Pinia stores for state management
    - `utils/` - Helper utilities
  - `router/` - Vue Router configuration
- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration

## 🧩 Architecture

This project uses a modern Vue.js architecture:

- **Vue 3 Composition API**: For flexible, reusable component logic
- **TypeScript**: For type safety across the application
- **Pinia**: For centralized state management
- **Vue Router**: For navigation between game views
- **Component-Based Design**: With clear separation of concerns

## 🛠️ Development

This project uses:
- Vue 3 for reactive UI components
- TypeScript for type safety
- Vite for fast development and optimized builds
- Pinia for state management
- Vue Router for navigation

## 📝 License

All Rights Reserved

## Author

Name: Indrek Mäeots
School email: inmaeo@taltech.ee
