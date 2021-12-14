export const formatWithUnit = (val: string, unit: string | undefined) => {
  if (unit) {
    return val + " " +  unit
  }
  return val
}

export const parseToNumber = (val: string, unit: string | undefined) =>  {
  if (unit){
    return val.replace(/[a-zA-Z\s]+/g, '')
  }
  return val
}