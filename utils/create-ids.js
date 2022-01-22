import { v4 as uuidv4 } from 'uuid';

export const createIds = (key = 'key', arr = [], useUUID = false) => arr.map((it, i) => {
  return {
    ...it,
    [key]: useUUID 
    ? uuidv4()
    : i
  }
})