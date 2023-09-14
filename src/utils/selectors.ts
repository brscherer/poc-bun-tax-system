export const getCurrentDateFormatted = (): string => {
  const currentDate = new Date()
  const offset = currentDate.getTimezoneOffset()
  const parsedCurrentDate = new Date(currentDate.getTime() - (offset*60*1000))
  return parsedCurrentDate.toISOString().split('T')[0]
}