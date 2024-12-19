import { ToastContainer, toast } from "react-toastify";
const notifyError = (toastmsg) =>
	toast.error(toastmsg, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
	});

export default notifyError;
