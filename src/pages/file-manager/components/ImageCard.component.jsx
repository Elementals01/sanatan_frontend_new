import React from "react";
import "./ImageCard.css";

function ImageCardcomponent({
	filepath,
	OrignalName,
	onDelete,
	isImage,
	selectedCard,
	onclick,
	onSelect,
}) {
	const removePrefix = (fileName) => {
		const parts = fileName.split("-");
		return parts.length > 1 ? parts.slice(1).join("-") : fileName;
	};
	const updatedFileName = removePrefix(OrignalName);
	return (
		<div
			onClick={(e) => onclick(filepath)}
			className="Card-Image"
			style={{
				border: selectedCard === filepath ? "3px solid orange" : "",
				margin: selectedCard === filepath ? "2px" : "5px",
			}}>
			<div className="image-wrapper">
				{isImage ? (
					<img
						src={filepath}
						alt={updatedFileName}
						className="image"
					/>
				) : (
					<img
						src="/icons/svg/Pages.svg"
						alt={updatedFileName}
						className="image"
					/>
				)}
				{selectedCard === filepath && (
					<div className="overlay-img-button">
						<button
							className="img-select-btn"
							onClick={() => onSelect(selectedCard)}>
							Select
						</button>
					</div>
				)}
				<button
					onClick={() => onDelete()}
					className="abtn del delete-icon">
					<img src="/icons/svg/delete.svg" />
				</button>
			</div>
			<div className="Card-Image_Title"> {updatedFileName}</div>
		</div>
	);
}

export default ImageCardcomponent;
