import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useMFENavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMFENavigation = (event: MessageEvent) => {
      // console.log("event:",event.data, event.data.type, event)
      switch (event.data.type) {
        case "cases-mfe-navigation":
          navigate(`/cases${event.data.path}`);
          break;
        case "_usermanagement-mfe-navigation":
          navigate(`/usermanagement${event.data.path}`);
          break;
        case "_casestructure-mfe-navigation":
          navigate(`/casestructure${event.data.path}`);
          break;
          case "_gensettings-mfe-navigation":
          navigate(`/generalsettings${event.data.path}`);
          break;
        case "customer-mfe-navigation":
          navigate(`/customers${event.data.path}`);
          break;
        case "request-mfe-navigation":
          navigate(`/requests${event.data.path}`);
          break;
        case "activities-mfe-navigation":
          // console.log(`/activities${event.data.path}`)
          navigate(`/activities${event.data.path}`);
          break;
        case "knowledgearticle-mfe-navigation":
          navigate(`/knowledgearticle${event.data.path}`);
          break;
        case "auth-mfe-navigation":
          // console.log("path:", event.data.path)
          navigate(`${event.data.path}`);
          break;
        case "settings-mfe-navigation":
          console.log(
            "path:",
            event.data.path,
            "complete url:",
            `/settings${event.data.path}`
          );
          navigate(`/settings${event.data.path}`);
          break;
        case "dashboard-mfe-navigation":
          // console.log("path:", event.data.path)
          navigate(`/dashboard${event.data.path}`);
          console.log(
            "path:",
            event.data.path,
            "complete url:",
            `/dashboard${event.data.path}`
          );
          break;
        case "activities-mfe-navigation-sub":
          // console.log("path:", event.data.path)
          const selectedCaseId = localStorage.getItem("selectedCaseId");
          navigate(`/activities/${event.data.path}${selectedCaseId}`);
          console.log(
            "path:",
            event.data.path,
            "complete url:",
            `/activities${event.data.path}${selectedCaseId}`
          );
          break;
        // Add more cases for other MFEs as needed
      }
    };

    window.addEventListener("message", handleMFENavigation);
    return () => window.removeEventListener("message", handleMFENavigation);
  }, [navigate]);
};

export default useMFENavigation;
