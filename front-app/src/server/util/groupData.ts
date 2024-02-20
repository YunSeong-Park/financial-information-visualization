export const groupData = <Key extends string, Prop extends string>(
  data: Record<Key | Prop, unknown>[],
  keyList: Key[]
): { key: Record<Key, unknown>; data: Record<Prop, unknown>[] }[] => {
  if (data.length === 0) {
    return [];
  }

  const props = Object.keys(data[0]).filter(
    (prop: any): prop is Prop => !keyList.includes(prop)
  );

  const result: { key: Record<Key, unknown>; data: Record<Prop, unknown>[] }[] =
    [];

  data.forEach((item) => {
    const key = keyList.reduce((acc, key) => {
      acc[key] = item[key];
      return acc;
    }, {} as Record<Key, unknown>);

    const data = props.reduce((acc, prop) => {
      acc[prop] = item[prop];
      return acc;
    }, {} as Record<Prop, unknown>);

    const idx = result.findIndex(
      (row) => JSON.stringify(row.key) === JSON.stringify(key)
    );

    if (idx === -1) {
      result.push({ key, data: [data] });
    } else {
      result[idx].data.push(data);
    }
  });

  return result;
};
