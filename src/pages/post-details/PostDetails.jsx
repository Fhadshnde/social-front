import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./post-details.css";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
} from "../../redux/apiCalls/postApiCall";

const PostDetails = () => {
  const [updatePost, setUpdatePost] = useState(false); // تم إضافة تعريف المتغيرات
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id));
  }, [id, dispatch]);

  const navigate = useNavigate();

  // Delete Post Handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  return (
    <section className="post-details">
      <h1 className="post-details-title">{post?.title}</h1>
      <p className="post-details-description">{post?.description}</p>
      <div className="post-details-user-info">
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user?._id}`}>{post?.user?.username}</Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <div className="post-details-icon-wrapper">
        <div>
          {user && (
            <i
              onClick={() => dispatch(toggleLikePost(post?._id))}
              className={
                post?.likes.includes(user?._id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
            ></i>
          )}
          <small>{post?.likes?.length} likes</small>
        </div>
        {user?._id === post?.user?._id && (
          <div>
            <i
              onClick={() => setUpdatePost(true)}
              className="bi bi-pencil-square"
            ></i>
            <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
          </div>
        )}
      </div>
      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="post-details-info-write">
          To write a comment you should login first
        </p>
      )}

      <CommentList comments={post?.comments} />
      {updatePost && <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />}
    </section>
  );
};

export default PostDetails;
