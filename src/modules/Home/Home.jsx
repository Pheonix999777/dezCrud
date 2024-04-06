import { useState } from "react";
import img from "../../assets/img/logo.png";
import Button from "react-bootstrap/Button";
import { Detail } from "./Detail/Detail";
import { useHomeProps } from "./useHomeProps";
import "./style.css";
import { CategoryUpdate } from "./CategoryUpdate/CategoryUpdate";

export const Home = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const handleShow = () => setShow(true);
  const handleOpen = (id) => {
    setOpen(true);
    setCategoryId(id);
  };

  const { loading, category, handleDelete } = useHomeProps();

  return (
    <>
      <div className="category">
        <div className="container">
          <h1>Category</h1>
          <Button
            variant="primary"
            className="category-btn"
            onClick={handleShow}
          >
            Add+
          </Button>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Avatar</th>
                  <th>EN</th>
                  <th>RU</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {category.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        className="category-img"
                        src={`https://autoapi.dezinfeksiyatashkent.uz/${item.image_src}`}
                        alt="Avatar"
                      />
                    </td>
                    <td>{item.name_en}</td>
                    <td>{item.name_ru}</td>
                    <td>
                      <button
                        className="btns"
                        onClick={() => handleOpen(item.id)}
                      >
                        {" "}
                        edit
                      </button>
                      <button
                        className="btns"
                        onClick={() => handleDelete(item.id)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {show && <Detail setShow={setShow} show={show} />}
      {open && (
        <CategoryUpdate setShow={setOpen} show={open} categoryId={categoryId} />
      )}{" "}
    </>
  );
};
