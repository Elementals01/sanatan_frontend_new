import React, { useState } from "react";
import FilecardList from "../utils/FilecardList";
import PopupComponent from "./Popup.component";

const FileInputComponent = ({
	title,
	links,
	onDelete,
	onAdd,
	type,
}) => {
	const [linkInput, setLinkInput] = useState("");

	const handleAddClick = () => {
		if (linkInput.trim()) {
			onAdd(linkInput);
			setLinkInput(""); // Clear input after adding
		}
	};

	const openTab = (url) => {
		window.open(url, "_blank", "noreferrer");
	};
	const handleFileInputClick = () => {
		setPopupVisible(true);
	};

	const [popupVisible, setPopupVisible] = useState(false);

	return (
		<div>
			{popupVisible && (
				<PopupComponent
					setisOpen={setPopupVisible}
					event={(e) => onAdd(e)}
				/>
			)}
			<div>
				<div className="file-row">
					<div className="drop-col file-col">
						<span>{title}</span>
						<button onClick={handleFileInputClick}>
							<label className="imginputbox">
								<img src="/icons/svg/imageupload.svg" alt="" />
								<p>
									<span className="txtprimary">Click here to</span>{" "}
									Upload a file
								</p>
								<span className="txtlight">
									PNG, JPG, GIF up to 10MB
								</span>
							</label>
						</button>
					</div>
					<div className="linkbtn-group">
						<textarea
							name="link"
							placeholder="Add Link"
							className="addlink"
							value={linkInput}
							onChange={(e) => setLinkInput(e.target.value)}
						/>
						<button
							onClick={handleAddClick}
							className="addButton btnoutline">
							Add Link
						</button>
					</div>
				</div>
				{links &&
					(type == "single" ? (
						<FileCard
							link={links}
							onDelete={() => onDelete()}
							openTab={() => openTab(links)}
						/>
					) : (
						links.map((link, i) => (
							<FileCard
								key={i}
								link={link}
								onDelete={(i) => onDelete(link)}
								openTab={() => openTab(link)}
							/>
						))
					))}
			</div>
		</div>
	);
};

const FileCard = ({ link, onDelete, openTab }) => {
	return (
		<div className="filecard">
			<div>
				<div>
					<img src="/icons/svg/pdficon.svg" alt="File Icon" />
				</div>
				<div className="filename">
					<span>{link}</span>
				</div>
			</div>
			<div className="icons-group">
				<button className="abtn view" onClick={openTab}>
					<img src="/icons/svg/view.svg" alt="View" />
				</button>
				<button className="abtn del" onClick={onDelete}>
					<img src="/icons/svg/delete.svg" alt="Delete" />
				</button>
			</div>
		</div>
	);
};

export default FileInputComponent;
