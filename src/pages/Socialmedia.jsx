import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import MiniFileUploader from "./file-manager/components/MiniFileuploader";

function Socialmedia() {
	var Api = `${process.env.REACT_APP_SERVER}socials`;

	async function fetchdata() {
		try {
			const Response = await axios.get(Api);
			setDataFields(Response.data);
			console.log(Response.data);
		} catch (error) {}
	}

	const [datafields, setDataFields] = useState([]);
	useEffect(() => {
		fetchdata();
	}, []);
	const [Addsocial, SocialArray] = useState([]);
	const Addsocialfield = () => {
		SocialArray([...Addsocial, [{ icon: "", link: "", label: "" }]]);
	};

	const inputHandler = (value, index, name) => {
		const list = [...Addsocial];
		list[index][name] = value;
		SocialArray(list);
	};
	const inputHandler2 = (value, index, name) => {
		const list = [...datafields];
		const updatedItem = { ...list[index], [name]: value };

		list[index] = updatedItem;
		setDataFields(list);
	};

	const submitHandler = async (e, i) => {
		e.preventDefault();
		try {
			datafields.forEach(async (element) => {
				const response = await axios.put(
					`${process.env.REACT_APP_SERVER}socials/${element._id}`,
					element
				);
			});
			if (Addsocial.length > 0) {
				const Addapi = `${process.env.REACT_APP_SERVER}socials/add`;
				Addsocial.forEach(async (element) => {
					const response = await axios.post(Addapi, element);
				});
			}
		} catch (error) {}
		fetchdata();
	};

	const [del, setdel] = useState({ id: "" });
	const [open, setOpen] = useState(false);
	const handleClick = (id) => {
		setOpen(true);
		setdel({ ...del, id: id });
	};
	const handleDialogClose = () => setOpen(false);
	const handleConfirm = () => {
		try {
			axios
				.delete(`${Api}/${del.id}`)
				.then((res) => {
					fetchdata();
				})
				.catch((error) => {});
		} catch (error) {}
		setOpen(false);
	};

	const deleteSocial = (index) => {
		SocialArray((prevArray) => {
			const updatedArray = prevArray.filter((_, i) => i !== index);
			return updatedArray;
		});
	};

	return (
		<div>
			{open && (
				<div className="modal-del">
					<div className="warn-text">
						Are you sure you want to delete ?{" "}
					</div>
					<div className="model-btns">
						<button onClick={handleDialogClose} className="close-del">
							Close
						</button>
						<button
							onClick={(e) => handleConfirm()}
							className="modal-delbtn">
							Delete
						</button>
					</div>
				</div>
			)}
			<h1>Social media</h1>
			<div className="Card tablecard">
				{datafields.map((data, i) => {
					return (
						<div className="socialmedia ">
							<MiniFileUploader
								title={"Upload Icon"}
								value={data.icon}
								onAdd={(e) => inputHandler2(e, i, "icon")}
							/>
							<div
								className="labelinput"
								style={{
									width: "250px",
									display: "flex",
									flexDirection: "column",
								}}>
								<span>Add Label</span>
								<input
									type="text"
									name="label"
									style={{ width: "250px" }}
									onChange={(e) =>
										inputHandler2(e.target.value, i, "label")
									}
									value={data.label}
								/>
							</div>
							<div
								className="sociallink"
								style={{
									display: "flex",
									flexDirection: "column",
								}}>
								<span>Add Link</span>
								<input
									type="text"
									name="link"
									onChange={(e) =>
										inputHandler2(e.target.value, i, "link")
									}
									value={data.link}
								/>
							</div>
							<div className="action-col">
								<button
									onClick={() => handleClick(data._id)}
									className="abtn del">
									<img src="/icons/svg/delete.svg" />
								</button>
							</div>
						</div>
					);
				})}
				{Addsocial.map((data, i) => {
					return (
						<div className="socialmedia ">
							<MiniFileUploader
								title={"Upload Icon"}
								value={data.social}
								onAdd={(e) => inputHandler(e, i, "icon")}
							/>
							<div
								className="labelinput"
								style={{
									width: "250px",
									display: "flex",
									flexDirection: "column",
								}}>
								<span>Add Label</span>
								<input
									style={{ width: "250px" }}
									type="text"
									name="label"
									onChange={(e) =>
										inputHandler(e.target.value, i, "label")
									}
									value={data.label}
								/>
							</div>
							<div
								className="sociallink"
								style={{
									display: "flex",
									flexDirection: "column",
								}}>
								<span>Add Link</span>
								<input
									type="text"
									name="link"
									onChange={(e) =>
										inputHandler(e.target.value, i, "link")
									}
									value={Addsocial[i].link}
								/>
							</div>
							<div className="action-col">
								<button
									onClick={() => deleteSocial(i)}
									className="abtn del">
									<img src="/icons/svg/delete.svg" />
								</button>
							</div>
						</div>
					);
				})}

				<div className="center" style={{ marginBottom: "5px" }}>
					{" "}
					<div
						className="btn-group"
						style={{ margin: "15px 20px", marginBottom: "5px" }}>
						{" "}
						<button
							className="addButton btnoutline"
							onClick={Addsocialfield}>
							Add More
						</button>
						<button className="addButton" onClick={submitHandler}>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Socialmedia;
