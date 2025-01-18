import { Link } from "react-router-dom";

const PostItem = ({ post, username, userId }) => {
  // تحديد الرابط المناسب لملف الشخصي
  const profileLink = userId ? `/profile/${userId}` : post?.user?._id ? `/profile/${post.user._id}` : "#";

  return (
    <div className="post-item">
      <div className="post-item-image-wrapper">
        {post?.image?.url ? (
          <img src={`https://social-api-fahad.gleeze.com/${post.image.url}`} alt="Post" className="post-item-image" />
        ) : (
          <div className="no-image-placeholder">No Image Available</div>
        )}
      </div>
      <div className="post-item-info-wrapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author: </strong>
            <Link className="post-item-username" to={profileLink}>
              {username || post?.user?.username || "Unknown User"}
            </Link>
          </div>
          <div className="post-item-date">
            {post?.createdAt ? new Date(post.createdAt).toDateString() : "Unknown Date"}
          </div>
        </div>
        <div className="post-item-details">
          <h4 className="post-item-title">{post?.title || "Untitled Post"}</h4>
          <Link className="post-item-category" to={post?.category ? `/posts/categories/${post.category}` : "#"}>
            {post?.category || "Uncategorized"}
          </Link>
        </div>
        <p className="post-item-description">
          {post?.description || "No description available."}
        </p>
        <Link className="post-item-link" to={post?._id ? `/posts/details/${post._id}` : "#"}>
          Read More...
        </Link>
      </div>
    </div>
  );
};

export default PostItem;
