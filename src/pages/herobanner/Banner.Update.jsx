import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FileInputComponent from "../file-manager/components/FileInputComponent";

function UpdateBanner() {
	const { id } = useParams();
	var Api = `${process.env.REACT_APP_SERVER}hero/${id}`;
	const [IsError, seterror] = useState(false);
	const [loading, setloading] = useState(true);
	const [islink, setlink] = useState();
	const navigate = useNavigate();
	//Data Handlers

	const FormModal = {
		Name: "",
		Link: "",
		Image: "",
		Publish: "",
	};
	function setimage(name, value) {
		setFormdata({ ...Formdata, [name]: value });
	}

	const [Formdata, setFormdata] = useState(FormModal);
	function fetchdata() {
		try {
			setloading(true);
			seterror(false);
			axios
				.get(Api)
				.then((res) => {
					setFormdata(res.data);
					if (res.data.Link) {
						setlink(true);
					} else {
						setlink(false);
					}
					console.log(res.data);
				})
				.catch((e) => {
					seterror(true);
				});
			setloading(false);
		} catch (error) {
			seterror(true);
			setloading(false);
		}
	}

	useEffect(() => {
		fetchdata();
	}, []);
	const inputHandler = (e) => {
		const { name, value } = e.target;
		setFormdata({ ...Formdata, [name]: value });
	};
	const HandleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.put(`${process.env.REACT_APP_SERVER}hero/${id}`, Formdata)
			.then((res) => {
				console.log(res);
				navigate("/herobanner");
			})
			.catch((error) => console.log(error));
	};

	//Page

	return (
		<div>
			<h1>Add Mini Banner</h1>

			<div className="Card">
				<div className="drop-group">
					<div className="drop-col">
						<span className="drop-lable">Name</span>
						<input
							type="text"
							value={Formdata.Name}
							name="Name"
							onChange={inputHandler}
						/>
					</div>
					<div className="drop-col">
						<span className="drop-lable">Publish Date</span>
						<input
							type="datetime-local"
							name="Publish"
							value={Formdata.Publish}
							onChange={inputHandler}
						/>
					</div>
				</div>

				<div className="options">
					<input
						type="radio"
						onClick={() => setlink(false)}
						name="radios"
						id="rmain"
						hidden
					/>
					<label htmlFor="rmain" className={!islink && "check"}>
						Regular Banner
					</label>

					<input
						onClick={() => setlink(true)}
						type="radio"
						name="radios"
						hidden
						id="rcat"
					/>
					<label htmlFor="rcat" className={islink && "check"}>
						Link Banner
					</label>
				</div>
				{islink && (
					<div className="drop-col">
						<span className="drop-lable">Link</span>
						<input
							type="text"
							onChange={inputHandler}
							name="Link"
							value={Formdata.Link}
						/>
					</div>
				)}
				<FileInputComponent
					title="Upload Image or add link"
					links={Formdata.Image}
					onDelete={() => setFormdata({ ...Formdata, Image: "" })}
					onAdd={(image) =>
						setFormdata({ ...Formdata, Image: image })
					}
					type={"single"}
				/>
			</div>
			<div className="center">
				<button className="addButton" onClick={HandleSubmit}>
					Update Mini Banner
				</button>
			</div>
		</div>
	);
}

export default UpdateBanner;
