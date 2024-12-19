import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import notifySuccess from "../../components/toasts/Success.toast";
import notifyError from "../../components/toasts/Err.toast";
import MiniFileUploader from "../file-manager/components/MiniFileuploader";

function MenuBuilder() {
	const [languages, setLanguages] = useState([]);
	const [items, setItems] = useState({
		Settings: "",
		General: "",
		AppSetting: "",
		AccountSetting: "",
		Account: "",
		Support: "",
		Information: "",
		Collection: "",
		Wishlist: "",
		Donation: "",
		Whatnew: "",
		Profile: "",
		Password: "",
		ChangeEmail: "",
		ChangePhone: "",
		Notification: "",
		Languages: "",
		Theme: "",
		Audio: "",
		PlayBack: "",
		DataSaver: "",
		Faq: "",
		Contact: "",
		About: "",
		Policy: "",
		Terms: "",
		Disclaimer: "",
		Social: "",
		FeedBack: "",
		Rate: "",
		Report: "",
		Refund: "",
		CustomerSupport: "",
		DeleteAccount: "",
		Language: "",
	});
	const [currLanguage, setCurrLanguage] = useState("");
	const [Id, setId] = useState("");
	const LanguageApi = `${process.env.REACT_APP_SERVER}languages/`;

	async function fetchLanguages() {
		try {
			const response = await axios.get(LanguageApi);
			setLanguages(response.data);
		} catch (error) {
			notifyError("Error fetching languages");
		}
	}

	async function fetchMenu() {
		if (!currLanguage) return;
		try {
			setInputValues(
				schemaProperties.reduce((acc, prop) => {
					acc[prop] = {
						title: "",
						image: "",
					};
					return acc;
				}, {})
			);
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER}menu/language/${currLanguage}`
			);

			if (response.data._id) {
				setItems(response.data);
				setInputValues(response.data);
				setId(response.data._id);
			} else {
				setId("");
			}
		} catch (error) {
			notifyError("Error fetching menu");
		}
	}

	async function submit() {
		setItems({ ...items, Language: currLanguage });
		try {
			const apiEndpoint = Id
				? `${process.env.REACT_APP_SERVER}menu/${Id}`
				: `${process.env.REACT_APP_SERVER}menu/`;
			const method = Id ? "put" : "post";
			const response = await axios[method](apiEndpoint, items);

			if (response.status == 200) {
				notifySuccess("Successfully Saved");
			}
		} catch (error) {
			notifyError("Unable to save");
		}
		window.scrollTo({ top: 0, behavior: "instant" });
	}

	useEffect(() => {
		fetchLanguages();
	}, []);

	useEffect(() => {
		fetchMenu();
	}, [currLanguage]);

	const menuItems = [
		"Settings",
		"General (Label)",
		"AppSetting (Label)",
		"AccountSetting (Label)",
		"Account (Label)",
		"Support (Label)",
		"Information (Label)",
		"Collection",
		"Wishlist",
		"Donation History",
		"What's New",
		"Profile",
		"Password",
		"Change Email",
		"Change Phone",
		"Notification",
		"Languages",
		"Theme Mode",
		"Audio & Video",
		"PlayBack",
		"DataSaver & Storage",
		"FAQ",
		"Contact us",
		"About us",
		"Privacy Policy",
		"Terms & Conditions",
		"Disclaimer",
		"Social Media",
		"FeedBack",
		"Rate App",
		"Report DMCA / CopyRight",
		"Cancellation & Refund",
		"Customer Support",
		"Delete Account",
	];

	const schemaProperties = [
		"Settings",
		"General",
		"AppSetting",
		"AccountSetting",
		"Account",
		"Support",
		"Information",
		"Collection",
		"Wishlist",
		"Donation",
		"Whatnew",
		"Profile",
		"Password",
		"ChangeEmail",
		"ChangePhone",
		"Notification",
		"Languages",
		"Theme",
		"Audio",
		"PlayBack",
		"DataSaver",
		"Faq",
		"Contact",
		"About",
		"Policy",
		"Terms",
		"Disclaimer",
		"Social",
		"FeedBack",
		"Rate",
		"Report",
		"Refund",
		"CustomerSupport",
		"DeleteAccount",
	];

	// State to handle input values
	const [inputValues, setInputValues] = useState(
		schemaProperties.reduce((acc, prop) => {
			acc[prop] = {
				title: "",
				image: "",
			};
			return acc;
		}, {})
	);

	// Input handler
	const handleInputChange = (value, propertyName, type) => {
		setInputValues((prev) => ({
			...prev,
			[propertyName]: {
				...prev[propertyName],
				[type]: value,
			},
		}));
		console.log(inputValues);
	};

	useEffect(() => {
		setItems(inputValues);
	}, [inputValues]);

	return (
		<div>
			<h1>App Menu Builder</h1>
			<div className="Card tablecard">
				<div className="drop-col">
					<span className="drop-lable">
						Select Language To View Menu
					</span>

					<select
						className="drop"
						onChange={(e) => {
							setCurrLanguage(e.target.value);
							setItems({ ...items, Language: e.target.value });
						}}>
						<option value="">-----</option>
						{languages.map((op) => (
							<option key={op.adminName} value={op.adminName}>
								{op.adminName}
							</option>
						))}
					</select>
				</div>
				{currLanguage && (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "10px",
						}}>
						{menuItems.map((property, i) => (
							<div
								key={property}
								style={{
									justifyContent: "space-between",
									display: "flex",
									flexWrap: "wrap",
									alignItems: "center",
									gap: "10px",
									borderBottom: "1px dashed #D8DAE5",
								}}>
								<div
									className="drop-col"
									style={{
										justifyContent: "flex-start",
										marginRight: "15px",
										textAlign: "start",
										width: "300px",
									}}>
									<span
										style={{
											textAlign: "start",
											fontSize: "16px",
											fontWeight: "600",
										}}>
										{property}
									</span>
								</div>
								<MiniFileUploader
									value={inputValues[schemaProperties[i]].image}
									onAdd={(e) =>
										handleInputChange(e, schemaProperties[i], "image")
									}
								/>
								<div
									className="drop-col"
									style={{ alignItems: "center" }}>
									<input
										style={{ width: "250px" }}
										type="text"
										name={schemaProperties[i]}
										value={inputValues[schemaProperties[i]].title}
										placeholder={`${currLanguage} Translation`}
										onChange={(e) =>
											handleInputChange(
												e.target.value,
												schemaProperties[i],
												"title"
											)
										}
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			<div className="center mb-10">
				<button onClick={submit} className="addButton">
					Save
				</button>
			</div>
			<ToastContainer />
		</div>
	);
}

export default MenuBuilder;
