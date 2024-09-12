import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar.js";
import HomePage from "./components/home/homepage.js";
import { SidebarAdmin } from "./components/sidebar/sidebarAdmin.js"; // Sidebar with admin links
import { Outlet } from "react-router-dom";
import { BedAllotment } from "./components/adminDashboard/bedAllotment/bedAllotment.js";
import AllotmentPage from "./components/AllotmentPage/allotmentPage.js";
import Login from "./components/home/login.js";
import Signup from "./components/home/signup.js";
import InventoryManagement from "./components/adminDashboard/inventory/inventoryManagement.js";
import AppoinmentPage from "./components/AppointmentPage/appoinmentPage.js";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store.js";
import { useEffect } from "react";
import { fetchUserData } from "./redux/apis/userApi.js";
import { userExists, userNotExists } from "./redux/reducers/userReducer.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import 'react-toastify/dist/ReactToastify.css';
import { SidebarPatient } from "./components/sidebar/sidebarPatient.js";
import OverView from "./components/patientDashboard/overView/OverView.js";

// Layout for routes with a Navbar
function NavbarLayout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Renders the component for the current route */}
    </>
  );
}

// App component with routing setup
function App() {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      const getUserData = async () => {
        try {
          const userData = await fetchUserData();
          dispatch(userExists(userData));
        } catch (error) {
          dispatch(userNotExists());
          console.log("failed to fetch user data");
        }
      };
      getUserData();
    }
  }, [dispatch, user]);

  return (
    <Router>
      <Routes>
        {/* Routes with the Navbar */}
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/bedallotment" element={<AllotmentPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/appointment" element={<AppoinmentPage />} />
          <Route element={<ProtectedRoute isAuthenticated={user ? true : false} />}>
            <Route path="/bedallotment" element={<AllotmentPage />} />
          </Route>
          <Route element={<ProtectedRoute isAuthenticated={user ? false : true} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
          </Route>
        </Route>

        {/* Admin dashboard route with Sidebar */}
        <Route path="/dashboard" element={<SidebarAdmin />}>
          {/* Nested routes within the dashboard */}
          <Route path="bedAllotment" element={<BedAllotment />} />
          <Route path="inventory" element={<InventoryManagement />} />
        </Route>

        {/* Patient dashboard route with Sidebar */}
        <Route path="/patientDashboard" element={<SidebarPatient />}>
          {/* Nested routes within the patient dashboard */}
          <Route path="overview" element={<OverView />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

export default App;
