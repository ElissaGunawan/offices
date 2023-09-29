import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import { QueryClient, QueryClientProvider } from "react-query";
import OfficeList from "./OfficeList";
import UpdateOfficeForm from "./UpdateOfficeForm";
import DeleteOfficeForm from "./DeleteOffice";
import { transitions, positions, Provider as AlertProvider, AlertTemplateProps } from 'react-alert';

export const queryClient = new QueryClient();
const CustomAlert: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="alert alert-success d-flex align-items-center" role="alert">
      <i className="bi bi-check flex-shrink-0 me-2"></i>
    <div>
      {message}
    </div>
    </div>
  );
};
const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
};

function App() {
  return (
  <AlertProvider template={CustomAlert as React.ComponentType<AlertTemplateProps>} {...options}>
      <QueryClientProvider client={queryClient}>
      <Router>
          <Routes>
            <Route path='/' element={<OfficeList/>} />
            <Route path="/update/:id" element={<UpdateOfficeForm />} />
            <Route path="/delete/:id" element={<DeleteOfficeForm />} />
          </Routes>
      </Router>
      </QueryClientProvider>
    </AlertProvider>
  )
}

export default App;
