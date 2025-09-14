import { addDays, format, startOfDay, isWeekend, getDay } from 'date-fns'

export interface VendorSchedule {
  vendorId: string
  type: 'salon_chain' | 'independent' | 'home_based'
  workingDays: number[] // 0 = Sunday, 1 = Monday, etc.
  workingHours: {
    start: string // "08:00"
    end: string   // "20:00"
  }
  lunchBreak?: {
    start: string
    end: string
  }
  bufferMinutes: number // Time between appointments
  maxDailyBookings: number
  personalTimeBlocks?: Array<{
    day: number
    start: string
    end: string
    reason: string
  }>
}

export interface TimeSlot {
  time: string
  available: boolean
  reason?: string
}

export interface DayAvailability {
  date: Date
  status: 'available' | 'limited' | 'full' | 'closed'
  availableSlots: number
  totalSlots: number
  timeSlots: TimeSlot[]
}

// Realistic vendor schedules based on business types
export const vendorSchedules: Record<string, VendorSchedule> = {
  // Salon chains - consistent, professional hours
  'beauty-studio-rd': {
    vendorId: 'beauty-studio-rd',
    type: 'salon_chain',
    workingDays: [1, 2, 3, 4, 5, 6], // Mon-Sat
    workingHours: { start: '08:00', end: '20:00' },
    lunchBreak: { start: '13:00', end: '14:00' },
    bufferMinutes: 15,
    maxDailyBookings: 24
  },
  
  'hair-salon-elite': {
    vendorId: 'hair-salon-elite',
    type: 'salon_chain',
    workingDays: [1, 2, 3, 4, 5, 6, 0], // Mon-Sun
    workingHours: { start: '08:00', end: '20:00' },
    lunchBreak: { start: '12:30', end: '14:00' },
    bufferMinutes: 30,
    maxDailyBookings: 20,
    personalTimeBlocks: [
      { day: 0, start: '10:00', end: '18:00', reason: 'Sunday reduced hours' }
    ]
  },
  
  // Independent professionals - more varied schedules
  'maria-beauty-spa': {
    vendorId: 'maria-beauty-spa',
    type: 'independent',
    workingDays: [2, 3, 4, 5, 6, 0], // Tue-Sun (common for beauty pros)
    workingHours: { start: '09:00', end: '19:00' },
    lunchBreak: { start: '13:30', end: '14:30' },
    bufferMinutes: 20,
    maxDailyBookings: 16,
    personalTimeBlocks: [
      { day: 2, start: '15:00', end: '16:00', reason: 'Kids pickup time' }
    ]
  },
  
  'claudia-nails-studio': {
    vendorId: 'claudia-nails-studio',
    type: 'independent',
    workingDays: [1, 3, 4, 5, 6], // Mon, Wed-Sat
    workingHours: { start: '10:00', end: '18:00' },
    bufferMinutes: 15,
    maxDailyBookings: 12
  },
  
  // Home-based - most flexible but limited capacity
  'sofia-home-beauty': {
    vendorId: 'sofia-home-beauty',
    type: 'home_based',
    workingDays: [1, 2, 4, 5, 6], // Mon, Tue, Thu-Sat
    workingHours: { start: '10:00', end: '17:00' },
    bufferMinutes: 30,
    maxDailyBookings: 8,
    personalTimeBlocks: [
      { day: 5, start: '12:00', end: '15:00', reason: 'Family time' }
    ]
  },

  // Additional salon chains
  'glamour-house': {
    vendorId: 'glamour-house',
    type: 'salon_chain',
    workingDays: [1, 2, 3, 4, 5, 6, 0], // Open 7 days
    workingHours: { start: '09:00', end: '21:00' },
    lunchBreak: { start: '14:00', end: '15:00' },
    bufferMinutes: 20,
    maxDailyBookings: 28,
    personalTimeBlocks: [
      { day: 0, start: '09:00', end: '11:00', reason: 'Team meeting Sundays' }
    ]
  },

  'salon-elite-rd': {
    vendorId: 'salon-elite-rd',
    type: 'salon_chain',
    workingDays: [2, 3, 4, 5, 6], // Tue-Sat
    workingHours: { start: '08:30', end: '19:30' },
    lunchBreak: { start: '13:30', end: '14:30' },
    bufferMinutes: 15,
    maxDailyBookings: 26
  },

  // Independent professionals with varied schedules
  'bella-nails-studio': {
    vendorId: 'bella-nails-studio',
    type: 'independent',
    workingDays: [1, 3, 4, 5, 6, 0], // Mon, Wed-Sun
    workingHours: { start: '10:00', end: '18:00' },
    bufferMinutes: 20,
    maxDailyBookings: 14,
    personalTimeBlocks: [
      { day: 0, start: '16:00', end: '18:00', reason: 'Sunday wind down' }
    ]
  },

  'style-studio-caribe': {
    vendorId: 'style-studio-caribe',
    type: 'independent',
    workingDays: [2, 3, 4, 5, 6], // Tue-Sat
    workingHours: { start: '09:30', end: '17:30' },
    lunchBreak: { start: '12:00', end: '13:00' },
    bufferMinutes: 25,
    maxDailyBookings: 16,
    personalTimeBlocks: [
      { day: 6, start: '15:00', end: '17:30', reason: 'Saturday prep time' }
    ]
  },

  // More home-based providers
  'carmen-beauty-home': {
    vendorId: 'carmen-beauty-home',
    type: 'home_based',
    workingDays: [1, 3, 4, 6], // Mon, Wed, Thu, Sat
    workingHours: { start: '11:00', end: '16:00' },
    bufferMinutes: 45,
    maxDailyBookings: 6,
    personalTimeBlocks: [
      { day: 1, start: '13:00', end: '14:00', reason: 'Lunch break' },
      { day: 6, start: '14:00', end: '16:00', reason: 'Saturday family time' }
    ]
  }
}

// Generate time slots for a given day
export function generateTimeSlots(
  schedule: VendorSchedule,
  serviceDuration: number,
  date: Date
): TimeSlot[] {
  const dayOfWeek = getDay(date)
  const slots: TimeSlot[] = []
  
  // Check if vendor works on this day
  if (!schedule.workingDays.includes(dayOfWeek)) {
    return []
  }
  
  const [startHour, startMin] = schedule.workingHours.start.split(':').map(Number)
  const [endHour, endMin] = schedule.workingHours.end.split(':').map(Number)
  
  let currentTime = startHour * 60 + startMin // Convert to minutes
  const endTime = endHour * 60 + endMin
  const slotDuration = serviceDuration + schedule.bufferMinutes
  
  while (currentTime + serviceDuration <= endTime) {
    const timeString = `${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`
    
    let available = true
    let reason: string | undefined
    
    // Check lunch break
    if (schedule.lunchBreak) {
      const [lunchStart] = schedule.lunchBreak.start.split(':').map(Number)
      const [lunchEnd] = schedule.lunchBreak.end.split(':').map(Number)
      const lunchStartMin = lunchStart * 60
      const lunchEndMin = lunchEnd * 60
      
      if (currentTime >= lunchStartMin && currentTime < lunchEndMin) {
        available = false
        reason = 'Hora de almuerzo'
      }
    }
    
    // Check personal time blocks
    if (schedule.personalTimeBlocks) {
      for (const block of schedule.personalTimeBlocks) {
        if (block.day === dayOfWeek) {
          const [blockStart] = block.start.split(':').map(Number)
          const [blockEnd] = block.end.split(':').map(Number)
          const blockStartMin = blockStart * 60
          const blockEndMin = blockEnd * 60
          
          if (currentTime >= blockStartMin && currentTime < blockEndMin) {
            available = false
            reason = block.reason
          }
        }
      }
    }
    
    slots.push({
      time: timeString,
      available,
      reason
    })
    
    currentTime += slotDuration
  }
  
  return slots
}

// Simulate booking density - some days/times are busier
export function simulateBookingDensity(date: Date, timeSlots: TimeSlot[]): TimeSlot[] {
  const dayOfWeek = getDay(date)
  const today = startOfDay(new Date())
  const targetDate = startOfDay(date)
  const daysFromNow = Math.floor((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  return timeSlots.map(slot => {
    if (!slot.available) return slot
    
    let bookingProbability = 0.3 // Base 30% booking rate
    
    // Weekend premium times are busier
    if (dayOfWeek === 5 || dayOfWeek === 6) { // Fri-Sat
      const hour = parseInt(slot.time.split(':')[0])
      if (hour >= 17) bookingProbability = 0.7 // Evening slots
      else if (hour >= 14) bookingProbability = 0.5 // Afternoon
    }
    
    // Popular times (11am-1pm, 5pm-7pm)
    const hour = parseInt(slot.time.split(':')[0])
    if ((hour >= 11 && hour <= 13) || (hour >= 17 && hour <= 19)) {
      bookingProbability += 0.2
    }
    
    // Closer dates are more likely to be booked
    if (daysFromNow <= 2) bookingProbability += 0.3
    else if (daysFromNow <= 7) bookingProbability += 0.1
    
    // Random booking simulation
    const isBooked = Math.random() < bookingProbability
    
    if (isBooked) {
      return {
        ...slot,
        available: false,
        reason: 'Ocupado'
      }
    }
    
    return slot
  })
}

// Get day availability status
export function getDayAvailability(
  vendorId: string,
  serviceDuration: number,
  date: Date
): DayAvailability {
  const schedule = vendorSchedules[vendorId]
  
  if (!schedule) {
    return {
      date,
      status: 'closed',
      availableSlots: 0,
      totalSlots: 0,
      timeSlots: []
    }
  }
  
  const dayOfWeek = getDay(date)
  
  // Check if vendor works on this day
  if (!schedule.workingDays.includes(dayOfWeek)) {
    return {
      date,
      status: 'closed',
      availableSlots: 0,
      totalSlots: 0,
      timeSlots: []
    }
  }
  
  const baseTimeSlots = generateTimeSlots(schedule, serviceDuration, date)
  const timeSlots = simulateBookingDensity(date, baseTimeSlots)
  
  const totalSlots = timeSlots.length
  const availableSlots = timeSlots.filter(slot => slot.available).length
  
  let status: DayAvailability['status']
  if (availableSlots === 0) {
    status = 'full'
  } else if (availableSlots <= 3) {
    status = 'limited'
  } else {
    status = 'available'
  }
  
  return {
    date,
    status,
    availableSlots,
    totalSlots,
    timeSlots
  }
}

// Get availability for multiple days
export function getMultiDayAvailability(
  vendorId: string,
  serviceDuration: number,
  startDate: Date = new Date(),
  days: number = 30
): DayAvailability[] {
  const availability: DayAvailability[] = []
  
  for (let i = 0; i < days; i++) {
    const date = addDays(startDate, i)
    
    // Skip past dates
    if (date < startOfDay(new Date())) continue
    
    availability.push(getDayAvailability(vendorId, serviceDuration, date))
  }
  
  return availability
}

// Get default schedule for unknown vendors
export function getDefaultSchedule(vendorType: 'salon_chain' | 'independent' | 'home_based' = 'salon_chain'): VendorSchedule {
  const defaults: Record<string, Omit<VendorSchedule, 'vendorId'>> = {
    salon_chain: {
      type: 'salon_chain',
      workingDays: [1, 2, 3, 4, 5, 6],
      workingHours: { start: '09:00', end: '19:00' },
      lunchBreak: { start: '13:00', end: '14:00' },
      bufferMinutes: 15,
      maxDailyBookings: 20
    },
    independent: {
      type: 'independent',
      workingDays: [2, 3, 4, 5, 6, 0],
      workingHours: { start: '10:00', end: '18:00' },
      bufferMinutes: 20,
      maxDailyBookings: 12
    },
    home_based: {
      type: 'home_based',
      workingDays: [1, 2, 4, 5, 6],
      workingHours: { start: '10:00', end: '16:00' },
      bufferMinutes: 30,
      maxDailyBookings: 8
    }
  }
  
  return {
    vendorId: 'default',
    ...defaults[vendorType]
  }
}