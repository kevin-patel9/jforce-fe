import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";
import FeedbackList from "./pages/FeedbackList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedbackList" element={<FeedbackList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
