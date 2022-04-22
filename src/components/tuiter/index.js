import React from "react";
import Navigation from "../navigation";
import WhatsHappening from "../whats-happening";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "../home";
import Bookmarks from "../bookmarks";
import Profile from "../profile";
import "./tuiter.css";
import EditProfile from "../profile/edit-profile";
import Explore from "../explore";
import Notifications from "../notifications";
import Messages from "../messages";
import Lists from "../lists";
import More from "../more";
import { Login } from "../profile/login";
import Signup from "../profile/signup";
import Chat from "../messages/chat";
import Stories from "../stories";
import ViewStory from "../stories/view-story";
import Broadcast from "../messages/broadcast";
import MyStories from "../stories/my-stories";
import GroupChat from "../messages/group-chat";
import CreateGroup from "../messages/create-group";

function Tuiter() {
  return (
    <BrowserRouter>
      <div className="container h-100">
        <div className="ttr-tuiter h-100">
          <div className="ttr-left-column">
            <Navigation />
          </div>
          <div className="ttr-center-column">
            <Routes>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="tuiter" element={<Home />} />
              <Route path="tuiter/:uid" element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="home/:uid" element={<Home />} />
              <Route path="explore" element={<Explore />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="messages" element={<Messages />} />
              <Route path="messages/chat" element={<Chat />} />
              <Route path="messages/group-chat" element={<GroupChat />} />
              <Route path="messages/create-group" element={<CreateGroup/>}/>
              <Route path="messages/broadcast" element={<Broadcast />} />
              <Route path="bookmarks" element={<Bookmarks />} />
              <Route path="lists" element={<Lists />} />
              <Route path="profile/*" element={<Profile />} />
              <Route path="profile/edit" element={<EditProfile />} />
              <Route path="more" element={<More />} />
              <Route path="stories" element={<Stories />} />
              <Route path="stories/:sid/view" element={<ViewStory />} />
              <Route path="stories/my-stories" element={<MyStories />} />
            </Routes>
          </div>
          <div className="ttr-right-column">
            <WhatsHappening />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default Tuiter;
