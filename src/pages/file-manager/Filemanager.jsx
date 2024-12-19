import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import ImageCardcomponent from "./components/ImageCard.component";
import VideoCardcomponent from "./components/VideoCard.component";
import { useNavigate } from "react-router-dom";
import Imagecomponent from "./components/ImageComponent";
import { ToastContainer, toast } from "react-toastify";

function FileManager() {
	const navigate = useNavigate();
	//Button state management
	const [BtnIndex, setBtnIndex] = useState(1);
	const [Gallery, setGallery] = useState([]);
	const [pageIndex, setpageIndex] = useState(1);
	const [fileType, setfileType] = useState("");
	const [SearchQuery, setSearchQuery] = useState("");
	const [pageCount, setPageCount] = useState();
	const [PageLimit, setPageLimit] = useState(10);
	const toastErrorMsg = (errormsg) =>
		toast.error(errormsg, {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	const toastMsg = (toastmsg) =>
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
	const toastMsginfo = (toastmsg) =>
		toast.info(toastmsg, {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});

	//File Uploader
	const uploadHandler = async (e) => {
		try {
			const file = e.target.files[0];

			if (!file) {
				return;
			}
			const data = new FormData();
			data.append("file", file);
			toastMsginfo("Please wait Uploading your file");
			const response = await axios.post(
				`${process.env.REACT_APP_SERVER}fileuploader/upload`,
				data,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						// Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			fetchFiles(); // Refresh file list or update UI after successful upload
			toastMsg("File Successfully Uploaded");
		} catch (error) {
			console.error("Error uploading file:", error);
			toastErrorMsg("An error occured while Uploading");
		}
	};

	async function fetchFiles() {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER}fileuploader?limit=${PageLimit}&page=${pageIndex}&type=${fileType}&q=${SearchQuery}`
			);

			setGallery(response.data.files);
			console.log(response.data);
			setPageCount(Math.round(response.data.filesCount / PageLimit));
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		fetchFiles();
	}, []);

	const setFilesLimit = (e) => {
		const limit = e.target.value;
		setPageLimit(limit);
		setpageIndex(1);
		fetchFiles();
	};
	const handleCurrentPage = (page) => {
		setpageIndex(page);
		fetchFiles();
	};
	useEffect(() => {
		fetchFiles();
	}, [PageLimit, pageIndex, fileType, SearchQuery]);

	// Delete File Modals and methods
	const [deleteId, setDeleteId] = useState(null);
	const [isDeleteModal, setDeleteModal] = useState(false);
	const openDeleteModal = (id) => {
		setDeleteModal(true);
		setDeleteId(id);
	};
	const closeDeleteModal = () => {
		setDeleteModal(false);
		setDeleteId(null);
	};
	const onDelete = async () => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_SERVER}fileuploader/${deleteId}`
			);

			setDeleteModal(false);
			setDeleteId(null);
			fetchFiles();
		} catch (error) {
			setDeleteModal(false);
			setDeleteId(null);
			fetchFiles();
			console.log(error);
		}
	};

	// Get file type
	const getFileType = (fileName, id) => {
		const imageExtensions = [
			"jpg",
			"jpeg",
			"png",
			"gif",
			"bmp",
			"svg",
		];
		const videoExtensions = [
			"mp4",
			"mov",
			"avi",
			"mkv",
			"webm",
			"flv",
		];
		const audioExtensions = ["mp3"];

		const fileExtension = fileName.split(".").pop().toLowerCase();

		if (imageExtensions.includes(fileExtension)) {
			return (
				<Imagecomponent
					filepath={`${process.env.REACT_APP_STATICPATH}uploads/${fileName}`}
					OrignalName={fileName}
					onDelete={(e) => openDeleteModal(id)}
					isImage="true"
				/>
			);
		} else if (videoExtensions.includes(fileExtension)) {
			return (
				<Imagecomponent
					filepath={`${process.env.REACT_APP_STATICPATH}uploads/${fileName}`}
					OrignalName={fileName}
					onDelete={(e) => openDeleteModal(id)}
					isImage="video"
				/>
			);
		} else if (audioExtensions.includes(fileExtension)) {
			return (
				<Imagecomponent
					filepath={`${process.env.REACT_APP_STATICPATH}uploads/${fileName}`}
					OrignalName={fileName}
					onDelete={(e) => openDeleteModal(id)}
					isImage="audio"
				/>
			);
		} else {
			return (
				<Imagecomponent
					filepath={`${process.env.REACT_APP_STATICPATH}uploads/${fileName}`}
					OrignalName={fileName}
					onDelete={(e) => openDeleteModal(id)}
					isImage="false"
				/>
			);
		}
	};
	const [dragActive, setDragActive] = useState(false);

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			uploadHandler(e);
			e.dataTransfer.clearData();
		}
	};

	return (
		<>
			{isDeleteModal && (
				<div className="modal-del">
					<div className="warn-text">
						Are you sure you want to delete ?
					</div>
					<div className="model-btns">
						<button onClick={closeDeleteModal} className="close-del">
							Close
						</button>
						<button
							onClick={(e) => onDelete()}
							className="modal-delbtn">
							Delete
						</button>
					</div>
				</div>
			)}
			<h1>File Manager</h1>

			{/* Upload File */}

			<div className="Card tablecard">
				<div className="drop-col">
					<span>Upload Files</span>
					<label
						className="imginputbox"
						htmlFor="Image"
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={(e) => handleDrop(e)}>
						<input
							onChange={(e) => uploadHandler(e)}
							type="file"
							name="Image"
							id="Image"
							hidden
						/>
						<p>
							<span className="txtprimary">Upload a file</span>or drag
							and drop
						</p>
						<span className="txtlight">PNG,JPG,GIF upto 10MB</span>
					</label>
				</div>
			</div>

			{/* File Manager */}

			<div className="Card tablecard">
				<div className="cardhead">
					<div className="tabbar">
						<button
							className={
								fileType === "" ? "tab-btn" : "tab-btn btnoutline"
							}
							onClick={() => setfileType("")}>
							<span className="tab-txt">All</span>
						</button>
						<button
							className={
								fileType === "video"
									? "tab-btn"
									: "tab-btn btnoutline"
							}
							onClick={() => setfileType("video")}>
							<span className="tab-txt">Video</span>
						</button>
						<button
							className={
								fileType === "audio"
									? "tab-btn"
									: "tab-btn btnoutline"
							}
							onClick={() => setfileType("audio")}>
							<span className="tab-txt">Audio</span>
						</button>
						<button
							className={
								fileType === "pdf" ? "tab-btn" : "tab-btn btnoutline"
							}
							onClick={() => setfileType("pdf")}>
							<span className="tab-txt">Pdf</span>
						</button>
						<button
							className={
								fileType === "image"
									? "tab-btn"
									: "tab-btn btnoutline"
							}
							onClick={() => setfileType("image")}>
							<span className="tab-txt">Images</span>
						</button>
						<button
							className={
								fileType === "svg" ? "tab-btn" : "tab-btn btnoutline"
							}
							onClick={() => setfileType("svg")}>
							<span className="tab-txt">Svg</span>
						</button>
					</div>
					<div className="filters f-right">
						<div
							className="blursearch"
							style={{ marginRight: "4px" }}>
							<input
								className="search"
								placeholder="Search"
								type="search"
								name="searchbar"
								id="searchbar"
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<img src="/icons/svg/search.svg" />
						</div>
						<div>
							<span>Display</span>
							<select
								name="pageqty"
								onChange={(e) => setFilesLimit(e)}
								value={PageLimit}
								id="pageqty">
								<option value="5">5</option>
								<option value="10">10</option>
								<option value="15">15</option>
								<option value="20">20</option>
								<option value="25">25</option>
								<option value="50">50</option>
								<option value="100">100</option>
								<option value="200">200</option>
							</select>
						</div>{" "}
						<button className="abtn del">
							<img src="/icons/svg/filter.svg" />
						</button>
					</div>
				</div>

				{/* Card Head Ends */}

				<div className="Img-Gallery">
					{Gallery.map((data, i) => {
						return (
							<div key={i}>{getFileType(data.name, data._id)}</div>
						);
					})}
				</div>
				<div className="tablebottom">
					{" "}
					<div className="btn-group">
						{" "}
						<button
							className="btnoutline prevnext"
							onClick={() => setpageIndex(pageIndex - 1)}
							disabled={pageIndex == 1}>
							Previous
						</button>
						<button
							className="prevnext"
							onClick={() => setpageIndex(pageIndex + 1)}
							disabled={pageIndex == pageCount}>
							Next
						</button>
					</div>
					<div>
						<span>Page</span>
						<input
							type="number"
							className="page-input"
							min={1}
							max={pageCount}
							value={pageIndex}
							onChange={(e) => {
								handleCurrentPage(e.target.value);
							}}
						/>

						<span> of {pageCount}</span>
					</div>
				</div>
			</div>
			<div className="center mb-10"></div>
			<ToastContainer />
		</>
	);
}

export default FileManager;
