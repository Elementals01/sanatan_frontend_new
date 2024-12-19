import axios from "axios";
import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FileInputComponent from "../file-manager/components/FileInputComponent";
import PopupComponent from "../file-manager/components/Popup.component";

function LanguageUpdate() {
	const navigate = useNavigate();
	const { id } = useParams();
	const Api = `${process.env.REACT_APP_SERVER}languages/${id}`;

	const [language, setLanguage] = useState({
		adminName: "",
		Name: "",
		Status: "",
		Icon: "",
		Date: moment().toString(),
	});
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [popupVisible, setPopupVisible] = useState(false);
	const [activeInputName, setActiveInputName] = useState("");

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(false);
		try {
			const res = await axios.get(Api);
			setLanguage(res.data);
			console.log(res.data);
		} catch (e) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}, [Api]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const inputHandler = (e) => {
		const { name, value } = e.target;
		setLanguage((prev) => ({ ...prev, [name]: value }));
		console.log(language);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await axios.put(Api, language);
			navigate("/languages");
		} catch (error) {
			console.error(error);
		}
	};

	const handleFileInputClick = useCallback((Name) => {
		setActiveInputName(Name);
		setPopupVisible(true);
	}, []);

	const handleImageSelect = useCallback(
		(imageName) => {
			setLanguage((prev) => ({
				...prev,
				[activeInputName]: imageName,
			}));
			setPopupVisible(false);
		},
		[activeInputName]
	);

	return (
		<div>
			{popupVisible && (
				<PopupComponent
					setisOpen={setPopupVisible}
					event={handleImageSelect}
				/>
			)}
			<h1>Update Language</h1>
			<div className="Card">
				<div className="drop-group">
					<div className="drop-col">
						<span className="drop-lable">Language Name</span>
						<input
							type="text"
							className="md-in"
							name="Name"
							value={language.Name}
							onChange={inputHandler}
						/>
					</div>
					<div className="drop-col">
						<span className="drop-lable">Status</span>
						<select
							className="drop"
							name="Status"
							onChange={inputHandler}
							value={language.Status}
							id="scat">
							<option value="STATUS_ACTIVE">Active</option>
							<option value="STATUS_INACTIVE">Inactive</option>
						</select>
					</div>
				</div>
				<div className="drop-col">
					<span className="drop-lable">
						Language Name (For Admin)
					</span>
					<input
						type="text"
						name="adminName"
						value={language.adminName}
						onChange={inputHandler}
						readOnly
					/>
				</div>

				<FileInputComponent
					title="Upload Image or add link"
					links={language.Icon}
					onDelete={() => setLanguage({ ...language, Icon: "" })}
					onAdd={(image) => setLanguage({ ...language, Icon: image })}
					type={"single"}
				/>

				<div className="center">
					<button onClick={submitHandler} className="addButton">
						Update Language
					</button>
				</div>
			</div>
		</div>
	);
}

export default LanguageUpdate;
