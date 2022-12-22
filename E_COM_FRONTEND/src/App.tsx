import "./App.css";
import { Navbar } from "./View/components/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { Footer } from "./View/components/Footer";
import { MainContent } from "./View/MainContent";
import { Home } from "./View/pages/homepage/Home";
import { UserProvider } from "./Controller/contextApiController/UserProvider";
import { AdminProvider } from "./Controller/contextApiController/AdminProvider";
//pages

function App() {
  return (
    <>
      <AdminProvider>
        <UserProvider>
          <Navbar />
          <MainContent content={<Home />} />
          <Footer />
        </UserProvider>
      </AdminProvider>
    </>
  );
}

export default App;
