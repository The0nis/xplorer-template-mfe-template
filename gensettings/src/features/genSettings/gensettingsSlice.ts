import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import apiFetcher from "../../api/apiFetcher";
import {
  CaseStructureParams,
  // GetCaseAllTypesApiResponse,
  IGetHolidayGroupById,
  IRoutingRuleById,
} from "../../types/data-types";
import { deCrypter, encrypter } from "../../helper/encrypt";
import { fetchApiData, fetchData } from "../../helper/apiHelper";
import { fetchAuthData } from "../../helper/apiAuthHelper";
import { toast } from "react-toastify";

export interface InitialStateProp {
  isLoading?: boolean;
  isCreatingCaseStructure: boolean;
  isCreatingGeneralSettings: boolean;
  filterFieldsNoPag: any;
  users: any;
  filterGeneralCategoryNoPag: any;
  filterViewWithPagination: any;
  filterRoutingRule: any;
  generalPresetPag: any;
  routingRuleById: IRoutingRuleById;
  getFilterHolidayGroup: any;
  getHolidayGroupById: IGetHolidayGroupById;
  generalSettingsRoles: any;
  caseSubCategoriesNoPag: any;
  caseSLA: any;
  usersTeams?: any;
  errorMessage?: any;
  valuesbyFieldId?: any;
  settingsStatus: "pending" | "fulfilled" | "rejected";
  routingRuleSelected?: {
    routingRuleId: number | string;
    routingRuleName: string;
  };
}

const initialState: InitialStateProp = {
  isLoading: false,
  isCreatingCaseStructure: false,
  isCreatingGeneralSettings: false,
  users: [],
  caseSLA: [],
  filterGeneralCategoryNoPag: [],
  filterFieldsNoPag: [],
  filterViewWithPagination: [],
  filterRoutingRule: [],
  generalPresetPag: [],
  routingRuleById: {
    Id: 0,
    Name: "",
    Description: "",
    Owner: "",
    RuleGroups: [],
  },
  getFilterHolidayGroup: [],
  getHolidayGroupById: {
    Name: "",
    CreatedBy: "",
    TimeCreated: "",
    LastModifiedDate: "",
    Holiday: [],
  },
  generalSettingsRoles: [],
  caseSubCategoriesNoPag: [],
  usersTeams: [],
  valuesbyFieldId: [],
  errorMessage: null,
  settingsStatus: "pending",
  routingRuleSelected: undefined,
};

//CASE STRUCTURE

// GET USERS
export const getAllUsers = createAsyncThunk(
  "casesTypes/allusers",
  async (data: {}, thunkAPI) => {
    try {
      return await fetchData({
        endpoint: "/CaseStructure/GetAllUsers",
        data,
        method: "get",
      });
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to make request");
    }
  }
);

// CASES SLA
export const getAllSLANoPag = createAsyncThunk(
  "casesSLANoPag/all",
  async (data: {}, thunkAPI) => {
    try {
      return await fetchData({
        endpoint: "/CaseStructure/FilterSlaWithoutPagniation",
        data,
        method: "get",
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);

// GENERAL SETTINGS

// FILTER GENERAL SETTINGS CATEGORY
export const filterGeneralSettingsCategoryNoPag = createAsyncThunk(
  "generalSettings/filterCategoryNoPag",
  async (data: {}, thunkAPI) => {
    try {
      return await fetchData({
        endpoint:
          "/GeneralSettings/FilterGeneralSettingsCategoryWithoutPagination",
        data,
        method: "get",
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const filterFieldswithoutpagination = createAsyncThunk(
  "generalSettings/filterFieldsNoPag",
  async (data: { generalSettingCategoryId: number }, thunkAPI) => {
    try {
      return await fetchData({
        endpoint: "/GeneralSettings/FilterFieldsWithoutPagination",
        data,
        method: "get",
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const getValuesbyField = createAsyncThunk(
  "fieldValue/all",
  async (data: { FieldId: number }, thunkAPI) => {
    try {
      return await fetchData({
        endpoint: "/GeneralSettings/GetValuesByFieldId",
        data,
        method: "get",
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const getGeneralSettingsRoles = createAsyncThunk(
  "generalSettings/GetAllRoles",
  async (data: {}, thunkAPI) => {
    try {
      return await fetchData({
        endpoint: "/GeneralSettings/GetAllRoles",
        data,
        method: "get",
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);

//CASE SUBCATEGORY
export const getAllCaseSubCategoryNoPag = createAsyncThunk(
  "casesSubCategoryNoPag/all",
  async (data: {}, thunkAPI) => {
    try {
      return await fetchData({
        endpoint: "/CaseStructure/FilterSubCategoryWithoutPagination",
        data,
        method: "get",
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);

// AUTH USERS AND TEAM
export const getAllUsersTeam = createAsyncThunk(
  "getUsersTeams/all",
  async (data: any, thunkAPI) => {
    try {
      return await fetchAuthData({
        endpoint: "/users/users-and-teams",
        data,
        method: "get",
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);

//MANAGE VIEW
export const getFilterViewWithPagination = createAsyncThunk(
  "filterView/all",
  async (data: CaseStructureParams, thunkAPI) => {
    try {
      return await fetchData({
        endpoint: "/GeneralSettings/FilterViewWithPagination",
        data,
        method: "get",
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const createGeneralSettingsView = createAsyncThunk(
  "create/generalSettingsView",
  async (payload: string, thunkAPI) => {
    try {
      return await fetchApiData({
        endpoint: "/GeneralSettings/CreateView",
        method: "POST",
        data: { data: payload },
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const deleteManageView = createAsyncThunk(
  "delete/view",
  async (payload: string, thunkAPI) => {
    try {
      return await fetchApiData({
        endpoint: "/GeneralSettings/DeleteView",
        method: "DELETE",
        data: { data: payload },
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);

// GENERAL SETTINGS PRESET
export const getFilterGeneralSettingPresetWithPagination = createAsyncThunk(
  "getSettingsPreset/all",
  async (data: CaseStructureParams, thunkAPI) => {
    let param = encrypter(data);
    try {
      return await fetchData({
        endpoint: "/GeneralSettings/FilterGeneralSettingPresetWithPagination",
        data,
        method: "get",
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const createGeneralSettingsPreset = createAsyncThunk(
  "create/generalSettingsPreset",
  async (payload: string, thunkAPI) => {
    try {
      return await fetchApiData({
        endpoint: "/GeneralSettings/CreateGeneralSettingPreset",
        method: "POST",
        data: { data: payload },
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const deleteSettingsPreset = createAsyncThunk(
  "deleteSettingsPreset/view",
  async (payload: string, thunkAPI) => {
    try {
      return await fetchApiData({
        endpoint: "/GeneralSettings/DeleteGeneralSettingPreset",
        method: "DELETE",
        data: { data: payload },
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);

// ROUTING RULES
export const getFilterRoutingRuleWithPagination = createAsyncThunk(
  "getRoutingRule/all",
  async (data: CaseStructureParams, thunkAPI) => {
    try {
      return await fetchData({
        endpoint: "/GeneralSettings/FilterRoutingRuleWithPagination",
        data,
        method: "get",
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const createRoutingRule = createAsyncThunk(
  "create/routingRule",
  async (payload: any, thunkAPI) => {
    try {
      const response = await fetchApiData({
        endpoint: "/GeneralSettings/CreateRoutingRule",
        method: "POST",
        data: { data: payload },
      });

      return response;
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const createAddRuleItemsToRoutingRule = createAsyncThunk(
  "create/addRuleItemsToRoutingRule",
  async (payload: any, thunkAPI) => {
    try {
      return await fetchApiData({
        endpoint: "/GeneralSettings/AddRuleItemsToRoutingRule",
        method: "POST",
        data: { data: payload },
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const getRoutingRulesById = createAsyncThunk(
  "getRoutingRuleId/all",
  async (data: { Id: number }, thunkAPI) => {
    let param = encrypter(data);
    try {
      return await fetchData({
        endpoint: "/GeneralSettings/GetRoutingRuleByIdQuery",
        data,
        method: "get",
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const deleteRoutingRule = createAsyncThunk(
  "deleteRoutingRule/view",
  async (payload: any, thunkAPI) => {
    try {
      return await fetchApiData({
        endpoint: "/GeneralSettings/DeleteRoutingRule",
        method: "DELETE",
        data: { data: payload },
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);

//HOLIDAY GROUP
export const getFilterHolidayGroupWithPagination = createAsyncThunk(
  "getHolidayGroup/all",
  async (data: CaseStructureParams, thunkAPI) => {
    try {
      return await fetchData({
        endpoint: "/GeneralSettings/FilterHolidayGroupWithPagination",
        data,
        method: "get",
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const getHolidaysGroupById = createAsyncThunk(
  "getholidayGroupId/all",
  async (data: { Id: number }, thunkAPI) => {
    try {
      return await fetchData({
        endpoint: "/GeneralSettings/GetHolidayGroupByIdQuery",
        data,
        method: "get",
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const createHolidayGroup = createAsyncThunk(
  "create/holidayGroup",
  async (payload: any, thunkAPI) => {
    try {
      return await fetchApiData({
        endpoint: "/GeneralSettings/CreateHolidayGroup",
        method: "POST",
        data: { data: payload },
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const createAddHolidayGroup = createAsyncThunk(
  "create/AddholidayGroup",
  async (payload: any, thunkAPI) => {
    try {
      return await fetchApiData({
        endpoint: "/GeneralSettings/AddHolidaysToGroup",
        method: "POST",
        data: { data: payload },
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);
export const deleteHolidayGroup = createAsyncThunk(
  "delete/holidayGroup",
  async (payload: any, thunkAPI) => {
    try {
      return await fetchApiData({
        endpoint: "/GeneralSettings/DeleteHolidayGroup",
        method: "DELETE",
        data: { data: payload },
      });
    } catch (error) {
      console.error("API Error:", error);
      return thunkAPI.rejectWithValue("Failed to make req");
    }
  }
);

const gensettingsSlice = createSlice({
  name: "generalSettings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetching users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = null;
        if (payload) {
          state.users = payload?.Data;
        } else {
          console.error("Invalid payload data");
          state.users = [];
        }
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        console.log("Error in API call:", payload);
        state.isLoading = false;
        state.errorMessage = payload;
      })

      // Handling fetching caseSLA
      .addCase(getAllSLANoPag.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getAllSLANoPag.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = null;
        if (payload) {
          state.caseSLA = payload?.Data;
        } else {
          console.error("Invalid payload data");
          state.caseSLA = [];
        }
      })
      .addCase(getAllSLANoPag.rejected, (state, { payload }) => {
        console.log("Error in API call:", payload);
        state.isLoading = false;
        state.errorMessage = payload;
      })

      // GENERAL SETTINGS VIEW

      //Handling FilterSettings Category
      .addCase(filterGeneralSettingsCategoryNoPag.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(
        filterGeneralSettingsCategoryNoPag.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.errorMessage = null;
          if (payload) {
            console.log("filterGeneralCategoryPayload: ", payload);
            state.filterGeneralCategoryNoPag = payload?.Data;
          } else {
            console.error("Invalid payload data");
            state.filterGeneralCategoryNoPag = [];
          }
        }
      )
      .addCase(
        filterGeneralSettingsCategoryNoPag.rejected,
        (state, { payload }) => {
          console.log("Error in API call:", payload);
          state.isLoading = false;
          state.errorMessage = payload;
        }
      )
      // Handling fetching caseSubCategory NoPag
      .addCase(getAllCaseSubCategoryNoPag.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getAllCaseSubCategoryNoPag.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = null;
        if (payload) {
          state.caseSubCategoriesNoPag = payload?.Data;
        } else {
          console.error("Invalid payload data");
          state.caseSubCategoriesNoPag = [];
        }
      })
      .addCase(getAllCaseSubCategoryNoPag.rejected, (state, { payload }) => {
        console.log("Error in API call:", payload);
        state.isLoading = false;
        state.errorMessage = payload;
      })
      // Handling fetching USERS TEAMS
      .addCase(getAllUsersTeam.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getAllUsersTeam.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = null;
        if (payload) {
          // console.log("SlicePayload: ", payload);
          state.usersTeams = payload?.data?.Data;
        } else {
          console.error("Invalid payload data");
          state.usersTeams = [];
        }
      })
      .addCase(getAllUsersTeam.rejected, (state, { payload }) => {
        console.log("Error in API call:", payload);
        state.isLoading = false;
        state.errorMessage = payload;
      })
      //Handling Filter Fields Without Pagination
      .addCase(filterFieldswithoutpagination.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(
        filterFieldswithoutpagination.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.errorMessage = null;
          if (payload) {
            // console.log("filterFieldswithoutpaginationPayload: ", payload);
            state.filterFieldsNoPag = payload?.Data;
          } else {
            console.error("Invalid payload data");
            state.filterFieldsNoPag = [];
          }
        }
      )
      .addCase(filterFieldswithoutpagination.rejected, (state, { payload }) => {
        console.log("Error in API call:", payload);
        state.isLoading = false;
        state.errorMessage = payload;
      })
      .addCase(getValuesbyField.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getValuesbyField.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = null;
        if (payload) {
          console.log("getValuesbyFieldPayload: ", payload);
          state.valuesbyFieldId = payload?.Data;
        } else {
          console.error("Invalid payload data");
          state.valuesbyFieldId = [];
        }
      })
      .addCase(getValuesbyField.rejected, (state, { payload }) => {
        console.log("Error in API call:", payload);
        state.isLoading = false;
        state.errorMessage = payload;
      })
      // Handling fetching Filter view
      .addCase(getFilterViewWithPagination.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getFilterViewWithPagination.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = null;
        if (payload) {
          state.filterViewWithPagination = payload?.Data;
        } else {
          console.error("Invalid payload data");
          state.filterViewWithPagination = [];
        }
      })
      .addCase(getFilterViewWithPagination.rejected, (state, { payload }) => {
        console.log("Error in API call:", payload);
        state.isLoading = false;
        state.errorMessage = payload;
      })
      .addCase(getGeneralSettingsRoles.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getGeneralSettingsRoles.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = null;
        if (payload) {
          state.generalSettingsRoles = payload?.Data;
        } else {
          console.error("Invalid payload data");
          state.generalSettingsRoles = [];
        }
      })
      .addCase(getGeneralSettingsRoles.rejected, (state, { payload }) => {
        console.log("Error in API call:", payload);
        state.isLoading = false;
        state.errorMessage = payload;
      })
      .addCase(createGeneralSettingsView.pending, (state) => {
        state.isCreatingGeneralSettings = true;
        state.errorMessage = null;
      })
      .addCase(createGeneralSettingsView.fulfilled, (state, { payload }) => {
        state.isCreatingGeneralSettings = false;
        state.errorMessage = null;
      })
      .addCase(createGeneralSettingsView.rejected, (state, { payload }) => {
        state.isCreatingGeneralSettings = false;
        state.errorMessage = payload;
      })
      .addCase(deleteManageView.pending, (state) => {
        state.isCreatingCaseStructure = true;
        state.errorMessage = null;
      })
      .addCase(deleteManageView.fulfilled, (state, { payload }) => {
        state.isCreatingCaseStructure = false;
        state.errorMessage = null;
      })
      .addCase(deleteManageView.rejected, (state, { payload }) => {
        state.isCreatingCaseStructure = false;
        state.errorMessage = payload;
      })

      //GENERAL SETTINGS PRESET
      // Handling fetching preset
      .addCase(getFilterGeneralSettingPresetWithPagination.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(
        getFilterGeneralSettingPresetWithPagination.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.errorMessage = null;
          if (payload) {
            // console.log("filterViewWithPagination: ", payload);
            state.generalPresetPag = payload?.Data;
          } else {
            console.error("Invalid payload data");
            state.generalPresetPag = [];
          }
        }
      )
      .addCase(
        getFilterGeneralSettingPresetWithPagination.rejected,
        (state, { payload }) => {
          console.log("Error in API call:", payload);
          state.isLoading = false;
          state.errorMessage = payload;
        }
      )

      // Handling Create GeneralSettings Preset
      .addCase(createGeneralSettingsPreset.pending, (state) => {
        state.isCreatingGeneralSettings = true;
        state.errorMessage = null;
      })
      .addCase(createGeneralSettingsPreset.fulfilled, (state, { payload }) => {
        state.isCreatingGeneralSettings = false;
        state.errorMessage = null;
      })
      .addCase(createGeneralSettingsPreset.rejected, (state, { payload }) => {
        state.isCreatingGeneralSettings = false;
        state.errorMessage = payload;
      })

      .addCase(deleteSettingsPreset.pending, (state) => {
        state.isCreatingCaseStructure = true;
        state.errorMessage = null;
      })
      .addCase(deleteSettingsPreset.fulfilled, (state, { payload }) => {
        state.isCreatingCaseStructure = false;
        state.errorMessage = null;
      })
      .addCase(deleteSettingsPreset.rejected, (state, { payload }) => {
        state.isCreatingCaseStructure = false;
        state.errorMessage = payload;
      })

      //ROUTING RULE
      .addCase(getFilterRoutingRuleWithPagination.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(
        getFilterRoutingRuleWithPagination.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.errorMessage = null;
          if (payload) {
            // console.log("filterViewWithPagination: ", payload);
            state.filterRoutingRule = payload?.Data;
          } else {
            console.error("Invalid payload data");
            state.filterRoutingRule = [];
          }
        }
      )
      .addCase(
        getFilterRoutingRuleWithPagination.rejected,
        (state, { payload }) => {
          console.log("Error in API call:", payload);
          state.isLoading = false;
          state.errorMessage = payload;
        }
      )

      .addCase(getRoutingRulesById.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getRoutingRulesById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = null;
        if (payload) {
          console.log("getRoutingRulesByIdPayload: ", payload);
          state.routingRuleById = payload?.Data;
        } else {
          console.error("Invalid payload data");
          state.routingRuleById = {
            Id: 0,
            Name: "",
            Description: "",
            Owner: "",
            RuleGroups: [],
          };
        }
      })
      .addCase(getRoutingRulesById.rejected, (state, { payload }) => {
        console.log("Error in API call:", payload);
        state.isLoading = false;
        state.errorMessage = payload;
      })

      // Handling Create Routing Rule
      .addCase(createRoutingRule.pending, (state) => {
        state.isCreatingGeneralSettings = true;
        state.errorMessage = null;
        state.settingsStatus = "pending";
      })
      .addCase(createRoutingRule.fulfilled, (state, { payload }) => {
        const data = deCrypter(payload?.data);
        console.log("createRoutingRulePayload decrypt: ", data);

        state.isCreatingGeneralSettings = false;
        state.errorMessage = null;
        state.settingsStatus = "fulfilled";
        state.routingRuleSelected = {
          routingRuleId: data?.Data?.Id,
          routingRuleName: data?.Data?.Name,
        };
        toast.success("Rule created successfully");
      })
      .addCase(createRoutingRule.rejected, (state, { payload }) => {
        state.isCreatingGeneralSettings = false;
        state.errorMessage = payload;
        state.settingsStatus = "rejected";
        toast.error("Unable to create new rule");
      })

      .addCase(createAddRuleItemsToRoutingRule.pending, (state) => {
        state.isCreatingGeneralSettings = true;
        state.errorMessage = null;
      })
      .addCase(
        createAddRuleItemsToRoutingRule.fulfilled,
        (state, { payload }) => {
          state.isCreatingGeneralSettings = false;
          state.errorMessage = null;
        }
      )
      .addCase(
        createAddRuleItemsToRoutingRule.rejected,
        (state, { payload }) => {
          state.isCreatingGeneralSettings = false;
          state.errorMessage = payload;
        }
      )

      .addCase(deleteRoutingRule.pending, (state) => {
        state.isCreatingCaseStructure = true;
        state.errorMessage = null;
      })
      .addCase(deleteRoutingRule.fulfilled, (state, { payload }) => {
        state.isCreatingCaseStructure = false;
        state.errorMessage = null;
      })
      .addCase(deleteRoutingRule.rejected, (state, { payload }) => {
        state.isCreatingCaseStructure = false;
        state.errorMessage = payload;
      })

      //HOLIDAY GROUP
      .addCase(getFilterHolidayGroupWithPagination.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(
        getFilterHolidayGroupWithPagination.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.errorMessage = null;
          if (payload) {
            // console.log("filterViewWithPagination: ", payload);
            state.getFilterHolidayGroup = payload?.Data;
          } else {
            console.error("Invalid payload data");
            state.getFilterHolidayGroup = [];
          }
        }
      )
      .addCase(
        getFilterHolidayGroupWithPagination.rejected,
        (state, { payload }) => {
          console.log("Error in API call:", payload);
          state.isLoading = false;
          state.errorMessage = payload;
        }
      )

      .addCase(createHolidayGroup.pending, (state) => {
        state.isCreatingGeneralSettings = true;
        state.errorMessage = null;
      })
      .addCase(createHolidayGroup.fulfilled, (state, { payload }) => {
        state.isCreatingGeneralSettings = false;
        state.errorMessage = null;
      })
      .addCase(createHolidayGroup.rejected, (state, { payload }) => {
        state.isCreatingGeneralSettings = false;
        state.errorMessage = payload;
      })

      .addCase(createAddHolidayGroup.pending, (state) => {
        state.isCreatingGeneralSettings = true;
        state.errorMessage = null;
      })
      .addCase(createAddHolidayGroup.fulfilled, (state, { payload }) => {
        state.isCreatingGeneralSettings = false;
        state.errorMessage = null;
      })
      .addCase(createAddHolidayGroup.rejected, (state, { payload }) => {
        state.isCreatingGeneralSettings = false;
        state.errorMessage = payload;
      })

      .addCase(deleteHolidayGroup.pending, (state) => {
        state.isCreatingCaseStructure = true;
        state.errorMessage = null;
      })
      .addCase(deleteHolidayGroup.fulfilled, (state, { payload }) => {
        state.isCreatingCaseStructure = false;
        state.errorMessage = null;
      })
      .addCase(deleteHolidayGroup.rejected, (state, { payload }) => {
        state.isCreatingCaseStructure = false;
        state.errorMessage = payload;
      })

      .addCase(getHolidaysGroupById.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getHolidaysGroupById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorMessage = null;
        if (payload) {
          console.log("getHolidaysGroupByIdPayload: ", payload);
          state.getHolidayGroupById = payload?.Data;
        } else {
          console.error("Invalid payload data");
          state.getHolidayGroupById = {
            Name: "",
            CreatedBy: "",
            TimeCreated: "",
            LastModifiedDate: "",
            Holiday: [],
          };
        }
      })
      .addCase(getHolidaysGroupById.rejected, (state, { payload }) => {
        console.log("Error in API call:", payload);
        state.isLoading = false;
        state.errorMessage = payload;
      });
  },
});

export default gensettingsSlice.reducer;
