import './UserHeader.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../app/actions/actions';

export default function UserHeader() {
  const dispatch = useDispatch();
 
  const { userName, firstName, lastName } = useSelector((state) => state.userProfile);
  const token = useSelector((state) => state.userLogin.token);
  const [newUserName, setNewUserName] = useState(userName);
  const [editButton, setEditButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const editNameButton = (e) => {
    e.preventDefault();
    setEditButton((current) => !current);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateProfile(token, newUserName));
    if (result.success) {
      setEditButton(false);
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <>
      {!editButton ? (
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName + ' ' + lastName} !
          </h1>
          <button onClick={editNameButton} className="edit-button">
            Edit Name
          </button>
        </div>
      ) : (
        <div className="header">
          <h1>Welcome back</h1>
          <form className="editNameContent" onSubmit={submitHandler}>
            <div className="editNameInputs">
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                required
              />
              <input
                type="text"
                value={firstName}
                disabled
                className="disabled-input"
              />
              <input
                type="text"
                value={lastName}
                disabled
                className="disabled-input"
              />
            </div>
            <div className="editNameButtons">
              <button className="save-button" type="submit">
                Save
              </button>
              <button className="cancel-button" onClick={editNameButton}>
                Cancel
              </button>
            </div>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      )}
    </>
  );
}
