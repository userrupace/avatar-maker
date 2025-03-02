import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AnimalAvatarStateInterface } from "./types";
import {
  animalEarsKeys,
  animalEyebrowsKeys,
  animalEyesKeys,
  animalHairKeys,
  animalMuzzleKeys,
  animalPatternsKeys,
} from "@/components/animal-shapes";
import { animalAvatarColors, backgroundColors } from "./colors";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function seedRandomNumberFromString(str: string) {
  const hash = stringToHash(str);
  // Normalize the hash value to a number between 0 and 1
  const seedRandom = (hash % 1000000) / 1000000;
  return seedRandom;
}

export function getSecondRandomNumber(randomNumber: number, max: number) {
  // Convert the first random number (0 to 1) into a string and use it as the seed
  const randomString = randomNumber.toString();

  // Use the previous stringToHash function to generate a hash
  const hash = stringToHash(randomString);

  // Map the hash to a value between 0 and 100
  const secondRandom = Math.abs(hash % max); // Ensures value is between 0 and 100

  return secondRandom;
}

export const generateAvatarStateFromName = (
  name: string
): AnimalAvatarStateInterface => {
  const randomNumber = seedRandomNumberFromString(name);

  return {
    animalEars:
      animalEarsKeys[
        getSecondRandomNumber(randomNumber, animalEarsKeys.length)
      ],

    animalEyebrows:
      animalEyebrowsKeys[
        getSecondRandomNumber(randomNumber, animalEyebrowsKeys.length)
      ],
    animalFace: "default",
    animalEyes:
      animalEyesKeys[
        getSecondRandomNumber(randomNumber, animalEyesKeys.length)
      ],
    animalHair:
      animalHairKeys[
        getSecondRandomNumber(randomNumber, animalHairKeys.length)
      ],
    animalMuzzle:
      animalMuzzleKeys[
        getSecondRandomNumber(randomNumber, animalMuzzleKeys.length)
      ],
    animalPatterns:
      animalPatternsKeys[
        getSecondRandomNumber(randomNumber, animalPatternsKeys.length)
      ],

    avatarColor:
      animalAvatarColors[
        getSecondRandomNumber(randomNumber, animalAvatarColors.length)
      ],
    bgColor:
      backgroundColors[
        getSecondRandomNumber(randomNumber, backgroundColors.length)
      ],
    bgType: "circle",
  };
};
