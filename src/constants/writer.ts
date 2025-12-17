import { Character, Panel, Tab } from "@/types";

// Demo Characters Data
export const DEMO_CHARACTERS: Character[] = [
  {
    id: "leaf-guy",
    name: "Leaf Guy",
    gender: "Plant-Human",
    age: 52,
    description:
      "He is a plant that woke up as a human and has been battling Dr. Strombizoid for eons.",
    avatar: "/assets/Images/Characters/Mechanical Guy.png",
  },
  {
    id: "mechanical-guy",
    name: "Mechanical Guy",
    gender: "Cyborg",
    age: 999,
    description:
      "He is a cyborg from planet Borgranarden. He watches over life.",
    avatar: "/assets/Images/Characters/Evil Guy.png",
  },
  {
    id: "evil-guy",
    name: "Evil Guy",
    gender: "Alien",
    age: 86,
    description:
      "From planet Evil Fart. He is set to turn the planets to gas giants to feed his ego-maniacal dream of ruling gas.",
    avatar: "/assets/Images/Characters/Leaf Guy.png",
  },
];

// Demo Panels Data
export const DEMO_PANELS: Panel[] = [
  {
    id: "panel-1",
    number: 1,
    description:
      "A bright sunny day. The Brooklyn Bridge is cracking down the middle. Cars are bumper to bumper. The people inside are terrified.",
    characters: [
      {
        characterId: "leaf-guy",
        characterName: "Leaf Guy",
        action:
          "(Leaf Guy emerges from the forest, vines swirling around him. He's ready to protect nature from the evil forces.)",
        dialogue: "The forest calls, and I answer!",
      },
      {
        characterId: "mechanical-guy",
        characterName: "Mechanical Guy",
        action:
          "(Mechanical Guy activates his tech suit, gears whirring and lights blinking as he prepares for action)",
        dialogue: "",
      },
    ],
  },
  {
    id: "panel-2",
    number: 2,
    description:
      "A bright shining moon over a dusty field. Twilight where we see both the rising moon and setting sun.",
    characters: [],
  },
  {
    id: "panel-3",
    number: 3,
    description:
      "A dark lair overlooking the city. Evil Guy watches the chaos unfold from his control room filled with monitors.",
    characters: [
      {
        characterId: "evil-guy",
        characterName: "Evil Guy",
        action:
          "(Evil Guy laughs maniacally, stroking his chin as he watches the heroes struggle on his monitors.)",
        dialogue: "Excellent! Let's see how they handle my next surprise!",
      },
    ],
  },
];

// Initial Tab Configuration
export const INITIAL_TABS: Tab[] = [
  {
    id: "tab1",
    title: "Brooklyn Fun",
    type: "standalone",
    comicId: "brooklyn-fun",
    isActive: true,
  },
];

// Default Writer Settings
export const DEFAULT_WRITER_SETTINGS = {
  ACTIVE_TAB_ID: "tab1",
  CURRENT_PAGE: 1,
  TOTAL_PAGES: 8,
  CREDITS: 100,
  FONT_SIZE: "1.1rem",
  SHOW_ILLUSTRATED_COMIC_BOOK: false,
  COMIC_BOOK_WIDTH: 400,
};

// Character Sidebar Width
export const CHARACTER_SIDEBAR_WIDTH = 76;

// Comic Book Width Constraints
export const COMIC_BOOK_CONSTRAINTS = {
  MIN_WIDTH: 300,
  MAX_WIDTH: 800,
  DEFAULT_WIDTH: 400,
} as const;
