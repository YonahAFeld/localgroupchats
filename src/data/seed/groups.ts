// Placeholder groups — replace join_url values with real links before launch
// neighborhood_slug + category_slug are used by the seed script to look up IDs

export const SEED_GROUPS = [
  // Silver Lake
  { neighborhood: 'silver-lake', category: 'parents-kids',     name: 'Silver Lake Parents',           platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-sl-parents',        description: 'The main parents group for Silver Lake families.' },
  { neighborhood: 'silver-lake', category: 'parents-kids',     name: 'Silver Lake Moms',               platform: 'telegram', join_url: 'https://t.me/placeholder-sl-moms',                        description: 'A supportive space for moms in Silver Lake.' },
  { neighborhood: 'silver-lake', category: 'neighbors',        name: 'Silver Lake Neighborhood Watch', platform: 'nextdoor', join_url: 'https://nextdoor.com/neighborhood/silverlake',            description: 'Safety and community updates for Silver Lake.' },
  { neighborhood: 'silver-lake', category: 'buy-sell',         name: 'Silver Lake Buy Nothing',        platform: 'facebook', join_url: 'https://www.facebook.com/groups/placeholder-sl-buynoth', description: 'Give, receive, and share freely in Silver Lake.' },
  { neighborhood: 'silver-lake', category: 'fitness-outdoors', name: 'Silver Lake Runners',            platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-sl-runners',       description: 'Weekly runs around the Silver Lake Reservoir.' },
  { neighborhood: 'silver-lake', category: 'food-dining',      name: 'Silver Lake Foodies',            platform: 'telegram', join_url: 'https://t.me/placeholder-sl-foodies',                    description: 'Restaurant recs, pop-ups, and food news in Silver Lake.' },

  // Echo Park
  { neighborhood: 'echo-park',   category: 'parents-kids',     name: 'Echo Park Parents',              platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-ep-parents',        description: 'Parents community for Echo Park.' },
  { neighborhood: 'echo-park',   category: 'neighbors',        name: 'Echo Park Community',            platform: 'facebook', join_url: 'https://www.facebook.com/groups/placeholder-ep-community', description: 'General community group for Echo Park residents.' },
  { neighborhood: 'echo-park',   category: 'buy-sell',         name: 'Echo Park Buy Nothing',          platform: 'facebook', join_url: 'https://www.facebook.com/groups/placeholder-ep-buynoth', description: 'Free stuff and swaps in Echo Park.' },
  { neighborhood: 'echo-park',   category: 'fitness-outdoors', name: 'Echo Park Hikers',               platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-ep-hikers',        description: 'Weekend hikes and outdoor meetups.' },
  { neighborhood: 'echo-park',   category: 'food-dining',      name: 'Echo Park Eats',                 platform: 'telegram', join_url: 'https://t.me/placeholder-ep-eats',                       description: 'Best spots and hidden gems in Echo Park.' },

  // Los Feliz
  { neighborhood: 'los-feliz',   category: 'parents-kids',     name: 'Los Feliz Parents',              platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-lf-parents',       description: 'Parents connecting in Los Feliz.' },
  { neighborhood: 'los-feliz',   category: 'neighbors',        name: 'Los Feliz Neighbors',            platform: 'nextdoor', join_url: 'https://nextdoor.com/neighborhood/losfeliz',              description: 'Community updates for Los Feliz.' },
  { neighborhood: 'los-feliz',   category: 'fitness-outdoors', name: 'Griffith Park Runners',          platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-lf-runners',       description: 'Running and hiking in Griffith Park.' },

  // Highland Park
  { neighborhood: 'highland-park', category: 'parents-kids',   name: 'Highland Park Parents',          platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-hp-parents',       description: 'Parent community in Highland Park.' },
  { neighborhood: 'highland-park', category: 'neighbors',      name: 'Highland Park Community',        platform: 'facebook', join_url: 'https://www.facebook.com/groups/placeholder-hp-comm',    description: 'Neighbors connecting in Highland Park.' },
  { neighborhood: 'highland-park', category: 'buy-sell',       name: 'Highland Park Buy Nothing',      platform: 'facebook', join_url: 'https://www.facebook.com/groups/placeholder-hp-bn',     description: 'Free stuff in Highland Park.' },

  // Santa Monica
  { neighborhood: 'santa-monica', category: 'parents-kids',    name: 'Santa Monica Parents',           platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-sm-parents',       description: 'Parents group for Santa Monica families.' },
  { neighborhood: 'santa-monica', category: 'neighbors',       name: 'Santa Monica Neighbors',         platform: 'nextdoor', join_url: 'https://nextdoor.com/neighborhood/santamonica',           description: 'Community group for Santa Monica residents.' },
  { neighborhood: 'santa-monica', category: 'fitness-outdoors',name: 'Santa Monica Beach Runners',     platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-sm-runners',       description: 'Morning runs on the Santa Monica beach path.' },
  { neighborhood: 'santa-monica', category: 'food-dining',     name: 'Santa Monica Foodies',           platform: 'telegram', join_url: 'https://t.me/placeholder-sm-foodies',                   description: 'Food recommendations in Santa Monica.' },

  // Venice
  { neighborhood: 'venice',       category: 'parents-kids',    name: 'Venice Parents',                 platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-v-parents',        description: 'Parent community in Venice.' },
  { neighborhood: 'venice',       category: 'neighbors',       name: 'Venice Beach Community',         platform: 'facebook', join_url: 'https://www.facebook.com/groups/placeholder-v-comm',     description: 'General community for Venice residents.' },
  { neighborhood: 'venice',       category: 'fitness-outdoors',name: 'Venice Skate & Surf',            platform: 'discord',  join_url: 'https://discord.gg/placeholder-v-skate',                 description: 'Skating, surfing, and beach sports in Venice.' },

  // Culver City
  { neighborhood: 'culver-city',  category: 'parents-kids',    name: 'Culver City Parents',            platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-cc-parents',       description: 'Parents in Culver City.' },
  { neighborhood: 'culver-city',  category: 'neighbors',       name: 'Culver City Neighbors',          platform: 'nextdoor', join_url: 'https://nextdoor.com/neighborhood/culvercity',            description: 'Community updates for Culver City.' },
  { neighborhood: 'culver-city',  category: 'food-dining',     name: 'Culver City Eats',               platform: 'telegram', join_url: 'https://t.me/placeholder-cc-eats',                      description: 'Best food in Culver City.' },

  // West Hollywood
  { neighborhood: 'west-hollywood', category: 'neighbors',     name: 'WeHo Community',                 platform: 'facebook', join_url: 'https://www.facebook.com/groups/placeholder-weho-comm',  description: 'Community group for West Hollywood.' },
  { neighborhood: 'west-hollywood', category: 'fitness-outdoors', name: 'WeHo Fitness',                platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-weho-fitness',     description: 'Fitness classes and outdoor workouts in WeHo.' },
  { neighborhood: 'west-hollywood', category: 'food-dining',   name: 'WeHo Dining',                    platform: 'telegram', join_url: 'https://t.me/placeholder-weho-dining',                  description: 'Restaurant recommendations in West Hollywood.' },

  // Koreatown
  { neighborhood: 'koreatown',    category: 'neighbors',       name: 'Koreatown Community',            platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-kt-comm',          description: 'Neighbors connecting in Koreatown.' },
  { neighborhood: 'koreatown',    category: 'food-dining',     name: 'Koreatown Eats',                 platform: 'telegram', join_url: 'https://t.me/placeholder-kt-eats',                      description: 'Best Korean food and more in K-Town.' },
  { neighborhood: 'koreatown',    category: 'buy-sell',        name: 'Koreatown Buy Nothing',          platform: 'facebook', join_url: 'https://www.facebook.com/groups/placeholder-kt-bn',     description: 'Free stuff and swaps in Koreatown.' },

  // Burbank
  { neighborhood: 'burbank',      category: 'parents-kids',    name: 'Burbank Parents',                platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-b-parents',        description: 'Parent community in Burbank.' },
  { neighborhood: 'burbank',      category: 'neighbors',       name: 'Burbank Neighbors',              platform: 'nextdoor', join_url: 'https://nextdoor.com/neighborhood/burbank',               description: 'Community group for Burbank residents.' },
  { neighborhood: 'burbank',      category: 'fitness-outdoors',name: 'Burbank Hikers',                 platform: 'whatsapp', join_url: 'https://chat.whatsapp.com/placeholder-b-hikers',         description: 'Hiking and outdoor activities in and around Burbank.' },
] as const
