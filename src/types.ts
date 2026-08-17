export interface StatBar {
  label: string;
  value: number; // 0-100
}

export interface PhotoItem {
  src: string;
  caption?: string;
}

export interface FavoriteThing {
  question: string;
  answer: string;
}

export interface Award {
  title: string;
}

export interface Review {
  quote: string;
  source: string;
  rating: number; // 1-5
}

export interface FutureGoal {
  text: string;
}

export interface Episode {
  title: string;
  description: string;
  image: string;
  locked?: boolean;
  lockedMessage?: string;
}

export interface BirthdayData {
  // Core identity
  name: string;
  nickname?: string;
  age: number | string;
  birthday: string; // display string, e.g. "August 24"

  // Hero
  heroImage: string;
  taglines: string[];
  metadataLine: string; // e.g. "Birthday • Documentary • Comedy • 1 Special"
  synopsis: string;

  // Now streaming card
  nowStreamingDescription: string;

  // Chapter 01 — origin
  originPhotos: PhotoItem[];
  originText: string[];

  // Chapter 02 — main character energy
  personalityPhotos: PhotoItem[];
  stats: StatBar[];

  // Chapter 03 — things that make her her
  favoriteThings: FavoriteThing[];

  // Chapter 04 — awards
  awards: Award[];
  specialAwardRecipientNote: string;

  // Chapter 05 — reviews
  reviews: Review[];

  // Chapter 06 — future
  futureGoals: FutureGoal[];

  // Birthday premiere
  birthdayMessage: string;
  finalPhoto: string;

  // Episodes rail
  episodes: Episode[];

  // Easter eggs
  secretProfileMessage: string;
  searchEasterEggs: string[];
  secretKeyboardMessage: string;
}
