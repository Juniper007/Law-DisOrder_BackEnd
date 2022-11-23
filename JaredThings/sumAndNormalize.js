export function sumAndNormalize(weightedTables, filters, communityObjects) {
  const summedTables = [];
  const normalizedTables = [];
  for (const i in communityObjects) {
    summedTables[i] = {};
    Object.assign(summedTables[i], communityObjects[i]);
  }
  for (const i in weightedTables) {
    for (const j in weightedTables[i]) {
      summedTables[j].crimeScore =
        summedTables[j].crimeScore + weightedTables[i][j].crimeScore;
    }
  }

  let max = 0;
  for (const i in summedTables) {
    normalizedTables[i] = {};
    if (summedTables[i].crimeScore > max) {
      max = summedTables[i].crimeScore;
    }
    Object.assign(normalizedTables[i], summedTables[i]);
  }
  for (const i in normalizedTables) {
    if (max > 0) {
      normalizedTables[i].crimeScore = normalizedTables[i].crimeScore / max;
    }
  }
  return [normalizedTables, summedTables];
}
