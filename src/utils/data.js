// const base_url = 'https://stardewvalleywiki.com/mediawiki/images'

let data = {
  villagers: ["Abigail", "Alex", "Caroline", "Clint", "Demetrius", "Dwarf", 'Elliott', 'Emily', 'Evelyn', 'George', 'Gus', 'Haley', 'Harvey', 'Jas', 'Jodi', 'Kent', 'Krobus', 'Leah', 'Leo', 'Lewis', 'Linus', 'Marnie', 'Maru', 'Pam', 'Penny', 'Pierre', 'Robin', 'Sam', 'Sandy', 'Sebastian', 'Shane', 'Vincent', 'Willy', 'Wizard'],
  portraits: [],
  icons: [],
  marriageable: ['Abigail', 'Alex', 'Elliott', 'Emily', 'Haley', 'Harvey', 'Leah', 'Maru', 'Penny', 'Sam', 'Sebastian', 'Shane'],
  event_multipliers: {normal: 1, winter_star: 5, birthday: 8},
  preference_base: {loves: 80, likes: 45, neutral: 20, dislikes: -20, hates: -40},
  quality_multipliers: {normal: 1, silver: 1.1, gold: 1.25, iridium: 1.5},
  seasons: ['spring', 'summer', 'fall', 'winter'],
  gift_types: ['artisan_goods', 'gems', 'geode_minerals', 'geodes', 'foraged_minerals', 'flowers', 'cooking', 'fruit_tree_fruit', 'fruit_tree_fruit_special', 'veggies', 'misc', 'crafting', 'building_materials', 'artifacts', 'bombs', 'crafted_floors_paths', 'fences', 'sprinklers', 'mushrooms', 'eggs', 'milk', 'monster_loot', 'fruit'],
  artisan_goods: ['honey', 'wine', 'pale ale', 'beer', 'mead', 'cheese', 'goat cheese', 'coffee', 'green tea', 'juice', 'cloth', 'mayonnaise', 'duck mayonnaise', 'void mayonnaise', 'dinosaur mayonnaise', 'truffle oil', 'oil', 'pickles', 'jelly', 'caviar', 'aged roe'],
  gems: ['emerald', 'aquamarine', 'ruby', 'amethyst', 'topaz', 'jade', 'diamond', 'prismatic shard'],
  geode_minerals: ['aerinite', 'alamite', 'baryte', 'basalt', 'bixite', 'calcite', 'celestine', 'dolomite', 'esperite', 'fairy stone', 'fire opal', 'fluorapatite', 'geminite', 'ghost crystal', 'ghost crystal', 'granite', 'helvite', 'helvite', 'hematite', 'jagoite', 'jamborite', 'jasper', 'kyanite', 'lemon stone', 'limestone', 'lunarite', 'malachite', 'marble', 'mudstone', 'nekoite', 'neptunite', 'obsidian', 'ocean stone', 'opal', 'orpiment', 'petrified slime', 'pyrite', 'sandstone', 'slate', 'soapstone', 'star shards', 'thunder egg', 'tigerseye'],
  geodes: ['geod', 'frozen geode', 'magma geode', 'omni geode'],
  foraged_minerals: ['earth crystal', 'fire quartz', 'frozen tear', 'quartz'],
  flowers: ['blue jazz', 'crocus', 'fairy rose', 'poppy', 'summer spangle', 'sunflower', 'sweet pea', 'tulip'],
  cooking: ['algae soup', 'artichoke dip', 'autumn\'s bounty', 'baked fish', 'banana pudding', 'bean hotpot', 'blackberry cobbler', 'blueberry tart', 'bread', 'bruschetta', 'carp surprise', 'cheese cauliflower', 'chocolate cake', 'chowder', 'coleslaw', 'complete breakfast', 'cookie', 'crab cake', 'cranberry candy', 'crispy bass', 'dish o\' the sea', 'eggplant parmesan', 'escargot', 'farmer\'s lunch', 'fiddlehead risotto', 'fish stew', 'fish taco', 'fried calamari', 'fried eel', 'fried egg', 'fried mushroom', 'fruit salad', 'ginger ale', 'glazed yams', 'hashbrowns', 'ice cream', 'lobster bisque', 'lucky lunch', 'maki roll', 'mango sticky rice', 'maple bar', 'miner\'s treat', 'omelet', 'pale broth', 'pancakes', 'parsnip soup', 'pepper poppers', 'pink cake', 'pizza', 'plum pudding', 'poi', 'poppyseed muffin', 'pumpkin pie', 'pumpkin soup', 'radish salad', 'red plate', 'rhubarb pie', 'rice pudding', 'roasted hazelnuts', 'roots platter', 'salad', 'salmon dinner', 'sashimi', 'seafoam pudding', 'shrimp cocktail', 'spaghetti', 'spicy eel', 'squid ink ravioli', 'stir fry', 'strange bun', 'stuffing', 'super meal', 'survival burger', 'tom kha soup', 'tortilla', 'triple shot espresso', 'tropical curry', 'trout soup', 'vegetable medley'],
  fruit_tree_fruit: new Map(),
  fruit_tree_fruit_special: ['banana', 'mango'],
  veggies: new Map(),
  misc: ['maple syrup', 'oak resin', 'pine tar', 'piña colada'],
  crafting: ['bug steak', 'field snack', 'life elixir', 'oil of garlic'],
  building_materials: ['battery pack', 'clay', 'fiber', 'hardwood', 'stone', 'wood'],
  artifacts: ['amphibian fossil', 'anchor', 'ancient doll', 'ancient drum', 'ancient seed', 'ancient sword', 'arrowhead', 'bone flute', 'chewing stick', 'chicken statue', 'chipped amphora', 'dinosaur egg', 'dried starfish', 'dwarf gadget', 'dwarf scroll I', 'dwarf scroll II', 'dwarf scroll III', 'dwarf scroll IV', 'dwarvish helm', 'elvish jewelry', 'glass shards', 'golden mask', 'golden relic', 'nautilus fossil', 'ornamental fan', 'palm fossil', 'prehistoric handaxe', 'prehistoric rib', 'prehistoric scapula', 'prehistoric skull', 'prehistoric tibia', 'prehistoric tool', 'prehistoric vertebra', 'rare disc', 'rusty cog', 'rusty spoon', 'skeletal hand', 'skeletal tail', 'strange doll #17', 'strange doll #18', 'trilobite'],
  bombs: ['cherry bomb', 'bomb', 'mega bomb'],
  crafted_floors_paths: ['wood floor', 'rustic plank floor', 'straw floor', 'weathered floor', 'crystal floor', 'stone floor', 'stone walkway floor', 'brick floor', 'wood path', 'gravel path', 'cobblestone path', 'stepping stone path', 'crystal path'],
  fences: ['gate', 'wooden fence', 'stone fence', 'iron fence', 'hardwood fence'],
  sprinklers: ['sprinkler', 'quality sprinkler', 'iridium sprinkler'],
  mushrooms: ['common mushroom', 'chanterelle', 'magma cap', 'morel', 'red mushroom', 'purple mushroom'],
  eggs: ['egg', 'brown egg', 'large egg', 'large brown egg', 'duck egg', 'golden egg', 'ostrich egg', 'void egg'],
  milk: ['milk', 'large milk', 'goat milk', 'large goat milk'],
  monster_loot: ['solar essence', 'void essence', 'slime', 'bug meat', 'bat wing'],
  fruit: new Map()
}

for(var i = 0; i < data.villagers.length; i++) {
  const portrait_url = `${data.villagers[i]}.png`;
  data.portraits.push(portrait_url);

  const icon_url = `${data.villagers[i]}_Icon.png`;
  data.icons.push(icon_url);
}

data.fruit_tree_fruit.set('apple', ['fall']);
data.fruit_tree_fruit.set('cherry', ['spring']);
data.fruit_tree_fruit.set('orange', ['summer']);
data.fruit_tree_fruit.set('peach', ['summer']);
data.fruit_tree_fruit.set('pomegranate', ['fall']);

data.veggies.set('amaranth', {obtain: [], seasons: []}); 
data.veggies.set('artichoke', {obtain: [], seasons: []}); 
data.veggies.set('beet', {obtain: [], seasons: []}); 
data.veggies.set('bok choy', {obtain: [], seasons: []}); 
data.veggies.set('cauliflower', {obtain: [], seasons: []}); 
data.veggies.set('corn', {obtain: [], seasons: []}); 
data.veggies.set('eggplant', {obtain: [], seasons: []}); 
data.veggies.set('fiddlehead fern', {obtain: [], seasons: []}); 
data.veggies.set('garlic', {obtain: [], seasons: []}); 
data.veggies.set('green bean', {obtain: [], seasons: []}); 
data.veggies.set('hops', {obtain: [], seasons: []}); 
data.veggies.set('kale', {obtain: [], seasons: []}); 
data.veggies.set('parsnip', {obtain: [], seasons: []}); 
data.veggies.set('potato', {obtain: [], seasons: []}); 
data.veggies.set('pumpkin', {obtain: [], seasons: []}); 
data.veggies.set('radish', {obtain: [], seasons: []}); 
data.veggies.set('red cabbage', {obtain: [], seasons: []}); 
data.veggies.set('taro root', {obtain: [], seasons: []}); 
data.veggies.set('tea leaves', {obtain: [], seasons: []}); 
data.veggies.set('tomato', {obtain: [], seasons: []}); 
data.veggies.set('unmilled rice', {obtain: [], seasons: []}); 
data.veggies.set('wheat', {obtain: [], seasons: []}); 
data.veggies.set('yam', {obtain: [], seasons: []});

data.fruit.set('cactus fruit', {obtain: ['foraging', 'garden pot'], seasons: ['spring', 'summer', 'fall', 'winter']});
data.fruit.set('strawberry', {obtain: ['farming'], seasons: ['spring']});
data.fruit.set('hot pepper', {obtain: ['farming'], seasons: ['summer']});
data.fruit.set('ancient fruit', {obtain: ['farming'], seasons: ['spring', 'summer', 'fall']});
data.fruit.set('apple', {obtain: ['fruit trees', 'cave (fruit bats)'], seasons: ['fall']});
data.fruit.set('banana', {obtain: ['fruit tree'], seasons: ['all (Ginger Island)', 'summer']});
data.fruit.set('blackberry', {obtain: ['foraging'], seasons: ['fall']});
data.fruit.set('blueberry', {obtain: ['farming'], seasons: ['summer']});
data.fruit.set('cherry', {obtain: [], seasons: []});
data.fruit.set('coconut', {obtain: ['foraging'], seasons: []});
data.fruit.set('cranberries', {obtain: ['farming'], seasons: ['fall']});
data.fruit.set('crystal fruit', {obtain: ['foraging'], seasons: []});
data.fruit.set('grape', {obtain: ['foraging', 'farming'], seasons: ['summer', 'fall']});
data.fruit.set('mango', {obtain: ['fruit tree'], seasons: ['all (Ginger Island)', 'summer']});
data.fruit.set('melon', {obtain: ['farming'], seasons: ['summer']});
data.fruit.set('pineapple', {obtain: ['farming'], seasons: ['all (Ginger Island)', 'summer']});
data.fruit.set('rhubarb', {obtain: ['farming'], seasons: ['spring']});
data.fruit.set('spice berry', {obtain: ['foraging'], seasons: ['summer']});
data.fruit.set('salmonberry', {obtain: ['foraging'], seasons: ['spring']});
data.fruit.set('starfruit', {obtain: ['farming'], seasons: ['summer']});
data.fruit.set('wild plum', {obtain: ['foraging'], seasons: ['fall']});

data.birthdays = {
  abigail: {season: 'fall', day: 13 },
  alex: {season: 'summer', day: 13 },
  caroline: {season: 'winter', day: 7 },
  clint: {season: 'winter', day: 26 },
  demetrius: {season: 'summer', day: 19 },
  dwarf: {season: 'summer', day: 22 },
  elliott: {season: 'fall', day: 5 },
  emily: {season: 'spring', day: 27 },
  evelyn: {season: 'winter', day: 20 },
  george: {season: 'fall', day: 24 },
  gus: {season: 'summer', day: 8 },
  haley: {season: 'spring', day: 14 },
  harvey: {season: 'winter', day: 14 },
  jas: {season: 'summer', day: 4 },
  jodi: {season: 'fall', day: 11 },
  kent: {season: 'spring', day: 4 },
  krobus: {season: 'winter', day: 1 },
  leah: {season: 'winter', day: 23 },
  leo: {season: 'summer', day: 26},
  lewis: {season: 'spring', day: 7 },
  linus: {season: 'winter', day: 3 },
  marnie: {season: 'fall', day: 18 },
  maru: {season: 'summer', day: 10 },
  pam: {season: 'spring', day: 18 },
  penny: {season: 'fall', day: 2 },
  pierre: {season: 'spring', day: 26 },
  robin: {season: 'fall', day: 21 },
  sam: {season: 'summer', day: 17 },
  sandy: {season: 'fall', day: 15 },
  sebastian: {season: 'winter', day: 10 },
  shane: {season: 'spring', day: 20 },
  vincent: {season: 'spring', day: 10 },
  willy: {season: 'summer', day: 24 },
  wizard: {season: 'winter', day: 17 },
}

const universal_like_exceptions = ['oil', 'void mayonnaise', 'fried egg', 'bread', 'strange bun', 'seafoam pudding', 'poppy', 'quartz', 'banana', 'mango', 'prismatic shard', 'hops', 'tea leaves', 'wheat', 'unmilled rice']

data.universal_loves = ['golden pumpkin', 'magic rock candy', 'pearl', 'prismatic shard', 'rabbit\'s foot'];
data.universal_likes = [...data.artisan_goods, ...data.cooking, ...data.flowers, ...data.foraged_minerals, ...data.fruit_tree_fruit, ...data.gems, ...data.veggies, 'life elixir', 'maple syrup']
  for(var j = 0; j < universal_like_exceptions.length; j++) {
    const index = data.universal_likes.indexOf(universal_like_exceptions[j]);
    if(index > -1) {
      data.universal_likes.splice(index, 1);
    }
  }
data.universal_neutrals = ['bread', 'clam', 'coral', 'duck feather', 'fried egg', 'hops', 'nautilus shell', 'rainbow shell', 'roe', 'squid ink', 'sweet gem berry', 'tea leaves', 'truffle', 'wheat', 'wool']

// TODO: add universal dislike and hate lists
// data.universal_dislikes
// data.universal_hates


data.loves = {
  abigail: [...data.universal_loves, 'amethyst', 'banana pudding', 'blackberry cobbler', 'chocolate cake', 'spicy eel', 'pufferfish', 'pumpkin'],
  alex: [...data.universal_loves, 'complete breakfast', 'salmon dinner'],
  caroline: [...data.universal_loves, 'green tea', 'fish taco', 'tropical curry', 'summer spangle'],
  clint: [...data.universal_loves, ...data.gems, 'artichoke dip', 'fiddlehead risotto', 'gold bar', 'iridium bar', 'omni geode'],
  demetrius: [...data.universal_loves, 'bean hotpot', 'ice cream', 'rice pudding', 'strawberry'],
  dwarf: [...data.universal_loves, ...data.gems, 'lemon stone', 'omni geode'],
  elliott: [...data.universal_loves, 'crab cakes', 'tom kha soup', 'pomegranate', 'duck feather', 'squid ink', 'lobster'],
  emily: [...data.universal_loves, ...data.gems, 'cloth', 'survival burger', 'wool'],
  evelyn: [...data.universal_loves, 'chocolate cake', 'stuffing', 'fairy rose', 'tulip', 'diamond', 'beet'],
  george: [...data.universal_loves, 'fried mushroom', 'leek'],
  gus: [...data.universal_loves, 'escargot', 'fish taco', 'tropical curry', 'orange', 'diamond'],
  haley: [...data.universal_loves, 'fruit salad', 'pink cake', 'sunflower', 'coconut'],
  harvey: [...data.universal_loves, 'coffee', 'pickles', 'truffle oil', 'wine', 'super meal'],
  jas: [...data.universal_loves, 'pink cake', 'plum pudding', 'fairy rose'],
  jodi: [...data.universal_loves, 'chocolate cake', 'crispy bass', 'eggplant parmesan', 'fried eel', 'pancakes', 'rhubarb pie', 'vegetable medley', 'diamond'],
  kent: [...data.universal_loves, 'fiddlehead risotto', 'roasted hazelnuts'],
  krobus: [...data.universal_loves, 'diamond', 'pumpkin', 'iridium bar', 'void egg', 'void mayonnaise', 'wild horseradish'],
  leah: [...data.universal_loves, 'goat cheese', 'wine', 'poppyseed muffin', 'salad', 'stir fry', 'vegetable medley', 'truffle'],
  leo: [...data.universal_loves, 'poi', 'duck feather', 'ostrich egg', 'mango'],
  lewis: [...data.universal_loves, 'green tea', 'autumn\'s bounty', 'glazed yams', 'vegetable medley', 'hot pepper'],
  linus: [...data.universal_loves, 'blueberry tart', 'dish o\' the sea', 'yams', 'cactus fruit', 'coconut'],
  marnie: [...data.universal_loves, 'farmer\'s lunch', 'pink cake', 'pumpkin pie', 'diamond'],
  maru: [...data.universal_loves, 'cheese cauliflower', 'miner\'s treat', 'pepper poppers', 'rhubarb pie', 'diamond', 'cauliflower', 'battery pack', 'gold bar', 'iridium bar', 'radioactive bar', 'strawberry'],
  pam: [...data.universal_loves, 'beer', 'mead', 'pale ale', 'piña colada', 'glazed yams', 'parsnip soup', 'parsnip', 'cactus fruit'],
  penny: [...data.universal_loves, 'poppyseed muffin', 'red plate', 'roots platter', 'tom kha soup', 'diamond', 'emerald', 'sandfish', 'poppy', 'melon'],
  pierre: [...data.universal_loves, 'fried calamari'],
  robin: [...data.universal_loves, 'goat cheese', 'spaghetti', 'peach'],
  sam: [...data.universal_loves, 'maple bar', 'pizza', 'tigerseye', 'cactus fruit'],
  sandy: [...data.universal_loves, 'mango sticky rice', 'crocus', 'sweet pea', 'daffodil'],
  sebastian: [...data.universal_loves, 'pumpkin soup', 'sashimi', 'frozen tear', 'obsidian', 'void egg'],
  shane: [...data.universal_loves, 'beer', 'pepper poppers', 'pizza', 'hot pepper'],
  vincent: [...data.universal_loves, 'cranberry candy', 'ginger ale', 'pink cake', 'snail', 'grape'],
  willy: [...data.universal_loves, 'mead', 'diamond', 'pumpkin', 'catfish', 'iridium bar', 'octopus', 'sea cucumber', 'sturgeon'],
  wizard: [...data.universal_loves, 'solar essence', 'void essence', 'super cucumber', 'purple mushroom']
}

// Haley hates prismatic shard
data.loves.haley.splice(data.loves.haley.indexOf('prismatic shard'), 1)

// Penny hates rabbit's foot
data.loves.penny.splice(data.loves.penny.indexOf('rabbit\'s foot'), 1)

// Clint, Dwarf, Emily like all gems *except* for diamond
data.loves.clint.splice(data.loves.clint.indexOf('diamond'), 1);
data.loves.dwarf.splice(data.loves.dwarf.indexOf('diamond'), 1);
data.loves.emily.splice(data.loves.emily.indexOf('diamond'), 1);

// TODO: add:
// data.likes
// data.neutral
// data.dislikes
// data.hates

module.exports = data