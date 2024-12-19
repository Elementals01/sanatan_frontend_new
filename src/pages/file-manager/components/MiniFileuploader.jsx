import React, { useState } from "react";
import FilecardList from "../utils/FilecardList";
import PopupComponent from "./Popup.component";

const MiniFileUploader = ({ title, onAdd, value }) => {
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
				<div className="file-row " style={{ width: "350px" }}>
					<div className="drop-col">
						{value === "" ? (
							<>
								<span>{title}</span>
								<button onClick={handleFileInputClick}>
									<label className="imginputbox2">
										<p>
											<span className="txtprimary">
												Click here to
											</span>{" "}
											Upload a file
										</p>
										<span className="txtlight">
											PNG, JPG, GIF up to 10MB{" "}
										</span>
									</label>
								</button>
							</>
						) : (
							<img
								onClick={handleFileInputClick}
								className="previewimg2"
								src={value}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MiniFileUploader;
