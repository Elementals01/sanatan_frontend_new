import { ToastContainer, toast } from "react-toastify";
const notifySuccess = (toastmsg) =>
	toast.success(toastmsg, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
	});

export default notifySuccess;
