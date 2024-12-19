import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import SubTitleComponent from "../../../../components/content-form-components/subtitle";
import ChapterComponent from "../../../../components/content-form-components/Chapter";
import FileInputComponent from "../../../file-manager/components/FileInputComponent";
import TitleComponent from "../../../../components/form-components/Title";
import TextEditor from "../../../../components/form-components/EditorComponent";
import ReactHtmlParser from "react-html-parser";
import IncludeInfocomponent from "./component/InnerInfo-Section";
function UpdateScripture2content() {
	const navigate = useNavigate();
	const { id, lang } = useParams();
	const LanguageAdminName = lang;
	const Model = {
		Availablity: [],
		title: "",
		description: "",
		innertitle: "",
		innerdescription: "",
		includeDescription: "",
		include: [{ image: "", label: "" }],
		Media: ["pdf", "text", "video", "audio"],
		pdf: [],
		Chapters: [],
	};
	const [Page, setPage] = useState(Model);
	const [AddAvailable, Availblearray] = useState([{}]);

	const [cardtoggle, settoggle] = useState(null);
	const minitoggle = (i) => {
		if (i == cardtoggle) {
			settoggle(null);
		} else {
			settoggle(i);
		}
		console.log(cardtoggle);
	};
	const AddAvailablity = (id, value) => {
		Availblearray({ ...AddAvailable, [id]: value });
		setPage((prevPage) => ({
			...prevPage,
			Availablity: AddAvailable,
		}));
		console.log(Page);
	};
	const errormsg = () =>
		toast.error("Unexpected Error ouccured", {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	function fetchdata() {
		try {
			axios
				.get(`${process.env.REACT_APP_SERVER}page/scripture2/${id}`)
				.then((res) => {
					setPage(res.data);
					setChapters(res.data.Chapters);
					Availblearray(res.data.Availablity);
				})
				.catch((e) => {});
		} catch (error) {}
	}

	useEffect(() => {
		fetchdata();
	}, []);

	function addorRemove(value) {
		const index = Page.Media.indexOf(value); // Check if the value already exists in the AddLanguageay

		if (index !== -1) {
			// If the value exists, remove it
			Page.Media.splice(index, 1);
		} else {
			// If the value doesn't exist, add it
			Page.Media.push(value);
		}
		setPage({ ...Page, Availablity: AddAvailable });
	}

	const [Chapters, setChapters] = useState([
		{
			title: "<p></p>",
			video: "",
			audio: "",
			image: "",
			pdf: "",
			subChapters: [],
		},
	]);
	const AddChapterCard = () => {
		setChapters([
			...Chapters,
			{
				title: "<p></p>",
				video: "",
				audio: "",
				image: "",
				pdf: "",
				subChapters: [],
			},
		]);
	};
	const deleteChapter = (index) => {
		const list = [...Chapters];
		list.splice(index, 1);
		setChapters(list);
	};
	const [subChapters, setsubChapters] = useState([
		{
			title: "<p></p>",
			subtitle: "<p></p>",
			chapter: "<p></p>",
			chapterlanguage: "<p></p>",
			chaptercommentry: "<p></p>",
			chaptercommentrylanguage: "<p></p>",
			video: "",
			audio: "",
			pdf: "",
			image: "",
		},
	]);
	const AddsubChapterCard = (i) => {
		setChapters((prevChapters) => {
			const updatedChapters = [...prevChapters]; // Create a shallow copy of the Chapters array
			const updatedSubChapters = [...updatedChapters[i].subChapters]; // Create a shallow copy of the subChapters array

			updatedSubChapters.push({
				title: "<p></p>",
				subtitle: "<p></p>",
				chapter: "<p></p>",
				chapterlanguage: "<p></p>",
				chaptercommentry: "<p></p>",
				chaptercommentrylanguage: "<p></p>",
				video: "",
				audio: "",
				pdf: "",
				image: "",
			});

			updatedChapters[i] = {
				...updatedChapters[i],
				subChapters: updatedSubChapters,
			};

			return updatedChapters;
		});
	};

	const deletesubChapter = (index) => {
		const list = [...subChapters];
		list.splice(index, 1);
		setsubChapters(list);
	};
	const setInclude = (data) => {
		setPage({ ...Page, include: data });
	};
	const handleinputs = (name, e, index) => {
		const updatefield = Chapters.map((chapter, i) =>
			index == i ? Object.assign(chapter, { [name]: e }) : chapter
		);
		setChapters(updatefield);
		setPage({ ...Page, Chapters: Chapters });
	};
	const updateInputValue = (
		chapterIndex,
		subChapterIndex,
		fieldName,
		value
	) => {
		setChapters((prevChapters) => {
			const updatedChapters = [...prevChapters]; // Create a shallow copy of the Chapters array
			const updatedSubChapters = [
				...updatedChapters[chapterIndex].subChapters,
			]; // Create a shallow copy of the subChapters array

			updatedSubChapters[subChapterIndex] = {
				...updatedSubChapters[subChapterIndex],
				[fieldName]: value,
			};

			updatedChapters[chapterIndex] = {
				...updatedChapters[chapterIndex],
				subChapters: updatedSubChapters,
			};

			return updatedChapters;
		});
		setPage({ ...Page, Chapters: Chapters });
		// console.log(Page);
	};

	const handleFileDelete = (
		arrayName,
		elementToRemove,
		chapterIndex
	) => {
		setChapters((prevChapters) => {
			return prevChapters.map((chapter, index) => {
				if (index === chapterIndex) {
					return {
						...chapter,
						[arrayName]: chapter[arrayName].filter(
							(item) => item !== elementToRemove
						),
					};
				}
				return chapter;
			});
		});
		setPage({ ...Page, Chapters: Chapters });
	};
	const Savedata = async (e) => {
		e.preventDefault();
		if (Page.title === "") {
			const notify = () =>
				toast.error("Title is required", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			notify();
		} else {
			try {
				setPage({ ...Page, Chapters: Chapters });
				const Api = `${process.env.REACT_APP_SERVER}page/scripture2/${id}`;
				const res = await axios.put(Api, Page);

				const notify = () =>
					toast.success("Successfully Updated", {
						position: "bottom-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
				notify();

				navigate(`/pages/edit/scripture2/${res.data._id}/${lang}`);
			} catch (error) {
				errormsg();
			}
		}
	};

	const Submitdata = async (e) => {
		e.preventDefault();
		if (Page.title === "") {
			const notify = () =>
				toast.error("Title is required", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
				});
			notify();
		} else {
			try {
				setPage({ ...Page, Chapters: Chapters });
				const Api = `${process.env.REACT_APP_SERVER}page/scripture2/${id}`;
				await axios.put(Api, Page);
				const notify = () =>
					toast.success("Successfully Added", {
						position: "bottom-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
				notify();

				navigate(`/pages`);
			} catch (error) {
				errormsg();
			}
		}
	};
	const handleDelete = (arrayName, index) => {
		setPage((prevPage) => {
			const updatedArray = [
				...prevPage[arrayName].filter((e) => e !== index),
			];

			return {
				...prevPage,
				[arrayName]: updatedArray,
			};
		});
	};
	return (
		<div>
			<h1>Add Page (Content) {LanguageAdminName} Language</h1>
			<div className="Card">
				<div className="drop-col">
					{" "}
					<span className="drop-lable">Select Language</span>
					<select name="Language" disabled>
						<option value={LanguageAdminName}>
							{LanguageAdminName}
						</option>
					</select>
				</div>
				<span className="drop-lable">Availablity</span>
				<div className="drop-group">
					<label
						className="drop-check"
						style={{
							background:
								Page.Media.indexOf("pdf") !== -1
									? "orange"
									: "transparent",
							color:
								Page.Media.indexOf("pdf") !== -1 ? "white" : "black",
						}}>
						<input
							type="checkbox"
							checked={
								Page.Media.indexOf("pdf") !== -1 ? true : false
							}
							onChange={(e) => addorRemove("pdf")}
							className="checkbox"
						/>
						<span className="drop-lable">Pdf</span>
					</label>
					<div className="drop-col">
						<select
							className="drop"
							onChange={(e) => AddAvailablity("Pdf", e.target.value)}>
							<option value="1">Active</option>
							<option value="2">Inactive</option>
							<option value="3">Hide</option>
						</select>
					</div>
					<label
						className="drop-check"
						style={{
							background:
								Page.Media.indexOf("text") !== -1
									? "orange"
									: "transparent",
							color:
								Page.Media.indexOf("text") !== -1 ? "white" : "black",
						}}>
						<input
							type="checkbox"
							checked={
								Page.Media.indexOf("text") !== -1 ? true : false
							}
							onChange={(e) => addorRemove("text")}
							className="checkbox"
						/>
						<span className="drop-lable">Text</span>
					</label>
					<div className="drop-col">
						<select
							className="drop"
							onChange={(e) =>
								AddAvailablity("text", e.target.value)
							}>
							<option value="1">Active</option>
							<option value="2">Inactive</option>
							<option value="3">Hide</option>
						</select>
					</div>
					<label
						className="drop-check"
						style={{
							background:
								Page.Media.indexOf("audio") !== -1
									? "orange"
									: "transparent",
							color:
								Page.Media.indexOf("audio") !== -1
									? "white"
									: "black",
						}}>
						<input
							type="checkbox"
							checked={
								Page.Media.indexOf("audio") !== -1 ? true : false
							}
							onChange={(e) => addorRemove("audio")}
							className="checkbox"
						/>
						<span className="drop-lable">Audio</span>
					</label>
					<div className="drop-col">
						<select
							className="drop"
							onChange={(e) =>
								AddAvailablity("audio", e.target.value)
							}>
							<option value="1">Active</option>
							<option value="2">Inactive</option>
							<option value="3">Hide</option>
						</select>
					</div>
					<label
						className="drop-check"
						style={{
							background:
								Page.Media.indexOf("video") !== -1
									? "orange"
									: "transparent",
							color:
								Page.Media.indexOf("video") !== -1
									? "white"
									: "black",
						}}>
						<input
							type="checkbox"
							checked={
								Page.Media.indexOf("video") !== -1 ? true : false
							}
							onChange={(e) => addorRemove("video")}
							className="checkbox"
						/>
						<span className="drop-lable">Video</span>
					</label>
					<div className="drop-col">
						<select
							className="drop"
							onChange={(e) =>
								AddAvailablity("video", e.target.value)
							}>
							<option value="1">Active</option>
							<option value="2">Inactive</option>
							<option value="3">Hide</option>
						</select>
					</div>
				</div>
			</div>
			<div className="Card">
				<h1>Front Page Details</h1>
				{TextEditor(
					Page.title,
					(e) => setPage({ ...Page, title: e }),
					"Title"
				)}
				{TextEditor(
					Page.description,
					(e) => setPage({ ...Page, description: e }),
					"Description"
				)}
			</div>
			<div className="Card">
				<h1>Inner Page Details</h1>
				{TextEditor(
					Page.innertitle,
					(e) => setPage({ ...Page, innertitle: e }),
					"Inner Title"
				)}
				{TextEditor(
					Page.innerdescription,
					(e) => setPage({ ...Page, innerdescription: e }),
					"Inner Description"
				)}
			</div>
			<div className="Card">
				<h1>Inner Page Include Info</h1>
				{
					new TextEditor(
						Page.includeDescription,
						(e) => setPage({ ...Page, includeDescription: e }),
						"Include Description"
					)
				}

				{IncludeInfocomponent(
					(value) => setInclude(value),
					Page.include
				)}
			</div>
			<h1>Pdf</h1>
			<div className="Card">
				<FileInputComponent
					title="Upload pdf or add link"
					links={Page.pdf}
					onDelete={(i) => handleDelete("pdf", i)}
					onAdd={(image) => Page.pdf.push(image)}
					type={"array"}
				/>
			</div>

			<h1>Text / Audio / Video</h1>
			{Chapters.map((Chapter, i) => {
				return (
					<div className="Card" key={i}>
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
								new TitleComponent(Chapter?.title, (e) =>
									handleinputs("title", e, i)
								)
							) : (
								<div className="drop-col">
									{" "}
									<h3 className="drop-lable">
										{ReactHtmlParser(Chapter?.title)}
									</h3>
								</div>
							)}
						</div>
						<div
							className={
								cardtoggle == i ? "cardcontent" : "cardcontent hidden"
							}>
							<FileInputComponent
								title="Upload Image or add link"
								links={Chapter.image}
								onDelete={() => handleinputs("image", "", i)}
								onAdd={(file) => handleinputs("image", file, i)}
								type={"single"}
							/>
							<FileInputComponent
								title="Upload Audio or add link"
								links={Chapter.audio}
								onDelete={() => handleinputs("audio", "", i)}
								onAdd={(file) => handleinputs("audio", file, i)}
								type={"single"}
							/>
							<FileInputComponent
								title="Upload Video or add link"
								links={Chapter.video}
								onDelete={() => handleinputs("video", "", i)}
								onAdd={(file) => handleinputs("video", file, i)}
								type={"single"}
							/>
							<FileInputComponent
								title="Upload Pdf or add link"
								links={Chapter.pdf}
								onDelete={() => handleinputs("pdf", "", i)}
								onAdd={(file) => handleinputs("pdf", file, i)}
								type={"single"}
							/>
							<hr
								style={{
									background: "orange",
									color: "orange",
									height: "4px",
									marginTop: "15px",
									marginBottom: "18px",
								}}
							/>
							{Chapters[i].subChapters.map((subChapter, subindex) => {
								return (
									<>
										{
											new TitleComponent(subChapter?.title, (e) =>
												updateInputValue(i, subindex, "title", e)
											)
										}
										{
											new SubTitleComponent(
												subChapter?.subtitle,
												(e) =>
													updateInputValue(i, subindex, "subtitle", e)
											)
										}
										{
											new ChapterComponent(
												"Table",
												subChapter?.chapter,
												(e) =>
													updateInputValue(i, subindex, "chapter", e)
											)
										}
										{
											new ChapterComponent(
												`Table (${LanguageAdminName})`,
												subChapter?.chapterlang,
												(e) =>
													updateInputValue(
														i,
														subindex,
														"chapterlang",
														e
													)
											)
										}
										{
											new ChapterComponent(
												`Table (Commentry)`,
												subChapter?.commentery,
												(e) =>
													updateInputValue(
														i,
														subindex,
														"commentery",
														e
													)
											)
										}
										{
											new ChapterComponent(
												`Table Commentry (${LanguageAdminName})`,
												subChapter?.commenterylang,
												(e) =>
													updateInputValue(
														i,
														subindex,
														"commenterylang",
														e
													)
											)
										}
										<FileInputComponent
											title="Upload Image or add link"
											links={subChapter.image}
											onDelete={() =>
												updateInputValue(i, subindex, "image", "")
											}
											onAdd={(file) =>
												updateInputValue(i, subindex, "image", file)
											}
											type={"single"}
										/>
										<FileInputComponent
											title="Upload Audio or add link"
											links={subChapter.audio}
											onDelete={() =>
												updateInputValue(i, subindex, "audio", "")
											}
											onAdd={(file) =>
												updateInputValue(i, subindex, "audio", file)
											}
											type={"single"}
										/>
										<FileInputComponent
											title="Upload Video or add link"
											links={subChapter.video}
											onDelete={() =>
												updateInputValue(i, subindex, "video", "")
											}
											onAdd={(file) =>
												updateInputValue(i, subindex, "video", file)
											}
											type={"single"}
										/>
										<FileInputComponent
											title="Upload Pdf or add link"
											links={subChapter.pdf}
											onDelete={() =>
												updateInputValue(i, subindex, "pdf", "")
											}
											onAdd={(file) =>
												updateInputValue(i, subindex, "pdf", file)
											}
											type={"single"}
										/>
										<div className="center mb-4">
											{" "}
											<button
												className="addButton btnoutline"
												onClick={() => deletesubChapter(subindex)}>
												Delete Table
											</button>
										</div>
									</>
								);
							})}
							<hr
								style={{
									background: "grey",
									color: "grey",
									height: "2px",
									marginTop: "15px",
									marginBottom: "18px",
								}}
							/>
							<div className="center mb-4">
								{" "}
								<button
									onClick={() => AddsubChapterCard(i)}
									className="addButton btnoutline">
									Add More Table
								</button>
								<button
									className="addButton btnoutline"
									onClick={() => deleteChapter(i)}>
									Delete
								</button>
							</div>{" "}
						</div>
					</div>
				);
			})}
			<div className="center">
				{" "}
				<button
					onClick={AddChapterCard}
					className="addButton btnoutline">
					Add Chapter
				</button>
				<button className="addButton btnoutline" onClick={Savedata}>
					Save
				</button>
				<button onClick={Submitdata} className="addButton">
					Submit
				</button>
			</div>

			<div className="mb-10"></div>
			<ToastContainer />
		</div>
	);
}

export default UpdateScripture2content;
