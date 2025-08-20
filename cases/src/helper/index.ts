// Utility function to format date to ISO string while preserving local date
export const formatToISO = (date: Date | null): string | null => {
  if (!date) return null;

  // Create a new Date object to avoid mutating the original
  const localDate = new Date(date);

  // Get the timezone offset in minutes
  const timezoneOffset = localDate.getTimezoneOffset();

  // Adjust the date by adding the timezone offset to preserve the local date
  localDate.setMinutes(localDate.getMinutes() - timezoneOffset);

  // Convert to ISO string
  return localDate.toISOString();
};

export const getFirstString = (input: string): string => {
  return input.split(" ")[0];
};

export const getFirstTwoCharsCapitalized = (str: string) => {
  if (!str) return "";
  const firstTwoChars = str.substring(0, 2);
  return firstTwoChars.toUpperCase();
};

// export const calculateSlaResolutionDate = (durationDays: number) => {
//   // console.log("durationDays", durationDays);
//   const WORK_HOURS_PER_DAY = 9; // 9 working hours = 1 business day
//   const WORK_START_HOUR = 9; // 9 AM
//   const WORK_END_HOUR = 18; // 6 PM

//   let currentDate = new Date();
//   let daysRemaining = durationDays;

//   // Helper to check if a date is a weekend
//   const isWeekend = (date: Date) => {
//     const day = date.getDay();
//     return day === 0 || day === 6; // Sunday or Saturday
//   };

//   // Move to the next valid workday start (9 AM)
//   const moveToNextWorkday = (date: Date) => {
//     let newDate = new Date(date);
//     do {
//       newDate.setDate(newDate.getDate() + 1); // Increment day
//       newDate.setHours(WORK_START_HOUR, 0, 0, 0); // Set to 9 AM
//     } while (isWeekend(newDate));
//     return newDate;
//   };

//   // Initialize currentDate to a valid workday start if needed
//   if (currentDate.getHours() >= WORK_END_HOUR || isWeekend(currentDate)) {
//     currentDate = moveToNextWorkday(currentDate);
//   } else if (currentDate.getHours() < WORK_START_HOUR) {
//     currentDate.setHours(WORK_START_HOUR, 0, 0, 0); // Start at 9 AM
//   }

//   // Add 9 hours for each workday, skipping weekends
//   while (daysRemaining > 0) {
//     // Add 9 hours to the current date
//     currentDate.setHours(currentDate.getHours() + WORK_HOURS_PER_DAY);

//     // If it overflows into non-work hours or weekend, move to next workday
//     if (
//       currentDate.getHours() >= WORK_END_HOUR ||
//       isWeekend(currentDate)
//     ) {
//       currentDate = moveToNextWorkday(currentDate);
//     }

//     daysRemaining--;
//   }

//   return currentDate;
// };
export const calculateSlaResolutionDate = (durationDays: number) => {
  const currentDate = new Date();
  // Calculate the SLA resolution date by adding full days (24 hours per day)
  const slaResolutionDate = new Date(
    currentDate.getTime() + durationDays * 24 * 60 * 60 * 1000
  );
  return slaResolutionDate;
};

export const allowedNonValidatedKeys = [
  "CasePresets",
  "CaseType",
  "Customer",
  "Priority",
  "SlaId",
  "SlaName",
  "Status",
  "Title",
  "SubCategoryId",
];

export const FormValidation = [
  "AccountDomiciledBranch",
  "AccountName",
  "AccountNumber",
  "AccountStatement",
  "AccountStatementType",
  "AccountType",
  "BranchCode",
  "Bvn",
  "ComplaintRootCause",
  "CorporateOrigin",
  "Currency",
  "CustomerAltID",
  "CustomerFullName",
  "CustomerPhoneNumber",
  "Description",
  "DisputedAmount",
  "EmailConvertedToCase",
  "EmailSource",
  "FollowUpDate",
  "IsScheduleVideoCall",
  "LetterType",
  "OccurrenceDate",
  "PetitionSource",
  "PhoneCallType",
  "PhoneSource",
  "Platform",
  "PortalCreatedBy",
  "ProcessingHubOrigin",
  "Product",
 // "RequiredCustomerInfo",
  "SessionId",
  //"SettlementStatus",
  "ServiceCentreOrigin",
  "SlaResolutionDate",
  "TeamsMailed",
  "TransactionDate",
  "UniqueId",
  "VRBOrigin",
  "VideoCallDateTime",
  "VideoCallType",
];

// 1. Helper to test “not null/undefined/empty (or just whitespace)”
export const HasValue = (v: unknown): v is string => {
  return typeof v === "string" && v.trim() !== "";
};
