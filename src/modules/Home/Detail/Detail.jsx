import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

export const Detail = ({ setShow, show }) => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();

  const handleClose = () => setShow(false);

  const mutation = useMutation(
    async (formData) => {
      const response = await axios.post(
        "https://autoapi.dezinfeksiyatashkent.uz/api/categories",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    },
    {
      onSuccess: () => {
        handleClose();
      },
      onError: (error) => {
        console.error("error:", error.message);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name_en", number);
    formData.append("name_ru", password);
    formData.append("images", file);

    mutation.mutate(formData);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>POST</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input
            className="post-inp"
            type="text"
            placeholder="name_en"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            className="post-inp"
            placeholder="name_ru"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input className="post-inp" type="file" onChange={handleFileChange} />
          <Button className="post-btn" variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
