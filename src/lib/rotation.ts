export const shuffle = <T>(items: readonly T[], random = Math.random): T[] => {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j]!, result[i]!]
  }
  return result
}

export const withBackups = (primary: string, backups: string[], offset: number) => {
  const others = backups.filter((id) => id !== primary)
  const shift = others.length ? offset % others.length : 0
  return [primary, ...others.slice(shift), ...others.slice(0, shift)]
}

export const assignVideos = (
  slots: number,
  pool: readonly string[],
  backupOnly: readonly string[],
  random = Math.random,
): string[][] => {
  const mixed = shuffle(pool, random)
  const backups = [...mixed.slice(slots), ...backupOnly]
  return mixed.slice(0, slots).map((id, slot) => withBackups(id, backups, slot))
}
