// Dashboard data

export const planningKPIs = {
  totalSapLoadPlans: 720,
  totalFolios: 720, // Each load plan has multiple folios (3 folios per load plan)
  foliosInDeltaX: 700, // Keeping 20 folios not in DeltaX for reconciliation purposes
  folioPercentage: 97.2, // (700/720)*100
  sapDeltaxMismatches: 20, // Matches the 20 folios not in DeltaX
  foliosAcceptedBefore6PM: 633, // Matches total folios in DeltaX minus rejections
  foliosRejectedBefore4PM: 35,
  foliosRejectedAfter4PM: 32,
  adjustedRescheduled: {
    auto: 24,
    manual: 12
  },
  tripClassification: { regular: 70, short: 20, uncoupling: 10 },
  remindersTriggered: 42,
  escalationsTriggered: 15
};

export const appointmentKPIs = {
  acceptedFolios: 633, // Matches foliosAcceptedBefore6PM
  withoutPlate: 95, // About 15% of accepted folios
  withoutPlatePercentage: 15, // (95/633)*100
  pendingPlate2Hrs: 22, // Critical plates that need attention within 2 hours
  escalations: 15, // Matches escalationsTriggered
  autoReschedules: 24, // Matches adjustedRescheduled.auto
  autoReassignments: 18,
  etaBreaches: {
    onTime: 595, // (633 - 38)
    delayed: 38 // About 6% of accepted folios
  },
  unassignmentEvents: 9,
  carrierResponseRate: 85 // Percentage of carriers that respond within the time window
};

export const breweryData = [
  {
    name: "Brewery A",
    accepted: 220,
    rejected: { before4PM: 12, after4PM: 11 },
    adjusted: { before4PM: 8, after4PM: 4 },
    autoReassigned: 10,
    tripTypes: { regular: 160, short: 35, uncoupling: 25 },
    noPlate: 33,
    critical2hrs: 8,
    etaBreaches: 13
  },
  {
    name: "Brewery B",
    accepted: 255,
    rejected: { before4PM: 15, after4PM: 13 },
    adjusted: { before4PM: 10, after4PM: 5 },
    autoReassigned: 8,
    tripTypes: { regular: 180, short: 50, uncoupling: 25 },
    noPlate: 38,
    critical2hrs: 9,
    etaBreaches: 15
  },
  {
    name: "Brewery C",
    accepted: 158,
    rejected: { before4PM: 8, after4PM: 8 },
    adjusted: { before4PM: 6, after4PM: 3 },
    autoReassigned: 6,
    tripTypes: { regular: 110, short: 30, uncoupling: 18 },
    noPlate: 24,
    critical2hrs: 5,
    etaBreaches: 10
  }
];

export const planningTimeline = [
  { time: "Before 3:00 PM", status: "SAP Load Plans Received", count: 720 },
  { time: "3:00 PM", status: "Folios Validated in DeltaX", count: 700 },
  { time: "3:00-4:00 PM", status: "SAP-DeltaX Reconciliation", count: 20 },
  { time: "4:00-6:00 PM", status: "Folio Acceptance Period", count: 633 },
  { time: "After 6:00 PM", status: "Escalations for Non-Response", count: 15 }
];

export const rejectionResolution = [
  {
    id: 1,
    folioId: "F1001",
    loadPlanId: "LP1001",
    rejectionTime: "3:45 PM",
    type: "Before 4PM",
    status: "Resolved",
    reminders: 2,
    autoReassigned: false,
    resolution: "Manual Reassignment",
    brewery: "Brewery A",
    carrier: "Carrier XYZ",
    rejectionReason: "Rate issues",
    resolvedBy: "John Smith",
    resolvedAt: "4:15 PM",
    originalSchedule: "July 29, 2025 - 9:00 AM",
    newSchedule: "July 30, 2025 - 10:30 AM"
  },
  {
    id: 2,
    folioId: "F1025",
    loadPlanId: "LP1025",
    rejectionTime: "3:52 PM",
    type: "Before 4PM",
    status: "Resolved",
    reminders: 4,
    autoReassigned: true,
    resolution: "Auto Reassignment after 4 reminders",
    brewery: "Brewery B",
    carrier: "Carrier ABC",
    rejectionReason: "Capacity constraints",
    resolvedBy: "System",
    resolvedAt: "4:45 PM",
    originalSchedule: "July 29, 2025 - 2:00 PM",
    newSchedule: "July 30, 2025 - 1:15 PM"
  },
  {
    id: 3,
    folioId: "F1045",
    loadPlanId: "LP1045",
    rejectionTime: "4:15 PM",
    type: "After 4PM",
    status: "Resolved",
    reminders: 0,
    autoReassigned: true,
    resolution: "Auto Reassignment (after 4PM)",
    brewery: "Brewery C",
    carrier: "Carrier QRS",
    rejectionReason: "Driver unavailability",
    resolvedBy: "System",
    resolvedAt: "4:16 PM",
    originalSchedule: "July 29, 2025 - 8:00 PM",
    newSchedule: "July 30, 2025 - 7:30 AM"
  },
  {
    id: 4,
    folioId: "F1078",
    loadPlanId: "LP1078",
    rejectionTime: "4:35 PM",
    type: "After 4PM",
    status: "In Progress",
    reminders: 0,
    autoReassigned: true,
    resolution: "Auto Reassignment in progress",
    brewery: "Brewery B",
    carrier: "Carrier DEF",
    rejectionReason: "Technical issues",
    resolvedBy: "System",
    resolvedAt: "In progress",
    originalSchedule: "July 30, 2025 - 10:00 AM",
    newSchedule: "Pending"
  }
];

export const alertsData = [
  {
    id: 1,
    type: "warning",
    category: "Reconciliation",
    message: "Folio F023 – SAP vs DeltaX mismatch detected",
    time: "3:15 PM"
  },
  {
    id: 2,
    type: "info",
    category: "Reminder",
    message: "Reminder sent to carrier for Folio F056",
    time: "4:15 PM"
  },
  {
    id: 3,
    type: "danger",
    category: "Rejection",
    message: "Folio F078 rejected after 4 PM - Auto reassignment triggered",
    time: "4:35 PM"
  },
  {
    id: 4,
    type: "warning",
    category: "Adjustment",
    message: "Folio F045 adjusted - Rescheduling required",
    time: "3:45 PM"
  },
  {
    id: 5,
    type: "danger",
    category: "Escalation",
    message: "Folio F033 not accepted by 6 PM - Escalated to management",
    time: "6:01 PM"
  }
];

export const barChartData = [
  {
    name: "Folios",
    Checked: 633,
    Pending: 87
  }
];

export const rejectionData = [
  {
    name: "Before 4PM",
    value: 35
  },
  {
    name: "After 4PM",
    value: 32
  }
];

export const tripClassificationData = [
  { name: "Regular", value: 70, color: "#0088FE" },
  { name: "Short", value: 20, color: "#00C49F" },
  { name: "Uncoupling", value: 10, color: "#FFBB28" }
];

// Trip classification timeline data
export const tripClassificationTrends = [
  {
    month: "Jan",
    Regular: 60,
    Short: 25,
    Uncoupling: 15
  },
  {
    month: "Feb",
    Regular: 65,
    Short: 22,
    Uncoupling: 13
  },
  {
    month: "Mar",
    Regular: 68,
    Short: 20,
    Uncoupling: 12
  },
  {
    month: "Apr",
    Regular: 70,
    Short: 20,
    Uncoupling: 10
  },
  {
    month: "May",
    Regular: 72,
    Short: 18,
    Uncoupling: 10
  },
  {
    month: "Jun",
    Regular: 75,
    Short: 15,
    Uncoupling: 10
  }
];

export const stackedBarData = [
  {
    name: "Auto",
    value: 24,
    color: "#82ca9d"
  },
  {
    name: "Manual",
    value: 12,
    color: "#8884d8"
  }
];

export const etaBreachData = [
  {
    name: "On Time",
    value: 595,
    color: "#82ca9d"
  },
  {
    name: "Delayed",
    value: 38,
    color: "#ff8042"
  }
];

export const carrierResponseData = [
  { name: "Responded", value: 85, color: "#0088FE" },
  { name: "No Response", value: 15, color: "#FFBB28" }
];

export const reminderEscalationData = {
  reconciliation: {
    reminders: 20,
    escalations: 5
  },
  acceptance: {
    reminders: 42,
    escalations: 15
  },
  rejectionBefore4PM: {
    reminders: 35,
    autoReassignments: 24
  }
};

export const carrierPerformanceData = [
  {
    name: "Carrier XYZ",
    acceptanceRate: 92,
    responseTime: 25, // minutes
    rejections: {
      before4PM: 9,
      after4PM: 8
    },
    etaComplianceRate: 94,
    assignedPlates: 155,
    totalFolios: 180,
    totalLoadPlans: 60
  },
  {
    name: "Carrier ABC",
    acceptanceRate: 85,
    responseTime: 38, // minutes
    rejections: {
      before4PM: 14,
      after4PM: 12
    },
    etaComplianceRate: 89,
    assignedPlates: 190,
    totalFolios: 240,
    totalLoadPlans: 80
  },
  {
    name: "Carrier QRS",
    acceptanceRate: 95,
    responseTime: 18, // minutes
    rejections: {
      before4PM: 6,
      after4PM: 6
    },
    etaComplianceRate: 97,
    assignedPlates: 145,
    totalFolios: 160,
    totalLoadPlans: 53
  },
  {
    name: "Carrier DEF",
    acceptanceRate: 88,
    responseTime: 32, // minutes
    rejections: {
      before4PM: 6,
      after4PM: 6
    },
    etaComplianceRate: 91,
    assignedPlates: 115,
    totalFolios: 140,
    totalLoadPlans: 47
  }
];

export const timeSeriesData = {
  loadPlanUpdates: [
    { time: "12:00 PM", count: 180 },
    { time: "1:00 PM", count: 185 },
    { time: "2:00 PM", count: 192 },
    { time: "3:00 PM", count: 200 },
    { time: "4:00 PM", count: 210 },
    { time: "5:00 PM", count: 225 },
    { time: "6:00 PM", count: 240 }
  ],
  acceptanceRate: [
    { time: "3:00 PM", rate: 20 },
    { time: "3:30 PM", rate: 35 },
    { time: "4:00 PM", rate: 48 },
    { time: "4:30 PM", rate: 60 },
    { time: "5:00 PM", rate: 72 },
    { time: "5:30 PM", rate: 80 },
    { time: "6:00 PM", rate: 85 }
  ],
  rejectionTrends: {
    monday: { before4PM: 22, after4PM: 10 },
    tuesday: { before4PM: 18, after4PM: 12 },
    wednesday: { before4PM: 25, after4PM: 15 },
    thursday: { before4PM: 20, after4PM: 8 },
    friday: { before4PM: 15, after4PM: 5 }
  }
};

// Map location data for breweries
export const breweryLocations = [
  {
    id: 1,
    name: "Brewery A",
    lat: 51.5074,
    lng: -0.1278,
    status: "green"
  },
  {
    id: 2,
    name: "Brewery B",
    lat: 51.5114,
    lng: -0.1128,
    status: "yellow"
  },
  {
    id: 3,
    name: "Brewery C",
    lat: 51.5004,
    lng: -0.1228,
    status: "red"
  }
];
