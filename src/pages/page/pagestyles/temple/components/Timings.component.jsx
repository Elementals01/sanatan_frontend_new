import React, { useEffect, useState } from "react";
import axios from "axios";
import MiniFileUploader from "../../../../file-manager/components/MiniFileuploader";

function Timingcomponent(setothers, values) {
	function setonchange(image, i) {
		const list = [...fields];
		const index = i;
		list[index].image = image;
		setfields(list);
		setothers(fields);
	}

	const [fields, setfields] = useState([]);

	const inputHandler = (e, index) => {
		const { name, value } = e.target;
		const list = [...fields];
		list[index][name] = value;
		setfields(list);
		setothers(fields);
	};

	const AddOthersfield = () => {
		setfields([
			...fields,
			{ image: "", label: "", from: "", to: "" },
		]);
		setothers(fields);
	};

	useEffect(() => {
		setfields(values);
	}, [values]);
	return (
		<>
			{fields.map((data, i) => {
				return (
					<div className="socialmedia " key={i}>
						<MiniFileUploader
							title={"Upload Image"}
							onAdd={(image) => setonchange(image, i)}
							value={data?.image}
						/>
						<div className="labelinput">
							<span>Add Label</span>
							<input
								type="text"
								onChange={(e) => inputHandler(e, i)}
								name="label"
								value={data?.label}
							/>
						</div>
						<div className="times-group">
							<div className="Timefield">
								<span>Time From</span>
								<input
									type="text"
									onChange={(e) => inputHandler(e, i)}
									name="from"
									value={data?.from}
								/>
							</div>
							<div className="Timefield">
								<span>Time From</span>
								<input
									type="text"
									onChange={(e) => inputHandler(e, i)}
									name="to"
									value={data?.to}
								/>
							</div>
						</div>
					</div>
				);
			})}
			<div className="center mb-4">
				{" "}
				<button
					className="addButton btnoutline"
					onClick={AddOthersfield}>
					Add More
				</button>
			</div>
		</>
	);
}

export default Timingcomponent;
