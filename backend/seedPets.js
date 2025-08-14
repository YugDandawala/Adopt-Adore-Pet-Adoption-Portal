const mongoose = require('mongoose');
const Pet = require('./models/Pet');
const db = require('./config/database');

const pets = [
  // --- Dogs (5 pets) ---
  {
    name: 'Buddy', age:2 , breed: 'Golden Retriever', species: 'Dog', gender: 'Male', size: 'Large', color: 'Golden',
    description: 'A friendly and playful Golden Retriever who loves fetch and cuddles. Perfect for families with kids.',
    behaviour: 'Loves kids and other pets. Very social and energetic.', healthStatus: 'Excellent', vaccinated: true, spayedNeutered: true,
    location: { city: 'Delhi', state: 'Delhi', zipCode: '110001' },
    photos: ['https://images.pexels.com/photos/5268304/pexels-photo-5268304.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee:5000, shelter: { name: 'Happy Tails Shelter', contact: { phone: '1234567890', email: 'info@happytails.com' } }
  },
  {
    name: 'Max', age: 2, breed: 'German Shepherd', species: 'Dog', gender: 'Male', size: 'Large', color: 'Black/Tan',
    description: 'A loyal German Shepherd, great for families and security. Very intelligent and protective.',
    behaviour: 'Protective and smart. Excellent guard dog.', healthStatus: 'Excellent', vaccinated: true, spayedNeutered: true,
    location: { city: 'Mumbai', state: 'Maharashtra', zipCode: '400001' },
    photos: ['https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 6000, shelter: { name: 'Mumbai Paws', contact: { phone: '9876543210', email: 'contact@mumbaipaws.com' } }
  },
  {
    name: 'Lucy', age: 1, breed: 'Labrador', species: 'Dog', gender: 'Female', size: 'Large', color: 'Black',
    description: 'A loving Labrador who enjoys swimming and playing fetch. Great family companion.',
    behaviour: 'Gentle and obedient. Loves water activities.', healthStatus: 'Excellent', vaccinated: true, spayedNeutered: true,
    location: { city: 'Ahmedabad', state: 'Gujarat', zipCode: '560001' },
    photos: ['https://images.pexels.com/photos/247968/pexels-photo-247968.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 3800, shelter: { name: 'Ahmedabad Rescue', contact: { phone: '9988776655', email: 'info@ahmedabadrescue.com' } }
  },
  {
    name: 'Charlie', age: 2, breed: 'Beagle', species: 'Dog', gender: 'Male', size: 'Medium', color: 'White/Brown',
    description: 'A curious Beagle who loves to sniff and explore. Perfect for active families.',
    behaviour: 'Playful and alert. Great sense of smell.', healthStatus: 'Good', vaccinated: true, spayedNeutered: true,
    location: { city: 'Surat', state: 'Gujarat', zipCode: '395004' },
    photos: ['https://images.pexels.com/photos/6566630/pexels-photo-6566630.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 3000, shelter: { name: 'Surat Canines', contact: { phone: '9123456780', email: 'adopt@suratcanines.com' } }
  },
  {
    name: 'Bella', age: 2, breed: 'Corgi', species: 'Dog', gender: 'Female', size: 'Medium', color: 'Tan/White',
    description: 'A cheerful Corgi who loves walks and belly rubs. Very energetic and loyal.',
    behaviour: 'Very social and energetic. Loves attention.', healthStatus: 'Excellent', vaccinated: true, spayedNeutered: true,
    location: { city: 'Pune', state: 'Maharashtra', zipCode: '411001' },
    photos: ['https://images.pexels.com/photos/164186/pexels-photo-164186.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 2400, shelter: { name: 'Pune Pet Haven', contact: { phone: '9090909090', email: 'info@punepethaven.com' } }
  },
  // --- Cats (5 pets) ---
  {
    name: 'Luna', age: 2, breed: 'Persian', species: 'Cat', gender: 'Female', size: 'Medium', color: 'White',
    description: 'A beautiful Persian cat with a calm temperament. She loves to nap and be pampered.',
    behaviour: 'Loves to nap and be pampered. Very gentle and quiet.', healthStatus: 'Good', vaccinated: true, spayedNeutered: true,
    location: { city: 'Delhi', state: 'Delhi', zipCode: '110001' },
    photos: ['https://images.pexels.com/photos/14840603/pexels-photo-14840603.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 3900, shelter: { name: 'Happy Tails Shelter', contact: { phone: '1234567890', email: 'info@happytails.com' } }
  },
  {
    name: 'Sinza', age: 1, breed: 'Maine Coon', species: 'Cat', gender: 'Male', size: 'Large', color: 'Brown',
    description: 'A majestic Maine Coon with a fluffy tail. Gentle giant with a big heart.',
    behaviour: 'Gentle giant. Very affectionate and loyal.', healthStatus: 'Excellent', vaccinated: true, spayedNeutered: true,
    location: { city: 'Mumbai', state: 'Maharashtra', zipCode: '400001' },
    photos: ['https://images.pexels.com/photos/9541990/pexels-photo-9541990.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 2500, shelter: { name: 'Mumbai Paws', contact: { phone: '9876543210', email: 'contact@mumbaipaws.com' } }
  },
  {
    name: 'Cleo', age: 1, breed: 'Bengal', species: 'Cat', gender: 'Female', size: 'Medium', color: 'Spotted',
    description: 'An active Bengal cat who loves to climb and explore. Very intelligent and playful.',
    behaviour: 'Energetic and smart. Loves climbing and hunting.', healthStatus: 'Good', vaccinated: true, spayedNeutered: true,
    location: { city: 'Ahmedabad', state: 'Gujarat', zipCode: '560001' },
    photos: ['https://images.pexels.com/photos/12465795/pexels-photo-12465795.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 2300, shelter: { name: 'Ahmedabad Rescue', contact: { phone: '9988776655', email: 'info@ahmedabadrescue.com' } }
  },
  {
    name: 'Oliver', age: 4, breed: 'British Shorthair', species: 'Cat', gender: 'Male', size: 'Medium', color: 'Grey',
    description: 'A calm British Shorthair who loves to lounge and cuddle. Perfect for quiet homes.',
    behaviour: 'Relaxed and friendly. Loves attention and treats.', healthStatus: 'Good', vaccinated: true, spayedNeutered: true,
    location: { city: 'Surat', state: 'Gujarat', zipCode: '395004' },
    photos: ['https://images.pexels.com/photos/12824249/pexels-photo-12824249.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 2990, shelter: { name: 'Surat Canines', contact: { phone: '9123456780', email: 'adopt@suratcanines.com' } }
  },
  {
    name: 'Nala', age: 1, breed: 'Ragdoll', species: 'Cat', gender: 'Female', size: 'Small', color: 'White',
    description: 'A sweet Ragdoll kitten who loves to be held and cuddled. Very gentle and loving.',
    behaviour: 'Very gentle and loving. Loves to be carried.', healthStatus: 'Excellent', vaccinated: true, spayedNeutered: false,
    location: { city: 'Pune', state: 'Maharashtra', zipCode: '411001' },
    photos: ['https://images.pexels.com/photos/12482015/pexels-photo-12482015.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 3600, shelter: { name: 'Pune Pet Haven', contact: { phone: '9090909090', email: 'info@punepethaven.com' } }
  },
  // --- Turtles (5 pets) ---
  {
    name: 'Shelly', age: 5, breed: 'Red-Eared Slider', species: 'Turtle', gender: 'Female', size: 'Medium', color: 'Green/Brown',
    description: 'A friendly red-eared slider turtle who loves to bask in the sun and swim.',
    behaviour: 'Calm and peaceful. Enjoys basking and swimming.', healthStatus: 'Excellent', vaccinated: false, spayedNeutered: false,
    location: { city: 'Delhi', state: 'Delhi', zipCode: '110001' },
    photos: ['https://images.pexels.com/photos/5264016/pexels-photo-5264016.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 1200, shelter: { name: 'Happy Tails Shelter', contact: { phone: '1234567890', email: 'info@happytails.com' } }
  },
  {
    name: 'Crush', age: 3, breed: 'Painted Turtle', species: 'Turtle', gender: 'Male', size: 'Small', color: 'Yellow',
    description: 'A colorful painted turtle with beautiful markings. Loves to explore and swim.',
    behaviour: 'Active and curious. Enjoys exploring new environments.', healthStatus: 'Good', vaccinated: false, spayedNeutered: false,
    location: { city: 'Mumbai', state: 'Maharashtra', zipCode: '400001' },
    photos: ['https://images.pexels.com/photos/3387169/pexels-photo-3387169.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 1500, shelter: { name: 'Mumbai Paws', contact: { phone: '9876543210', email: 'contact@mumbaipaws.com' } }
  },
  {
    name: 'Raphael', age: 5, breed: 'Box Turtle', species: 'Turtle', gender: 'Male', size: 'Small', color: 'Brown/Orange',
    description: 'A wise box turtle who loves to dig and explore. Very hardy and long-lived.',
    behaviour: 'Slow and steady. Loves digging and hiding.', healthStatus: 'Excellent', vaccinated: false, spayedNeutered: false,
    location: { city: 'Ahmedabad', state: 'Gujarat', zipCode: '560001' },
    photos: ['https://images.pexels.com/photos/11351218/pexels-photo-11351218.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 1899, shelter: { name: 'Ahmedabad Rescue', contact: { phone: '9988776655', email: 'info@ahmedabadrescue.com' } }
  },
  {
    name: 'Donatello', age: 4, breed: 'Musk Turtle', species: 'Turtle', gender: 'Female', size: 'Small', color: 'Dark Brown',
    description: 'A small musk turtle who is very active and loves to swim in shallow water.',
    behaviour: 'Active and alert. Enjoys swimming and basking.', healthStatus: 'Good', vaccinated: false, spayedNeutered: false,
    location: { city: 'Surat', state: 'Gujarat', zipCode: '395004' },
    photos: ['https://images.pexels.com/photos/668867/pexels-photo-668867.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 1900, shelter: { name: 'Surat Canines', contact: { phone: '9123456780', email: 'adopt@suratcanines.com' } }
  },
  {
    name: 'Leonardo', age: 7, breed: 'Map Turtle', species: 'Turtle', gender: 'Male', size: 'Medium', color: 'Green/Brown',
    description: 'A beautiful map turtle with distinctive shell patterns. Loves to bask and swim.',
    behaviour: 'Peaceful and observant. Enjoys basking spots.', healthStatus: 'Excellent', vaccinated: false, spayedNeutered: false,
    location: { city: 'Pune', state: 'Maharashtra', zipCode: '411001' },
    photos: ['https://images.pexels.com/photos/2570524/pexels-photo-2570524.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 3400, shelter: { name: 'Pune Pet Haven', contact: { phone: '9090909090', email: 'info@punepethaven.com' } }
  },
  // --- Fish (5 pets) ---
  {
    name: 'Goldie', age: 1, breed: 'Goldfish', species: 'Fish', gender: 'Male', size: 'Small', color: 'Gold',
    description: 'A beautiful goldfish who loves to swim and explore his tank.',
    behaviour: 'Peaceful and calm. Enjoys swimming and eating.', healthStatus: 'Excellent', vaccinated: false, spayedNeutered: false,
    location: { city: 'Delhi', state: 'Delhi', zipCode: '110001' },
    photos: ['https://images.pexels.com/photos/8434694/pexels-photo-8434694.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 800, shelter: { name: 'Happy Tails Shelter', contact: { phone: '1234567890', email: 'info@happytails.com' } }
  },
  {
    name: 'Bubbles', age: 2, breed: 'Betta', species: 'Fish', gender: 'Male', size: 'Small', color: 'Silver',
    description: 'A vibrant Betta fish with flowing fins. Very active and colorful.',
    behaviour: 'Active and curious. Loves to explore his territory.', healthStatus: 'Good', vaccinated: false, spayedNeutered: false,
    location: { city: 'Mumbai', state: 'Maharashtra', zipCode: '400001' },
    photos: ['https://images.pexels.com/photos/2765210/pexels-photo-2765210.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee:1599, shelter: { name: 'Mumbai Paws', contact: { phone: '9876543210', email: 'contact@mumbaipaws.com' } }
  },
  {
    name: 'Splash', age: 1, breed: 'Guppy', species: 'Fish', gender: 'Female', size: 'Small', color: 'Multi',
    description: 'A colorful guppy who loves to swim in groups. Very peaceful and active.',
    behaviour: 'Very peaceful. Enjoys swimming with other fish.', healthStatus: 'Excellent', vaccinated: false, spayedNeutered: false,
    location: { city: 'Ahmedabad', state: 'Gujarat', zipCode: '560001' },
    photos: ['https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 600, shelter: { name: 'Ahmedabad Rescue', contact: { phone: '9988776655', email: 'info@ahmedabadrescue.com' } }
  },
  {
    name: 'Finley', age: 2, breed: 'Molly', species: 'Fish', gender: 'Male', size: 'Small', color: 'Multi',
    description: 'A sleek black molly fish. Very hardy and easy to care for.',
    behaviour: 'Active and lively. Enjoys swimming and eating.', healthStatus: 'Good', vaccinated: false, spayedNeutered: false,
    location: { city: 'Surat', state: 'Gujarat', zipCode: '395004' },
    photos: ['https://images.pexels.com/photos/2053815/pexels-photo-2053815.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 780, shelter: { name: 'Surat Canines', contact: { phone: '9123456780', email: 'adopt@suratcanines.com' } }
  },
  {
    name: 'Pearl', age: 1, breed: 'Angelfish', species: 'Fish', gender: 'Female', size: 'Small', color: 'White/Orange',
    description: 'A graceful angelfish with long fins. Very elegant and peaceful.',
    behaviour: 'Elegant and calm. Enjoys swimming in open water.', healthStatus: 'Excellent', vaccinated: false, spayedNeutered: false,
    location: { city: 'Pune', state: 'Maharashtra', zipCode: '411001' },
    photos: ['https://images.pexels.com/photos/5546935/pexels-photo-5546935.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 480, shelter: { name: 'Pune Pet Haven', contact: { phone: '9090909090', email: 'info@punepethaven.com' } }
  },
  // --- Rabbits (5 pets) ---
  {
    name: 'Snowball', age: 1, breed: 'Netherland Dwarf', species: 'Rabbit', gender: 'Female', size: 'Small', color: 'White',
    description: 'A tiny, fluffy bunny who loves to hop and eat fresh vegetables.',
    behaviour: 'Gentle and sweet. Loves to hop and explore.', healthStatus: 'Excellent', vaccinated: true, spayedNeutered: true,
    location: { city: 'Delhi', state: 'Delhi', zipCode: '110001' },
    photos: ['https://images.pexels.com/photos/4001296/pexels-photo-4001296.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee:1800, shelter: { name: 'Happy Tails Shelter', contact: { phone: '1234567890', email: 'info@happytails.com' } }
  },
  {
    name: 'Thumper', age: 2, breed: 'Lop', species: 'Rabbit', gender: 'Male', size: 'Small', color: 'Gray',
    description: 'A playful lop rabbit with floppy ears. Loves to dig and play.',
    behaviour: 'Loves to dig and play. Very active and curious.', healthStatus: 'Good', vaccinated: true, spayedNeutered: true,
    location: { city: 'Mumbai', state: 'Maharashtra', zipCode: '400001' },
    photos: ['https://images.pexels.com/photos/3820509/pexels-photo-3820509.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 2050, shelter: { name: 'Mumbai Paws', contact: { phone: '9876543210', email: 'contact@mumbaipaws.com' } }
  },
  {
    name: 'Cocoa', age: 3, breed: 'Rex', species: 'Rabbit', gender: 'Female', size: 'Medium', color: 'Brown',
    description: 'A soft, cuddly Rex rabbit with velvety fur. Very calm and friendly.',
    behaviour: 'Very calm and friendly. Loves to be petted.', healthStatus: 'Excellent', vaccinated: true, spayedNeutered: true,
    location: { city: 'Ahmedabad', state: 'Gujarat', zipCode: '560001' },
    photos: ['https://images.pexels.com/photos/2439784/pexels-photo-2439784.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 1700, shelter: { name: 'Ahmedabad Rescue', contact: { phone: '9988776655', email: 'info@ahmedabadrescue.com' } }
  },
  {
    name: 'Hazel', age: 2, breed: 'Angora', species: 'Rabbit', gender: 'Female', size: 'Medium', color: 'White/Brown',
    description: 'A fluffy Angora rabbit who loves to be brushed. Very gentle and quiet.',
    behaviour: 'Gentle and quiet. Enjoys being groomed.', healthStatus: 'Good', vaccinated: true, spayedNeutered: true,
    location: { city: 'Surat', state: 'Gujarat', zipCode: '395004' },
    photos: ['https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 1870, shelter: { name: 'Surat Canines', contact: { phone: '9123456780', email: 'adopt@suratcanines.com' } }
  },
  {
    name: 'BunBun', age: 1, breed: 'Mini Rex', species: 'Rabbit', gender: 'Male', size: 'Small', color: 'Black',
    description: 'A curious Mini Rex who loves to explore. Very active and playful.',
    behaviour: 'Active and playful. Loves to explore new areas.', healthStatus: 'Excellent', vaccinated: true, spayedNeutered: true,
    location: { city: 'Pune', state: 'Maharashtra', zipCode: '411001' },
    photos: ['https://images.pexels.com/photos/2389072/pexels-photo-2389072.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 1620, shelter: { name: 'Pune Pet Haven', contact: { phone: '9090909090', email: 'info@punepethaven.com' } }
  },
  {
    name: 'Rocky', age: 1, breed: 'Shiba Inu', species: 'Dog', gender: 'Male', size: 'Medium', color: 'Red',
    description: 'A spirited Shiba Inu who is alert, agile, and loyal. Loves outdoor adventures and is very intelligent.',
    behaviour: 'Energetic and independent. Great for active owners.', healthStatus: 'Excellent', vaccinated: true, spayedNeutered: true,
    location: { city: 'Surat', state: 'Gujarat', zipCode: '395004' },
    photos: ['https://images.pexels.com/photos/13062616/pexels-photo-13062616.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200&fit=crop&crop=center&q=95'],
    adoptionFee: 4600, shelter: { name: 'Surat Canines', contact: { phone: '9123456780', email: 'adopt@suratcanines.com' } }
  }
];

async function seedPets() {
  try {
    await mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Pet.deleteMany({});
    await Pet.insertMany(pets);
    console.log(`Seeded ${pets.length} pets successfully!`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding pets:', err);
    process.exit(1);
  }
}

seedPets(); 