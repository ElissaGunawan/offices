import React from "react";
import { useMutation } from "react-query";
import { AddOfficeBody, addOffice, DATA } from "./mocks";
import { queryClient } from "./App";
import { v4 as uuid } from "uuid";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useAlert } from "react-alert";

interface OfficeFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

const OfficeForm: React.FC<OfficeFormProps> = ({ onSuccess, onClose }) => {
  const { control, handleSubmit } = useForm<AddOfficeBody>();
  
  const alert = useAlert();

  const mutation = useMutation(addOffice, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("offices");
      onSuccess();
      alert.show(data?.message);
    },
  });

  const onSubmit: SubmitHandler<AddOfficeBody> = (data) => {
    try {
      mutation.mutateAsync(data);
      DATA.push({
        id: uuid(),
        title: data.title,
        address: data.address,
        detail: {
          fullname: data.fullname,
          job: data.job,
          email: data.email,
          phone: data.phone,
        },
      });
    } catch (error) {
      console.error("Error adding office:", error);
    }
  };

  return (
    <div className="form-body bg-white rounded-2 p-3">
      <div className="row">
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <button onClick={onClose} className="close-button float-end p-3">
                <i className="bi bi-x"></i>
              </button>
              <h4 className="p-3">New Location</h4>
              <form className="requires-validation" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-12 mb-3 mt-2">
                  <label htmlFor="title" className="form-label">
                    Title*
                  </label>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <input type="text" className="form-control" {...field} required />
                        <div className="valid-feedback">Title field is valid!</div>
                        <div className="invalid-feedback">Title field cannot be blank!</div>
                      </div>
                    )}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="address" className="form-label">
                    Address*
                  </label>
                  <Controller
                    name="address"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <input type="text" className="form-control" {...field} required />
                        <div className="valid-feedback">Address field is valid!</div>
                        <div className="invalid-feedback">Address field cannot be blank!</div>
                      </div>
                    )}
                  />
                </div>
                <div className="p-3 bg-info bg-opacity-10 border border-info border-start-0 border-end-0">
                  <label htmlFor="fullname" className="form-label">Contact Information</label>
                </div>
                <div className="col-md-12 mb-3 mt-2">
                  <label htmlFor="fullname" className="form-label">
                    Fullname*
                  </label>
                  <Controller
                    name="fullname"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <input type="text" className="form-control" {...field} required />
                        <div className="valid-feedback">Fullname field is valid!</div>
                        <div className="invalid-feedback">Fullname field cannot be blank!</div>
                      </div>
                    )}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="job" className="form-label">
                    Job*
                  </label>
                  <Controller
                    name="job"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <input type="text" className="form-control" {...field} required />
                        <div className="valid-feedback">Job field is valid!</div>
                        <div className="invalid-feedback">Job field cannot be blank!</div>
                      </div>
                    )}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="email" className="form-label">
                    Email*
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <input type="text" className="form-control" {...field} required />
                        <div className="valid-feedback">Email field is valid!</div>
                        <div className="invalid-feedback">Email field cannot be blank!</div>
                      </div>
                    )}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone*
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div>
                        <input type="text" className="form-control" {...field} required />
                        <div className="valid-feedback">Phone field is valid!</div>
                        <div className="invalid-feedback">Phone field cannot be blank!</div>
                      </div>
                    )}
                  />
                </div>
                <div>
                  <button type="submit" className="m-3 btn btn-success">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeForm;
