import { useLocation } from 'react-router-dom'
import { posts } from '../data'
const Post = () => {
  const location = useLocation()
  const path = location.pathname.split("/")[2]

  const post = posts[2]
  // const postTest = posts.find(p => p.id.toString() === path)
  // const postTest = posts.find(p => p)
  // {pathname: '/post/1', hash: '', state: null}
  console.log(location)
  return (
    <div className="post">
      <img src={post.img} alt="" className="postImg" />
      <h1 className="postTitle">{post.title}</h1>
      <p className="postDesc">{post.desc}</p>
      <p className="postLongDesc">{post.longDesc}</p>
    </div>
  )
}

export default Post