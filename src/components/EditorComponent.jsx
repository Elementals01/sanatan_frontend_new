
import {
	HtmlEditor,
	Image,
	Inject,
	Link,
	QuickToolbar,
	RichTextEditorComponent,
	Toolbar,
} from "@syncfusion/ej2-react-richtexteditor";
import * as React from "react";
import "../css/Rte.css";

function RteEditor() {
	return (
		<div className="App">
			<RichTextEditorComponent>
				<Inject
					services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]}
				/>
			</RichTextEditorComponent>
		</div>
	);
}
export default RteEditor;
