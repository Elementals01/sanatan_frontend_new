import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import ImageCardcomponent from "./ImageCard.component";

function PopupComponent({ setisOpen, event, preview, setPreview }) {
	const [gallery, setGallery] = useState([]);
	const [pageIndex, setpageIndex] = useState(1);
	const [fileType, setfileType] = useState("");
	const [pageCount, setPageCount] = useState();
	const [PageLimit, setPageLimit] = useState(4);
	const [SearchQuery, setSearchQuery] = useState("");

	const uploadHandler = useCallback(async (e) => {
		try {
			const data = new FormData();
			data.append("file", e.target.files[0]);
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

			fetchFiles();
		} catch (error) {
			console.error("File upload failed:", error);
		}
	}, []);

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

	const [selectedId, setSelected] = useState(null);
	const selectImage = (id) => {
		setSelected(id);
	};
	const onSelect = (id) => {
		event(id);
		setSelected(null);
		setisOpen(false);
	};
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

		const fileExtension = fileName.split(".").pop().toLowerCase();

		if (imageExtensions.includes(fileExtension)) {
			return (
				<ImageCardcomponent
					filepath={`${process.env.REACT_APP_STATICPATH}uploads/${fileName}`}
					OrignalName={fileName}
					onDelete={(e) => openDeleteModal(id)}
					isImage={true}
					selectedCard={selectedId}
					onSelect={() => onSelect(selectedId)}
					onclick={(e) => selectImage(e)}
				/>
			);
		} else if (videoExtensions.includes(fileExtension)) {
			return (
				<ImageCardcomponent
					filepath={`${process.env.REACT_APP_STATICPATH}uploads/${fileName}`}
					OrignalName={fileName}
					onDelete={(e) => openDeleteModal(id)}
					isImage={false}
					selectedCard={selectedId}
					onSelect={() => onSelect(selectedId)}
					onclick={(e) => selectImage(e)}
				/>
			);
		} else {
			return (
				<ImageCardcomponent
					filepath={`${process.env.REACT_APP_STATICPATH}uploads/${fileName}`}
					OrignalName={fileName}
					onDelete={(e) => openDeleteModal(id)}
					isImage={false}
					selectedCard={selectedId}
					onSelect={() => onSelect(selectedId)}
					onclick={(e) => selectImage(e)}
				/>
			);
		}
	};
	return (
		<div>
			<div
				className="Card tablecard file-modal"
				style={{ overflowY: "scroll" }}>
				{isDeleteModal && (
					<div className="modal-del">
						<div className="warn-text">
							Are you sure you want to delete ?
						</div>
						<div className="model-btns">
							<button
								onClick={closeDeleteModal}
								className="close-del">
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
				<div className="headsec">
					<h1>File Manager</h1>
					<button
						className="popup-close-btn"
						onClick={() => setisOpen(false)}>
						<span>&times;</span>
					</button>
				</div>

				<div className="Card">
					<div
						className=" drop-col filepreview"
						style={{ height: "160px" }}>
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
								<img src="/icons/svg/imageupload.svg" alt="" />
								<p>
									<span className="txtprimary">Click here to</span>
									Upload a file
								</p>
								<span className="txtlight">
									PNG, JPG, GIF up to 10MB
								</span>
							</label>
						</>
					</div>
				</div>

				<div className="Card">
					<div className="cardhead">
						<div className="blursearch">
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
					</div>

					<div
						className="Img-Gallery popup"
						style={{
							overflowY: "visible",
						}}>
						{gallery.map((data, i) => {
							return (
								<div key={i}>{getFileType(data.name, data._id)}</div>
							);
						})}
					</div>
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
		</div>
	);
}

export default PopupComponent;
