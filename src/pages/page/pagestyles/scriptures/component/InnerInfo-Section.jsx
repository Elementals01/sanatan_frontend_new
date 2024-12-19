import React, { useEffect, useState } from "react";
import axios from "axios";
import MiniFileUploader from "../../../../file-manager/components/MiniFileuploader";

function IncludeInfocomponent(setincludeinfo, values) {
	function setonchange(image, index) {
		const list = [...fields];
		list[index].image = image;
		setfields(list);
		setincludeinfo(fields);
	}
	function onDeleteField(index) {
		const list = [...fields];
		list.splice(index, 1);
		setfields(list);
		setincludeinfo(fields);
	}

	const [fields, setfields] = useState([{ image: "", label: "" }]);

	const inputHandler = (e, index) => {
		const { name, value } = e.target;
		const list = [...fields];
		list[index][name] = value;
		setfields(list);
		setincludeinfo(fields);
	};

	const AddIncludeInfofield = () => {
		setfields((fields) => [...fields, { image: "", label: "" }]);
		setincludeinfo(fields);
	};

	useEffect(() => {
		setfields(values);
	}, [values]);
	return (
		<>
			{fields.map((data, i) => {
				return (
					<div
						style={{
							display: "flex",
							flexWrap: "nowrap",
							width: "100%",
							alignItems: "center",
							justifyContent: "space-between",
						}}
						key={i}>
						<MiniFileUploader
							title={"Upload Image"}
							onAdd={(image) => setonchange(image, i)}
							value={data?.image}
						/>
						<div className="labelinput">
							<span>Add Label</span>
							<input
								style={{
									width: "600px",
									padding: "16px",
									borderRadius: "8px",
									border: "1px solid #D8DAE5",
								}}
								type="text"
								onChange={(e) => inputHandler(e, i)}
								name="label"
								value={data?.label}
							/>
						</div>

						<img
							onClick={(e) => onDeleteField(i)}
							src="/icons/Iconly/Delete.svg"
							alt=""
						/>
					</div>
				);
			})}
			<div className="center mb-4">
				{" "}
				<button
					className="addButton btnoutline"
					onClick={AddIncludeInfofield}>
					Add More
				</button>
			</div>
		</>
	);
}

export default IncludeInfocomponent;
