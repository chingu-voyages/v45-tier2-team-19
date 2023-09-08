export function createIntervals(startYear, endYear, interval) {
  const intervals = [];

  intervals.push(`-Infinity ${startYear}`);

  for (
    let currentYear = startYear + interval;
    currentYear <= endYear - interval;
    currentYear += interval
  ) {
    intervals.push(`${currentYear - interval + 1} ${currentYear}`);
  }

  intervals.push(`${endYear - interval + 1} 2023`);

  return intervals;
}

// const intervals = createYearIntervals(1400, 2050, 50);
// console.log(intervals);
