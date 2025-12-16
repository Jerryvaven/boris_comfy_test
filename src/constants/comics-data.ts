export interface ComicData {
  title: string;
  author: string;
  totalPages: number;
  imagePath: string;
  imagePrefix: string;
  imageExtension: string;
}

export const comicsData: Record<string, ComicData> = {
  "captain-america": {
    title: "Captain America",
    author: "Stan Jackson",
    totalPages: 23,
    imagePath: "/assets/Images/Captain America",
    imagePrefix: "Captain_",
    imageExtension: ".jpg"
  },
  // Add more comics here as needed
  "ocean-rescue-squad": {
    title: "Ocean Rescue Squad",
    author: "Stan Jackson", 
    totalPages: 20,
    imagePath: "/assets/Images/Ocean Rescue Squad", // placeholder path
    imagePrefix: "Ocean_",
    imageExtension: ".jpg"
  }
};

export function getComicData(slug: string): ComicData | null {
  // Extract comic series from slug (e.g., "captain-america-1" -> "captain-america")
  const parts = slug.split('-');
  const number = parts[parts.length - 1];
  const seriesSlug = parts.slice(0, -1).join('-');
  
  return comicsData[seriesSlug] || null;
}

export function getComicImagePath(comicData: ComicData, pageNumber: number): string {
  return `${comicData.imagePath}/${comicData.imagePrefix}${pageNumber}${comicData.imageExtension}`;
}