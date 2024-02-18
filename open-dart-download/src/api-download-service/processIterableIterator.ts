async function* processIterableIterator<T>(
  iterableIterator: IterableIterator<T>
): AsyncIterableIterator<T> {
  let executeCount = 0;
  let totalExecuteCount = 0;
  const intervalTime = 120_000;
  for (let v of iterableIterator) {
    if (executeCount >= 499) {
      executeCount = 0;
      await new Promise((resolve) => setTimeout(resolve, intervalTime));
    }

    yield v;
    executeCount++;
    totalExecuteCount++;
  }
}

export default processIterableIterator;
