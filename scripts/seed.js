require('dotenv').config({ path: '../backend/.env' });
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Sample destination data
const destinations = [
  {
    name: 'Eiffel Tower',
    clues: [
      'I stand tall in the City of Light.',
      'I was built for a World\'s Fair in 1889.',
      'I am made of iron and was once considered an eyesore.'
    ],
    facts: [
      'I am 330 meters tall, which is about the same height as an 81-story building.',
      'I was the tallest man-made structure in the world for 41 years until the Chrysler Building was completed in 1930.',
      'My designer, Gustave Eiffel, also designed the internal framework of the Statue of Liberty in New York.',
      'About 7 million people visit me each year, making me the most-visited paid monument in the world.',
      'I was meant to be a temporary exhibit and was scheduled to be dismantled in 1909.'
    ]
  },
  {
    name: 'Great Wall of China',
    clues: [
      'I stretch across mountains and valleys for thousands of kilometers.',
      'I was built to protect against northern invasions.',
      'I am visible from low Earth orbit, but contrary to popular belief, not from the Moon.'
    ],
    facts: [
      'I am over 21,000 kilometers (13,000 miles) long including all of my branches.',
      'My construction began in the 7th century BC and continued for more than 2,000 years.',
      'I have been designated as a UNESCO World Heritage site since 1987.',
      'Some sections of my structure are more than 2,500 years old.',
      'Over 1 million people died during my construction and were buried within my walls.'
    ]
  },
  {
    name: 'Taj Mahal',
    clues: [
      'I am a white marble mausoleum built for a beloved wife.',
      'I stand on the banks of the Yamuna River.',
      'I am considered the finest example of Mughal architecture.'
    ],
    facts: [
      'I was commissioned in 1632 by Emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.',
      'It took about 22 years and 20,000 workers to complete my construction.',
      'My white marble reflects different colors at different times of the day.',
      'I am perfectly symmetrical on all sides.',
      'The cost of my construction would be approximately $1 billion in today\'s currency.'
    ]
  },
  {
    name: 'Machu Picchu',
    clues: [
      'I am a 15th-century citadel nestled high in the mountains.',
      'I was built by an ancient empire and later abandoned.',
      'I was "discovered" by an American explorer in 1911, though local people knew of my existence.'
    ],
    facts: [
      'I sit 2,430 meters (7,970 feet) above sea level.',
      'I was built around 1450 CE at the height of the Inca Empire.',
      'I was abandoned just over 100 years after being built, when the Spanish conquered the region.',
      'I am made up of more than 150 buildings including baths, houses, temples, and sanctuaries.',
      'No wheels were used to transport the stones that make up my structures - it was all done by manpower.'
    ]
  },
  {
    name: 'Statue of Liberty',
    clues: [
      'I stand on an island in a harbor, welcoming visitors.',
      'I was a gift from one country to another to celebrate their alliance.',
      'My torch is a symbol of enlightenment.'
    ],
    facts: [
      'I am 93 meters (305 feet) tall from the ground to the tip of my torch.',
      'I was designed by French sculptor Frédéric Auguste Bartholdi.',
      'My full name is "Liberty Enlightening the World".',
      'I was dedicated on October 28, 1886.',
      'The seven spikes on my crown represent the seven continents and the seven seas.'
    ]
  },
  {
    name: 'Colosseum',
    clues: [
      'I am an ancient amphitheater in the heart of a European capital.',
      'I could hold between 50,000-80,000 spectators for public spectacles.',
      'I am partially ruined due to earthquakes and stone-robbers.'
    ],
    facts: [
      'I was built between 72 AD and 80 AD under the Emperor Vespasian.',
      'My original name was the Flavian Amphitheatre.',
      'I was used for gladiatorial contests and public spectacles such as animal hunts, executions, and dramas.',
      'I am the largest ancient amphitheatre ever built.',
      'About one-third of my original structure has been destroyed over time.'
    ]
  },
  {
    name: 'Petra',
    clues: [
      'I am an ancient city carved into rose-colored stone cliffs.',
      'I was established as a trading hub for the Nabataean Empire.',
      'My entrance is through a narrow canyon called the Siq.'
    ],
    facts: [
      'I am located in southern Jordan.',
      'I was established possibly as early as 312 BCE.',
      'I was unknown to the Western world until 1812 when discovered by Swiss explorer Johann Ludwig Burckhardt.',
      'I am sometimes called the "Rose City" due to the color of the stone.',
      'I was designated as a UNESCO World Heritage Site in 1985 and declared one of the New Seven Wonders of the World in 2007.'
    ]
  },
  {
    name: 'Pyramids of Giza',
    clues: [
      'We are the only surviving structures of the Seven Wonders of the Ancient World.',
      'We were built as tombs for powerful rulers.',
      'We are located on the west bank of a famous river in North Africa.'
    ],
    facts: [
      'The Great Pyramid was built around 2560 BCE and was the tallest man-made structure in the world for over 3,800 years.',
      'The Great Pyramid consists of an estimated 2.3 million blocks.',
      'The three main pyramids were built over a period of about 70 years.',
      'The precision of our construction is such that the four sides of the Great Pyramid\'s base have an average error of only 58 millimeters in length.',
      'We were built as tombs for three different pharaohs: Khufu, Khafre, and Menkaure.'
    ]
  },
  {
    name: 'Christ the Redeemer',
    clues: [
      'I stand with arms wide open on a mountain overlooking a Brazilian city.',
      'I am made of reinforced concrete and soapstone.',
      'I am a symbol of Christianity and Brazilian culture.'
    ],
    facts: [
      'I am 30 meters (98 feet) tall, excluding my 8-meter (26 feet) pedestal.',
      'My arms stretch 28 meters (92 feet) wide.',
      'I was completed in 1931 after 9 years of construction.',
      'I weigh approximately 635 metric tons.',
      'I was named one of the New Seven Wonders of the World in 2007.'
    ]
  },
  {
    name: 'Sydney Opera House',
    clues: [
      'I am a multi-venue performing arts center with distinctive sail-shaped shells.',
      'I am situated on a harbor in Australia\'s largest city.',
      'My design was the result of an international competition won by a Danish architect.'
    ],
    facts: [
      'I was designed by Danish architect Jørn Utzon.',
      'My construction was completed in 1973, ten years later than planned.',
      'I cost $102 million to build, which was 14 times the original budget.',
      'I have more than 1 million roof tiles covering my distinctive shells.',
      'I was declared a UNESCO World Heritage Site in 2007.'
    ]
  }
];

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Clear existing data
    await client.query('TRUNCATE destinations CASCADE');
    await client.query('TRUNCATE clues CASCADE');
    await client.query('TRUNCATE facts CASCADE');
    
    // Reset sequence
    await client.query('ALTER SEQUENCE destinations_id_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE clues_id_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE facts_id_seq RESTART WITH 1');
    
    // Insert destinations and related data
    for (const destination of destinations) {
      // Insert destination
      const destResult = await client.query(
        'INSERT INTO destinations (name) VALUES ($1) RETURNING id',
        [destination.name]
      );
      
      const destinationId = destResult.rows[0].id;
      
      // Insert clues
      for (const clue of destination.clues) {
        await client.query(
          'INSERT INTO clues (destination_id, text) VALUES ($1, $2)',
          [destinationId, clue]
        );
      }
      
      // Insert facts
      for (const fact of destination.facts) {
        await client.query(
          'INSERT INTO facts (destination_id, text) VALUES ($1, $2)',
          [destinationId, fact]
        );
      }
    }
    
    await client.query('COMMIT');
    
    console.log(`Seeded database with ${destinations.length} destinations`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error seeding database:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase();
