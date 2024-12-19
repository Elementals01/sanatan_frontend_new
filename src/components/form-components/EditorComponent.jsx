import React, { useCallback } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { useQuill } from "react-quilljs";

function TextEditor(value, onChange, title) {
	// Handle change event to update the value only if it's different
	function handleChange(e) {
		if (value !== e) {
			onChange(e);
		}
	}

	return (
		<div className="drop-col">
			<span>{title}</span>

			<ReactQuill
				value={value} // Use value instead of defaultValue
				onChange={(e) => handleChange(e)}
				modules={{
					toolbar: [
						["bold", "italic", "underline", "strike"],
						["blockquote", "code-block"],
						["link", "image", "video", "formula"],
						[{ header: 1 }, { header: 2 }],
						[
							{ list: "ordered" },
							{ list: "bullet" },
							{ list: "check" },
						],
						[{ script: "sub" }, { script: "super" }],
						[{ indent: "-1" }, { indent: "+1" }],
						[{ direction: "rtl" }],
						[{ size: ["small", false, "large", "huge"] }],
						[{ header: [1, 2, 3, 4, 5, 6, false] }],
						[{ color: [] }, { background: [] }],
						[{ font: [] }],
						[{ align: [] }],
						["clean"],
					],
				}}
			/>
		</div>
	);
}

// Memoize the TextEditor component to prevent unnecessary re-renders
export default TextEditor;
