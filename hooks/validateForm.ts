export default function validateForm(answers: Record<number, number | null>, totalQuestions: number) {
  let answeredQuestions = 0;
  for (const key in answers) {
    if (answers[key] !== null && answers[key] !== undefined && typeof answers[key] === "number") {
      answeredQuestions += 1;
    }
  }
  return answeredQuestions === totalQuestions;
}