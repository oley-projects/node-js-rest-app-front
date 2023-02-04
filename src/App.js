import { Routes, Route } from "react-router-dom";

import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SinglePost from "./pages/SinglePost";
import Error from "./pages/Error";
import Layout from "./pages/Layout";

import GlobalStyle from "./components/GlobalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="post/:id" element={<SinglePost />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
