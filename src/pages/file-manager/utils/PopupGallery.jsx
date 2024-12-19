import axios from "axios";
import React, { Component, useState, useEffect } from "react";
function PopupGallery(isOpen, setisOpen, event, preview, setPreview) {
	const uploadHandler = (e) => {
		try {
			const data = new FormData();
			data.append("file", e.target.files[0]);
			axios
				.post(
					`${process.env.REACT_APP_SERVER}fileuploader/upload`,
					data
				)
				.then((res) => {
					console.log(res.data);
					fetchFiles();
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	};
	function fetchFiles() {
		try {
			axios
				.get(`${process.env.REACT_APP_SERVER}fileuploader/files`)
				.then((res) => {
					setGallery(res.data);
					console.log(res.data);
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchFiles();
	}, []);
	return (
		<div>
			{isOpen === true && (
				<div className="Card tablecard file-modal">
					<div className="headsec">
						<h1>File Manager</h1>{" "}
						<button
							className="popup-close-btn"
							onClick={(e) => setisOpen(false)}>
							<span>&times;</span>
						</button>
					</div>

					{/* Upload File */}

					<div className="Card">
						<div className="drop-col filepreview">
							{preview.filepath ? (
								<>
									{preview.FileType === "image" && (
										<div
											onClick={(e) => closemodal()}
											className="popup-item">
											<img
												src={
													`${process.env.REACT_APP_SERVER}` +
													preview.filepath
												}
												className="image-card"
												alt={preview.OrignalName}
											/>
											<span className="popup-filename">
												{preview.OrignalName}
											</span>
										</div>
									)}
									{preview.FileType === "video" && (
										<div className="popup-item">
											<video
												src={
													`${process.env.REACT_APP_SERVER}` +
													preview.filepath
												}
												className="image-card"
												alt={preview.OrignalName}
											/>
											<span className="popup-filename">
												{preview.OrignalName}
											</span>
										</div>
									)}
									<button
										onClick={(e) => event()}
										className="addButton btnoutline">
										Select
									</button>
								</>
							) : (
								<>
									<span>Upload Files</span>
									<label className="imginputbox" htmlFor="Image">
										<input
											onChange={uploadHandler}
											type="file"
											name="Image"
											id="Image"
											hidden
										/>
										<p>
											<span className="txtprimary">
												Click here to
											</span>
											Upload a file
										</p>
										<span className="txtlight">
											PNG,JPG,GIF upto 10MB
										</span>
									</label>
								</>
							)}
						</div>
					</div>
					{/* FileManager */}
					<div className="Card">
						<div className="cardhead">
							<div className="filters f-right">
								<input
									className="search"
									placeholder="Search"
									type="search"
									name="searchbar"
									id="searchbar"
								/>{" "}
							</div>
						</div>

						{/* Card Head Ends */}

						<div className="Img-Gallery popup">
							{Gallery.map((data, i) => {
								return (
									<>
										{data.FileType === "image" && (
											<div
												onClick={(e) =>
													setPreview({
														FileType: data.FileType,
														filepath: data.filepath,
														OrignalName: data.OrignalName,
													})
												}
												className="popup-item">
												<img
													src={
														`${process.env.REACT_APP_SERVER}` +
														data.filepath
													}
													className="image-card"
													alt={data.OrignalName}
												/>
												<span className="popup-filename">
													{data.OrignalName}
												</span>
											</div>
										)}
										{data.FileType === "video" && (
											<div
												onClick={(e) =>
													setPreview({
														FileType: data.FileType,
														filepath: data.filepath,
														OrignalName: data.OrignalName,
													})
												}
												className="popup-item">
												<video
													src={
														`${process.env.REACT_APP_SERVER}` +
														data.filepath
													}
													className="image-card"
													alt={data.OrignalName}
												/>
												<span className="popup-filename">
													{data.OrignalName}
												</span>
											</div>
										)}
									</>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default PopupGallery;
