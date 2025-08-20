import { TfiMenuAlt } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { TbTriangleInverted } from "react-icons/tb";

// Custom hook to return edit filter dropdown lists
const useEditFiltersModalContent = () => {
  const navigate = useNavigate();

  const fieldOptions = [
    { label: "Quick Save View", value: "quick_save_view", icon: null },
    {
      label: "12 hours of non-assignment",
      value: "12_hours_of_non_assignment",
      icon: TfiMenuAlt,
      iconPosition: "left",
    },
    {
      label: "Account Domicile Branch",
      value: "account_domicile_branch",
      icon: TfiMenuAlt,
      iconPosition: "left",
    },
    {
      label: "Activities Complete",
      value: "activities_complete",
      icon: TfiMenuAlt,
      iconPosition: "left",
    },
    {
      label: "Actual Service Units",
      value: "actual_service_units",
      icon: TfiMenuAlt,
      iconPosition: "left",
    },
    { label: "Age", value: "age", icon: TfiMenuAlt, iconPosition: "left" },
    { label: "Amount(Base)", value: "amount", icon: TbTriangleInverted, iconPosition: "left" },
    {
      label: "Amount In Dispute",
      value: "amount_in_dispute",
      icon: null,
    },
  ];

  const operatorOptions = [
    { label: "Equals", value: "equals", icon: null },
    {
      label: "Does not equal",
      value: "does_not_equal",
      icon: null,
    },
    {
      label: "Contains data",
      value: "contains_data",
      icon: null,
    },
    {
      label: "Does not contain",
      value: "does_not_contain",
      icon: null,
    },
    {
      label: "Begins with",
      value: "begins_with",
      icon: null,
    },
    { label: "Does not begin with", value: "does_not_begin with", icon: null },
    { label: "Amount(Base)", value: "amount", icon: null },
    {
      label: "Ends with",
      value: "ends_with",
      icon: null,
    },
    {
      label: "Does not ends with",
      value: "does_not_ends_with",
      icon: null,
    },
  ];

  const valueOptions = [
    { label: "Features (Case Categorization)", value: "features", icon: null },
    {
      label: "Name (Case Categorization)",
      value: "name",
      icon: null,
    },
    {
      label: "Number (Case Categorization)",
      value: "number",
      icon: null,
    },
    {
      label: "Status",
      value: "status",
      icon: null,
    },
    {
      label: "Upgrade (Case Categorization)",
      value: "upgrade",
      icon: null,
    },
    {
      label: "(Int'l) Inward Transfers (Case Categorization)",
      value: "intl_inward_transfer",
      icon: null,
    },
  ];

  const addOptions = [
    { label: "Add row", value: "add_row", icon: null },
    {
      label: "Add group",
      value: "add_group",
      icon: null,
    },
    {
      label: "Add related entity",
      value: "add_related_entity",
      icon: null,
    },
  ];

  return { fieldOptions, operatorOptions, valueOptions, addOptions };
};

export default useEditFiltersModalContent;
