import "./App.css";
import "./css/Navbar.css";
import "./css/Table.css";
import "./css/Card.css";
import "./css/Rte.css";

import "react-quill/dist/quill.snow.css";
import ReactDOM from "react-dom/client";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Side";
import Dashboard from "./pages/dashboard";
import Users from "./pages/user/Users";
import Category from "./pages/category/tables/MainCategory";
import Pages from "./pages/page/pages";
import Languages from "./pages/languages/Languages";
import Addlang from "./pages/languages/Addlang";
import Blog from "./pages/blog/Blog";
import Invoices from "./pages/invoice/Invoices";
import Donations from "./pages/donation/Donations";
import Catdonation from "./pages/donation/Catdonation";
import Adddonationcat from "./pages/donation/Add-donation-cat";
import Adddonation from "./pages/donation/Adddonation";
import Addblog from "./pages/blog/Addblog";
import Feedback from "./pages/feedback/Feedback";
import Feedbackinfo from "./pages/feedback/Feedbackinfo";
import Viewinvoice from "./pages/invoice/Viewinvoice";
import PageStyles from "./pages/pagestyles/PageStyles";
import CardStyle from "./pages/cardstyle/CardStyle";
import Socialmedia from "./pages/Socialmedia";
import LanguageUpdate from "./pages/languages/Language.Update";
import AppLanguageUpdate from "./pages/applang/AppLang.Update";
import AddApplang from "./pages/applang/Addapplang";
import AppLanguages from "./pages/applang/AppLang";
import UpdateBlog from "./pages/blog/Blog.Update";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroBanner from "./pages/herobanner/HeroBanner";
import AddBanner from "./pages/herobanner/AddBanner";
import Whatsnew from "./pages/New/WhatNew";
import Notification from "./pages/notification/Notification";
import AddNotification from "./pages/notification/AddNotification";
import AddNew from "./pages/New/AddNew";
import Updatedonation from "./pages/donation/Update.donation";
import UpdateNotification from "./pages/notification/Notification.Update";
import UpadateWhatsNew from "./pages/New/Whatsnew.Update";
import UpdateBanner from "./pages/herobanner/Banner.Update";
import AddPage from "./pages/page/Addpage";
import UpdatePage from "./pages/page/UpdatePage";
import Aarticontent from "./pages/page/pagestyles/aarti/Aarti";
import ExtraPagecontent from "./pages/page/pagestyles/extra/Extrapage";
import Templecontent from "./pages/page/pagestyles/temple/Temple";
import "react-toastify/dist/ReactToastify.css";
import Donationcontent from "./pages/donation/AddDonationContent";
import Blogcontent from "./pages/blog/AddBlogContent";
import Blogpagecontent from "./pages/page/pagestyles/blog/Blog";
import Aarticontentupdate from "./pages/page/pagestyles/aarti/Aarti.update";
import Templecontentupdate from "./pages/page/pagestyles/temple/Temple.update";
import ExtraPagecontentupdate from "./pages/page/pagestyles/extra/Extrapage.update";
import Blogpagecontentupdate from "./pages/page/pagestyles/blog/Blog.update";
import BlogContentUpdate from "./pages/blog/BlogContentUpdate";
import UpdateDonationcontent from "./pages/donation/UpdateDonationContent";
import Scripturecontent from "./pages/page/pagestyles/scriptures/Scripturecontent";
import Scripture2content from "./pages/page/pagestyles/scriptures/Scripture2content";
import UpdateScripturecontent from "./pages/page/pagestyles/scriptures/UpdateScripturecontent";
import Faqs from "./pages/faq/Faq";
import AddFaq from "./pages/faq/AddFaq";
import UpdateFaq from "./pages/faq/UpdateFaq";
import Admins from "./pages/admin/Admin";
import FileManager from "./pages/file-manager/Filemanager";
import axios from "axios";
import Userdetails from "./pages/user/Userdetails";
import MainCategory from "./pages/category/tables/MainCategory";
import SubCategory from "./pages/category/tables/SubCategory";
import AddSubCategory from "./pages/category/AddSubCategory";
import AddMainCategory from "./pages/category/Addmain";
import MainCategoryUpdate from "./pages/category/MainCategory.Update";
import SubCategoryUpdate from "./pages/category/Subcategory.Update";
import AddInnerCategory from "./pages/category/AddInnerCategory";
import UpdateScripture2content from "./pages/page/pagestyles/scriptures/UpdateScripture2content";
import AddFaqContent from "./pages/faq/content/AddFaqContent";
import UpdateFaqContent from "./pages/faq/content/UpdateFaqContent";
import AddAvailability from "./pages/page/AddAvailability";
import MenuBuilder from "./pages/menu/MenuBuilder";
import ViewPage from "./pages/page/View.page";
import AddNotificationContent from "./pages/notification/AddNotificationContent";
import UpdateNotificationContent from "./pages/notification/UpdateNotificationContent";

export default function App() {
	const accessToken = localStorage.getItem("accessToken");
	const refreshToken = localStorage.getItem("refreshToken");
	if (
		accessToken === undefined ||
		accessToken === null ||
		!accessToken
	) {
		return <Login />;
	}
	axios.defaults.headers.common[
		"Authorization"
	] = `Bearer ${accessToken}`;
	axios.defaults.headers.post["Content-Type"] = "application/json";
	axios.interceptors.request.use(
		(request) => {
			return request;
		},
		(error) => {
			//  console.log(error);
			return Promise.reject(error);
		}
	);
	axios.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;

			// If the error status is 401 and there is no originalRequest._retry flag,
			// it means the token has expired and we need to refresh it
			if (error.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;

				try {
					localStorage.removeItem("accessToken");
					localStorage.removeItem("refreshToken");
					window.location.reload();
				} catch (error) {
					// Handle refresh token error or redirect to login
					localStorage.removeItem("accessToken");
					localStorage.removeItem("refreshToken");
					window.location.reload();
				}
			}
		}
	);
	return (
		<BrowserRouter>
			<>
				<Navbar />
				<div className="body-wrapper">
					<Sidebar />
					<div className="main">
						<Routes>
							<Route path="/" element={<Dashboard />}></Route>
							{/* Languages Paths */}

							<Route
								exact
								path="/languages"
								element={<Languages />}
							/>
							<Route
								exact
								path="/languages/add"
								element={<Addlang />}
							/>
							<Route
								exact
								path="/languages/edit/:id"
								element={<LanguageUpdate />}
							/>
							<Route
								exact
								path="/applanguages/"
								element={<AppLanguages />}
							/>
							<Route
								exact
								path="/applanguages/add"
								element={<AddApplang />}
							/>
							<Route
								exact
								path="/applanguages/edit/:id"
								element={<AppLanguageUpdate />}
							/>

							{/*    Category Paths */}

							<Route
								exact
								path="/category"
								element={<MainCategory />}
							/>
							<Route
								exact
								path="/category/subcategory/:parent"
								element={<SubCategory />}
							/>
							<Route
								exact
								path="/category/add/subcategory"
								element={<AddSubCategory />}
							/>
							<Route
								exact
								path="/category/add/main"
								element={<AddMainCategory />}
							/>
							<Route
								exact
								path="/category/edit/:id"
								element={<MainCategoryUpdate />}
							/>
							<Route
								exact
								path="/category/subcategory/edit/:id/:parent"
								element={<SubCategoryUpdate />}
							/>
							<Route
								exact
								path="/category/add/innercategory"
								element={<AddInnerCategory />}
							/>

							{/* Pages Paths */}

							<Route exact path="/pages" element={<Pages />} />
							<Route
								exact
								path="/pages/availability/:id"
								element={<AddAvailability />}
							/>
							<Route exact path="/pages/add" element={<AddPage />} />
							<Route
								exact
								path="/pages/add/scripture/:id/:lang"
								element={<Scripturecontent />}
							/>

							<Route
								exact
								path="/pages/edit/scripture/:id/:lang"
								element={<UpdateScripturecontent />}
							/>
							<Route
								exact
								path="/pages/add/scripture2/:id/:lang"
								element={<Scripture2content />}
							/>

							<Route
								exact
								path="/pages/edit/scripture2/:id/:lang"
								element={<UpdateScripture2content />}
							/>
							<Route
								exact
								path="/pages/add/aarti/:id/:lang"
								element={<Aarticontent />}
							/>
							<Route
								exact
								path="/pages/add/temple/:id/:lang"
								element={<Templecontent />}
							/>
							<Route
								exact
								path="/pages/add/extra/:id/:lang"
								element={<ExtraPagecontent />}
							/>
							<Route
								exact
								path="/pages/add/blog/:id/:lang"
								element={<Blogpagecontent />}
							/>
							<Route
								exact
								path="/pages/edit/aarti/:id/:lang"
								element={<Aarticontentupdate />}
							/>
							<Route
								exact
								path="/pages/edit/temple/:id/:lang"
								element={<Templecontentupdate />}
							/>
							<Route
								exact
								path="/pages/edit/extra/:id/:lang"
								element={<ExtraPagecontentupdate />}
							/>
							<Route
								exact
								path="/pages/edit/blog/:id/:lang"
								element={<Blogpagecontentupdate />}
							/>
							<Route
								exact
								path="/pages/edit/:id"
								element={<UpdatePage />}
							/>
							<Route
								exact
								path="/pages/view/:id"
								element={<ViewPage />}
							/>

							{/* Blogs Paths */}

							<Route exact path="/blogs" element={<Blog />} />
							<Route exact path="/blogs/add" element={<Addblog />} />
							<Route
								exact
								path="/blogs/add/content/:id/:lang"
								element={<Blogcontent />}
							/>
							<Route
								exact
								path="/blogs/edit/content/:id/:lang"
								element={<BlogContentUpdate />}
							/>
							<Route
								exact
								path="/blogs/edit/:id"
								element={<UpdateBlog />}
							/>

							{/* Donation & Invoices Paths */}

							<Route
								exact
								path="/donations"
								element={<Donations />}
							/>
							<Route
								exact
								path="/donations/add"
								element={<Adddonation />}
							/>
							<Route
								exact
								path="/donations/add/content/:id/:lang"
								element={<Donationcontent />}
							/>
							<Route
								exact
								path="/donations/edit/content/:id/:lang"
								element={<UpdateDonationcontent />}
							/>
							<Route
								exact
								path="/donations/edit/:id"
								element={<Updatedonation />}
							/>
							<Route
								exact
								path="/donation/category"
								element={<Catdonation />}
							/>
							<Route
								exact
								path="/donations/category/add"
								element={<Adddonationcat />}
							/>
							<Route exact path="/invoices" element={<Invoices />} />
							<Route
								exact
								path="/invoices/add"
								element={<Viewinvoice />}
							/>
							<Route
								exact
								path="/menubuilder"
								element={<MenuBuilder />}
							/>

							{/* Other Paths */}

							<Route
								exact
								path="/pagestyle"
								element={<PageStyles />}
							/>
							<Route
								exact
								path="/cardstyle"
								element={<CardStyle />}
							/>
							<Route
								exact
								path="/socialmedia"
								element={<Socialmedia />}
							/>
							<Route exact path="/feedback" element={<Feedback />} />
							<Route
								exact
								path="/feedback/details"
								element={<Feedbackinfo />}
							/>
							<Route exact path="/faq" element={<Faqs />} />
							<Route exact path="/faq/add" element={<AddFaq />} />
							<Route
								exact
								path="/faq/edit/:id"
								element={<UpdateFaq />}
							/>
							<Route
								exact
								path="/faq/add/content/:id/:lang"
								element={<AddFaqContent />}
							/>
							<Route
								exact
								path="/faq/edit/content/:id/:lang"
								element={<UpdateFaqContent />}
							/>

							{/* Users Routes */}

							<Route exact path="/users" element={<Users />} />
							<Route
								exact
								path="/users/view/:id"
								element={<Userdetails />}
							/>

							<Route
								exact
								path="/herobanner"
								element={<HeroBanner />}
							/>
							<Route
								exact
								path="/herobanner/add"
								element={<AddBanner />}
							/>
							<Route
								exact
								path="/herobanner/edit/:id"
								element={<UpdateBanner />}
							/>
							<Route exact path="/whatsnew" element={<Whatsnew />} />
							<Route
								exact
								path="/whatsnew/add"
								element={<AddNew />}
							/>
							<Route
								exact
								path="/whatsnew/edit/:id"
								element={<UpadateWhatsNew />}
							/>
							<Route
								exact
								path="/notification"
								element={<Notification />}
							/>
							<Route
								exact
								path="/notification/add"
								element={<AddNotification />}
							/>
							<Route
								exact
								path="/notification/edit/content/:id/:lang"
								element={<UpdateNotificationContent />}
							/>
							<Route
								exact
								path="/notification/add/content/:id/:lang"
								element={<AddNotificationContent />}
							/>
							<Route
								exact
								path="/notification/edit/:id"
								element={<UpdateNotification />}
							/>
							<Route
								exact
								path="/filemanager"
								element={<FileManager />}
							/>
							<Route exact path="/authpage" element={<Admins />} />
						</Routes>
					</div>
				</div>
			</>
		</BrowserRouter>
	);
}
