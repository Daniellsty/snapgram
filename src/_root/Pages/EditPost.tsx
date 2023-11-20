import addpost from '../../assets/icons/add-post.svg'
import PostForm from "@/components/forms/PostForm";
import { useParams } from "react-router-dom";
import { useGetByPostById } from "@/lib/react-query/queriesAndMutation";
import { Loader } from "lucide-react";
const EditPost = () => {

  const {id } = useParams();
  const {data:post,isPending} = useGetByPostById(id || '');

  if(isPending) return <Loader/>

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div>
            <img 
            width={36}
            height={36}

            src={addpost} alt="addpost" />
            <h2 className="h3-bold md:h-2-bold text-left w-full">Edit Posts</h2>
        </div>
        <PostForm action='Update' post={post} />
      </div>
    </div>
  );
};

export default EditPost;
