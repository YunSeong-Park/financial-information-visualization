function* getCompositionIter<T, K>(
  iter1: IterableIterator<T>,
  iter2: IterableIterator<K>
): IterableIterator<[T, K]> {
  const list1 = [...iter1];
  const list2 = [...iter2];
  for (let item1 of list1) {
    for (let item2 of list2) {
      yield [item1, item2];
    }
  }
}

export default getCompositionIter;
