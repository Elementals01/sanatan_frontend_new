import axios from "axios";
import React, { useState } from "react";
import TextEditor from "../../../components/form-components/EditorComponent";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function AddFaqContent() {
	const { id, lang } = useParams();
	const navigate = useNavigate();
	const Api = `${process.env.REACT_APP_SERVER}faqs/content/`;
	const Model = {
		title: "",
		description: "",
		Language: lang,
		Page: id,
	};
	const [Page, setPage] = useState(Model);
	const submitHandler = async (e) => {
		e.preventDefault();
		if (Page.title === "") {
			const notify = () =>
				toast.error("Title is required", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			notify();
		} else {
			await axios
				.post(Api, Page)
				.then((res) => {
					console.log(res);
					navigate("/faq");
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<div>
			<h1>FAQ</h1>
			<div className="Card">
				{
					new TextEditor(
						Page.title,
						(e) => setPage({ ...Page, title: e }),
						"Title"
					)
				}
				{
					new TextEditor(
						Page.description,
						(e) => setPage({ ...Page, description: e }),
						"Description"
					)
				}
			</div>
			<div className="center mb-10">
				<button className="addButton" onClick={submitHandler}>
					Submit
				</button>
			</div>
			<ToastContainer />
		</div>
	);
}

export default AddFaqContent;
