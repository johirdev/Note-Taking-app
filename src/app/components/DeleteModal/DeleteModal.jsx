import { useContext, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { GlobalData } from "@/app/(site)/globalDataProvider";
import config from "@/app/config/Config";

const DeleteModal = ({ deleteUrl, title = "Items", onDeleted, closeModal }) => {
  const { token } = useContext(GlobalData);

  useEffect(() => {
    // swal popup open when component mounts
    swal({
      title: "Are you sure?",
      text: `Once deleted, you will not be able to recover this ${title}!`,
      icon: "warning",
      buttons: {
        cancel: "Cancel",
        confirm: {
          text: "Delete",
          value: true,
          visible: true,
          className: "btn-danger",
          closeModal: true,
        },
      },
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(`${config.API_URL}${deleteUrl}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          swal(`${title} Deleted Successfully!`, {
            icon: "success",
            buttons: false,
            timer: 1000,
          });

          if (onDeleted) onDeleted();
        } catch (error) {
          // console.log("why not delete", error);
          swal(`Failed to Delete ${error?.response?.data?.message}`, {
            icon: "error",
          });
        }
      }

      if (closeModal) closeModal(); // always close after swal
    });
  }, [deleteUrl, title, onDeleted, closeModal]);

  return null; // nothing to render
};

export default DeleteModal;
