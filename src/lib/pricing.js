export const PACKAGES = [
  {
    id: "standard",
    label: "Стандартная уборка",
    hint: "от 150 ₾",
    points: [
      [30, 150],
      [50, 150],
      [60, 160],
      [70, 170],
      [80, 180],
      [100, 195],
      [150, 250],
    ],
    features: [
      "Стандартная уборка",
      "Профессиональная техника Karcher",
      "Договор и чеки",
    ],
  },
  {
    id: "general",
    label: "Генеральная уборка",
    hint: "от 230 ₾",
    points: [
      [30, 230],
      [50, 230],
      [60, 250],
      [70, 270],
      [80, 290],
      [100, 340],
      [150, 495],
    ],
    features: [
      "Генеральная уборка",
      "Профессиональная техника Karcher",
      "Договор и чеки",
    ],
    popular: true,
  },
  {
    id: "premium",
    label: "Генеральная + окна",
    hint: "от 280 ₾",
    points: [
      [30, 280],
      [50, 280],
      [60, 310],
      [70, 340],
      [80, 370],
      [100, 450],
      [150, 675],
    ],
    features: [
      "Генеральная + окна",
      "Профессиональная техника Karcher",
      "Договор и чеки",
    ],
  },
  {
    id: "renovation",
    label: "После ремонта",
    hint: "от 280 ₾",
    points: null, // считается формулой ниже
    features: [
      "После ремонта",
      "Профессиональная техника Karcher",
      "Договор и чеки",
    ],
  },
];

export const OPTIONS = [
  { id: "windows", label: "Мытьё окон", price: 60 },
  { id: "upholstery", label: "Химчистка мягкой мебели", price: 80 },
  { id: "balcony", label: "Балкон или лоджия", price: 50 },
  { id: "disinfection", label: "Дополнительная дезинфекция", price: 35 },
];

// Границы слайдера (HTML-инпут не может выйти за них физически).
// Текстовое поле рядом со слайдером не ограничено этими значениями.
export const MIN_AREA = 30;
export const MAX_AREA = 300;

// Линейная интерполяция между известными точками,
// с экстраполяцией и вниз (площадь меньше первой точки),
// и вверх (площадь больше последней точки).
function interpolate(points, area) {
  if (area <= points[0][0]) {
    if (points.length < 2) return points[0][1];
    const [x1, y1] = points[0];
    const [x2, y2] = points[1];
    const rate = (y2 - y1) / (x2 - x1);
    return Math.max(0, Math.round(y1 + rate * (area - x1)));
  }
  if (area >= points[points.length - 1][0]) {
    const [x1, y1] = points[points.length - 2];
    const [x2, y2] = points[points.length - 1];
    const rate = (y2 - y1) / (x2 - x1);
    return Math.round(y2 + rate * (area - x2));
  }
  const upperIndex = points.findIndex(([pointArea]) => pointArea >= area);
  const [x1, y1] = points[upperIndex - 1];
  const [x2, y2] = points[upperIndex];
  const rate = (y2 - y1) / (x2 - x1);
  return Math.round(y1 + rate * (area - x1));
}

export function getBasePrice(packageId, area) {
  const pkg = PACKAGES.find((p) => p.id === packageId);
  if (!pkg) return 0;
  if (pkg.id === "renovation") {
    return Math.max(280, Math.round(area * 5.2));
  }
  return interpolate(pkg.points, area);
}

export function getOptionsPrice(selectedOptionIds) {
  return OPTIONS.filter((o) => selectedOptionIds.includes(o.id)).reduce(
    (sum, o) => sum + o.price,
    0,
  );
}

export function getEstimate(packageId, area, selectedOptionIds = []) {
  return getBasePrice(packageId, area) + getOptionsPrice(selectedOptionIds);
}

export function clampArea(value) {
  return Math.min(MAX_AREA, Math.max(MIN_AREA, value));
}
