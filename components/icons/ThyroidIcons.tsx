import React from "react";
import {
  Circle,
  Ellipse,
  Line,
  Path,
  Polygon,
  Rect,
  Svg,
  Text,
} from "react-native-svg";

const iconStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
};

const labelStyle = {
  fontSize: "12px",
  fontWeight: 500,
  color: "#555",
  textAlign: "center",
  maxWidth: "100px",
  lineHeight: 1.3,
};

// ── individual icon components ──────────────────────────────────────────────

export function AgeIcon({ size = 150, color = "#7F77DD" }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Age"
    >
      <Rect
        x="14"
        y="12"
        width="52"
        height="56"
        rx="8"
        stroke={color}
        strokeWidth="2"
      />
      <Rect
        x="14"
        y="12"
        width="52"
        height="18"
        rx="8"
        fill={color}
        fillOpacity="0.15"
      />
      <Line x1="14" y1="30" x2="66" y2="30" stroke={color} strokeWidth="1.5" />
      {/* calendar day dots */}
      {[22, 40, 58].map((x) =>
        [42, 52, 62].map((y) => (
          <Circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="3"
            fill={x === 40 && y === 52 ? color : color}
            fillOpacity={x === 40 && y === 52 ? 1 : 0.3}
          />
        )),
      )}
      {/* "35" marker */}
      <Text
        x="40"
        y="53"
        textAnchor="middle"
        // dominantBaseline="central"
        fontSize="9"
        fontWeight="700"
        fill={color}
      >
        35
      </Text>
    </Svg>
  );
}

export function GenderIcon({
  size = 150,
  maleColor = "#7F77DD",
  femaleColor = "#D4537E",
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Gender"
    >
      {/* male ♂ */}
      <Circle cx="28" cy="44" r="16" stroke={maleColor} strokeWidth="2.5" />
      <Line
        x1="40"
        y1="32"
        x2="54"
        y2="18"
        stroke={maleColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Line
        x1="44"
        y1="18"
        x2="54"
        y2="18"
        stroke={maleColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Line
        x1="54"
        y1="18"
        x2="54"
        y2="28"
        stroke={maleColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* female ♀ */}
      <Circle cx="54" cy="36" r="16" stroke={femaleColor} strokeWidth="2.5" />
      <Line
        x1="54"
        y1="52"
        x2="54"
        y2="66"
        stroke={femaleColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Line
        x1="46"
        y1="61"
        x2="62"
        y2="61"
        stroke={femaleColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SweatIcon({
  size = 150,
  color = "#7F77DD",
  sunColor = "#EF9F27",
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Very little sweating"
    >
      {/* sun */}
      <Circle cx="62" cy="18" r="10" fill={sunColor} fillOpacity="0.75" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <Line
          key={i}
          x1={62 + 12 * Math.cos((deg * Math.PI) / 180)}
          y1={18 + 12 * Math.sin((deg * Math.PI) / 180)}
          x2={62 + 16 * Math.cos((deg * Math.PI) / 180)}
          y2={18 + 16 * Math.sin((deg * Math.PI) / 180)}
          stroke={sunColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ))}
      {/* body */}
      <Ellipse cx="34" cy="32" rx="14" ry="17" stroke={color} strokeWidth="2" />
      <Path
        d="M20 42 Q10 48 8 58"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M48 42 Q58 48 60 58"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* tiny sweat drop */}
      <Ellipse cx="22" cy="62" rx="4" ry="5" fill={color} fillOpacity="0.25" />
      {/* X over sweat */}
      <Line
        x1="13"
        y1="68"
        x2="31"
        y2="76"
        stroke="#E24B4A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Line
        x1="31"
        y1="68"
        x2="13"
        y2="76"
        stroke="#E24B4A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function WeightGainIcon({
  size = 150,
  color = "#7F77DD",
  arrowColor = "#E24B4A",
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Unexplained weight gain"
    >
      {/* head */}
      <Circle cx="40" cy="20" r="12" stroke={color} strokeWidth="2" />
      {/* wider body on scale */}
      <Path
        d="M26 32 Q22 50 20 58 L60 58 Q58 50 54 32 Z"
        fill={color}
        fillOpacity="0.12"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* scale plate */}
      <Ellipse
        cx="40"
        cy="58"
        rx="26"
        ry="7"
        fill={color}
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* scale base */}
      <Rect
        x="26"
        y="64"
        width="28"
        height="6"
        rx="3"
        fill={color}
        fillOpacity="0.2"
      />
      {/* up arrow */}
      <Line
        x1="68"
        y1="60"
        x2="68"
        y2="22"
        stroke={arrowColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        markerEnd="url(#upArrow)"
      />
      <Polygon points="68,14 63,24 73,24" fill={arrowColor} />
    </Svg>
  );
}

export function DrySkinIcon({
  size = 150,
  color = "#7F77DD",
  crackColor = "#BA7517",
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Dry skin"
    >
      {/* hand outline */}
      <Path
        d="M22 68 Q18 48 20 26 Q21 18 28 18 Q35 18 35 26 L35 38 Q37 28 43 26 Q50 24 50 34 L50 40 Q52 30 58 30 Q64 28 64 40 L64 68 Q64 76 54 78 L34 78 Q20 80 22 68Z"
        stroke={color}
        strokeWidth="2"
      />
      {/* crack lines */}
      <Path
        d="M34 38 Q36 43 34 48"
        stroke={crackColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Path
        d="M46 42 Q49 48 46 53"
        stroke={crackColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Path
        d="M56 34 Q58 39 56 44"
        stroke={crackColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Path
        d="M38 54 Q41 59 38 64"
        stroke={crackColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* desert waves */}
      <Path
        d="M8 20 Q14 14 20 20 Q14 26 8 20Z"
        fill={crackColor}
        fillOpacity="0.3"
      />
      <Path
        d="M8 10 Q12 4 16 10"
        stroke={crackColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        fillOpacity="0.2"
      />
    </Svg>
  );
}

export function ConstipationIcon({
  size = 150,
  color = "#7F77DD",
  blockColor = "#E24B4A",
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Constipation or digestion problems"
    >
      {/* stomach */}
      <Circle
        cx="40"
        cy="28"
        r="18"
        stroke={color}
        strokeWidth="1.5"
        fillOpacity="0.1"
        fill={color}
      />
      <Circle cx="34" cy="24" r="4" fill={color} fillOpacity="0.3" />
      <Circle cx="44" cy="30" r="3" fill={color} fillOpacity="0.3" />
      {/* intestine Path */}
      <Path
        d="M40 46 Q40 58 30 60 Q18 62 18 52 Q18 42 28 42 Q38 40 38 52"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* blockage */}
      <Rect
        x="22"
        y="62"
        width="36"
        height="8"
        rx="4"
        fill={blockColor}
        fillOpacity="0.7"
      />
      <Line
        x1="32"
        y1="70"
        x2="29"
        y2="78"
        stroke={blockColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="40"
        y1="70"
        x2="40"
        y2="78"
        stroke={blockColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="48"
        y1="70"
        x2="51"
        y2="78"
        stroke={blockColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function SlowMovementsIcon({ size = 150, color = "#7F77DD" }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Slow movements"
    >
      {/* person */}
      <Circle cx="32" cy="18" r="12" stroke={color} strokeWidth="2" />
      <Line
        x1="32"
        y1="30"
        x2="32"
        y2="56"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Path
        d="M32 40 Q18 46 14 54"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M32 40 Q44 46 48 54"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M32 56 Q26 66 24 76"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M32 56 Q38 66 42 76"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* snail */}
      <Ellipse
        cx="64"
        cy="64"
        rx="13"
        ry="9"
        stroke={color}
        strokeWidth="1.5"
        fillOpacity="0.1"
        fill={color}
      />
      <Path
        d="M51 64 Q49 72 62 73 Q74 73 77 64"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Circle
        cx="60"
        cy="60"
        // rx="6"
        // ry="5"
        r="5"
        stroke={color}
        strokeWidth="1.2"
        fillOpacity="0.1"
        fill={color}
      />
      {/* slow dashes */}
      <Line
        x1="8"
        y1="46"
        x2="2"
        y2="46"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="3 2"
        opacity="0.4"
      />
      <Line
        x1="8"
        y1="52"
        x2="4"
        y2="52"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="2 3"
        opacity="0.3"
      />
    </Svg>
  );
}

export function SlowReactionIcon({
  size = 150,
  color = "#7F77DD",
  signalColor = "#1D9E75",
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Slow reaction speed"
    >
      {/* brain */}
      <Path
        d="M28 50 Q20 36 24 22 Q30 8 42 10 Q54 8 60 22 Q64 36 56 50 Q52 58 42 60 Q32 58 28 50Z"
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M42 10 Q42 30 42 60"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.3"
      />
      <Path
        d="M26 30 Q35 28 42 35"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.4"
        strokeLinecap="round"
      />
      <Path
        d="M58 30 Q49 28 42 35"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.4"
        strokeLinecap="round"
      />
      {/* signal dot */}
      <Circle cx="10" cy="36" r="6" fill={signalColor} fillOpacity="0.8" />
      <Line
        x1="16"
        y1="36"
        x2="26"
        y2="40"
        stroke={signalColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Polygon points="28,38 22,34 22,42" fill={signalColor} />
      {/* slow dashed response */}
      <Line
        x1="58"
        y1="50"
        x2="70"
        y2="62"
        stroke="#E24B4A"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <Polygon points="74,66 66,60 72,56" fill="#E24B4A" />
      {/* clock */}
      <Circle
        cx="68"
        cy="22"
        r="10"
        stroke={color}
        strokeWidth="1.5"
        fillOpacity="0.1"
        fill={color}
      />
      <Line
        x1="68"
        y1="22"
        x2="68"
        y2="14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Line
        x1="68"
        y1="22"
        x2="75"
        y2="28"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function PuffyFaceIcon({
  size = 150,
  color = "#7F77DD",
  arrowColor = "#E24B4A",
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Face puffiness"
    >
      {/* puffy wide face */}
      <Ellipse cx="40" cy="42" rx="34" ry="36" stroke={color} strokeWidth="2" />
      {/* eyes with puffiness underneath */}
      <Ellipse
        cx="28"
        cy="36"
        rx="7"
        ry="5"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="1.5"
      />
      <Ellipse
        cx="52"
        cy="36"
        rx="7"
        ry="5"
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="1.5"
      />
      <Circle cx="28" cy="36" r="3" fill={color} fillOpacity="0.7" />
      <Circle cx="52" cy="36" r="3" fill={color} fillOpacity="0.7" />
      {/* nose */}
      <Path
        d="M36 48 Q40 55 44 48"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* flat mouth */}
      <Path
        d="M30 60 Q40 63 50 60"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* outward puff arrows */}
      <Line x1="4" y1="42" x2="2" y2="42" stroke={arrowColor} strokeWidth="2" />
      <Polygon
        points="2,42 10,38 10,46"
        fill={arrowColor}
        transform="rotate(180,6,42)"
      />
      <Line
        x1="74"
        y1="42"
        x2="76"
        y2="42"
        stroke={arrowColor}
        strokeWidth="2"
      />
      <Polygon points="70,38 70,46 78,42" fill={arrowColor} />
      <Polygon points="36,4 44,4 40,2" fill={arrowColor} />
      <Line x1="40" y1="4" x2="40" y2="8" stroke={arrowColor} strokeWidth="2" />
    </Svg>
  );
}

export function ColdExtremitiesIcon({
  size = 150,
  color = "#7F77DD",
  coldColor = "#378ADD",
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Cold hands and feet"
    >
      {/* hand */}
      <Path
        d="M12 56 Q10 38 12 18 Q13 10 18 10 Q23 10 23 18 L23 26 Q25 18 30 16 Q36 14 36 22 L36 30 Q38 22 43 20 Q48 18 48 28 L48 56 Q48 64 40 66 L22 66 Q12 68 12 56Z"
        stroke={color}
        strokeWidth="1.8"
      />
      {/* snowflake on hand */}
      <Text
        x="30"
        y="50"
        textAnchor="middle"
        // dominantBaseline="central"
        fontSize="18"
        fill={coldColor}
        fillOpacity="0.8"
      >
        ❄
      </Text>
      {/* foot */}
      <Path
        d="M52 32 Q48 24 55 16 Q63 10 72 13 Q80 17 80 26 Q80 34 72 38 L58 42 Q51 44 51 38 Z"
        stroke={color}
        strokeWidth="1.8"
      />
      {/* toes */}
      <Ellipse cx="78" cy="17" rx="4" ry="5" stroke={color} strokeWidth="1.2" />
      <Ellipse
        cx="72"
        cy="12"
        rx="3.5"
        ry="4.5"
        stroke={color}
        strokeWidth="1.2"
      />
      <Ellipse
        cx="65"
        cy="11"
        rx="3.5"
        ry="4.5"
        stroke={color}
        strokeWidth="1.2"
      />
      {/* snowflake on foot */}
      <Text
        x="63"
        y="30"
        textAnchor="middle"
        // dominantBaseline="central"
        fontSize="14"
        fill={coldColor}
        fillOpacity="0.8"
      >
        ❄
      </Text>
    </Svg>
  );
}

export function HearingLossIcon({
  size = 150,
  color = "#7F77DD",
  lossColor = "#E24B4A",
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Gradual hearing loss"
    >
      {/* ear */}
      <Path
        d="M32 6 Q14 8 12 32 Q10 52 18 62 Q24 70 32 66 Q40 64 42 56 Q46 44 38 40 Q32 36 34 28 Q36 20 44 20 Q52 20 54 30 Q56 44 46 54 Q38 62 36 70 Q34 78 42 80 Q54 82 64 66 Q76 48 76 32 Q76 6 56 0 Z"
        stroke={color}
        strokeWidth="2"
      />
      {/* sound waves (fading) */}
      <Path
        d="M68 28 Q76 36 76 44 Q76 52 68 60"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <Path
        d="M74 20 Q86 32 86 44 Q86 56 74 68"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.2"
      />
      {/* X cross over waves */}
      <Line
        x1="66"
        y1="26"
        x2="80"
        y2="42"
        stroke={lossColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Line
        x1="80"
        y1="26"
        x2="66"
        y2="42"
        stroke={lossColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* downward arrow = loss */}
      <Line
        x1="20"
        y1="20"
        x2="20"
        y2="38"
        stroke={lossColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Polygon points="20,44 15,36 25,36" fill={lossColor} />
    </Svg>
  );
}

export function ThroatClearingIcon({ size = 150, color = "#7F77DD" }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Clearing throat often"
    >
      {/* neck / throat */}
      <Path
        d="M30 4 L30 52 Q30 64 40 68 Q50 64 50 52 L50 4"
        stroke={color}
        strokeWidth="2"
      />
      {/* thyroid area */}
      <Ellipse
        cx="40"
        cy="42"
        rx="14"
        ry="12"
        fill={color}
        fillOpacity="0.12"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* speech bubbles (ahem) */}
      <Ellipse
        cx="62"
        cy="24"
        rx="16"
        ry="10"
        fill={color}
        fillOpacity="0.1"
        stroke={color}
        strokeWidth="1.2"
      />
      <Path d="M50 30 L46 36 L54 32Z" fill={color} fillOpacity="0.2" />
      <Text
        x="62"
        y="24"
        textAnchor="middle"
        // dominantBaseline="central"
        fontSize="8"
        fontStyle="italic"
        fill={color}
        fontWeight="500"
      >
        ahem
      </Text>
      <Ellipse
        cx="66"
        cy="50"
        rx="12"
        ry="8"
        fill={color}
        fillOpacity="0.07"
        stroke={color}
        strokeWidth="1"
        opacity="0.6"
      />
      <Path d="M54 54 L50 60 L58 57Z" fill={color} fillOpacity="0.15" />
      <Text
        x="66"
        y="50"
        textAnchor="middle"
        // dominantBaseline="central"
        fontSize="7"
        fontStyle="italic"
        fill={color}
        opacity="0.5"
      >
        ahem
      </Text>
    </Svg>
  );
}

export function TinglingIcon({
  size = 150,
  color = "#7F77DD",
  sparkColor = "#EF9F27",
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Tingling or burning sensations"
    >
      {/* body */}
      <Ellipse
        cx="40"
        cy="22"
        rx="14"
        ry="15"
        stroke={color}
        strokeWidth="1.8"
      />
      <Path
        d="M28 36 L24 72 L56 72 L52 36 Z"
        stroke={color}
        strokeWidth="1.8"
      />
      {/* legs */}
      <Line
        x1="34"
        y1="72"
        x2="30"
        y2="80"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Line
        x1="46"
        y1="72"
        x2="50"
        y2="80"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* left lightning bolt */}
      <Path
        d="M14 38 L6 52 L14 50 L6 66"
        stroke={sparkColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* right lightning bolt */}
      <Path
        d="M66 38 L74 52 L66 50 L74 66"
        stroke={sparkColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* sparks */}
      <Circle cx="8" cy="70" r="2.5" fill={sparkColor} fillOpacity="0.7" />
      <Circle cx="72" cy="70" r="2.5" fill={sparkColor} fillOpacity="0.7" />
      <Circle cx="4" cy="34" r="2" fill="#E24B4A" fillOpacity="0.6" />
      <Circle cx="76" cy="34" r="2" fill="#E24B4A" fillOpacity="0.6" />
    </Svg>
  );
}

export function ThickenedSkinIcon({ size = 150, color = "#7F77DD" }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-label="Thickened skin on hands elbows or forearms"
    >
      {/* arm cross-section */}
      <Rect
        x="22"
        y="22"
        width="44"
        height="36"
        rx="10"
        stroke={color}
        strokeWidth="1.5"
        fillOpacity="0.08"
        fill={color}
      />
      {/* inner layer */}
      <Rect
        x="30"
        y="28"
        width="28"
        height="24"
        rx="7"
        stroke={color}
        strokeWidth="1"
        fillOpacity="0.05"
        fill={color}
      />
      {/* thick outer layer represented by bold stroke segment */}
      <Rect
        x="22"
        y="22"
        width="44"
        height="36"
        rx="10"
        stroke={color}
        strokeWidth="7"
        strokeOpacity="0.18"
        fill="none"
      />
      {/* elbow bump */}
      <Circle
        cx="66"
        cy="50"
        r="12"
        stroke={color}
        strokeWidth="2"
        fillOpacity="0.1"
        fill={color}
      />
      <Circle cx="66" cy="50" r="7" fillOpacity="0.12" fill={color} />
      {/* thickness indicator: thin Line vs thick Line */}
      <Line
        x1="10"
        y1="26"
        x2="10"
        y2="34"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Text
        x="10"
        y="38"
        textAnchor="middle"
        fontSize="6"
        fill={color}
        opacity="0.5"
      >
        thin
      </Text>
      <Line
        x1="10"
        y1="48"
        x2="10"
        y2="64"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <Text
        x="10"
        y="70"
        textAnchor="middle"
        fontSize="6"
        fill={color}
        opacity="0.7"
      >
        thick
      </Text>
    </Svg>
  );
}
