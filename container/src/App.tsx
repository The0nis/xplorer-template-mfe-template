import React, { FC, lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
} from "react-router-dom";
import Header from "./components/header/Header";
import Sidenav from "./components/sidebar/Sidenav";
import ErrorBoundary from "./helper/ErrorBoundary";
import HorizontalProgressLoader from "./components/HorizontalProgressLoader/HorizontalProgressLoader";
import ErrorPage from "./ErrorPage";
import useMFENavigation from "./hooks/useMFENavigation";
import useLogout from "./hooks/useLogout";
import Modal from "component/Modal";
import Button from "component/Button";

const DashboardLazy = lazy(() => import("dashboard/DashboardApp"));
const CustomerLazy = lazy(() => import("customers/CustomerApp"));
const CasesLazy = lazy(() => import("cases/CasesApp"));
const RequestLazy = lazy(() => import("request/RequestApp"));
const ActivitiesLazy = lazy(() => import("activities/ActivitiesApp"));
// const ActivitiesDetailsLazy = lazy(() => import("activities/activity-details"));
const AccountstatementLazy = lazy(
  () => import("accountstatement/AccountstatementApp")
);
const CcmsLazy = lazy(() => import("ccms/CcmsApp"));
const KnowledgearticleLazy = lazy(
  () => import("knowledgearticle/KnowledgearticleApp")
);
const ServicesLazy = lazy(() => import("services/ServicesApp"));
const AuthLazy = lazy(() => import("auth/AuthApp"));
const CaseStructureLazy = lazy(() => import("casestructure/caseStructureApp"));
const GeneralSettingsLazy = lazy(() => import("gensettings/genSettingsApp"));
const UsermanagementLazy = lazy(
  () => import("usermanagement/userManagementApp")
);

const isAuthenticated = () => {
  // return localStorage.getItem("user") !== null;
  return true;
};

const App: FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname.startsWith("/login");

  const timeout = 10 * 60 * 1000;
  const warningTime = 30 * 1000;

  const { showWarning, countdown, setShowWarning } = useLogout(
    timeout,
    warningTime,
    isLoginPage
  );

  useMFENavigation();

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isLoginPage ? "overflow-hidden" : ""
      }`}
    >
      {!isLoginPage && (
        <div className="fixed w-full z-20">
          <Header />
        </div>
      )}
      <div className={`flex flex-1 ${!isLoginPage ? "mt-1rem" : ""}`}>
        {!isLoginPage && (
          <div className="w-[14%] mt-[72px] fixed z-50">
            <Sidenav />
          </div>
        )}
        <main
          className={`${
            !isLoginPage ? "ml-[14%] mt-[72px] w-[86%]" : "w-full h-full"
          }`}
        >
          <Suspense fallback={<HorizontalProgressLoader />}>
            <Routes>
              <Route
                path="/*"
                element={
                  <ErrorBoundary>
                    <AuthLazy />
                  </ErrorBoundary>
                }
              />
              <Route
                path="/dashboard/*"
                element={
                  isAuthenticated() ? (
                    <ErrorBoundary>
                      <DashboardLazy />
                    </ErrorBoundary>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/customers/*"
                element={
                  isAuthenticated() ? (
                    <ErrorBoundary>
                      <CustomerLazy standalone={false} />
                    </ErrorBoundary>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/cases/*"
                element={
                  isAuthenticated() ? (
                    <ErrorBoundary>
                      <CasesLazy standalone={false} />
                    </ErrorBoundary>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/requests/*"
                element={
                  isAuthenticated() ? (
                    <ErrorBoundary>
                      <RequestLazy standalone={false} />
                    </ErrorBoundary>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/activities/*"
                element={
                  isAuthenticated() ? (
                    <ErrorBoundary>
                      <ActivitiesLazy standalone={false} />
                    </ErrorBoundary>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              {/* <Route
                path="/activities/activity-details/:id"
                element={
                  isAuthenticated() ? (
                    <ErrorBoundary>
                      <ActivitiesDetailsLazy />
                    </ErrorBoundary>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              /> */}
              <Route
                path="/accountstatement/*"
                element={
                  isAuthenticated() ? (
                    <ErrorBoundary>
                      <AccountstatementLazy standalone={false} />
                    </ErrorBoundary>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/ccms/*"
                element={
                  isAuthenticated() ? (
                    <ErrorBoundary>
                      <CcmsLazy />
                    </ErrorBoundary>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              {/* <Route
                path="/settings/*"
                element={
                  isAuthenticated() ? (
                    <ErrorBoundary>
                      <SettingsLazy />
                    </ErrorBoundary>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              /> */}
              <Route
                path="/knowledgearticle/*"
                element={
                  isAuthenticated() ? (
                    <ErrorBoundary>
                      <KnowledgearticleLazy />
                    </ErrorBoundary>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/services/*"
                element={
                  isAuthenticated() ? (
                    <ErrorBoundary>
                      <ServicesLazy />
                    </ErrorBoundary>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/generalsettings/*"
                element={
                  isAuthenticated() ? (
                    <ErrorBoundary>
                      <GeneralSettingsLazy />
                    </ErrorBoundary>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/casestructure/*"
                element={
                  isAuthenticated() ? (
                    <ErrorBoundary>
                      <CaseStructureLazy />
                    </ErrorBoundary>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/usermanagement/*"
                element={
                  isAuthenticated() ? (
                    <ErrorBoundary>
                      <UsermanagementLazy />
                    </ErrorBoundary>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/"
                element={
                  isAuthenticated() ? (
                    <Navigate to="/dashboard/" />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              {/* Catch all for unmatched routes */}
              <Route
                path="*"
                element={
                  isAuthenticated() ? <ErrorPage /> : <Navigate to="/login" />
                }
              />
            </Routes>
          </Suspense>
        </main>
      </div>
      {!isLoginPage && (
        <Modal
          isOpen={showWarning}
          onClose={() => setShowWarning(false)}
          position="center"
          width="400px"
          headerText="Inactivity Warning"
          closeXBtn={false} // Remove close button to enforce logout
        >
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg text-gray-800 my-4">Inactivity Warning</h2>
            <p className="text-lg text-gray-600 text-center">
              You will be logged out in{" "}
              <span className="font-bold text-gray-800">{countdown}</span>{" "}
              seconds due to inactivity.
            </p>

            <Button
              onClick={() => setShowWarning(false)}
              variant="primary"
              size="medium"
              className="!px-10 !py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 ease-in-out shadow-md"
            >
              Stay Logged In
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

const AppWrapper: FC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
