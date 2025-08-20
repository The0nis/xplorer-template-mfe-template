export interface CaseStructureParams {
  pageNumber: number;
  pageSize: number;
}

export interface QueryPayload {
  pageNumber: number;
  pageSize: number;
  Search?: string;
}

export interface IUserPagProp {
  Search?: string;
  Role?: string;
  PageNumber: number;
  PageSize: number;
}
export interface createUserPayload {
  Username: string;
  Role: string;
  TeamId: string;
  Status: string;
}

export interface editUsersPayload {
  UserId: string;
  Role?: string;
  TeamId?: string;
  Status?: string;
}

export interface IDisableUser {
  Id: string;
  Reason: string;
  IsDisable: boolean;
}

export interface createRolePayload {
  RoleName: string;
}

export interface IAddPermissionsToRole {
  RoleId: string | undefined;
  PermissionIds: string[];
}

export interface ISupervisorData {
  FirstName: string;
  LastName: string;
  Role: string;
  CreatedBy: string;
  IsActive: boolean;
  TimeCreated: string;
  Email: string;
}

export interface TeamsSearchPayload {
  Search: string;
}

export interface GetTeamPayload {
  id: string | undefined;
}

export interface createTeamPayload {
  Name: string;
  Category: string;
}

export interface EditTeamPayload {
  Id: string;
  Name: string;
  Category?: string;
  Administrator?: string;
  Email?: string;
  Type?: string;
  LineManager1?: string;
  LineManager1Email?: string;
  LineManager2?: string;
  LineManager2Email?: string;
}
export interface disableTeamPayload {
  Id: string[] | undefined;
  Reason: string;
  IsSingle: boolean;
}

export interface addTeamMemberPayload {
  Id: string | undefined;
  UserIds: string[];
}
export interface CreateCaseType {
  data: string;
}

export interface selectedRowCasePresetData {
  Id: number;
  Name: string;
  SubCategoryId: number;
  CaseTypeId: number;
  Owner: string;
  CategoryId: number;
  SlaId: number;
  Product: string;
  VisibleTo: string;
}

export interface selectedRowCaseCategoryData {
  Id?: number;
  Name?: string;
  Owner?: string;
  CaseTypeId?: number;
}

export interface selectedRowCaseSubCategoryData {
  Id?: number;
  Name?: string;
  Owner?: string;
  CategoryId?: number;
  SlaId?: number;
}

export interface selectedRowCaseTypeData {
  Id?: number;
  CaseTypeName?: string;
  Owner?: string;
}

export interface IEditFiltersCheckBoxes {
  activity_category: boolean;
  activity_sub_category: boolean;
  activity_mino_category: boolean;
  activity_created_on: boolean;
  activity: boolean;
}

export interface EditFiltersProps {
  RoutingRuleId: number;
  onClose?: () => void;
}

export interface SubSectionState {
  activity_sub_category: {
    IsAnd: boolean;
    FieldId?: number;
    Operator: number;
    Value: string;
    Field?: number;
  };
  activity_mino_category: {
    IsAnd: boolean;
    FieldId?: number;
    Operator: number;
    Value: string;
    Field?: number;
  };
  activity_created_on?: {
    IsAnd: boolean;
    FieldId?: number;
    Operator: number;
    Value: string;
    Field?: number;
  };
}

export interface selectedRoutingRule {
  Name: string;
  Status: string;
  Owner: string;
  Id: number;
  CreatedBy: string;
  TimeCreated: string;
  VisibleTo: string;
}

export interface IRoutingRuleById {
  Id: number;
  Name: string;
  Description: string;
  Owner: string;
  RuleGroups: {
    Id: number;
    Name: string;
    Description: string;
    RouteTo: string;
    RuleCriterias: any[];
  }[];
}

export interface IconvertedData {
  Name: String;
  Id: Number;
}

export interface IGetHolidayGroupById {
  Name: string;
  CreatedBy: string;
  TimeCreated: string;
  LastModifiedDate: string;
  Holiday: {
    Name: string;
    StartDate: string;
    EndDate: string;
    DurationInDays: string;
    CreatedBy: string;
  }[];
}

export interface selectedPreset {
  Name: string;
  Id: number;
  CreatedBy: string;
  TimeCreated: string;
  VisibleTo: string;
  GeneralSettingsCategoryName: string;
}

export interface selectedManageViewData {
  Name: string;
  Id: number;
  CreatedBy: string;
  TimeCreated: string;
  Status: string;
}

interface Holiday {
  Name: string;
  StartDate: Date;
  EndDate: Date;
  DurationInDays: number;
}

export interface IFormData {
  HolidayGroupId: number;
  Holidays: Holiday[];
}

export interface GetCaseAllTypesApiResponse {
  data: {
    Data: {
      Items: any[];
      PageNumber: number;
      TotalPages: number;
      TotalCount: number;
      HasPreviousPage: boolean;
      HasNextPage: boolean;
    };
    RequestId: string | null;
    ErrorMessage: string;
    HasError: boolean;
    ResponseCode: number;
    ResponseDescription: string;
  };
}

interface DecryptedCase {
  Data: {
    Items: any[];
    PageNumber: number;
    TotalPages: number;
    TotalCount: number;
    HasPreviousPage: boolean;
    HasNextPage: boolean;
  };
  RequestId: string | null;
  ErrorMessage: string;
  HasError: boolean;
  ResponseCode: number;
  ResponseDescription: string;
}

interface CaseType {
  ApprovedBy: string | null;
  CasePresets: any[];
  CaseTypeName: string;
  Categories: any[];
  CreatedBy: string;
  DateApproved: string | null;
  DateCreated: string;
  DeletedBy: string | null;
  DeletedFlag: boolean | null;
  DeletedTime: string | null;
  Id: number;
  LastModifiedBy: string | null;
  LastModifiedDate: string | null;
  LastModifiedTime: string | null;
  Owner: string;
  RowVersion: number;
  Status: string;
  TimeApproved: string | null;
  TimeCreated: string;
}

export type CaseTypeResponse = CaseType[];
