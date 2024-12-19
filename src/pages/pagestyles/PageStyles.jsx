import React, { Component } from "react";

export class PageStyles extends Component {
	render() {
		return (
			<div>
				<h1>Page Styles</h1>
				<div className="cards-group">
					<div className="Style-Card">
						<span>Style 1 (Scriptures)</span>
					</div>
					<div className="Style-Card">
						<span>Style 2 (Aarti)</span>
					</div>
					<div className="Style-Card">
						<span>Style 3 (Temples)</span>
					</div>
					<div className="Style-Card">
						<span>Style 4 (Extra)</span>
					</div>
					<div className="Style-Card">
						<span>Style 5 (Blog)</span>
					</div>
				</div>
				<div className="center mb-10"></div>
			</div>
		);
	}
}

export default PageStyles;
