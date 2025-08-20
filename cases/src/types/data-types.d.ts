import { caseTypes } from "../config/sample_db";

export interface BulkCreationPayload {

  PageNumber: number
  PageSize: number
  UploadedBy: string,
  Status: string,
  FromDate: string,
  ToDate: string,
  IncludeDeleted: boolean
}
export interface CasesPayload {
  pageNumber: number;
  pageSize: number;
  Owner: string;
  Status: string;
  OwnerName?: string;
}
export interface casePayload {
  id: string;
}

interface SLAItem {
  Id: number;
  Name: string;
  Duration: number;
}

export interface InitialStateProp {
  isLoading?: boolean;
  casesStatus: "pending" | "fulfilled" | "failed";
  userLoading?: boolean;
  casesData?: any;
  errorMessage?: any;
  caseDetail?: any;
  caseAuditData?: any;
  teamsData?: any;
  customersData?: any;
  presetData?: any;
  caseTypes?: any;
  subCategories?: any;
  caseCategories?: any;
  isPresetLoading?: boolean;
  isCategoryLoading?: boolean;
  isSubCategoryLoading?: boolean;
  customerAccountDetails?: any;
  branchData?: any;
  branchLoading?: boolean;
  isUpdating?: boolean;
  isCreating?: boolean;
  slaDetails?: any;
  slaLoading?: boolean;
  caseAnalyticsData?: any;
  isAnalyticLoading: boolean;
  userData: any;
  usersLoading: boolean;
  isManualRouteLoading: boolean;
  isCreatingNote: boolean;
  noteStatus: "pending" | "fulfilled" | "failed";
  taskCreatingStatus: "pending" | "fulfilled" | "failed";
  caseNoteData: any;
  notesLoading: boolean;
  filteredCases: any[];
  filteredCustomers: any[];
  slaData: any;
  isCreatingActivity: boolean;
  isFetchingSLATimers: boolean;
  isExporting: boolean;
  exportingStatus: "pending" | "fulfilled" | "failed";
  creatingStatus: "pending" | "fulfilled" | "failed";
  fileUrl: any;
  fileUrlStatus: "pending" | "fulfilled" | "failed";
  isAllUsersLoading: boolean;
  isFileUploading: boolean;
  isFetchingBulkData: boolean;
  isFetchingBulkClosureData: boolean;
  isFetchingBulkClosureListData: boolean;
  isUploadingBulkClosure: boolean;
  isClosingBulkCases: boolean;
  isValidatingBulkData: boolean;
  isCreatingBulkFiles: boolean;
  isLoadingBulkList: boolean;
  isCreatingBulk: boolean;
  allUsersData: any;
  bulkClosureData: any;
  bulkClosureListData: any;
  bulkClosureListValidatedData: any;
  validateBulkCreateData: any
  bulkCreatedData:any
  bulkUploadData:any
  uploadedFile:any
  bulkListData:any
}

export interface updateCasePayload {
  Id: string;
  CaseNumber: string;
  Note: string;
}
export interface updateCaseCancelPayload {
  Id: string;
  CaseNumber: string;
  Reason: string;
}

export interface AuditHistoryPayload {
  PageNumber: number;
  PageSize: number;
  Filter: string;
  CaseId: string;
  Search: string;
}

export interface teamsProfileProp {
  Search: string;
}

export interface CustomerPayload {
  FirstName: string;
  LastName: string;
  Email: string;
  AccountName: string;
  AccountNumber: string;
  CustomerAltID: string;
  Bvn: string;
  Telephone: string;
  SocialMediaHandle: string;
  Sector: string;
  NonCustomer: string;
  NonCustomerCategory: string;
  NonCustomerSubCategory: string;
  Gender: string;
  MaritalStatus: string;
  EmploymentStatus: string;
  Religion: string;
  JobTitle: string;
  Description: string;
  State: string;
  City: string;
  Landmark: string;
  HouseNumber: string;
}

export // TypeScript type for CaseItem
interface CaseItems {
  AccountDomiciledBranch: string;
  AccountName: string;
  AccountNumber: string;
  AccountStatement: string;
  AccountStatementType: string;
  AccountType: string;
  BranchCode: string;
  CasePresets: string;
  CaseType: string;
  Category: string;
  ComplaintRootCause: string;
  CorporateOrigin: string;
  Currency: string;
  Customer: string;
  CustomerFullName: string;
  CustomerId: string; // UUID
  CustomerPhoneNumber: string;
  DateCreated: Date;
  Description: string;
  DisputedAmount: string;
  EChannelActivityType: string;
  EmailConvertedToCase: string;
  EmailSource: string;
  FollowUpDate: Date | null; // ISO date format
  IsCustomer: boolean;
  IsScheduleVideoCall: false;
  LetterType: string;
  OccurrenceDate: Date | null; // ISO date format
  Origin: string;
  PetitionSource: string;
  PhoneCallType: string;
  PhoneSource: string;
  Platform: string;
  PortalCreatedBy: string;
  Priority: string;
  ProcessingHubOrigin: string;
  Product: string;
  RequiredCustomerInfo?: string;
  SettlementStatus?: string;
  ServiceCentreOrigin: string;
  SessionId: string; // UUID
  SlaId: string;
  SlaName: string;
  SlaResolutionDate: Date | null; // ISO date format
  SLACount: number;
  Status: string;
  SubCategory: string;
  SubCategoryId: string;
  TeamsMailed: string;
  Title: string;
  TransactionDate: Date | null; // ISO date format
  Type: string;
  UniqueId: string;
  VideoCallDateTime: Date | null;
  VideoCallType: string;
  VRBOrigin: string;
}


export interface assignProp {
  CaseId: string;
  UserId: string;
  Group: string;
}

export interface RootState {
  case: InitialStateProp;
}

export interface IGetBulkList {
  FileName: string;
  FileUrl: string
}
export interface bulkClosureProp {
  FileId: string;
  pageNumber: number;
  pageSize: number;
}

export interface BulClosureListProp {
  Search: string;
  pageNumber: number;
  pageSize: number;
}
