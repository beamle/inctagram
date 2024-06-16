export const concatExcludeDuplicates = (
  bigArray: Array<{ id: number }> | undefined,
  smallArray: Array<{ id: number }> | undefined
) => {
  const bigMap = new Map<number, any>(bigArray?.map(item => [item.id, item]))
  const smallMap = new Map<number, any>(smallArray?.map(item => [item.id, item]))

  smallMap?.forEach(item => !bigMap.has(item.id) && bigMap?.set(item.id, item))

  return Array.from(bigMap?.values())
}
