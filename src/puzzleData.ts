// Puzzle data for Emoji Groups Daily
// Each puzzle has 4 groups of 4 emojis sharing a hidden category.
// Difficulty: easy (most obvious), medium, hard, tricky (most deceptive).

import { Puzzle } from './types';

export const PUZZLES: Puzzle[] = [
  {
    id: 1,
    date: '2024-01-01',
    title: 'Fangs, Keys & Skies',
    groups: [
      {
        id: '1-1',
        category: 'Vampire Lore',
        difficulty: 'easy',
        emojis: ['🧛', '🦇', '🧄', '🩸'],
        explanation: 'Things associated with vampires: vampire, bat, garlic (repels them), blood.',
      },
      {
        id: '1-2',
        category: 'Pizza Toppings',
        difficulty: 'medium',
        emojis: ['🍄', '🧀', '🌶️', '🍍'],
        explanation: 'Classic pizza toppings: mushroom, cheese, chilli pepper, pineapple.',
      },
      {
        id: '1-3',
        category: 'Weather Events',
        difficulty: 'hard',
        emojis: ['🌧️', '❄️', '🌪️', '☀️'],
        explanation: 'Types of weather: rain, snow, tornado, sunshine.',
      },
      {
        id: '1-4',
        category: 'Things With Keys',
        difficulty: 'tricky',
        emojis: ['🎹', '🗝️', '⌨️', '🏨'],
        explanation: 'All have keys: piano, old key, keyboard, hotel (room keys).',
      },
    ],
  },
  {
    id: 2,
    date: '2024-01-02',
    title: 'Ocean, Fire & Fables',
    groups: [
      {
        id: '2-1',
        category: 'Sea Creatures',
        difficulty: 'easy',
        emojis: ['🦈', '🐙', '🦑', '🐠'],
        explanation: 'Creatures of the sea: shark, octopus, squid, tropical fish.',
      },
      {
        id: '2-2',
        category: 'Things That Are Hot',
        difficulty: 'medium',
        emojis: ['🌋', '🌶️', '🔥', '☀️'],
        explanation: 'Things associated with heat: volcano, chilli, fire, sun.',
      },
      {
        id: '2-3',
        category: 'Fairy Tale Characters',
        difficulty: 'hard',
        emojis: ['🧚', '🐉', '🧙', '🤴'],
        explanation: 'Classic fairy tale figures: fairy, dragon, wizard, prince.',
      },
      {
        id: '2-4',
        category: '___ Ball',
        difficulty: 'tricky',
        emojis: ['🎱', '🪩', '⚽', '🏀'],
        explanation: 'They\'re all kinds of balls: 8-ball, disco ball, soccer ball, basketball.',
      },
    ],
  },
  {
    id: 3,
    date: '2024-01-03',
    title: 'Jungle, Space & Sweets',
    groups: [
      {
        id: '3-1',
        category: 'Jungle Animals',
        difficulty: 'easy',
        emojis: ['🦁', '🐒', '🐍', '🦜'],
        explanation: 'Animals found in the jungle: lion, monkey, snake, parrot.',
      },
      {
        id: '3-2',
        category: 'Sweet Treats',
        difficulty: 'medium',
        emojis: ['🍰', '🍭', '🧁', '🍫'],
        explanation: 'Sugary delights: cake, lollipop, cupcake, chocolate.',
      },
      {
        id: '3-3',
        category: 'Space Things',
        difficulty: 'hard',
        emojis: ['🚀', '🌙', '⭐', '🛸'],
        explanation: 'Things found in or related to space: rocket, moon, star, UFO.',
      },
      {
        id: '3-4',
        category: 'Things You Wear on Your Head',
        difficulty: 'tricky',
        emojis: ['👑', '🎩', '⛑️', '🪖'],
        explanation: 'Headwear: crown, top hat, rescue helmet, military helmet.',
      },
    ],
  },
  {
    id: 4,
    date: '2024-01-04',
    title: 'Myths, Music & Machines',
    groups: [
      {
        id: '4-1',
        category: 'Greek Mythology Creatures',
        difficulty: 'easy',
        emojis: ['🦄', '🐉', '🦅', '🐂'],
        explanation: 'Mythological creatures: unicorn, dragon, eagle (of Zeus), bull (Minotaur).',
      },
      {
        id: '4-2',
        category: 'Musical Instruments',
        difficulty: 'medium',
        emojis: ['🎸', '🥁', '🎺', '🎻'],
        explanation: 'Instruments: guitar, drums, trumpet, violin.',
      },
      {
        id: '4-3',
        category: 'Things With Batteries',
        difficulty: 'hard',
        emojis: ['🔦', '📱', '🎮', '⌚'],
        explanation: 'Battery-powered devices: flashlight, phone, game controller, watch.',
      },
      {
        id: '4-4',
        category: 'Types of Clouds',
        difficulty: 'tricky',
        emojis: ['☁️', '⛅', '🌧️', '🌩️'],
        explanation: 'Cloud types or cloud weather: cloud, partly cloudy, rain cloud, storm cloud.',
      },
    ],
  },
  {
    id: 5,
    date: '2024-01-05',
    title: 'Farm, Flight & Feelings',
    groups: [
      {
        id: '5-1',
        category: 'Farm Animals',
        difficulty: 'easy',
        emojis: ['🐄', '🐖', '🐔', '🐑'],
        explanation: 'Common farm animals: cow, pig, chicken, sheep.',
      },
      {
        id: '5-2',
        category: 'Things That Fly',
        difficulty: 'medium',
        emojis: ['🦋', '✈️', '🎈', '🦅'],
        explanation: 'Things that take flight: butterfly, airplane, balloon, eagle.',
      },
      {
        id: '5-3',
        category: 'Feelings / Emotions',
        difficulty: 'hard',
        emojis: ['😡', '😢', '😱', '🤩'],
        explanation: 'Emotional states: anger, sadness, fear, excitement.',
      },
      {
        id: '5-4',
        category: 'Things in a Kitchen',
        difficulty: 'tricky',
        emojis: ['🔪', '🫕', '🧂', '🥄'],
        explanation: 'Kitchen items: knife, pot, salt shaker, spoon.',
      },
    ],
  },
  {
    id: 6,
    date: '2024-01-06',
    title: 'Sports, Bugs & Legends',
    groups: [
      {
        id: '6-1',
        category: 'Olympic Sports',
        difficulty: 'easy',
        emojis: ['🏊', '🤸', '🏋️', '🤼'],
        explanation: 'Olympic sports: swimming, gymnastics, weightlifting, wrestling.',
      },
      {
        id: '6-2',
        category: 'Insects',
        difficulty: 'medium',
        emojis: ['🐝', '🦋', '🪲', '🦗'],
        explanation: 'Insects: bee, butterfly, beetle, cricket.',
      },
      {
        id: '6-3',
        category: 'Legendary Creatures',
        difficulty: 'hard',
        emojis: ['🧟', '🧜', '🧞', '🧝'],
        explanation: 'Fantasy beings: zombie, mermaid, genie, elf.',
      },
      {
        id: '6-4',
        category: 'Things That Are Red',
        difficulty: 'tricky',
        emojis: ['🍎', '🌹', '🛑', '♥️'],
        explanation: 'All naturally/commonly red: apple, rose, stop sign, heart.',
      },
    ],
  },
  {
    id: 7,
    date: '2024-01-07',
    title: 'Night, Nature & Nostalgia',
    groups: [
      {
        id: '7-1',
        category: 'Night Sky',
        difficulty: 'easy',
        emojis: ['🌙', '⭐', '🌟', '🌠'],
        explanation: 'Things in the night sky: crescent moon, star, glowing star, shooting star.',
      },
      {
        id: '7-2',
        category: 'Types of Trees',
        difficulty: 'medium',
        emojis: ['🌴', '🌲', '🌳', '🎋'],
        explanation: 'Trees: palm, pine/evergreen, deciduous tree, bamboo.',
      },
      {
        id: '7-3',
        category: '90s Nostalgia',
        difficulty: 'hard',
        emojis: ['📼', '🕹️', '📟', '💾'],
        explanation: '90s tech icons: VHS tape, game joystick, pager, floppy disk.',
      },
      {
        id: '7-4',
        category: 'Things That Come in Pairs',
        difficulty: 'tricky',
        emojis: ['👟', '🧤', '👂', '👀'],
        explanation: 'Body parts or items that come in pairs: sneakers, gloves, ears, eyes.',
      },
    ],
  },
  {
    id: 8,
    date: '2024-01-08',
    title: 'Food, Flags & Feelings',
    groups: [
      {
        id: '8-1',
        category: 'Breakfast Foods',
        difficulty: 'easy',
        emojis: ['🥞', '🍳', '🥐', '🧇'],
        explanation: 'Breakfast staples: pancakes, fried egg, croissant, waffle.',
      },
      {
        id: '8-2',
        category: 'Tools',
        difficulty: 'medium',
        emojis: ['🔨', '🪛', '🔧', '⛏️'],
        explanation: 'Hand tools: hammer, screwdriver, wrench, pickaxe.',
      },
      {
        id: '8-3',
        category: 'Things in a Garden',
        difficulty: 'hard',
        emojis: ['🌷', '🐛', '🪴', '🌱'],
        explanation: 'Garden items: tulip, caterpillar, potted plant, seedling.',
      },
      {
        id: '8-4',
        category: 'Can Follow "Sun"',
        difficulty: 'tricky',
        emojis: ['🌻', '🕶️', '🔆', '🏄'],
        explanation: 'Sunflower, sunglasses, sunlight, surfing (sunbathing culture).',
      },
    ],
  },
  {
    id: 9,
    date: '2024-01-09',
    title: 'Spooky, Science & Snacks',
    groups: [
      {
        id: '9-1',
        category: 'Halloween Icons',
        difficulty: 'easy',
        emojis: ['🎃', '👻', '🕷️', '⚰️'],
        explanation: 'Halloween symbols: jack-o-lantern, ghost, spider, coffin.',
      },
      {
        id: '9-2',
        category: 'Salty Snacks',
        difficulty: 'medium',
        emojis: ['🍟', '🥨', '🍿', '🥜'],
        explanation: 'Salty snack foods: fries, pretzel, popcorn, peanuts.',
      },
      {
        id: '9-3',
        category: 'Science Lab Items',
        difficulty: 'hard',
        emojis: ['🔬', '⚗️', '🧪', '🧫'],
        explanation: 'Lab equipment: microscope, alembic, test tube, petri dish.',
      },
      {
        id: '9-4',
        category: 'Things That Spin',
        difficulty: 'tricky',
        emojis: ['🌀', '🎡', '💿', '🌪️'],
        explanation: 'Things that rotate or spin: spiral/cyclone, ferris wheel, CD, tornado.',
      },
    ],
  },
  {
    id: 10,
    date: '2024-01-10',
    title: 'Time, Travel & Tales',
    groups: [
      {
        id: '10-1',
        category: 'Ways to Travel',
        difficulty: 'easy',
        emojis: ['🚂', '✈️', '⛵', '🚗'],
        explanation: 'Modes of transport: train, plane, sailboat, car.',
      },
      {
        id: '10-2',
        category: 'Things in a Library',
        difficulty: 'medium',
        emojis: ['📚', '🔖', '📖', '🗂️'],
        explanation: 'Library items: stack of books, bookmark, open book, file organizer.',
      },
      {
        id: '10-3',
        category: 'Telling Time',
        difficulty: 'hard',
        emojis: ['⌚', '⏰', '⌛', '🕰️'],
        explanation: 'Time-telling devices: wristwatch, alarm clock, hourglass, grandfather clock.',
      },
      {
        id: '10-4',
        category: 'Things That Go "Boom"',
        difficulty: 'tricky',
        emojis: ['💥', '🎆', '🧨', '🪄'],
        explanation: 'Things that explode or make a big impact: explosion, fireworks, firecracker, magic wand.',
      },
    ],
  },
  {
    id: 11,
    date: '2024-01-11',
    title: 'Animals, Arts & Arcana',
    groups: [
      {
        id: '11-1',
        category: 'Cats & Big Cats',
        difficulty: 'easy',
        emojis: ['🐯', '🐆', '🐈', '🐈‍⬛'],
        explanation: 'Feline family: tiger, leopard, house cat, black cat.',
      },
      {
        id: '11-2',
        category: 'Art Supplies',
        difficulty: 'medium',
        emojis: ['🖌️', '✏️', '📐', '🎨'],
        explanation: 'Art tools: paintbrush, pencil, set square, palette.',
      },
      {
        id: '11-3',
        category: 'Tarot / Mystical Symbols',
        difficulty: 'hard',
        emojis: ['🔮', '🌙', '⭐', '🃏'],
        explanation: 'Mystical symbols: crystal ball, moon, star, wild card (the fool).',
      },
      {
        id: '11-4',
        category: 'Things at a Circus',
        difficulty: 'tricky',
        emojis: ['🤹', '🎪', '🎠', '🦁'],
        explanation: 'Circus elements: juggler, big top tent, carousel, lion (taming act).',
      },
    ],
  },
  {
    id: 12,
    date: '2024-01-12',
    title: 'Cold, Coins & Culture',
    groups: [
      {
        id: '12-1',
        category: 'Winter Things',
        difficulty: 'easy',
        emojis: ['⛄', '🧣', '⛷️', '❄️'],
        explanation: 'Winter icons: snowman, scarf, skier, snowflake.',
      },
      {
        id: '12-2',
        category: 'Money & Wealth',
        difficulty: 'medium',
        emojis: ['💰', '💳', '🏦', '💎'],
        explanation: 'Money-related: money bag, credit card, bank, diamond.',
      },
      {
        id: '12-3',
        category: 'Japanese Culture',
        difficulty: 'hard',
        emojis: ['⛩️', '🍣', '🎎', '🗻'],
        explanation: 'Japanese icons: torii gate, sushi, kokeshi doll, Mt. Fuji.',
      },
      {
        id: '12-4',
        category: 'Can Follow "Ice"',
        difficulty: 'tricky',
        emojis: ['🍦', '⛸️', '🏒', '🧊'],
        explanation: 'Ice + cream, ice skating, ice hockey, ice cube.',
      },
    ],
  },
];

/**
 * Returns today's puzzle based on the current date.
 * Uses the day-of-year to cycle through available puzzles.
 */
export function getDailyPuzzle(): Puzzle {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / oneDay);
  const index = dayOfYear % PUZZLES.length;
  return PUZZLES[index];
}

/**
 * Returns a random practice puzzle (may differ from today's daily puzzle).
 */
export function getRandomPuzzle(excludePuzzleId?: number): Puzzle {
  const availablePuzzles = PUZZLES.filter((puzzle) => puzzle.id !== excludePuzzleId);
  const source = availablePuzzles.length > 0 ? availablePuzzles : PUZZLES;
  const index = Math.floor(Math.random() * source.length);
  return source[index];
}
