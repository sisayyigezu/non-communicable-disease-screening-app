
export default function getResultByScore({
  type,
  score,
}: {
  type: "findrisc" | "thyroid";
  score: number;
}): {
  score: number;
  riskLevel: "low" | "mild" | "high" | "veryHigh";
} {
  const calculateThyroidScore = (
    score: number,
  ): {
    score: number;
    riskLevel: "low" | "mild" | "high" | "veryHigh";
  } => {
    if (score <= 4) {
      return {
        score: score,
        riskLevel: "low",
      };
    } else if (score <= 8) {
      return {
        score: score,
        riskLevel: "mild",
      };
    } else if (score <= 13) {
      return {
        score: score,
        riskLevel: "high",
      };
    } else {
      return {
        score: score,
        riskLevel: "veryHigh",
      };
    }
  };
  const calculateFindriscScore = (
    score: number,
  ): {
    score: number;
    riskLevel: "low" | "mild" | "high" | "veryHigh";
  } => {
    /**
     * Total Score 20	Risk Level	Recommendation
     *   0–4	Low risk	Lifestyle education
     *  5–8	Mild risk	Diet & activity counseling
     *   9–12	Moderate risk	Recommend fasting glucose / HbA1c
     *  ≥13	High risk	Urgent referral for diabetes testing
     */
    if (score <= 4) {
      return {
        score: score,
        riskLevel: "low",
      };
    } else if (score <= 8) {
      return {
        score: score,
        riskLevel: "mild",
      };
    } else if (score <= 12) {
      return {
        score: score,
        riskLevel: "high",
      };
    } else {
      return {
        score: score,
        riskLevel: "veryHigh",
      };
    }
  };
  const result =
    type === "thyroid"
      ? calculateThyroidScore(score)
      : (calculateFindriscScore(score) as {
          score: number;
          riskLevel: "low" | "mild" | "high" | "veryHigh";
        });
  return result;
}
