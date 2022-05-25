import { toast } from "react-toastify";

const toastCSS = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// const id = toast.loading("Please wait...");

// toast.update(id, {
//   render: "All is good",
//   type: "success",
//   isLoading: false,
// });

export const toastLoading = () => {
  return toast.loading("Please wait...");
};

export const toastUpdate = (id, type, message) => {
  return toast.update(id, {
    render: message,
    type: type,
    isLoading: false,
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastMessage = (type, message) => {
  switch (type) {
    case "success":
      return toast.success(message, toastCSS);
    case "error":
      return toast.error(message, toastCSS);
    case "warning":
      return toast.warning(message, toastCSS);
    default:
      return toast.warning(message, toastCSS);
  }
};

const Toast = { toastMessage, toastLoading, toastUpdate };

export default Toast;
