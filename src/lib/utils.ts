import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// This function removes all non-ascii characters from a string and returns the ascii string
export function convertToAscii(inputString: string){
  const asciiString = inputString.replace(/[^\x00-\x7F]/g, "");
  return asciiString;
}