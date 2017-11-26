// remove sources with duplicate
export function removeDuplicates(sources) {
  let result = sources.filter((item, index, array) => {
    return (index === 0) ? true : item.url !== array[index - 1].url;
  });
  return result;
}

// create map from sources, use category as a key
export function categorize(sources) {
  let map = new Map();
  return sources.reduce((map, item) => {
    const category = item.category;
    if (!map.has(category)) {
      // Array.from instead of [item]
      map.set(category, Array.from(item));
    } else {
      const values = map.get(category);
      if (values.findIndex(compareIDs, item) === -1) {
        values.push(item);
      }
      map.set(category, values);
    }
    return map;
  }, map);
}

// compare objects ids
function compareIDs(source) {
  if (source.id === this.id) {
    return true
  }
  return false
}