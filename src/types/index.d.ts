import moment from moment

export type ParkingSlot = {
    id: number,
    isAvailable: boolean,
    registrationNumber?: string|null,
    startTime?: moment|null,
    endTime?: moment|null
  }