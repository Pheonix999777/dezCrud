import { useEffect, useState } from "react";
import axios from "axios";

export const useHomeProps = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (!response.data.success) {
          throw new Error("Network response was not ok");
        }
        setCategory(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (!response.data.success) {
          throw new Error("Network response was not ok");
        }
        setCategory((prevCategory) =>
          prevCategory.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return { loading, category, handleDelete };
};
