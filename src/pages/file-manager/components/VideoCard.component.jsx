import React from "react";

function VideoCardcomponent(filepath, OrignalName) {
	return (
		<div className="image-card">
			<video controls src={filepath} alt={OrignalName} />
			<span>{OrignalName}</span>
		</div>
	);
}

export default VideoCardcomponent;
