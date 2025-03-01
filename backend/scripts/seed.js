require('dotenv').config();
const { Pool } = require('pg');

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false
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
      'I am perfectly symmetrical on all four sides.',
      'I took approximately 22 years to complete, from 1631 to 1653.',
      'My main dome is 73 meters (240 feet) tall.',
      'My walls are inlaid with 28 different types of precious and semi-precious stones.',
      'I change color throughout the day, from pinkish in the morning to golden in the evening to white under the moonlight.'
    ]
  },
  {
    name: 'Machu Picchu',
    clues: [
      'I am an ancient city perched high in the Andes Mountains.',
      'I was built by the Inca civilization in the 15th century.',
      'I was "rediscovered" by Hiram Bingham in 1911 after being hidden for centuries.'
    ],
    facts: [
      'I sit at an altitude of 2,430 meters (7,970 feet) above sea level.',
      'I am made up of more than 150 buildings, including temples, sanctuaries, parks, and residences.',
      'My stones fit together so perfectly that not even a knife blade can be inserted between them.',
      'I was declared a UNESCO World Heritage Site in 1983.',
      'I receive over 1.5 million visitors annually.'
    ]
  },
  {
    name: 'Colosseum',
    clues: [
      'I am an ancient amphitheater in the center of Rome.',
      'I could hold between 50,000 and 80,000 spectators.',
      'I was used for gladiatorial contests and public spectacles.'
    ],
    facts: [
      'My construction began under Emperor Vespasian in AD 72 and was completed under his successor Titus in AD 80.',
      'I am the largest amphitheater ever built.',
      'My original name was the Flavian Amphitheatre.',
      'I have over 80 entrances and could be evacuated in just 5 minutes.',
      'About one-third of my original structure has been destroyed over time due to earthquakes and stone-robbers.'
    ]
  },
  {
    name: 'Statue of Liberty',
    clues: [
      'I was a gift from France to the United States.',
      'I hold a torch in my right hand and a tablet in my left.',
      'I stand on Liberty Island in New York Harbor.'
    ],
    facts: [
      'My full name is "Liberty Enlightening the World."',
      'I am 93 meters (305 feet) tall including my pedestal.',
      'My crown has 7 spikes, representing the seven seas and seven continents.',
      'I was designed by Frédéric Auguste Bartholdi and my internal structure was engineered by Gustave Eiffel.',
      'I was dedicated on October 28, 1886.'
    ]
  },
  {
    name: 'Sydney Opera House',
    clues: [
      'I am known for my distinctive sail-shaped shells.',
      'I am located in a famous harbor in Australia.',
      'I was designed by Danish architect Jørn Utzon.'
    ],
    facts: [
      'I took 16 years to build, from 1957 to 1973.',
      'I cost $102 million to build, which was 14 times the original budget.',
      'I have over 1 million roof tiles covering my shells.',
      'I host more than 1,500 performances annually, attended by over 1.2 million people.',
      'I was declared a UNESCO World Heritage Site in 2007.'
    ]
  },
  {
    name: 'Pyramids of Giza',
    clues: [
      'We are the only surviving structures of the Seven Wonders of the Ancient World.',
      'We were built as tombs for powerful rulers.',
      'We are located on the west bank of the Nile River.'
    ],
    facts: [
      'The Great Pyramid was the tallest man-made structure in the world for more than 3,800 years.',
      'The Great Pyramid consists of an estimated 2.3 million stone blocks.',
      'Each of the original casing stones weighed about 15 tons.',
      'We were built between 2550 and 2490 BC.',
      'We are precisely aligned with the stars and cardinal directions.'
    ]
  },
  {
    name: 'Mount Everest',
    clues: [
      'I am the highest point on Earth.',
      'I am part of the Himalayan mountain range.',
      'I am named after a British surveyor.'
    ],
    facts: [
      'My peak is 8,848.86 meters (29,031.7 feet) above sea level.',
      'I grow about 4 millimeters (0.16 inches) taller every year due to geological uplift.',
      'The first confirmed successful ascent was by Edmund Hillary and Tenzing Norgay in 1953.',
      'Over 300 people have died attempting to climb me.',
      'My summit temperature can reach -60°C (-76°F).'
    ]
  },
  {
    name: 'Grand Canyon',
    clues: [
      'I am a steep-sided canyon carved by a river in Arizona.',
      'I am 446 km (277 miles) long.',
      'I expose nearly two billion years of Earth\'s geological history.'
    ],
    facts: [
      'I am up to 29 km (18 miles) wide and attain a depth of over 1,800 meters (6,000 feet).',
      'I was carved by the Colorado River over a period of about 5 to 6 million years.',
      'I contain some of the oldest exposed rock on Earth, dating back 2 billion years.',
      'I am home to over 1,500 plant species, 355 bird species, and 89 mammal species.',
      'I was declared a UNESCO World Heritage Site in 1979.'
    ]
  },
  {
    name: 'Angkor Wat',
    clues: [
      'I am the heart and soul of Cambodia.',
      'I am the largest religious monument in the world by land area.',
      'My image appears on the Cambodian national flag.'
    ],
    facts: [
      'I was originally built as a Hindu temple dedicated to the god Vishnu.',
      'I was gradually transformed into a Buddhist temple towards the end of the 12th century.',
      'My name translates to "Temple City" in Khmer.',
      'I represent the classical style of Khmer architecture.',
      'I am surrounded by a large moat, symbolizing the cosmic ocean.'
    ]
  },
  {
    name: 'Christ the Redeemer',
    clues: [
      'I stand atop Corcovado Mountain.',
      'My arms are outstretched, embracing the city below.',
      'I am an iconic symbol of Rio de Janeiro and Brazil.'
    ],
    facts: [
      'I am made of reinforced concrete and soapstone.',
      'My height is 30 meters (98 feet), with an arm span of 28 meters (92 feet).',
      'I was officially opened on October 12, 1931.',
      'I was chosen as one of the New Seven Wonders of the World in 2007.',
      'I offer panoramic views of Rio de Janeiro, Sugarloaf Mountain, and Copacabana Beach.'
    ]
  },
  {
    name: 'Petra',
    clues: [
      'I am a "lost city" carved into sandstone cliffs.',
      'I was the capital of the Nabataean Kingdom.',
      'My name means "stone" in Greek.'
    ],
    facts: [
      'I am located in present-day Jordan.',
      'My most famous structure is Al-Khazneh ("The Treasury").',
      'I flourished from the 4th century BC to the 2nd century AD.',
      'I was rediscovered by Swiss explorer Johann Ludwig Burckhardt in 1812.',
      'I was designated a UNESCO World Heritage Site in 1985.'
    ]
  },
  {
    name: 'Burj Khalifa',
    clues: [
      'I pierce the sky in Dubai.',
      'I am currently the tallest building in the world.',
      'My name honors the ruler of Abu Dhabi.'
    ],
    facts: [
      'My height is 828 meters (2,717 feet).',
      'I have more than 160 stories.',
      'My construction began in 2004 and was completed in 2010.',
      'I was originally named Burj Dubai, but renamed upon opening.',
      'I houses a luxury hotel, residences, and corporate suites.'
    ]
  },
  {
    name: 'Leaning Tower of Pisa',
    clues: [
      'I am known for my unintended tilt.',
      'I am a freestanding bell tower.',
      'I am located in the Piazza dei Miracoli (Square of Miracles).'
    ],
    facts: [
      'My construction began in 1173 and took almost 200 years due to wars and interruptions.',
      'My tilt is due to unstable ground beneath my foundations.',
      'My height is 55.86 meters (183.27 feet) from the ground on the low side and 56.67 meters (185.93 feet) on the high side.',
      'Efforts have been made to stabilize my structure and reduce the lean.',
      'I am a UNESCO World Heritage Site.'
    ]
  },
  {
    name: 'Forbidden City',
    clues: [
      'I was the Chinese imperial palace from the Ming dynasty to the end of the Qing dynasty.',
      'No one could enter without the Emperor\'s permission.',
      'I am located in the center of Beijing.'
    ],
    facts: [
      'I served as the home of emperors and their households, as well as the ceremonial and political center of Chinese government.',
      'I cover 72 hectares (180 acres) and consist of 980 buildings with 8,728 rooms.',
      'Construction began in 1406 and was completed in 1420.',
      'I was declared a UNESCO World Heritage Site in 1987.',
      'Now known as the Palace Museum, I host a vast collection of Chinese art and artifacts.'
    ]
  },
  {
    name: 'Blue Lagoon',
    clues: [
      'I am a geothermal spa in Iceland.',
      'My waters are rich in minerals and known for their healing properties.',
      'I am milky blue in color.'
    ],
    facts: [
      'I am located in a lava field near Grindavík on the Reykjanes Peninsula.',
      'My water temperature averages 39°C (102°F).',
      'My waters are rich in silica and sulfur.',
      'I was formed in 1976 after a nearby geothermal power plant began operations.',
      'I am a popular tourist destination and research center.'
    ]
  },
  {
    name: 'Golden Gate Bridge',
    clues: [
      'I span the strait connecting San Francisco Bay and the Pacific Ocean.',
      'I am known for my "International Orange" color.',
      'I am a symbol of San Francisco and California.'
    ],
    facts: [
      'My total length is 2,737 meters (8,981 feet).',
      'My towers are 227 meters (746 feet) tall above water.',
      'Construction began in 1933 and was completed in 1937.',
      'My design was by engineer Joseph Strauss.',
      'I was considered a marvel of engineering and a symbol of American ingenuity.'
    ]
  },
  {
    name: 'Neuschwanstein Castle',
    clues: [
      'I am a fairytale castle nestled in the Bavarian Alps.',
      'I was commissioned by King Ludwig II of Bavaria.',
      'I inspired Walt Disney\'s castle designs.'
    ],
    facts: [
      'My construction began in 1869, but was never fully completed.',
      'King Ludwig II lived in me for only 172 days before his death.',
      'My name means "New Swan Stone Castle."',
      'I feature Romanesque Revival style architecture.',
      'I is one of the most visited castles in Europe.'
    ]
  },
  {
    name: 'Victoria Falls',
    clues: [
      'I am one of the Seven Natural Wonders of the World.',
      'Local names call me "The Smoke that Thunders."',
      'I am on the border between Zambia and Zimbabwe.'
    ],
    facts: [
      'I am neither the highest nor the widest waterfall in the world, but considered the largest based on my combined width and height.',
      'My width is approximately 1,708 meters (5,604 feet) and my height is 108 meters (354 feet).',
      'Scottish explorer David Livingstone was the first European to see me in 1855 and named me after Queen Victoria.',
      'The spray from my falls can be seen for miles.',
      'I and the surrounding Zambezi National Park are a UNESCO World Heritage Site.'
    ]
  },
  {
    name: 'Mount Fuji',
    clues: [
      'I am Japan\'s highest peak.',
      'I am an active stratovolcano.',
      'I am considered one of Japan\'s "Three Holy Mountains."',
    ],
    facts: [
      'My height is 3,776.24 meters (12,389 feet).',
      'I last erupted in 1707–1708.',
      'I am a symbol of Japan and often depicted in art and photography.',
      'Climbing me is a popular activity, with the official climbing season in July and August.',
      'I was added to the UNESCO World Heritage list as a Cultural Site in 2013.'
    ]
  },
  {
    name: 'Christchurch, New Zealand',
    clues: [
      'I am a city rebuilt after a devastating earthquake.',
      'I am known as the "Garden City."',
      'I am the largest city in the South Island of New Zealand.'
    ],
    facts: [
      'I was significantly damaged by a 6.3 magnitude earthquake in 2011.',
      'My iconic Christchurch Cathedral was severely damaged and is undergoing restoration.',
      'My central city is being revitalized with innovative urban design.',
      'Hagley Park is a large green space in the heart of my city.',
      'I am a gateway to the Canterbury Plains and the Southern Alps.'
    ]
  },
  {
    name: 'Amazon Rainforest',
    clues: [
      'I am the world\'s largest tropical rainforest.',
      'I am known as the "lungs of the Earth."',
      'I span across nine countries in South America.'
    ],
    facts: [
      'I cover an area of approximately 5.5 million square kilometers (2.1 million square miles).',
      'I contain about half of the planet\'s remaining rainforests.',
      'I am home to an estimated 390 billion individual trees.',
      'The Amazon River, the second longest river in the world, flows through me.',
      'I face deforestation due to agriculture, logging, and mining.'
    ]
  },
  {
    name: 'Stonehenge',
    clues: [
      'I am a prehistoric monument in Wiltshire, England.',
      'My purpose remains a mystery to archaeologists.',
      'I consist of standing stones set within earthworks.'
    ],
    facts: [
      'My construction began around 3000 BC and progressed over centuries.',
      'The stones are thought to have been transported from long distances.',
      'Various theories about my purpose include astronomical observatory, religious site, and burial ground.',
      'I am a UNESCO World Heritage Site.',
      'Midsummer and midwinter solstices draw large crowds to me.'
    ]
  },
  {
    name: 'Machu Picchu',
    clues: [
      'I am an ancient Inca citadel high in the Andes Mountains.',
      'I was "rediscovered" in 1911 by Hiram Bingham.',
      'I am known as the "Lost City of the Incas."',
    ],
    facts: [
      'I am located in Peru, above the Sacred Valley.',
      'My construction dates back to the 15th century during the Inca Empire.',
      'I was likely built as a royal estate or sacred religious site.',
      'My precise function and history are still debated by historians.',
      'I am a UNESCO World Heritage Site and one of the New Seven Wonders of the World.'
    ]
  },
  {
    name: 'Lake Baikal',
    clues: [
      'I am the world\'s oldest and deepest lake.',
      'I am located in Siberia, Russia.',
      'I am known as the "Pearl of Siberia."',
    ],
    facts: [
      'My maximum depth is 1,642 meters (5,387 feet).',
      'I contain about 20% of the world\'s unfrozen fresh surface water.',
      'I am home to unique endemic species, including the Baikal seal.',
      'I was formed about 25–30 million years ago.',
      'I am a UNESCO World Heritage Site.'
    ]
  },
  {
    name: 'Salar de Uyuni',
    clues: [
      'I am the world\'s largest salt flat.',
      'I create stunning mirror-like reflections during the rainy season.',
      'I am located in southwest Bolivia.'
    ],
    facts: [
      'I cover over 10,000 square kilometers (3,900 square miles).',
      'I is rich in lithium reserves, estimated to be 50–70% of the world\'s reserves.',
      'Large populations of pink flamingos visit me to breed.',
      'I was formed from several prehistoric lakes that merged.',
      'Nearby attractions include Incahuasi Island and the Train Cemetery.'
    ]
  },
  {
    name: 'Great Barrier Reef',
    clues: [
      'I am the world\'s largest coral reef system.',
      'I am composed of over 2,900 individual reefs and 900 islands.',
      'I am located off the coast of Queensland, Australia.'
    ],
    facts: [
      'I stretches for over 2,300 kilometers (1,400 miles).',
      'I is home to a vast array of marine life, including thousands of species of fish, coral, and mollusks.',
      'I was declared a UNESCO World Heritage Site in 1981.',
      'I face threats from climate change, pollution, and coral bleaching.',
      'Scuba diving and snorkeling are popular activities on me.'
    ]
  },
  {
    name: 'Aurora Borealis (Northern Lights)',
    clues: [
      'I am a natural light display in the sky, predominantly seen in high-latitude regions.',
      'I am caused by collisions between charged particles from the sun and atoms in Earth\'s atmosphere.',
      'I am often seen in green, pink, and white colors.'
    ],
    facts: [
      'I am also known as the Northern Lights.',
      'The Southern Hemisphere counterpart is the Aurora Australis (Southern Lights).',
      'The best time to see me is during the winter months, when skies are dark and clear.',
      'Locations to view me include Iceland, Norway, Finland, Canada, and Alaska.',
      'Indigenous cultures have many myths and legends associated with me.'
    ]
  },
  {
    name: 'Mount Kilimanjaro',
    clues: [
      'I am Africa\'s highest peak.',
      'I am a dormant volcano in Tanzania.',
      'I am known for my snow-capped summit, despite being near the equator.'
    ],
    facts: [
      'My highest point is Uhuru Peak, at 5,895 meters (19,341 feet) above sea level.',
      'I is composed of three volcanic cones: Kibo, Mawenzi, and Shira.',
      'The first recorded ascent was in 1889 by Hans Meyer and Ludwig Purtscheller.',
      'My glaciers are rapidly shrinking due to climate change.',
      'Climbing me is a popular trekking destination.'
    ]
  },
  {
    name: 'Niagara Falls',
    clues: [
      'I am a group of three waterfalls at the southern end of Niagara Gorge.',
      'I am located on the border between Ontario, Canada, and New York, USA.',
      'I am famous for my beauty and a valuable source of hydroelectric power.'
    ],
    facts: [
      'The three waterfalls are the Horseshoe Falls, the American Falls, and the Bridal Veil Falls.',
      'The Horseshoe Falls is the largest and most powerful.',
      'The water flow over me is regulated to manage erosion and generate power.',
      'Boat tours like the "Maid of the Mist" take visitors close to the base of the falls.',
      'I are a popular tourist destination year-round.'
    ]
  },
  {
    name: 'Uluru (Ayers Rock)',
    clues: [
      'I am a large sandstone rock formation in the southern part of the Northern Territory, central Australia.',
      'I am sacred to the Aboriginal people of the area.',
      'I change color dramatically at different times of the day, especially at sunrise and sunset.'
    ],
    facts: [
      'My height is 348 meters (1,142 feet) and my circumference is 9.4 kilometers (5.8 miles).',
      'My Aboriginal name, Uluru, is preferred and commonly used today.',
      'Climbing me was officially banned in 2019 out of respect for Aboriginal culture.',
      'The surrounding area is part of Uluru-Kata Tjuta National Park, a UNESCO World Heritage Site.',
      'Kata Tjuta (The Olgas) is another significant rock formation nearby.'
    ]
  },
  {
    name: 'Venice, Italy',
    clues: [
      'I am a city in northeastern Italy built on more than 100 small islands in a lagoon in the Adriatic Sea.',
      'I am known for my canals, gondolas, and Renaissance and Gothic architecture.',
      'I am often called "The Floating City" or "City of Canals."',
    ],
    facts: [
      'Grand Canal is the main waterway, lined with palaces and buildings.',
      'Gondolas are traditional flat-bottomed Venetian rowing boats.',
      'St. Mark\'s Square is the principal public square.',
      'Rialto Bridge is one of the most famous bridges crossing the Grand Canal.',
      'I face challenges from rising sea levels and overtourism.'
    ]
  },
  {
    name: 'Berlin Wall Memorial',
    clues: [
      'I mark a significant division in a major European city during the Cold War.',
      'I stand as a reminder of a city once separated.',
      'I am a place of remembrance and reflection in Germany.'
    ],
    facts: [
      'I commemorates the Berlin Wall, which divided East and West Berlin from 1961 to 1989.',
      'The memorial site includes the last remaining section of the Berlin Wall.',
      'It features the Documentation Center with exhibitions on the history of the wall.',
      'The Chapel of Reconciliation stands on the site of a former church that was destroyed by the wall.',
      'The memorial serves as a symbol of German reunification and the end of the Cold War.'
    ]
  },
  {
    name: 'Sheikh Zayed Mosque',
    clues: [
      'I am a grand mosque located in Abu Dhabi, United Arab Emirates.',
      'I am named after the founder and first President of the UAE.',
      'I showcase Islamic architecture with white marble and intricate designs.'
    ],
    facts: [
      'I can accommodate over 40,000 worshippers.',
      'The main prayer hall features one of the world\'s largest chandeliers.',
      'The courtyard is paved with floral designs in white marble.',
      'I incorporates elements from different Islamic architectural styles.',
      'Visitors of all faiths are welcome, with respectful dress code.'
    ]
  },
  {
    name: 'Pamukkale',
    clues: [
      'I am a natural site in Denizli, Turkey, famous for my white terraces.',
      'My name means "cotton castle" in Turkish.',
      'I am formed by hot springs and travertine.'
    ],
    facts: [
      'The terraces are made of carbonate minerals left by the flowing thermal spring water.',
      'Hierapolis, an ancient Greco-Roman city, is located on top of me.',
      'I have been used as a spa since antiquity.',
      'Bathing in the thermal pools is a popular tourist activity.',
      'I and Hierapolis are a UNESCO World Heritage Site.'
    ]
  },
  {
    name: 'Mount Rushmore',
    clues: [
      'I feature colossal sculptures of four former U.S. presidents carved into a granite face.',
      'I am located in the Black Hills of South Dakota.',
      'The presidents are Washington, Jefferson, Roosevelt, and Lincoln.'
    ],
    facts: [
      'The sculptures are about 18 meters (60 feet) high.',
      'Sculptor Gutzon Borglum and his son Lincoln Borglum carved me.',
      'Construction took from 1927 to 1941.',
      'The memorial honors the birth, growth, preservation, and development of the United States.',
      'I is a popular tourist destination and national memorial.'
    ]
  },
  {
    name: 'Easter Island',
    clues: [
      'I am a remote volcanic island in Polynesia, Chilean territory.',
      'I am famous for my monumental statues called Moai.',
      'My indigenous name is Rapa Nui.'
    ],
    facts: [
      'Moai statues were created by the Rapa Nui people between the 13th and 16th centuries.',
      'There are over 900 Moai statues on me.',
      'The statues are believed to represent deceased ancestors.',
      'The island\'s history and the decline of its civilization are subjects of ongoing research.',
      'I is a UNESCO World Heritage Site.'
    ]
  },
  {
    name: 'The Wave, Arizona',
    clues: [
      'I am a sandstone rock formation in the Coyote Buttes North area of the Paria Canyon-Vermilion Cliffs Wilderness.',
      'I am famous for my colorful, undulating forms.',
      'Access to me is highly restricted to protect my delicate formations.'
    ],
    facts: [
      'I was formed from Jurassic-age Navajo Sandstone.',
      'Wind and rain erosion over millions of years sculpted me.',
      'Permits are required to hike to me, and are awarded through a lottery system.',
      'Photography is particularly stunning at midday when shadows are minimized.',
      'My delicate formations are easily damaged, requiring careful hiking practices.'
    ]
  },
  {
    name: 'Matterhorn',
    clues: [
      'I am a mountain in the Pennine Alps on the border between Switzerland and Italy.',
      'I am known for my pyramid-like shape.',
      'I is a symbol of the Swiss Alps and mountaineering.'
    ],
    facts: [
      'My summit is 4,478 meters (14,692 feet) high.',
      'The first ascent was in 1865 by Edward Whymper\'s party.',
      'Climbing me is technically challenging and requires mountaineering experience.',
      'Zermatt, a car-free village, is a popular base for climbers and tourists visiting me.',
      'I provides stunning views and photographic opportunities.'
    ]
  },
  {
    name: 'Blue Mosque (Sultan Ahmed Mosque)',
    clues: [
      'I am a historic mosque in Istanbul, Turkey.',
      'I am known for my blue tiles adorning the interior walls.',
      'I was built during the reign of Sultan Ahmed I in the early 17th century.'
    ],
    facts: [
      'I features six minarets, a distinctive feature at the time of my construction.',
      'My interior is decorated with over 20,000 handmade İznik ceramic tiles.',
      'The blue tiles give me my popular name.',
      'I is still a functioning mosque, and also a popular tourist attraction.',
      'My architecture combines Islamic and Byzantine elements.'
    ]
  },
  {
    name: 'Ha Long Bay',
    clues: [
      'I am a UNESCO World Heritage Site in Quang Ninh province, Vietnam.',
      'I feature thousands of limestone karsts and isles in emerald waters.',
      'My name means "descending dragon" in Vietnamese.'
    ],
    facts: [
      'I covers an area of around 1,553 square kilometers (600 square miles).',
      'Legend says I was created when a dragon descended into the sea.',
      'Boat cruises and kayaking are popular ways to explore me.',
      'I is home to floating villages and diverse ecosystems.',
      'I is a major tourist destination in Vietnam.'
    ]
  },
  {
    name: 'Banff National Park',
    clues: [
      'I am Canada\'s oldest national park.',
      'I am located in the Rocky Mountains of Alberta.',
      'I am famous for my turquoise glacial lakes, stunning mountain scenery, and abundant wildlife.'
    ],
    facts: [
      'I was established in 1885.',
      'Lake Louise and Moraine Lake are among my most iconic lakes.',
      'I offer hiking, skiing, wildlife viewing, and hot springs.',
      'My diverse wildlife includes grizzly bears, wolves, elk, and caribou.',
      'I is a UNESCO World Heritage Site, part of the Canadian Rocky Mountain Parks.'
    ]
  },
  {
    name: 'Grand Central Terminal',
    clues: [
      'I am a historic landmark terminal station in Midtown Manhattan, New York City.',
      'I am known for my Beaux-Arts architecture and celestial ceiling.',
      'I is one of the world\'s ten most visited tourist attractions.'
    ],
    facts: [
      'I was opened in 1913.',
      'My main concourse features a famous astronomical ceiling.',
      'I was almost demolished but saved by preservation efforts in the 1970s.',
      'The Whispering Gallery in my lower level has unique acoustic properties.',
      'I is a transportation hub and a cultural icon of New York City.'
    ]
  },
  {
    name: 'The Alhambra',
    clues: [
      'I am a palace and fortress complex in Granada, Andalusia, Spain.',
      'I was originally built as a small fortress in 889 and then rebuilt in the mid-13th century by the Nasrid emir Mohammed ben Al-Ahmar.',
      'I am a prime example of Moorish architecture in Europe.'
    ],
    facts: [
      'My name "Alhambra" means "the red one" in Arabic, likely referring to the reddish color of the walls.',
      'The Court of the Lions is one of my most famous courtyards.',
      'The Generalife is a summer palace and gardens connected to me.',
      'I was declared a UNESCO World Heritage Site in 1984.',
      'I is one of Spain\'s major tourist attractions.'
    ]
  },
  {
    name: 'Tikal',
    clues: [
      'I am the ruins of an ancient Maya city found in a rainforest in Guatemala.',
      'I was one of the largest Maya cities, serving as the capital of a powerful kingdom.',
      'I am known for my towering temple-pyramids.'
    ],
    facts: [
      'I flourished from around the 6th century BC to the 10th century AD.',
      'Temple I, also known as the Temple of the Great Jaguar, is one of my most iconic structures.',
      'I was abandoned around the 10th century for reasons that remain debated.',
      'I was declared a Guatemalan National Park and UNESCO World Heritage Site in 1979.',
      'I offers insight into Maya civilization and architecture.'
    ]
  },
  {
    name: 'Great Sphinx of Giza',
    clues: [
      'I am a limestone statue of a reclining sphinx, a mythical creature with the body of a lion and the head of a human.',
      'I stand on the Giza Plateau near the Pyramids of Giza in Egypt.',
      'I am one of the world\'s largest and oldest statues.'
    ],
    facts: [
      'My dimensions are 73 meters (240 feet) long and 20 meters (66 feet) high.',
      'I is believed to have been built by ancient Egyptians of the Old Kingdom during the reign of the Pharaoh Khafre (c. 2558–2532 BC).',
      'My face is generally believed to be a portrait of Pharaoh Khafre.',
      'I have suffered from erosion over the centuries, and has undergone restoration.',
      'I is an iconic symbol of ancient Egypt and Egyptian civilization.'
    ]
  },
  {
    name: 'Christ Church College, Oxford',
    clues: [
      'I am one of the constituent colleges of the University of Oxford in England.',
      'I am known for my grand architecture, including Tom Tower and Great Hall.',
      'Scenes from the Harry Potter films were filmed in my buildings, particularly the Great Hall.'
    ],
    facts: [
      'I was founded in 1546 by King Henry VIII.',
      'I is also the cathedral church of the Diocese of Oxford, making it unique.',
      'My Great Hall was the inspiration for the Hogwarts Great Hall in Harry Potter.',
      'Famous alumni include 13 British Prime Ministers and numerous scientists and writers.',
      'My Christ Church Picture Gallery houses a collection of Old Master paintings and drawings.'
    ]
  },
  {
    name: 'Trolltunga',
    clues: [
      'I am a rock formation jutting horizontally out of a mountain in Norway.',
      'My name means "troll\'s tongue" in Norwegian.',
      'I offer breathtaking panoramic views of Lake Ringedalsvatnet and the surrounding landscape.'
    ],
    facts: [
      'I is located in the municipality of Ullensvang in Vestland county.',
      'The hike to me is challenging and takes about 10-12 hours round trip.',
      'My popularity as a photo spot has increased dramatically in recent years.',
      'Safety precautions are essential when visiting me due to the exposed location.',
      'The hiking season to me is typically from June to September, depending on snow conditions.'
    ]
  },
  {
    name: 'The Louvre Museum',
    clues: [
      'I am one of the world\'s largest and most visited museums.',
      'I am located in Paris, France, in the Louvre Palace.',
      'I house iconic artworks like the Mona Lisa and Venus de Milo.'
    ],
    facts: [
      'I was originally built as a fortress in the 12th century and later became a royal palace.',
      'I opened as a museum in 1793 during the French Revolution.',
      'My collection spans art from ancient civilizations to the 19th century.',
      'The glass pyramid in my main courtyard was designed by I.M. Pei.',
      'My vast collection is divided into themed departments, including Egyptian Antiquities, Greek and Roman Antiquities, and Paintings.'
    ]
  },
  {
    name: 'Giant\'s Causeway',
    clues: [
      'I am an area of about 40,000 interlocking basalt columns, the result of an ancient volcanic fissure eruption.',
      'I am located in County Antrim on the north coast of Northern Ireland.',
      'Legend says I was built by a giant named Finn McCool.'
    ],
    facts: [
      'The columns are mostly hexagonal, but also have four, five, seven and eight sides.',
      'I was declared a UNESCO World Heritage Site in 1986.',
      'The tallest columns are about 12 meters (39 feet) high.',
      'The Visitor Centre provides information about the geology and legends surrounding me.',
      'I is a popular tourist destination and geological wonder.'
    ]
  },
  {
    name: 'Terracotta Army',
    clues: [
      'I am a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China.',
      'I were discovered in 1974 by local farmers in Xi\'an, Shaanxi province, China.',
      'I were buried with the emperor in his mausoleum.'
    ],
    facts: [
      'The figures include warriors, chariots, horses, and other artifacts.',
      'It is estimated that there are over 8,000 soldiers, 130 chariots with 520 horses and 150 cavalry horses.',
      'The figures are life-sized and individually crafted, with unique facial features and clothing.',
      'The mausoleum complex is a UNESCO World Heritage Site.',
      'I provides valuable insight into ancient Chinese military and artistry.'
    ]
  },
  {
    name: 'Mount Vesuvius',
    clues: [
      'I am a stratovolcano located in the Gulf of Naples in Campania, Italy.',
      'I is famous for my eruption in 79 AD that destroyed the Roman cities of Pompeii and Herculaneum.',
      'I am considered one of the most dangerous volcanoes in the world due to my proximity to densely populated areas.'
    ],
    facts: [
      'My height is approximately 1,281 meters (4,203 feet).',
      'I is still an active volcano, though currently in a quiescent state.',
      'The ruins of Pompeii and Herculaneum offer a unique glimpse into Roman life.',
      'The slopes of me are now a national park, and vineyards are cultivated on the lower slopes.',
      'Hiking to the crater rim is a popular activity, offering views of the Bay of Naples.'
    ]
  },
  {
    name: 'Budapest Parliament Building',
    clues: [
      'I am located on the Danube River in Budapest, Hungary.',
      'I am one of Europe\'s oldest legislative buildings and a notable landmark of Hungary.',
      'I exhibit Gothic Revival architecture and intricate details.'
    ],
    facts: [
      'Construction began in 1885 and was completed in 1902.',
      'I is one of the largest parliament buildings in the world.',
      'My interior features grand staircases, frescoes, and stained glass windows.',
      'The Hungarian Crown Jewels are housed and displayed within me.',
      'I is a symbol of Budapest and Hungarian national identity.'
    ]
  },
  {
    name: 'Senso-ji Temple',
    clues: [
      'I am an ancient Buddhist temple located in Asakusa, Tokyo, Japan.',
      'I am Tokyo\'s oldest temple and a significant cultural landmark.',
      'The Kaminarimon gate and Nakamise-dori street leading to me are famous attractions.'
    ],
    facts: [
      'I was founded in 645 AD.',
      'Legend says the temple was founded after two fishermen found a statue of Kannon in the Sumida River.',
      'Nakamise-dori is a street lined with shops selling traditional Japanese crafts and snacks.',
      'I was destroyed and rebuilt several times throughout history, including after WWII bombings.',
      'I hosts various festivals throughout the year, attracting large crowds.'
    ]
  },
  {
    name: 'Sistine Chapel',
    clues: [
      'I am a chapel in the Apostolic Palace, the official residence of the Pope in Vatican City.',
      'I am famous for my frescoes painted by Michelangelo, including the ceiling and The Last Judgment.',
      'I is the site of papal conclaves and important papal services.'
    ],
    facts: [
      'Michelangelo painted the ceiling frescoes between 1508 and 1512, and The Last Judgment between 1536 and 1541.',
      'Other Renaissance artists, including Botticelli, Perugino, and Pinturicchio, also contributed frescoes.',
      'The frescoes are considered masterpieces of High Renaissance art.',
      'Visitors are required to maintain silence and respectful behavior inside me.',
      'Photography is generally prohibited inside to protect the frescoes.'
    ]
  },
  {
    name: 'Hollywood Sign',
    clues: [
      'I am an American landmark and cultural icon overlooking Hollywood, Los Angeles, California.',
      'I was originally created in 1923 as an advertisement for a real estate development.',
      'I spell out "HOLLYWOOD" in 45-foot-tall (13.7 meters) white capital letters.'
    ],
    facts: [
      'The sign has been rebuilt and restored several times over the years.',
      'The sign originally read "HOLLYWOODLAND."',
      'Access directly to the sign is restricted, but there are several viewpoints in Griffith Park.',
      'I has been featured in countless films, television shows, and photographs.',
      'I represents the entertainment industry and the dream of Hollywood.'
    ]
  },
  {
    name: 'Ryoan-ji Temple',
    clues: [
      'I am a Zen Buddhist temple located in Kyoto, Japan.',
      'I am famous for my kare-sansui (dry landscape) rock garden.',
      'The garden\'s meaning and design are open to interpretation.'
    ],
    facts: [
      'I was originally a villa of the Fujiwara clan in the Heian period (794–1185).',
      'The rock garden dates from the late 15th century.',
      'The garden consists of 15 rocks arranged in groups on white gravel.',
      'From any vantage point, only 14 of the 15 rocks can be seen.',
      'I is a UNESCO World Heritage Site, part of the Historic Monuments of Ancient Kyoto.'
    ]
  },
  {
    name: 'Iguazu Falls',
    clues: [
      'I am a system of waterfalls on the Iguazu River on the border between Argentina and Brazil.',
      'I am one of the largest waterfalls systems in the world.',
      '"Devil\'s Throat" is the largest and most impressive waterfall in my system.'
    ],
    facts: [
      'The system comprises 275 falls, most of which are on the Argentinian side.',
      'Iguazu National Park surrounds the falls on both the Argentinian and Brazilian sides.',
      'Boat tours take visitors close to the base of the falls for an immersive experience.',
      'Wildlife in the area includes toucans, monkeys, and coatis.',
      'I was declared a UNESCO World Heritage Site.'
    ]
  },
  {
    name: 'Bryce Canyon National Park',
    clues: [
      'I am a national park located in Utah, United States, known for my unique geology.',
      'I am characterized by thousands of hoodoos – spire-shaped rock formations.',
      'Despite my name, I am not technically a canyon, but a collection of giant natural amphitheaters.'
    ],
    facts: [
      'My hoodoos are formed by frost weathering and stream erosion of sedimentary rock.',
      'Sunrise and sunset are particularly spectacular times to view the hoodoos.',
      'Hiking, stargazing, and scenic drives are popular activities in the park.',
      'Queen Victoria and Navajo Loop are popular hiking trails.',
      'I offer some of the darkest night skies in North America for stargazing.'
    ]
  },
  {
    name: 'Westminster Abbey',
    clues: [
      'I am a large, mainly Gothic abbey church in the City of Westminster, London, England.',
      'I have been the coronation church for British monarchs since 1066.',
      'I is also the burial place of many famous Britons, including monarchs, poets, and scientists.'
    ],
    facts: [
      'The current church was begun by Henry III in 1245.',
      'Coronations, royal weddings, and royal funerals are held at me.',
      'Poets\' Corner in my south transept is a burial and memorial place for poets and writers.',
      'Scientists such as Isaac Newton and Charles Darwin are also buried here.',
      'I is a UNESCO World Heritage Site.'
    ]
  },
  {
    name: 'Santorini',
    clues: [
      'I am a volcanic island in the Cyclades group, Greece.',
      'I am known for my whitewashed villages perched on cliffs overlooking the Aegean Sea.',
      'Oia and Fira are my most famous villages, known for stunning sunsets.'
    ],
    facts: [
      'I is what remains after a massive volcanic eruption that destroyed an early settlement.',
      'Caldera views from villages are iconic and sought-after.',
      'Black sand beaches like Perissa and Perivolos are unique features.',
      'Wine production is significant due to the volcanic soil.',
      'I is a popular honeymoon destination.'
    ]
  },
  {
    name: 'Table Mountain',
    clues: [
      'I am a flat-topped mountain forming a prominent landmark overlooking the city of Cape Town, South Africa.',
      'I am often covered by a layer of orographic cloud, known as the "tablecloth."',
      'Cable car and hiking trails offer access to my summit.'
    ],
    facts: [
      'My summit is approximately 1,085 meters (3,560 feet) above sea level.',
      'I is home to a rich diversity of plant and animal life, part of the Cape Floral Region.',
      'The cable car provides panoramic views of Cape Town and the surrounding coastline.',
      'Hiking trails range from easy walks to challenging climbs.',
      'I National Park is a protected area and popular recreation destination.'
    ]
  },
  {
    name: 'Isle of Skye',
    clues: [
      'I am the largest island in the Inner Hebrides of Scotland.',
      'I am known for my rugged landscapes, dramatic coastlines, and iconic rock formations.',
      'The Old Man of Storr and the Quiraing are famous geological features on me.'
    ],
    facts: [
      'My landscape was shaped by glaciers and volcanic activity.',
      'Dunvegan Castle, the ancestral home of Clan MacLeod, is located on me.',
      'Hiking, climbing, and wildlife watching are popular activities.',
      'Gaelic is still spoken on me, alongside English.',
      'I has been featured in numerous films, enhancing my popularity.'
    ]
  },
  {
    name: 'Capitol Hill',
    clues: [
      'I am a neighborhood in Washington, D.C., United States, housing important government buildings.',
      'I am home to the U.S. Capitol Building, Supreme Court, and Library of Congress.',
      'I is the center of the legislative and judicial branches of the U.S. federal government.'
    ],
    facts: [
      'The U.S. Capitol Building houses the Senate and House of Representatives.',
      'The Supreme Court is the highest federal court in the United States.',
      'The Library of Congress is the world\'s largest library.',
      'Eastern Market is a historic public market located in the neighborhood.',
      'I neighborhood is also residential, with historic row houses and parks.'
    ]
  },
  {
    name: 'Angkor Thom',
    clues: [
      'I was the last and most enduring capital city of the Khmer empire.',
      'I am located in present-day Cambodia, near Angkor Wat.',
      'The Bayon Temple, with its many smiling stone faces, is my central structure.'
    ],
    facts: [
      'I was built by King Jayavarman VII in the late 12th and early 13th centuries.',
      'The South Gate and its causeway lined with statues are a grand entrance to me.',
      'The Baphuon temple and the Terrace of the Elephants are other significant sites within me.',
      'I was a large, planned city with temples, palaces, and residential areas.',
      'I is a UNESCO World Heritage Site, part of Angkor.'
    ]
  },
  {
    name: 'Hagia Sophia',
    clues: [
      'I am a former Greek Orthodox patriarchal basilica, later an imperial mosque, and now a museum in Istanbul, Turkey.',
      'I am admired for my Byzantine architecture, particularly my massive dome.',
      'I has a long and complex history, reflecting shifts in religious and political power.'
    ],
    facts: [
      'I was originally built as a church in the 6th century AD by Emperor Justinian I.',
      'After the Ottoman conquest of Constantinople in 1453, I was converted into a mosque.',
      'In 1935, I became a museum, showcasing my layered history.',
      'In 2020, I was reconverted into a mosque, sparking international debate.',
      'I represents a fusion of Christian and Islamic architectural and cultural influences.'
    ]
  },
  {
    name: 'Sydney Harbour Bridge',
    clues: [
      'I am a steel arch bridge across Sydney Harbour in Australia.',
      'I am nicknamed "The Coathanger" due to my arch-based design.',
      'Climbing me offers panoramic views of Sydney Opera House and the city skyline.'
    ],
    facts: [
      'My construction was completed in 1932.',
      'I carries rail, vehicular, bicycle, and pedestrian traffic.',
      'BridgeClimb is a popular tourist activity allowing visitors to climb the arch.',
      'I is a symbol of Sydney and Australia.',
      'New Year\'s Eve fireworks display from me is a globally broadcast event.'
    ]
  },
  {
    name: 'Potala Palace',
    clues: [
      'I was the winter palace of the Dalai Lama until 1959.',
      'I am a fortress complex located in Lhasa, Tibet Autonomous Region, China.',
      'I dominates the Lhasa skyline with my impressive red and white structures.'
    ],
    facts: [
      'Construction of the current palace began in 1645.',
      'I consists of the White Palace (living quarters) and the Red Palace (religious and state functions).',
      'I houses numerous chapels, shrines, libraries, and cultural artifacts.',
      'I was converted into a museum after the Dalai Lama fled to India.',
      'I is a UNESCO World Heritage Site, part of the Historic Ensemble of the Potala Palace.'
    ]
  },
  {
    name: 'The Wave, Western Australia',
    clues: [
      'I am a natural rock formation that resembles a breaking ocean wave.',
      'I am located near Hyden, Western Australia.',
      'I is a granite cliff face sculpted by weathering over millions of years.'
    ],
    facts: [
      'My height is about 15 meters (49 feet) and my length is about 110 meters (360 feet).',
      'Rainwater runoff causes colored streaks down my side.',
      'I is a popular photo spot and tourist attraction in Western Australia.',
      'Hyden Rock, a larger rock formation, features me on one side.',
      'Walking trails and viewpoints are available to appreciate me and the surrounding landscape.'
    ]
  },
  {
    name: 'Giant Buddha of Leshan',
    clues: [
      'I am a colossal stone statue of Maitreya Buddha, carved out of a cliff face.',
      'I am located near Leshan, Sichuan province, China, at the confluence of three rivers.',
      'I was built during the Tang dynasty (713-803 AD).'
    ],
    facts: [
      'My height is 71 meters (233 feet), making me the largest stone Buddha in the world.',
      'I was carved to calm the turbulent waters at the river confluence.',
      'A sophisticated drainage system was incorporated into me to protect from erosion.',
      'I is a UNESCO World Heritage Site, part of the Mount Emei Scenic Area, including Leshan Giant Buddha.',
      'Descending stairs carved into the cliff face allow visitors to view me up close.'
    ]
  },
  {
    name: 'Kiyomizu-dera Temple',
    clues: [
      'I am an independent Buddhist temple in eastern Kyoto, Japan.',
      'I am best known for my wooden stage extending out from my main hall.',
      'My name literally means "Pure Water Temple."',
    ],
    facts: [
      'I was founded in 778, predating the founding of Kyoto as the imperial capital.',
      'The wooden stage is supported by hundreds of pillars and offers panoramic views of Kyoto.',
      'Jishu Shrine, dedicated to matchmaking, is located within my grounds.',
      'Otowa Waterfall, with three separate streams, is located at the base of my main hall.',
      'I is a UNESCO World Heritage Site, part of the Historic Monuments of Ancient Kyoto.'
    ]
  },
  {
    name: 'Meenakshi Temple',
    clues: [
      'I am a historic Hindu temple located in Madurai, Tamil Nadu, India.',
      'I is dedicated to Goddess Meenakshi and Lord Sundareswarar.',
      'I am known for my colorful gopurams (tower gateways) and intricate sculptures.'
    ],
    facts: [
      'The current structure was built between the 16th and 18th centuries.',
      'I has 14 gopurams, the tallest of which is the southern gopuram at approximately 52 meters (170 feet).',
      'The Hall of a Thousand Pillars (Ayirakkal Mandapam) is a remarkable architectural feature.',
      'The Golden Lotus Pond (Porthamarai Kulam) is considered sacred.',
      'I is a major pilgrimage site and cultural landmark in South India.'
    ]
  },
  {
    name: 'Rio de Janeiro Carnival',
    clues: [
      'I am a world-famous festival held annually in Rio de Janeiro, Brazil.',
      'I am known for my vibrant parades, samba music, and elaborate costumes.',
      'I marks the start of Lent and is a major cultural event in Brazil.'
    ],
    facts: [
      'The parades take place in the Sambadrome, a purpose-built parade avenue.',
      'Samba schools compete for the championship title with elaborate performances.',
      'Blocos (street parties) are held throughout the city during the festival.',
      'I attracts millions of tourists from around the world.',
      'I is a celebration of Brazilian culture, music, and dance.'
    ]
  },
  {
    name: 'Oktoberfest',
    clues: [
      'I am the world\'s largest Volksfest (beer festival and travelling funfair).',
      'I am held annually in Munich, Bavaria, Germany.',
      'I is known for beer tents, traditional Bavarian food, and carnival rides.'
    ],
    facts: [
      'I originated from the wedding celebrations of Prince Ludwig and Princess Therese in 1810.',
      'Millions of liters of beer are consumed during the festival.',
      'Traditional Bavarian attire, such as Dirndls and Lederhosen, is commonly worn.',
      'Beer tents are operated by Munich breweries and are known for their lively atmosphere.',
      'I typically runs for 16 to 18 days in late September and early October.'
    ]
  },
  {
    name: 'Burning Man',
    clues: [
      'I am an annual event held in the Black Rock Desert in Nevada, United States.',
      'I is described as a temporary metropolis dedicated to community, art, self-expression, and self-reliance.',
      'The Man burn and Temple burn are iconic culminating events.'
    ],
    facts: [
      'The event takes place during the week leading up to and including Labor Day weekend.',
      'Black Rock City is the temporary city erected for the event.',
      'Art installations, theme camps, and performance art are central to the experience.',
      'The "Ten Principles" guide the event, including radical inclusion and gifting.',
      'I culminates in the ceremonial burning of a large wooden effigy ("The Man") and a temple.'
    ]
  },
  {
    name: 'Waitomo Glowworm Caves',
    clues: [
      'I am a cave system on the North Island of New Zealand, known for my unique inhabitants.',
      'I are illuminated by thousands of glowworms, Arachnocampa luminosa.',
      'Boat rides through the glowworm grotto are a popular tourist experience.'
    ],
    facts: [
      'The glowworms are larvae of a fungus gnat species, bioluminescent to attract prey.',
      'The caves were first explored by local Maori and British surveyors in the late 19th century.',
      'Ruakuri Cave and Aranui Cave are other caves in the Waitomo system.',
      'Respect for the delicate ecosystem is emphasized during tours.',
      'I offer a magical and unique natural spectacle.'
    ]
  },
  {
    name: 'Jiufen Old Street',
    clues: [
      'I am a mountain town in Ruifang District, New Taipei City, Taiwan.',
      'I am known for my narrow alleyways, teahouses, and stunning views of the ocean.',
      'I is said to have inspired the setting for Studio Ghibli\'s "Spirited Away".'
    ],
    facts: [
      'I was once a prosperous gold mining town.',
      'Teahouses, such as Amei Teahouse, offer traditional Taiwanese tea and snacks.',
      'Street food stalls offer local delicacies like taro balls and peanut ice cream rolls.',
      'Lanterns and traditional architecture create a nostalgic and picturesque atmosphere.',
      'I is a popular day trip destination from Taipei.'
    ]
  },
  {
    name: 'Tsukiji Outer Market',
    clues: [
      'I am a vibrant and bustling market in Tokyo, Japan, famous for food.',
      'I is located near the site of the former Tsukiji fish market.',
      'I offer a wide variety of seafood, produce, kitchenware, and street food.'
    ],
    facts: [
      'While the inner wholesale fish market moved to Toyosu, the outer market remains.',
      'Early morning sushi breakfasts are a popular activity.',
      'Fresh seafood, including tuna, uni (sea urchin), and oysters, are readily available.',
      'Knife shops, tea shops, and pickle stalls are among the diverse offerings.',
      'I provides a taste of Japanese culinary culture and market atmosphere.'
    ]
  },
  {
    name: 'Chefchaouen',
    clues: [
      'I am a city in the Rif Mountains of northwest Morocco.',
      'I is known for my striking blue-washed buildings in various shades.',
      'I offers a relaxed atmosphere, Moroccan crafts, and mountain views.'
    ],
    facts: [
      'The blue color tradition is believed to have started by Jewish refugees in the 1930s.',
      'The medina (old city) is a UNESCO World Heritage Site.',
      'Leather and weaving workshops are traditional crafts in the city.',
      'Plaza Uta el-Hammam is the main square, surrounded by cafes and restaurants.',
      'Hiking in the Rif Mountains is accessible from me.'
    ]
  },
  {
    name: 'The Wave Organ',
    clues: [
      'I am a wave-activated acoustic sculpture located in San Francisco, California.',
      'I is built on the end of a jetty in San Francisco Bay.',
      'I creates sounds from waves hitting and interacting with organ pipes.'
    ],
    facts: [
      'I was created by artists Peter Richards and George Gonzalez, and sculptor Aristides Demetrios.',
      'My pipes are made from PVC and stone from a demolished cemetery.',
      'The sounds vary depending on the tide, wave action, and weather conditions.',
      'Listening to me is a unique and contemplative experience.',
      'I is located near the Exploratorium science museum and offers views of the Golden Gate Bridge.'
    ]
  },
  {
    name: 'Christ the King Statue, Poland',
    clues: [
      'I am a statue of Jesus Christ in Świebodzin, Poland.',
      'I is one of the tallest statues of Jesus in the world.',
      'My crown is gilded and particularly prominent.'
    ],
    facts: [
      'My height is 33 meters (108 feet), with a crown adding an additional 3 meters (10 feet).',
      'Construction was completed in 2010.',
      'I was conceived by local priest Sylwester Zawadzki.',
      'The arms of me are outstretched in a gesture of blessing and welcome.',
      'I has become a pilgrimage site and tourist attraction in western Poland.'
    ]
  },
  {
    name: 'Sossusvlei',
    clues: [
      'I am a salt and clay pan surrounded by high red sand dunes, located in the southern Namib Desert, Namibia.',
      'I am known for my towering sand dunes, some of the highest in the world.',
      'Deadvlei, a white clay pan dotted with dead acacia trees, is a striking feature within me.'
    ],
    facts: [
      'Dune 45, Big Daddy, and Elim Dune are popular dunes to climb for panoramic views.',
      'The red color of the sand dunes is due to iron oxide.',
      'Early morning and late afternoon are the best times to visit for cooler temperatures and dramatic lighting.',
      'Sesriem Canyon and Hiddenvlei are other nearby attractions.',
      'I is within the Namib-Naukluft National Park, a vast protected area.'
    ]
  },
  {
    name: 'Perito Moreno Glacier',
    clues: [
      'I am a glacier located in Los Glaciares National Park in southwest Argentina.',
      'I am one of the few glaciers in the world that is still advancing, not retreating.',
      'Calving, the breaking off of ice chunks into Lake Argentino, is a spectacular natural event to witness at me.'
    ],
    facts: [
      'My length is approximately 30 kilometers (19 miles).',
      'Boat tours and viewing platforms offer close-up views of the glacier face.',
      'Ice trekking on me is a popular adventurous activity.',
      'Los Glaciares National Park is a UNESCO World Heritage Site.',
      'Climate change and its impact on glaciers are a significant concern, despite my current advancing status.'
    ]
  },
  {
    name: 'Cappadocia',
    clues: [
      'I am a historical region in Central Anatolia, Turkey, known for my unique geological features.',
      'I am characterized by "fairy chimneys" and rock formations shaped by volcanic eruptions and erosion.',
      'Hot air ballooning over me is a world-renowned and breathtaking experience.'
    ],
    facts: [
      'Göreme Open Air Museum, a UNESCO World Heritage Site, features rock-cut churches with Byzantine frescoes.',
      'Underground cities like Derinkuyu and Kaymakli are ancient human-made cave networks.',
      'Cave hotels offer unique accommodation experiences.',
      'Pottery and rug making are traditional crafts of the region.',
      'I is a popular destination for hiking, exploring rock formations, and experiencing Turkish culture.'
    ]
  },
  {
    name: 'Zhangjiajie National Forest Park',
    clues: [
      'I am a national park located in Zhangjiajie City, Hunan Province, China.',
      'I is famous for my towering pillar-like sandstone formations.',
      'I is said to have inspired the floating mountains in the film "Avatar".'
    ],
    facts: [
      'The Avatar Hallelujah Mountain is a particularly striking pillar in the park.',
      'The Bailong Elevator, built into a cliff face, is one of the world\'s highest outdoor elevators.',
      'Glass bridges and walkways offer thrilling views.',
      'Tianzi Mountain and Yuanjiajie Scenic Area are popular sections of the park.',
      'I is a UNESCO World Heritage Site and a major tourist destination in China.'
    ]
  },
  {
    name: 'Plitvice Lakes National Park',
    clues: [
      'I am a national park in central Croatia, renowned for my 16 interconnected lakes cascading into each other.',
      'I am famous for my vibrant turquoise waters, waterfalls, and travertine barriers.',
      'Wooden boardwalks and hiking trails allow visitors to explore my beauty.'
    ],
    facts: [
      'The lakes are separated by natural travertine dams, constantly changing and evolving.',
      'Veliki Slap (Great Waterfall) is the tallest waterfall in Croatia, located within me.',
      'Boating on Kozjak Lake is a scenic way to experience the park.',
      'I is home to diverse flora and fauna, including bears, wolves, and deer.',
      'I was declared a UNESCO World Heritage Site in 1979.'
    ]
  },
    {
    name: 'Victoria Peak, Hong Kong',
    clues: [
      'I am a mountain in Hong Kong, offering panoramic views of the city skyline, Victoria Harbour, and surrounding islands.',
      'I am accessed by the historic Peak Tram, a funicular railway.',
      'The Peak Tower and Sky Terrace 428 offer viewpoints, shopping, and dining at my summit.'
    ],
    facts: [
      'My height is 552 meters (1,811 feet).',
      'I was once a residential area for wealthy Europeans in colonial times.',
      'The Peak Tram has been operating since 1888.',
      'Hiking trails around me provide closer encounters with nature.',
      'Night views from me are particularly spectacular, showcasing the illuminated city.'
    ]
  },
    {
    name: 'The Wave, Coyote Buttes',
    clues: [
      'I am a sandstone rock formation located in the Arizona desert, known for my colorful, undulating forms.',
      'I require a permit to visit due to my fragile nature and limited access.',
      'Photography within me is best during midday to minimize shadows and capture vibrant colors.'
    ],
    facts: [
      'I was formed from Jurassic-age Navajo Sandstone and eroded by wind and rain.',
      'My swirling patterns are created by cross-bedding in the sandstone.',
      'Permits are highly sought after and obtained through a lottery system.',
      'I am a popular destination for photographers and hikers seeking unique landscapes.',
      'I is part of the Paria Canyon-Vermilion Cliffs Wilderness.'
    ]
  },
    {
    name: 'Yosemite National Park',
    clues: [
      'I am a national park in California’s Sierra Nevada mountains, famed for my giant, ancient sequoia trees and the granite cliffs of El Capitan and Half Dome.',
      'I feature iconic landmarks like Yosemite Valley, Yosemite Falls, and Tunnel View.',
      'I is a UNESCO World Heritage Site, recognized for my natural beauty and granite cliffs.'
    ],
    facts: [
      'I was established in 1890, becoming one of the first national parks in the United States.',
      'Yosemite Falls is one of the tallest waterfalls in North America.',
      'Hiking, rock climbing, camping, and wildlife viewing are popular activities within me.',
      'Black bears, deer, and coyotes are among the wildlife found in the park.',
      'I attract millions of visitors annually from around the world.'
    ]
  },
    {
    name: 'Mount Bromo',
    clues: [
      'I am an active somma volcano and part of the Tengger caldera in East Java, Indonesia.',
      'I is known for my dramatic volcanic landscape, often shrouded in mist and smoke.',
      'Sunrise views from viewpoints around me are a popular and breathtaking experience.'
    ],
    facts: [
      'I is relatively small compared to the caldera surrounding it.',
      'The Sea of Sand (Pasir Laut) is a vast volcanic sand plain surrounding me.',
      'Hindu Tenggerese people hold an annual Yadnya Kasada festival at my crater.',
      'Climbing to the crater rim offers views into the active volcanic caldera.',
      'Jeep tours are a common way to explore me and the surrounding Bromo Tengger Semeru National Park.'
    ]
  },
    {
    name: 'Great Ocean Road',
    clues: [
      'I am a scenic coastal highway in Victoria, Australia.',
      'I is famous for my dramatic coastal scenery, including the Twelve Apostles rock formations.',
      'I winds along the Southern Ocean coastline, offering breathtaking ocean views and coastal towns.'
    ],
    facts: [
      'I was built by returned soldiers after World War I, dedicated as a memorial to war victims.',
      'The Twelve Apostles are limestone stacks rising from the ocean.',
      'Lorne and Apollo Bay are charming coastal towns along me.',
      'Surfing, whale watching, and hiking are popular activities along the route.',
      'I is a major tourist drive and Australian national heritage listed road.'
    ]
  },
    {
    name: 'Sagrada Familia',
    clues: [
      'I am a large unfinished Roman Catholic basilica in Barcelona, Spain.',
      'I was designed by Catalan architect Antoni Gaudí.',
      'I is characterized by my distinctive Gothic Revival and Art Nouveau architecture.'
    ],
    facts: [
      'Construction began in 1882 and is still ongoing, anticipated completion date is 2026.',
      'Gaudí dedicated over 40 years of his life to my design and construction.',
      'My Nativity Facade, Passion Facade, and Glory Facade represent different stages of Jesus\' life.',
      'Intricate sculptures and stained glass windows adorn my exterior and interior.',
      'I is a UNESCO World Heritage Site and a symbol of Barcelona.'
    ]
  },
    {
    name: 'Bora Bora',
    clues: [
      'I am a volcanic island in French Polynesia, part of the Society Islands.',
      'I am known for my luxury resorts, over-water bungalows, and turquoise lagoon.',
      'Mount Otemanu, a dormant volcano, dominates my center.'
    ],
    facts: [
      'I is surrounded by a barrier reef and smaller islets (motus).',
      'Snorkeling and diving in the lagoon are popular activities, showcasing coral reefs and marine life.',
      'Vaitape is my main settlement and harbor.',
      'Luxury hotels and resorts cater to upscale tourism.',
      'I is considered a romantic and idyllic island paradise.'
    ]
  },
    {
    name: 'Taj Mahal',
    clues: [
      'I am an ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra.',
      'I was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.',
      'I is considered the finest example of Mughal architecture, a style that combines elements of Persian, Indian, and Islamic architecture.'
    ],
    facts: [
      'I was designated as a UNESCO World Heritage Site in 1983 for being "the jewel of Muslim art in India and one of the universally admired masterpieces of the world\'s heritage."',
      'Construction began around 1632 and was completed in 1653, employing thousands of artisans and craftsmen.',
      'I features a symmetrical plan with a central dome, minarets, and gardens.',
      'Intricate inlay work with precious and semi-precious stones adorns my marble surfaces.',
      'I is a symbol of eternal love and one of the New Seven Wonders of the World.'
    ]
  },
    {
    name: 'Rotorua',
    clues: [
      'I am a city on the southern shores of Lake Rotorua in New Zealand’s North Island, known for geothermal activity.',
      'I am a hub for Māori culture, offering cultural performances and traditional hangi feasts.',
      'Geysers, hot springs, and bubbling mud pools characterize my landscape.'
    ],
    facts: [
      'Te Puia is a geothermal park with geysers, mud pools, and Māori cultural experiences.',
      'Polynesian Spa offers natural hot mineral springs overlooking Lake Rotorua.',
      'Wai-O-Tapu Thermal Wonderland features colorful hot springs and geysers, including Lady Knox Geyser.',
      'Whakarewarewa - The Living Māori Village provides cultural tours and performances.',
      'I is a center for adventure activities, including white-water rafting and mountain biking.'
    ]
  },
    {
    name: 'Mount Rainier',
    clues: [
      'I am a massive stratovolcano and the highest summit of the Cascade Range of the Pacific Northwest, located in Washington state, USA.',
      'I is surrounded by Mount Rainier National Park, featuring old-growth forest, subalpine meadows, and glacial rivers and lakes.',
      'I is glaciated, with 26 named glaciers and snowfields covering my flanks.'
    ],
    facts: [
      'My summit is 4,392 meters (14,411 feet) above sea level.',
      'Climbing me is a popular but challenging mountaineering objective.',
      'Paradise and Sunrise are popular visitor areas within Mount Rainier National Park.',
      'Wildflowers bloom profusely in my subalpine meadows during summer.',
      'I is an iconic landmark visible from Seattle and surrounding areas on clear days.'
    ]
  },
    {
    name: 'Yumthang Valley',
    clues: [
      'I am a nature sanctuary with rivers, hot springs, yaks and grazing pasture on rolling meadows surrounded by the Himalayan mountains in North Sikkim, India.',
      'I am known as the "Valley of Flowers" in Sikkim for my diverse and vibrant wildflower blooms in spring.',
      'Zero Point and Yumesamdong are popular excursions from me, offering stunning mountain views and snowscapes.'
    ],
    facts: [
      'My altitude is approximately 3,564 meters (11,693 feet) above sea level.',
      'The Shingba Rhododendron Sanctuary within me boasts over forty species of rhododendrons.',
      'Hot springs known for their therapeutic properties are located within me.',
      'Lachung and Lachen are base towns for visiting me.',
      'Permits are required to visit me due to my proximity to the Indo-China border.'
    ]
  },
    {
    name: 'Victoria Harbour, Hong Kong',
    clues: [
      'I am a natural landform harbour situated between Hong Kong Island and Kowloon Peninsula in Hong Kong.',
      'I am famous for my stunning panoramic views of the Hong Kong skyline, particularly at night.',
      'Star Ferry and harbour cruises offer iconic experiences on me.'
    ],
    facts: [
      'I is a deep-water, sheltered harbour, playing a significant role in Hong Kong\'s history as a trading port.',
      'The Symphony of Lights, a nightly light and sound show, illuminates buildings around me.',
      'Tsim Sha Tsui Promenade and Central Harbourfront offer waterfront views and walkways.',
      'Sampans and junks, traditional Chinese boats, can be seen sailing in me.',
      'I is central to Hong Kong\'s identity and tourism.'
    ]
  },
    {
    name: 'Sintra',
    clues: [
      'I am a town and municipality in the Greater Lisbon region of Portugal, famed for my romantic architecture, historic estates and villas, gardens and palaces.',
      'I is home to Pena Palace, Quinta da Regaleira, and the Moorish Castle, among other fairytale-like attractions.',
      'I is a UNESCO World Heritage Site, recognized for my cultural landscape and historic significance.'
    ],
    facts: [
      'Pena Palace is a colorful Romanticist castle atop a hill, offering stunning views.',
      'Quinta da Regaleira is a mysterious estate with initiation wells and hidden tunnels.',
      'The Moorish Castle dates back to the 8th and 9th centuries.',
      'National Palace of Sintra (Sintra Town Palace) is a well-preserved medieval royal palace.',
      'I is easily accessible as a day trip from Lisbon, Portugal.'
    ]
  }
];

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('Starting database seeding...');
    
    // Begin transaction
    await client.query('BEGIN');
    
    // Check if data already exists
    const existingData = await client.query('SELECT COUNT(*) FROM destinations');
    
    if (parseInt(existingData.rows[0].count) > 0) {
      console.log('Database already contains data. Skipping seed process.');
      await client.query('COMMIT');
      return;
    }
    
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
    
    // Commit transaction
    await client.query('COMMIT');
    
    console.log(`Seeded database with ${destinations.length} destinations`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run seed
seedDatabase()
  .then(() => {
    console.log('Seed process completed');
    pool.end();
  })
  .catch((error) => {
    console.error('Seed process failed:', error);
    pool.end();
    process.exit(1);
  });
