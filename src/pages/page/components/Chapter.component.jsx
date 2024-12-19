import React, { useState } from "react";
import ChapterComponent from "../../../components/content-form-components/Chapter";
import ReactHtmlParser from "react-html-parser";
import TitleComponent from "../../../components/content-form-components/Title";
import FileUploader from "../../file-manager/utils/FileUploader";

function Chapter(
	Chapterarray,
	Arrayname,
	handleinputs,
	fileHandler,
	Savedata,
	deleteChapter,
	lang
) {
	const [cardtoggle, settoggle] = useState(null);
	const minitoggle = (i) => {
		if (i == cardtoggle) {
			settoggle(null);
		} else {
			settoggle(i);
		}
		console.log(cardtoggle);
	};
	return (
		<>
			{Arrayname.map((carddata, i) => {
				<div className="Card">
					<div
						className={
							cardtoggle == i ? "card-head" : "card-head closed"
						}>
						{" "}
						<div className="minimize">
							<button
								onClick={() => minitoggle(i)}
								className="minimize-btn">
								v
							</button>
							<button className="move-btn"></button>
						</div>
						{cardtoggle === i ? (
							TitleComponent(Arrayname[i].title, (e) =>
								handleinputs("title", e, i)
							)
						) : (
							<div className="drop-col">
								{" "}
								<h3 className="drop-lable">
									{ReactHtmlParser(Arrayname[i].title)}
								</h3>
							</div>
						)}
					</div>
					<div
						className={
							cardtoggle == i ? "cardcontent" : "cardcontent hidden"
						}>
						{TitleComponent(Arrayname[i].subtitle, (e) =>
							handleinputs("subtitle", e, i)
						)}
						{ChapterComponent("Chapter", Arrayname[i].chapter, (e) =>
							handleinputs("chapter", e, i)
						)}
						{ChapterComponent(
							`Chapter (${lang})`,
							Arrayname[i].chapterlang,
							(e) => handleinputs("chapterlang", e, i)
						)}
						{ChapterComponent(
							`Chapter (Commentry)`,
							Arrayname[i].commentery,
							(e) => handleinputs("commentery", e, i)
						)}
						{ChapterComponent(
							`Chapter Commentry (${lang})`,
							Arrayname[i].commenterylang,
							(e) => handleinputs("commenterylang", e, i)
						)}
						{FileUploader(
							`${lang} Language Video Link`,
							Arrayname[i].video,

							(e) => fileHandler("video", e, i),
							"single"
						)}
						{FileUploader(
							`${lang} Language Audio Link`,
							Arrayname[i].audio,
							(e) => fileHandler("audio", e, i),

							"single"
						)}
						{FileUploader(
							"Upload Pdf",
							Arrayname[i].pdf,
							(e) => fileHandler("pdf", e, i),
							"single"
						)}
						<div className="center mb-4">
							{" "}
							<button
								className="addButton btnoutline"
								onClick={(i) => deleteChapter(i)}>
								Delete
							</button>
							<button onClick={Savedata} className="addButton">
								Save
							</button>
						</div>{" "}
					</div>
				</div>;
			})}
		</>
	);
}

export default Chapter;
