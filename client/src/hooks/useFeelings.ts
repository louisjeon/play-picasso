export type Feelings =
  | "happy"
  | "laughing"
  | "sad"
  | "affectionate"
  | "absurd"
  | "excited"
  | "motivated"
  | "cool"
  | "angry"
  | "mindblown"
  | "confused"
  | "shocked"
  | "gloomy";

export const useFeelings = () => {
  return {
    happy: "😃",
    laughing: "😂",
    sad: "🥲",
    affectionate: "😍",
    absurd: "😅",
    excited: "😆",
    motivated: "🤩",
    cool: "😎",
    angry: "😡",
    mindblown: "🤯",
    confused: "😳",
    shocked: "😱",
    gloomy: "😞",
  };
};
