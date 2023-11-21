import { useGetByPostById } from "@/lib/react-query/queriesAndMutation";
import { multiFormatDateString } from "@/lib/utils";

import { NavLink, useNavigate, useParams } from "react-router-dom";
import profile from "../../assets/icons/profile-placeholder.svg";
import edit from "../../assets/icons/edit.svg";
import { useUserContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import deleteImage from "../../assets/icons/delete.svg";
import PostStats from "@/components/ui/shared/PostStats";
import { deletePost } from "@/lib/appwrite/api";
import Loader from "@/components/ui/shared/Loader";
const PostDetail = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetByPostById(id || "");
  const { user } = useUserContext();

  const navigate = useNavigate();

  const handleDeletePost = () => {
    deletePost({
      postId: id,
      imageId: post?.imageId,
    });

    window.location.reload();
    navigate(-1);
    // window.location.reload()
  };

  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img className="post_details-img" src={post?.imageUrl} alt="post" />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <NavLink
                className="flex items-center gap-3"
                to={`/profile/${post?.creator.$id}`}>
                <img
                  className="rounded-full w-8 h-8 lg:h-12 lg:w-12"
                  src={post?.creator?.imageUrl || profile}
                  alt="user profile"
                />

                <div className="flex flex-col ">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </NavLink>

              <div className="flex-center ">
                <NavLink
                  className={`${user.id === post?.creator?.id && "hidden"}`}
                  to={`/update-post/${post?.$id}`}>
                  <img width={24} height={24} src={edit} alt="edit" />
                </NavLink>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn 
              ${user.id === post?.creator?.id && "hidden"}
              `}>
                  <img src={deleteImage} alt="delete" width={24} height={24} />
                </Button>
              </div>
            </div>

            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li className="text-light-3" key={tag}>
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full ">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
