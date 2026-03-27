# Rock Paper Scissors Arena

An epic, interactive Rock Paper Scissors battle arena built with HTML, CSS, and JavaScript. Experience competitive gameplay with timers, round-based matches, and dramatic battle animations!

## 🎮 Game Features

- **Two Game Modes**: Battle against the computer or challenge another player
- **Round-Based Gameplay**: Best-of-3 tournament style matches
- **Time Pressure**: 10-second timer for each choice adds excitement
- **Arena Atmosphere**: Dark, dramatic design with glowing effects and animations
- **Visual Battle Arena**: See choices clash in the center battle zone
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Smooth Animations**: Gradient text, pulsing effects, and victory celebrations

## 🎯 How to Play

### **Mode Selection**
1. Choose **VS Computer** for single-player mode
2. Choose **VS Player** for local multiplayer (hot-seat style)

### **Gameplay**
- **VS Computer**: You have 10 seconds to choose Rock 🪨, Paper 📄, or Scissors ✂️
- **VS Player**: Players alternate turns with 10-second timers each
- **Round System**: First to win the majority of rounds wins the match
- **Timer Pressure**: Make quick decisions or lose your turn!

### **Battle Flow**
1. **Round Start**: Timer begins, players get ready
2. **Choice Phase**: Select your weapon before time runs out
3. **Battle Resolution**: Choices appear in the arena with winner highlights
4. **Score Update**: Points awarded to the round winner
5. **Next Round**: Continue until tournament completion

### **Winning Conditions**
- **Rock** beats Scissors
- **Paper** beats Rock
- **Scissors** beats Paper
- **Same choice** = Tie (no points awarded)
- **First to win** majority of rounds wins the tournament

## 🎨 Visual Effects

- **Gradient animated title** with shifting colors
- **Glowing player panels** when ready/thinking
- **Pulsing VS indicator** in the center
- **Battle arena** with circular design and backdrop blur
- **Winner highlights** with golden glow effects
- **Victory screen** with bouncing animation
- **Timer bar** that changes color when time is low

## 🛠️ Technical Features

- **Modern CSS**: Backdrop filters, gradients, animations
- **Responsive Layout**: Flexbox and grid systems
- **State Management**: Complex game state handling
- **Timer System**: Real-time countdown with visual feedback
- **Event Handling**: Dynamic button states and interactions
- **Animation System**: CSS keyframes and JavaScript-controlled effects

## 🚀 Running the Game

1. **Local Server**: Run `python3 -m http.server 8000`
2. **Open Browser**: Navigate to `http://localhost:8000`
3. **Choose Mode**: Select VS Computer or VS Player
4. **Battle!**: Make choices quickly and strategically

## 📱 Mobile Support

Fully responsive design adapts to:
- **Desktop**: Full arena layout with side-by-side players
- **Tablet**: Optimized spacing and button sizes
- **Mobile**: Stacked layout with touch-friendly controls

## 🎪 Game States

- **Mode Selection**: Choose game type
- **Round Active**: Timer running, players choosing
- **Round Resolution**: Showing battle results
- **Tournament Complete**: Victory screen with final scores
- **Ready to Restart**: Play again option

## 🏗️ Architecture

- **HTML**: Semantic structure with arena-themed elements
- **CSS**: Modular styles with arena atmosphere
- **JavaScript**: State management, timer logic, and battle resolution

Experience the thrill of competitive Rock Paper Scissors in this modern arena-style game!