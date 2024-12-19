import React, { useEffect, useState } from "react";
import LanguageDropDownComponent from "../../components/form-components/LanguageDropDown.component";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import notifyError from "../../components/toasts/Err.toast";
import { ToastContainer } from "react-toastify";
import notifySuccess from "../../components/toasts/Success.toast";

function AddAvailability() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [loading, setLoading] = useState();
	async function fetchdata() {
		setLoading(true);
		const response = await axios.get(
			`${process.env.REACT_APP_SERVER}pages/get-availability/${id}`
		);
		const language = await axios.get(
			`${process.env.REACT_APP_SERVER}languages/`
		);
		console.log(response);
		setPage(response.data[0]);
		setLanguages(response.data[0].Availability);
		Setlangs(language.data);
		setLoading(false);
	}

	async function submitHandler() {
		try {
			const response = await axios.patch(
				`${process.env.REACT_APP_SERVER}pages/update-availability/${id}`,
				Page
			);
			if (response.data._id) {
				notifySuccess("Successfully updated availability");
			}
		} catch (e) {
			notifyError("Unexpected error");
		}
	}

	async function pageRedirector(language, style) {
		setPage({ ...Page, Availability: languages });
		try {
			const response = await axios.patch(
				`${process.env.REACT_APP_SERVER}pages/update-availability/${id}`,
				Page
			);
			console.log(response);
			if (response.data._id) {
				try {
					axios
						.get(
							`${process.env.REACT_APP_SERVER}page/${style}/${id}/${language}`
						)
						.then((res) => {
							console.log(res);
							if (res.data._id) {
								navigate(
									`/pages/edit/${style}/${res.data._id}/${language}`
								);
							} else {
								navigate(`/pages/add/${style}/${id}/${language}`);
							}
						})
						.catch((e) => {
							notifyError("Unexpected error");
						});
				} catch (error) {
					notifyError("Unexpected Error");
				}
			}
		} catch (error) {}
	}

	useEffect(() => {
		fetchdata();
	}, []);
	const [languages, setLanguages] = useState({});
	const [Page, setPage] = useState({
		Availability: {},
		defaultLanguage: "",
		pagestyle: "",
	});
	const [Langs, Setlangs] = useState([]);
	useEffect(() => {
		setPage({ ...Page, Availability: languages });
		console.log(Page);
	}, [languages]);
	return (
		<div>
			<h1>Language Availability</h1>
			{!loading && (
				<>
					<LanguageDropDownComponent
						items={Langs}
						setLanguages={setLanguages}
						languages={languages}
						pageRedirector={(language) =>
							pageRedirector(language, Page.pagestyle)
						}
						setdefaultLanguage={(value) =>
							setPage({ ...Page, defaultLanguage: value })
						}
						defaultLanguage={Page.defaultLanguage}
					/>

					<ToastContainer />
					<div className="center mb-10">
						<button className="addButton" onClick={submitHandler}>
							Save
						</button>
					</div>
				</>
			)}
		</div>
	);
}

export default AddAvailability;
