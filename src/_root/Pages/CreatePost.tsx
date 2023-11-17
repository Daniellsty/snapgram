import React from "react";
import addpost from '../../assets/icons/add-post.svg'
import PostForm from "@/components/forms/PostForm";
const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div>
            <img 
            width={36}
            height={36}

            src={addpost} alt="addpost" />
            <h2 className="h3-bold md:h-2-bold text-left w-full">Create Posts</h2>
        </div>
        <PostForm action="Create"/>
      </div>
    </div>
  );
};

export default CreatePost;
