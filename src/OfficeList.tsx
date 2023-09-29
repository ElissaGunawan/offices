import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchOffices, OfficesResponse } from "./mocks";
import { Link } from "react-router-dom";
import OfficeForm from "./OfficeForm";

const OfficeList: React.FC = () => {
    const { data, isLoading, isError } = useQuery<OfficesResponse>(
      "offices",
      fetchOffices
    );

    const [showForm, setShowForm] = useState(false);
    const handleShowForm = () => {
        setShowForm(true); // Display the form when the button is clicked
    };
    const handleFormClose = () => {
        setShowForm(false); // Close the form
    };

    console.log("Office List Data:", data);
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (isError) {
      return <p>Error loading offices</p>;
    }
  
    return (
        <div>
            <h1>Offices</h1>
            {!showForm && (
            <button
                onClick={handleShowForm}
                className="mx-auto rounded-pill bg-info"
                >
                Add New Location <i className="bi bi-plus"></i>
            </button>
            )}
            {showForm && (
                <div>
                    <OfficeForm onSuccess={handleFormClose}  onClose={handleFormClose}/>
                </div>
            )}
            {data?.data.map((office) => (
                <div key={office.id} className="accordion accordion-flush">
                <div className="accordion-item mt-3 rounded-5">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#office-${office.id}`}
                    >
                      {office.title} - {office.address}
                    </button>
                  </h2>
                  <div
                    id={`office-${office.id}`}
                    className="accordion-collapse collapse"
                  >
                    <div className="accordion-body">
                      <p>{office.detail.fullname}</p>
                      <p>{office.detail.job}</p>
                      <p>{office.detail.email}</p>
                      <p>{office.detail.phone}</p>
                      <Link to={`/update/${office.id}`}>
                          <button className="me-md-5 btn btn-secondary">
                            <i className="bi bi-pencil-square"> Edit</i>
                          </button>
                      </Link>
                      <Link to={`/delete/${office.id}`}>
                        <button className="float-end btn btn-danger">
                            <i className="bi bi-trash"> Delete</i>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <p className="m-3 text-secondary">This project for test purpose-only</p>
        </div>
    );
  };
  
  export default OfficeList;