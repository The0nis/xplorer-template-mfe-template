export interface FormDataState {
  Owner: string;
  Name: string;
  Description: string;
  Email: string
}

export interface Row {
  id: number;
  field: string;
  operator: string;
  value: string;
  name: string
}

export interface Condition extends Row {}

export interface RoutingRuleFormDataState {
  ruleFormData: FormDataState;
  routeTo: string;
  rows: Row[];
  conditions: GroupData[];
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GroupData } from "../../components/routingRules/NewEditFilters/GroupRuleBuilder";

const initialState: RoutingRuleFormDataState = {
  ruleFormData: {
    Owner: "",
    Name: " ",
    Description: "",
    Email: ''
  },
  routeTo: "",
  rows: [],
  conditions: [],
};

const RoutingRuleFormSlice = createSlice({
  name: "routingRuleForm",
  initialState,
  reducers: {
    setFormData: (
      state,
      action: PayloadAction<Partial<RoutingRuleFormDataState["ruleFormData"]>>
    ) => {
      state.ruleFormData = {
        ...state.ruleFormData,
        ...action.payload,
      };
    },
    setRouteTo: (state, action: PayloadAction<string>) => {
      state.routeTo = action.payload;
    },
    setRows: (state, action: PayloadAction<Row[]>) => {
      state.rows = action.payload;
    },
    updateRow: (
      state,
      action: PayloadAction<{ id: number; key: keyof Row; value: string }>
    ) => {
      const { id, key, value } = action.payload;
      state.rows = state.rows.map((row) =>
        row.id === id ? { ...row, [key]: value } : row
      );
    },
    setConditions: (state, action: PayloadAction<GroupData[]>) => {
      state.conditions = action.payload;
    },
    updateCondition: (
      state,
      action: PayloadAction<{ id: number; key: keyof Condition; value: string }>
    ) => {
      const { id, key, value } = action.payload;
      state.conditions = state.conditions.map((c) =>
        c.id === id ? { ...c, [key]: value } : c
      );
    },
  },
});

export const {
  setFormData,
  setRouteTo,
  setRows,
  updateRow,
  setConditions,
  updateCondition,
} = RoutingRuleFormSlice.actions;

export default RoutingRuleFormSlice.reducer;
