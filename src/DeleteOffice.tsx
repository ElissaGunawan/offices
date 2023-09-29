import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteOffice, DATA } from './mocks';
import { useAlert } from "react-alert";

const DeleteOfficeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const alert = useAlert();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      console.log(id);
      setIsDeleting(true);
      const deletedOffice = await deleteOffice(id!);
      const alertMessage = deletedOffice?.message || 'Office deleted successfully';
      const updatedData = DATA.filter((office) => office.id !== id);
      DATA.length = 0;
      DATA.push(...updatedData);
      console.log("delete success")
      setIsDeleting(false);
      navigate('/');
      alert.show(alertMessage);
    } catch (error) {
      console.error('Error deleting office:', error);
      setIsDeleting(false);
      alert.error('Error deleting office. Please try again.');
    }
  };

  const handleBackToList = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Delete Office</h2>
      <p>Are you sure you want to delete this office?</p>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className='float-start'
      >
        {isDeleting ? 'Deleting...' : 'Delete Office'}
      </button>
      <button
        type="button"
        onClick={handleBackToList}
        className='float-end bg-danger'
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteOfficeForm;