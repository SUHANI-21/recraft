// REPLACE your mockArtisans array
export const mockArtisans = [
  {
    _id: 'artisan1',
    storeName: 'EcoCrafts by Jane',
    bio: 'Jane is a passionate creator who turns everyday denim waste into fashionable and durable accessories.',
    profileImage: '/assets/images/artisan-jane.jpg',
    contact: {
      email: 'jane.eco@example.com',
      phone: '123-456-7890',
      address: '123 Green Way, Eco City, 11001'
    }
  },
  {
    _id: 'artisan2',
    storeName: 'Glass Gardens',
    bio: 'From discarded bottles to beautiful home decor, Glass Gardens gives glass a second life.',
    profileImage: '/assets/images/artisan-glass.jpg',
    contact: {
      email: 'contact@glassgardens.com',
      phone: '987-654-3210',
      address: '45 Recycled Rd, Bottleburg, 22002'
    }
  },
  // ... other artisans ...
];

// REPLACE your mockProducts array
export const mockProducts = [
  {
    _id: 'prod1',
    name: 'Upcycled Denim Tote Bag',
    artisanId: 'artisan1',
    price: 45.00,
    category: 'Accessories',
    photos: ['/assets/images/denim-tote.jpg'],
    tags: ['eco-friendly', 'fashion', 'denim', 'bag'],
    stock: 15, // <-- ADDED STOCK
    status: 'Published', // <-- ADD STATUS
  },
  {
    _id: 'prod2',
    name: 'Recycled Glass Bottle Vases',
    artisanId: 'artisan2',
    price: 25.00,
    category: 'Home Decor',
    photos: ['/assets/images/glass-vase.jpg'],
    tags: ['home', 'gift', 'glass', 'vase'],
    stock: 30, // <-- ADDED STOCK
    status: 'Published', // <-- ADD STATUS
  },
  {
    _id: 'prod3',
    name: 'Plastic Waste Wall Clock',
    artisanId: 'artisan1', // Let's assign this to Jane too
    price: 75.00,
    category: 'Home Decor',
    photos: ['/assets/images/plastic-clock.jpg'],
    tags: ['decor', 'modern', 'plastic', 'wall art'],
    stock: 8, // <-- ADDED STOCK
    status: 'Published', // <-- ADD STATUS
  },
  {
    _id: 'prod4',
    name: 'Newspaper Woven Basket',
    artisanId: 'artisan1',
    price: 35.00,
    category: 'Home Decor',
    photos: ['/assets/images/newspaper-basket.jpg'],
    tags: ['handmade', 'storage', 'basket', 'eco-friendly'],
    stock: 0, // <-- THIS ONE IS OUT OF STOCK
    status: 'draft', // <-- ADD STATUS
  },
];
// Add this new array to your mockData.js file





export const mockInspirationPosts = [
  {
    _id: 'insp1',
    title: 'DIY: Turning Plastic Bottles into a Vertical Garden',
    userId: 'user1',
    userName: 'CreativeGardener',
    userAvatar: '/assets/images/avatar1.jpg',
    photos: ['/assets/images/inspiration-garden.jpg'],
    description: 'A step-by-step guide on how to transform single-use plastic bottles into a beautiful, space-saving vertical garden for your balcony or kitchen wall.',
    materialsUsed: ['Plastic Bottles', 'Twine', 'Scissors', 'Soil'],
    tags: ['DIY', 'Gardening', 'Upcycling', 'Plastic'],
    // No product link for this one
  },
  {
    _id: 'insp2',
    title: 'Old T-Shirt Woven Rug Project',
    userId: 'user2',
    userName: 'CraftyCorner',
    userAvatar: '/assets/images/avatar2.jpg',
    photos: ['/assets/images/inspiration-rug.jpg'],
    description: 'Don\'t throw away your old t-shirts! With a simple weaving technique, you can create a soft, durable, and colorful rug. No special tools required.',
    materialsUsed: ['Old T-shirts', 'Hula Hoop', 'Scissors'],
    tags: ['Crafts', 'Home Decor', 'Textiles', 'No-Sew'],
    // No artisan link for this user
  },
  {
    _id: 'insp3',
    title: 'My Newspaper Woven Baskets', // Title changed slightly
    userId: 'artisan1', // <-- LINKED TO AN ARTISAN
    userName: 'EcoCrafts by Jane', // <-- ARTISAN'S STORE NAME
    userAvatar: '/assets/images/artisan-jane.jpg', // <-- ARTISAN'S IMAGE
    photos: ['/assets/images/newspaper-basket.jpg'],
    description: 'Showing off my process for creating these sturdy and versatile baskets, handwoven from old newspapers. Ideal for storage or as a decorative item.',
    materialsUsed: ['Recycled Newspaper', 'Non-toxic sealant'],
    tags: ['Art', 'Handmade', 'Storage'],
    linkedProductId: 'prod4' // <-- LINKED TO A SPECIFIC PRODUCT FOR SALE
  },
  {
    _id: 'insp4',
    title: 'From Tin Cans to Chic Lanterns',
    userId: 'user1',
    userName: 'CreativeGardener',
    userAvatar: '/assets/images/avatar1.jpg',
    photos: ['/assets/images/inspiration-lanterns.jpg'],
    description: 'Light up your evenings with these beautiful lanterns made from used tin cans. A simple pattern and a hammer are all you need to create magical lighting.',
    materialsUsed: ['Tin Cans', 'Hammer', 'Nails', 'Tea Lights'],
    tags: ['Lighting', 'Outdoor', 'DIY'],
  },
];
