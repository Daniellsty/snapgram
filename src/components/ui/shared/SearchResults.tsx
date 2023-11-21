import Loader from './Loader';
import GridPostList from './GridPostList';

type SearhcResultProps={
  isSearchFetching:boolean;
  searchedPosts:any;
}

const SearchResults = ({isSearchFetching,searchedPosts}:SearhcResultProps) => {

  if(isSearchFetching) {
    return <Loader/>
  }

  
  
  if( searchedPosts && searchedPosts?.documents.length > 0){
    console.log(searchedPosts);
    return <GridPostList posts={searchedPosts.documents} />
  }

  return (
    <p className='text-light-4 mt-10 text-center w-full' >No Result Found</p>
  )
}

export default SearchResults