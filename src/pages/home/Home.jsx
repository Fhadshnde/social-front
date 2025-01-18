import PostList from "../../components/posts/PostList";
import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);
  const { user } = useSelector((state) => state.auth);

  // useEffect to fetch posts when user logs in
  useEffect(() => {
    if (user) {
      dispatch(fetchPosts(1));
    }
  }, [dispatch, user]);

  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">Welcome to Blog</h1>
        </div>
      </div>
      <div className="home-latest-post">Latest Posts</div>
      {user ? (
        <>
          <div className="home-container">
            <PostList posts={posts} />
            <Sidebar />
          </div>
          <div className="home-see-posts-link">
            <Link to="/posts" className="home-link">
              See All Posts
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1>
            You have to log in or create a new account to see all the content
          </h1>
        </>
      )}
    </section>
  );
};

export default Home;
