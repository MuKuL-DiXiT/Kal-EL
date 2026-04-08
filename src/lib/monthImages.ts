const monthImages: Record<number, string> = {
  0: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=600&fit=crop",
  1: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=600&fit=crop",
  2: "https://images.unsplash.com/photo-1490332215859-85a8a01e3e1f?w=1200&h=600&fit=crop",
  3: "https://images.unsplash.com/photo-1490332215859-85a8a01e3e1f?w=1200&h=600&fit=crop",
  4: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop",
  5: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
  6: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
  7: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=600&fit=crop",
  8: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=600&fit=crop",
  9: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
  10: "https://images.unsplash.com/photo-1507371341519-e21cc028cb29?w=1200&h=600&fit=crop",
  11: "https://images.unsplash.com/photo-1507132936541-e7e2b4e5c52d?w=1200&h=600&fit=crop",
};

export function getImageForMonth(month: number): string {
  return monthImages[month] || monthImages[0];
}

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
