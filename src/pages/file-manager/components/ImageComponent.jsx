import React from "react";
import "./ImageCard.css";

function Imagecomponent({
	filepath,
	OrignalName,
	onDelete,
	isImage,
}) {
	const removePrefix = (fileName) => {
		const parts = fileName.split("-");
		return parts.length > 1 ? parts.slice(1).join("-") : fileName;
	};
	const updatedFileName = removePrefix(OrignalName);
	return (
		<div className="Card-Image">
			<div className="image-wrapper">
				{isImage === "true" && (
					<img
						src={filepath}
						alt={updatedFileName}
						className="image"
					/>
				)}
				{isImage === "false" && (
					<img
						src="/icons/svg/Pages.svg"
						alt={updatedFileName}
						className="image"
					/>
				)}
				{isImage === "video" && (
					<video
						controls={true}
						src={filepath}
						alt={updatedFileName}
						className="image"
					/>
				)}
				{isImage === "audio" && (
					<audio
						controls={true}
						src={filepath}
						alt={updatedFileName}
						className="image"
					/>
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

export default Imagecomponent;
