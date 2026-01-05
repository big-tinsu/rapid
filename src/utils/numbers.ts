export function formatNumber(num: number) {
  const userLocale = navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
  return new Intl.NumberFormat(userLocale, {
    maximumFractionDigits: 2,
  }).format(num);
}

export function truncateNumber(value: number): string {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "m";
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + "k";
  } else {
    return value.toString();
  }
}
