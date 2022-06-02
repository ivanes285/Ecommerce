import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "./GlobalState";
import Header from "./components/Headers/Header";
import MainPage from "./components/MainPages/Pages"


export default function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
         <Header />
         <MainPage />
        </div>
      </Router>
    </DataProvider>
  );
}
