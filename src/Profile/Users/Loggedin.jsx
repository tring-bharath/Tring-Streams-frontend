import React, { useContext, useEffect, useState } from "react";
import { ProfileName } from "../../routes/AppRoutes";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import alter from '../../assets/signin.png'
const LoggedIn = () => {
  const url = import.meta.env.VITE_API_URL;
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const email = JSON.parse(localStorage.getItem("email"));
  const [formData, setFormData] = useState({ email });
  const { userName, setUsername } = useContext(ProfileName);

  const handleGetAllUser = async () => {
    await axios
      .post(`${url}/user/getUser`, { email })
      .then((res) => setFormData(res.data));
  };

  const logout = () => {
    localStorage.clear("User");
    setUsername(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditSubmit = () => {
    try {
      axios.post(`${url}/user/updateUser`, formData);
    } catch (error) {
      console.log(error);
    }
    setEditShow(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, ProfilePicture: imageUrl });
    }
  };

  useEffect(() => {
    handleGetAllUser();
  }, []);

  return (
    <div className="w-100">
      <div className="history d-flex  flex-column w-100 h-100">
        <Modal show={show} centered>
          <Modal.Header>
            <div className="logout-header h3">Log Out</div>
          </Modal.Header>
          <Modal.Body>
            <div className="logout-body h4">Are you sure want to logout!</div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="h4" onClick={() => setShow(false)}>
              CANCEL
            </Button>
            <Button variant="danger" onClick={() => logout()}>
              LOG OUT
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={editShow} fullscreen onHide={() => setEditShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>
                  <img
                    src={formData?.ProfilePicture||alter}
                    className="rounded-circle"
                    style={{ width: "150px" }}
                  />
                </Form.Label>
                <Form.Control
                  type="file"
                  name="profile"
                  onChange={handleImageChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Check
                  type="radio"
                  name="gender"
                  value="Male"
                  label="Male"
                  checked={formData.gender == "Male"}
                  onChange={handleEditChange}
                />
                <Form.Check
                  type="radio"
                  name="gender"
                  value="Female"
                  label="Female"
                  checked={formData.gender == "Female"}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  name="bio"
                  value={formData.bio}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditShow(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="profile-container">
          <div className="header d-flex justify-content-between w-100">
            <div className="history h2 align-self-center ms-3">Profile</div>
            <div className="nav align-self-end m-3 ">
              <button
                className="px-3 py-2 rounded-1 h5 text-white bg-primary"
                onClick={() => setShow(true)}>
                Logout
              </button>
            </div>
          </div>
          <div className="profile-body ps-4 d-flex flex-column w-100">
            <div
              className="card shadow-lg p-4 text-start"
              style={{ width: "350px" }}>
              <img
                src={formData?.ProfilePicture||alter}
                alt={""}
                className="rounded-circle mb-3 h5 display-5 bg-primary text-white"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h3>{userName}</h3>
              <h6 className="text-muted">
                {formData.email && <div>Mail:{formData?.email}</div>}
              </h6>
              <h6 className="text-muted">
                {formData.phoneNumber && (
                  <div>Contact:{formData?.phoneNumber}</div>
                )}
              </h6>
              <button
                className="btn btn-primary w-100"
                onClick={() => setEditShow(true)}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
