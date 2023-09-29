import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { updateOffice, AddOfficeBody, DATA } from './mocks';
import { useAlert } from "react-alert";

const UpdateOfficeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const alert = useAlert();

  const { control, handleSubmit, setValue } = useForm<AddOfficeBody>();

  useEffect(() => {
    const fetchOfficeData = async () => {
      try {
        if (id) {
          const office = DATA.find((office) => office.id === id);

          if (office) {
            setValue('title', office.title);
            setValue('address', office.address);
            setValue('fullname', office.detail.fullname);
            setValue('job', office.detail.job);
            setValue('email', office.detail.email);
            setValue('phone', office.detail.phone);
          }
        }
      } catch (error) {
        console.error('Error fetching office data:', error);
      }
    };
    fetchOfficeData();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<AddOfficeBody> = async (formData) => {
    try {
      const response = await updateOffice(id!, formData);
      const updatedDataIndex = DATA.findIndex((office) => office.id === id);
      if (updatedDataIndex !== -1) {
        DATA[updatedDataIndex] = {
          id,
          title: formData.title,
          address: formData.address,
          detail: {
            fullname: formData.fullname,
            job: formData.job,
            email: formData.email,
            phone: formData.phone,
          },
        };
      }
      console.log(formData);
      navigate('/');
      alert.show(response?.message || 'Office updated successfully');
    } catch (error) {
      console.error('Error updating office:', error);
      alert.error('Error updating office. Please try again.');
    }
  };

  const handleBackToList = () => {
    navigate('/');
  };

  return (
    <div className="form-body">
      <div className="row">
        <div className="form-holder">
          <div className="form-content">
            <div className="form-items">
              <button onClick={handleBackToList} className="close-button float-end p-3 bg-white">
                <i className="bi bi-x"></i>
              </button>
              <h3 className="m-5">Update Office</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="requires-validation" noValidate>
                <div className="col-md-12 mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <input type="text" id="title" {...field} className="form-control" placeholder="Title" required />
                    )}
                  />
                  <div className="valid-feedback">Title field is valid!</div>
                  <div className="invalid-feedback">Title field cannot be blank!</div>
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <input type="text" id="address" {...field} className="form-control" placeholder="Address" required />
                    )}
                  />
                  <div className="valid-feedback">Address field is valid!</div>
                  <div className="invalid-feedback">Address field cannot be blank!</div>
                </div>
                <div className="p-3 bg-info bg-opacity-10 border border-info border-start-0 border-end-0">
                  <label htmlFor="fullname" className="form-label">Contact Information</label>
                </div>
                <div className="col-md-12 mb-3 mt-2">
                  <label htmlFor="fullname" className="form-label">Full Name</label>
                  <Controller
                    name="fullname"
                    control={control}
                    render={({ field }) => (
                      <input type="text" id="fullname" {...field} className="form-control" placeholder="Fullname" required />
                    )}
                  />
                  <div className="valid-feedback">Fullname field is valid!</div>
                  <div className="invalid-feedback">Fullname field cannot be blank!</div>
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="job" className="form-label">Job</label>
                  <Controller
                    name="job"
                    control={control}
                    render={({ field }) => (
                      <input type="text" id="job" {...field} className="form-control" placeholder="Job" required />
                    )}
                  />
                  <div className="valid-feedback">Job field is valid!</div>
                  <div className="invalid-feedback">Job field cannot be blank!</div>
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input type="email" id="email" {...field} className="form-control" placeholder="Email" required />
                    )}
                  />
                  <div className="valid-feedback">Email field is valid!</div>
                  <div className="invalid-feedback">Email field cannot be blank!</div>
                </div>

                <div className="col-md-12 mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <input type="tel" id="phone" {...field} className="form-control" placeholder="Phone" required />
                    )}
                  />
                  <div className="valid-feedback">Phone field is valid!</div>
                  <div className="invalid-feedback">Phone field cannot be blank!</div>
                </div>

                <button type="submit" className='btn btn-success'>Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOfficeForm;
