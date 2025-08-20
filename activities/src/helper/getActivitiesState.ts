import { IIsAppointmentVisible, IIsCallMemoVisible, IIsPhoneCallVisible, INewAppointment, INewCallMemo, INewPhoneCall } from "../config/all_interfaces";


export const getPriority = (newActivity: INewPhoneCall | INewAppointment | INewCallMemo) => {
  if ("Priority" in newActivity) {
    return newActivity.Priority;
  }
  return newActivity.priority;
};

export const getStatus = (newActivity: INewPhoneCall | INewAppointment | INewCallMemo) => {
  if ("Status" in newActivity) {
    return newActivity.Status;
  }
  return newActivity.status;
};

export const getTeamsMailed = (newActivity: INewPhoneCall | INewAppointment | INewCallMemo) => {
  if ("TeamsMailed" in newActivity) {
    return newActivity.TeamsMailed;
  }
  return newActivity.teamsMailed;
};

export const getPriorityVisibility = (isVisible: IIsPhoneCallVisible | IIsAppointmentVisible | IIsCallMemoVisible) => {
    if ("Priority" in isVisible) {
      return isVisible.Priority;
    }
    return isVisible.priority;
  };
  
  export const getStatusVisibility = (isVisible: IIsPhoneCallVisible | IIsAppointmentVisible | IIsCallMemoVisible) => {
    if ("Status" in isVisible) {
      return isVisible.Status;
    }
    return isVisible.status;
  };
  
  export const getTeamsMailedVisibility = (isVisible: IIsPhoneCallVisible | IIsAppointmentVisible | IIsCallMemoVisible) => {
    if ("TeamsMailed" in isVisible) {
      return isVisible.TeamsMailed;
    }
    return isVisible.teamsMailed;
  };
