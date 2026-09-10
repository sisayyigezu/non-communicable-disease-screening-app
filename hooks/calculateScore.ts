export default function calculateScore(answers: Record<number, number | null>): number {
  let score: number = 0;
  for (const key in answers) {
    const value = answers[key];
    if (value !== null) {
      score = score + value;
      console.log("Score:", score);
    }
  }
  return score;
}