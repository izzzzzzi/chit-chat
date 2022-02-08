import { Link } from "react-router-dom"
import Post from '../pages/Post'

const Card = ({post}) => {
  return(
    <div className="card">
      <Link className="link" to={`/post/${post.id}`}>
        <Post/>
      </Link>
    </div>
  )
}

export default Card