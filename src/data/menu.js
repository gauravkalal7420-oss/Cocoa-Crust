const base = "https://media.base44.com/images/public";

export const IMAGES = {
  interior: `${base}/user_6ae8868046c3d3e4ceab52a4/be1d2c350_image.png`,
  shopfront: `${base}/user_6ae8868046c3d3e4ceab52a4/1f78f951f_image.png`,
  emblem: `${base}/user_6ae8868046c3d3e4ceab52a4/b89102f68_image.png`,
  shaping: `${base}/6ae888a1d721aa90b06827ef/647be0ed1_generated_image.png`,
  croissantTray: `${base}/6ae888a1d721aa90b06827ef/141b70096_generated_image.png`,
  hotChocolate: `${base}/6ae888a1d721aa90b06827ef/4007656eb_generated_image.png`,
  starter: `${base}/6ae888a1d721aa90b06827ef/07ffb82f0_generated_image.png`,
  sourdough: `${base}/6ae888a1d721aa90b06827ef/000e7b9f1_generated_28d4313d.png`,
  rye: `${base}/6ae888a1d721aa90b06827ef/ce58797a9_generated_4e0c245d.png`,
  croissant: `${base}/6ae888a1d721aa90b06827ef/ae94939c0_generated_a2bd5b61.png`,
  painAuChocolat: `${base}/6ae888a1d721aa90b06827ef/63b2358ae_generated_eea53fb2.png`,
  layerCake: `${base}/6ae888a1d721aa90b06827ef/56d01d9a9_generated_4e1a83f6.png`,
  madeleines: `${base}/6ae888a1d721aa90b06827ef/f7ffe9ffb_generated_4010c419.png`,
  cortado: `${base}/6ae888a1d721aa90b06827ef/26d99ed6c_generated_image.png`,
  filterBrew: `${base}/6ae888a1d721aa90b06827ef/cd7036bca_generated_image.png`,
};

export const CATEGORIES = [
  { name: "Breads", blurb: "Long-fermented, baked before sunrise" },
  { name: "Pastries", blurb: "Hand-laminated with cultured butter" },
  { name: "Cakes & Bakes", blurb: "Cacao-rich, cut thick" },
  { name: "Cacao Bar", blurb: "Single-origin, ground in house" },
];

export const MENU_ITEMS = [
  {
    slug: "country-sourdough",
    name: "Country Sourdough",
    category: "Breads",
    price: 280,
    description: "36-hour ferment, blistered dark crust, open crumb.",
    story:
      "Our everyday loaf: stone-ground wheat, water, salt and a starter that has been fed every morning since 2019. Mixed in the evening and shaped by hand before sunrise, it bakes dark and blisters along the scoring.",
    ingredients: "Stone-ground wheat flour, water, sea salt, sourdough starter.",
    allergens: "Gluten. Baked in a kitchen that also handles dairy, eggs and nuts.",
    image: IMAGES.sourdough,
    featured: true,
    sort_order: 1,
  },
  {
    slug: "seeded-rye",
    name: "Seeded Rye",
    category: "Breads",
    price: 320,
    description: "Sunflower, linseed and cracked rye, molasses-dark.",
    story:
      "A dense, malty loaf built on a rye starter and soaked seeds. It keeps for days and toasts into something crackling and dark, which is how we eat it at the counter.",
    ingredients: "Rye flour, wheat flour, water, sunflower seeds, linseed, cracked rye, molasses, sea salt.",
    allergens: "Gluten. Baked in a kitchen that also handles dairy, eggs and nuts.",
    image: IMAGES.rye,
    sort_order: 2,
  },
  {
    slug: "butter-croissant",
    name: "Butter Croissant",
    category: "Pastries",
    price: 180,
    description: "Forty-eight layers, honeycomb interior.",
    story:
      "Cultured butter folded in three times over three days, then shaped and proved overnight. We bake them in small trays through the morning, which is why the case smells the way it does.",
    ingredients: "Wheat flour, cultured butter, milk, sugar, yeast, sea salt.",
    allergens: "Gluten, dairy. Baked in a kitchen that also handles eggs and nuts.",
    image: IMAGES.croissant,
    featured: true,
    sort_order: 3,
  },
  {
    slug: "pain-au-chocolat",
    name: "Pain au Chocolat",
    category: "Pastries",
    price: 220,
    description: "Two batons of 64% dark chocolate.",
    story:
      "The same laminated dough as the croissant, wrapped around two batons of 64% chocolate from the cacao bar. Best within an hour of coming out of the oven.",
    ingredients: "Wheat flour, cultured butter, dark chocolate (64%), milk, sugar, yeast, sea salt.",
    allergens: "Gluten, dairy. May contain traces of nuts.",
    image: IMAGES.painAuChocolat,
    sort_order: 4,
  },
  {
    slug: "cocoa-crust-layer-cake",
    name: "Cocoa & Crust Layer Cake",
    category: "Cakes & Bakes",
    price: 420,
    description: "Dark cocoa sponge, salted ganache. Sold by the slice.",
    story:
      "Three layers of dark cocoa sponge soaked in coffee syrup, stacked with salted ganache and finished with a thin coat of the same. Cut thick at the counter, sold by the slice.",
    ingredients: "Cocoa, wheat flour, eggs, butter, cream, dark chocolate, sugar, sea salt, coffee.",
    allergens: "Gluten, dairy, eggs. May contain traces of nuts.",
    image: IMAGES.layerCake,
    featured: true,
    sort_order: 5,
  },
  {
    slug: "brown-butter-madeleines",
    name: "Brown Butter Madeleines",
    category: "Cakes & Bakes",
    price: 240,
    description: "Beurre noisette, sea salt, baked to order.",
    story:
      "We brown the butter first, until it smells of hazelnut, then fold it into a light batter and bake to order. Six to a box, still warm when you pick them up.",
    ingredients: "Wheat flour, brown butter, eggs, sugar, honey, sea salt.",
    allergens: "Gluten, dairy, eggs.",
    image: IMAGES.madeleines,
    sort_order: 6,
  },
  {
    slug: "single-origin-hot-chocolate",
    name: "Single-Origin Hot Chocolate",
    category: "Cacao Bar",
    price: 260,
    description: "70% Chuao, steamed milk.",
    story:
      "Cacao from Chuao, ground in house and turned into a thick, unsweetened chocolate base. We melt it into steamed milk to order and serve it in a small cup, because it is a lot.",
    ingredients: "Single-origin cacao (70% Chuao), milk, raw sugar.",
    allergens: "Dairy.",
    image: IMAGES.hotChocolate,
    sort_order: 7,
  },
  {
    slug: "cortado",
    name: "Cortado",
    category: "Cacao Bar",
    price: 180,
    description: "Double shot, silky milk.",
    story:
      "Two shots of our house espresso, cut with the same amount of milk. Pulled on the machine beside the window, which is also the warmest place in the room.",
    ingredients: "Coffee, milk.",
    allergens: "Dairy.",
    image: IMAGES.cortado,
    sort_order: 8,
  },
  {
    slug: "filter-brew",
    name: "Filter Brew",
    category: "Cacao Bar",
    price: 160,
    description: "Rotating single estate.",
    story:
      "A single estate, brewed by the batch and changing every few weeks. Ask at the counter what is on the filter this morning.",
    ingredients: "Coffee.",
    allergens: "None.",
    image: IMAGES.filterBrew,
    sort_order: 9,
  },
];

export const PICKUP_SLOTS = [
  "7:30 – 9:00",
  "9:00 – 11:00",
  "11:00 – 13:00",
  "13:00 – 15:00",
  "15:00 – 18:00",
];

export const formatPrice = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;