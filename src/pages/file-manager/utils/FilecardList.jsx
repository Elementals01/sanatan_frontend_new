import React from "react";

function FilecardList(filearray, type, ondel) {
	function opentab(url) {
		window.open(url, "_blank", "noreferrer");
	}
	function del(i) {
		filearray.splice(i, 1);
		ondel(filearray);
	}
	return (
		<div>
			{type === "single"
				? filearray !== "" && (
						<>
							<div className="filecard">
								<div>
									{" "}
									<div>
										<img src="/icons/svg/pdficon.svg" alt="i" />
									</div>
									<div className="filename">
										<span>{filearray}</span>
									</div>
								</div>
								<div className="icons-group">
									<button
										className="abtn view"
										onClick={(e) => opentab(filearray)}>
										<img src="/icons/svg/view.svg" />
									</button>
									<button
										className="abtn del"
										onClick={() => ondel()}>
										<img src="/icons/svg/delete.svg" />
									</button>
								</div>
							</div>
						</>
				  )
				: filearray.map((data, i) => {
						return (
							<div className="filecard">
								<div>
									{" "}
									<div>
										<img src="/icons/svg/pdficon.svg" alt="i" />
									</div>
									<div className="filename">
										<span>{data}</span>
									</div>
								</div>
								<div className="icons-group">
									<button
										className="abtn del"
										onClick={(e) => opentab(data)}>
										<img src="/icons/svg/view.svg" />
									</button>
								</div>
							</div>
						);
				  })}
		</div>
	);
}

export default FilecardList;
