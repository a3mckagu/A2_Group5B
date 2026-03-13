## Project Title

Assignment 2 - Mid-term Game: Potionary, A Crafting Puzzle Game

---

## Group Number

5B

---

## Description

> Overview: Potionary is a challenging potion-crafting puzzle game where players match coloured vials and symbols to fulfill recipe orders. In the tutorial level (level one), players must manage 5 potion vials (from a shelf of 12 vials). Constraints, including "customer patience" time limit, recipe book managemnet, and symbol interpretation, challenge players' management skills.

> The player sees an alchemist's work rooom (laboratory) with shelves of colourful bottles, a large cauldron, and an order sheet hidden behind a HUD envolop that lists the recipe requirements. Within the environment, the player is immersed in a multi-sensory experience with visuals, text, and medieval-inspired music.
> Players drag vials from the shelf to the cauldron, matching context clues to the recipe specification. Visual feedback includes glowing cauldron effects to indicate drag features and colour liquid pouring animations that guide the player through an immersive potion-crafting process.
> Potionary explores how visual feedback can communicate accessibility states to both novice and expert players. In particular exploring dyslexia and nudging users to develop empathy in a frustrating but entertaining game.
> Each level follows the core loop of the game: dragging objects into a cauldron and viewing their correctness after dragging the crystal last into the cauldron.
> The design is inspired by the artistic, hand-drawn, medieval art style of Potion Craft Alchemist Simulator (2022) alongside tactile, "pouring" user actions from the viral mobile game Water Sort Puzzle (2020). Player feedback from widely known crafting, puzzle games include the poor management of difficulty (low complexity in level 1 and impossible by final level), low focus on potion crafting mechanics and feedback (focus on sci-fi storylines). We identified 5 points to build on:

1.  Deliver high-value to users through puzel focus (simplify user inteactions and maintain focus on concept of management and decoding recepies).
2.  Stylized Art that Evokes Nostalgia and Appeals to a Wide Young Base: Inspired by art from Victorian-era floral motifs, medieval colour palettes, and adventure genre maps.
3.  Creative focus on symbolism: Strong employment of symbols to communicate recipe ideas to challenge player memory, management, and decoding.

---

## Setup and Interaction Instructions

> How to Start: Players open the game in a web browser and click "New Game" on the start screen to begin. They then proceed to level one via clicking on the map.
> Controls: Left click and drag vials from the shelf to the cauldron. Left click the recipe book to view potion instructions. Left click the order envelope to confirm completed potions.
> Visual Feedback: The cauldron glows when a user "picks up" a vial or crystal, indicating the drop zone. Incorrectly matched vials provide visual feedback once the user runs out of time or completes the incorrect order (fail state / win state).
> Audio Experience: Medieval-themed background music evokes escapism, intrigue, and pressure, playing on an infinite loop during gameplay.

---

## Interaction Notes

> At level one, players must open one customer order, reference their recipe book, then sequence multiple vials and a crystal in the correct order to achieve a win state. The recipe requires 5 potion bottles to be correctly added to the cauldron from a shelf containing 12 similar vials. Matching the symbols creates higher cognitive load.
> There is rapid visual feedback with image hover states to smoothly onboard new players.

---

## Post-Playtest

Three changes made based on playtesting:

1. Evoke Frustration & Increase Complexity of Level One: Improve game theme of dyslexia via promoting immediate frustration and reading challenges. Specific action items include: increasing the number of vials on the shelf from 5 to 12; utilizing a cursive, script font that is difficult to decode; and potentially adding a time limit to mirror real-life, time-dependent circumstances.
2. Strengthen Symbolism & Player Management Mechanics: Create Distinct In-Game Views: Rather than relying on one alchemist labratory background for the entirety of level one, opt for an additional background (specifically a wooden table). This will increase effectiveness of the user management mechanic (recipe screen vs potion crafting screen). Additionally, remove colours from vial symbols and increase similarities to increase frustration and player's need to decode information contextually.
3. Implement Clearer User Feedback Systems: Add hover states to all objects to increase tactility and intuitive interactions. Specifically, elevate potion bottles when hovered upon and add a subtle glow to the cauldron's top to indicate direct "dropping" zone. Additionally, account for multiple user preferences (dragging and click interactions both allowed for moving objects into the cauldron).

---

## Post-Showcase

Two planned improvements include:

> Reducing the Complexity of Level One Recipe: Aim to include only 3 vials to contain cognitive load and frustration experienced by beginners.
> Enhance Interactivity of the Audio-Visual Experience: Add more visual feedback such as several cursor states when the player drags objects and hovers over HUD elements. Furthurmore, adding sound effects for subtle interactions, including picking up glasses and pouring liquids, along with music that increases in intensity as the level time limit approaches the end.

---

## Assets

> - `assets/audio/medieval-music.mp3` (Tunetank 2025)
> - `assets/background/blue-lvl.png` (original artwork)
> - `assets/background/level-menu.png` (original artwork)
> - `assets/background/map-icons-default.png` (original artwork)
> - `assets/background/map-icons-hover.png` (original artwork)
> - `assets/background/map-icon_1.svg` (original artwork)
> - `assets/background/map-icon_2.svg` (original artwork)
> - `assets/background/map-icon_3.svg` (original artwork)
> - `assets/background/map-icon_4.svg` (original artwork)
> - `assets/background/recipe-book.png` (original artwork)
> - `assets/background/start-screen.png` (original artwork)
> - `assets/brand/potionary-logo-detail.svg` (original artwork)
> - `assets/brand/potionary-logo.png` (original artwork)
> - `assets/brand/potionary-logo.svg` (original artwork)
> - `assets/cauldron/cauldron-default-state.png` (original artwork)
> - `assets/cauldron/cauldron-glow-state.png` (original artwork)
> - `assets/crystal/brown-bowl.png` (original artwork)
> - `assets/crystal/crystal-v2.png` (original artwork)
> - `assets/crystal/crystal-v2.svg` (original artwork)
> - `assets/order/blank-order-sheet-2.png` (original artwork)
> - `assets/order/envelope.png` (original artwork)
> - `assets/sound/bubbles_pour.mp3` (original artwork)
> - `assets/sound/medieval-music.mp3` (original artwork)
> - `assets/symbols/blue-symbol.svg` (original artwork)
> - `assets/symbols/green-symbol.svg` (original artwork)
> - `assets/symbols/orange-symbol.svg` (original artwork)
> - `assets/symbols/symbol-black.svg` (original artwork)
> - `assets/symbols/symbol-lightgreen.svg` (original artwork)
> - `assets/symbols/symbol-lightpurple.svg` (original artwork)
> - `assets/symbols/symbol-midblue.svg` (original artwork)
> - `assets/symbols/symbol-red.svg` (original artwork)
> - `assets/vials/closed-black.svg` (original artwork)
> - `assets/vials/closed-darkgreen.svg` (original artwork)
> - `assets/vials/closed-darkpurple.svg` (original artwork)
> - `assets/vials/closed-lightblue.svg` (original artwork)
> - `assets/vials/closed-lightgreen.svg` (original artwork)
> - `assets/vials/closed-lightorange.svg` (original artwork)
> - `assets/vials/closed-lightpink.svg` (original artwork)
> - `assets/vials/closed-lightpurple.svg` (original artwork)
> - `assets/vials/closed-lightred.svg` (original artwork)
> - `assets/vials/closed-midblue.svg` (original artwork)
> - `assets/vials/closed-teal.svg` (original artwork)
> - `assets/vials/closed-yellow.svg` (original artwork)
> - `assets/vials/open-black.svg` (original artwork)
> - `assets/vials/open-darkgreen.svg` (original artwork)
> - `assets/vials/open-darkpurple.svg` (original artwork)
> - `assets/vials/open-lightblue.svg` (original artwork)
> - `assets/vials/open-lightgreen.svg` (original artwork)
> - `assets/vials/open-lightpink.svg` (original artwork)
> - `assets/vials/open-lightpurple.svg` (original artwork)
> - `assets/vials/open-lightred.svg` (original artwork)
> - `assets/vials/open-midblue.svg` (original artwork)
> - `assets/vials/open-orange.svg` (original artwork)
> - `assets/vials/open-teal.svg` (original artwork)
> - `assets/vials/open-yellow.svg` (original artwork)

---

## References

Alchemist Simulator. 2020. Steam Store. https://store.steampowered.com/app/1105040/Alchemist_Simulator/
Potion Craft Game Review. 2023. Immortal Wordsmith. https://www.immortalwordsmith.co.uk/potion-craft-game-review/
Potion Craft: Alchemist Simulator. 2022. Video game published by tinyBuild. https://store.steampowered.com/app/1210320/Potion_Craft_Alchemist_Simulator/
Potion Punch 2+. 2022. Monstronauts. https://www.monstronauts.com/all-stories/potion-punch-2-plus-apple-arcade/
Potionomics. 2022. Steam Store. https://store.steampowered.com/app/1874490/Potionomics/
Stardew Valley. 2016. Steam Store. https://store.steampowered.com/app/413150/Stardew_Valley/
Strange Horticulture. 2022. Steam Store. https://store.steampowered.com/app/1574580/
Stardew Valley 2024 Review. 2024. The Nocturnal Rambler Blog. https://thenocturnalrambler.blogspot.com/2024/06/stardew-valley-2024-review.htmlStrange_Horticulture/
Tunetank. 2025. Medieval Happy Music. Pixabay. Retrieved March 12, 2026 from https://pixabay.com/music/adventure-medieval-happy-music-412790/
Water Sort Puzzle. 2020. Mobile puzzle game listing on Apple App Store. https://apps.apple.com/us/app/magic-potion-sort-puzzle/id6755454821

---
