import { useParams } from 'react-router-dom';

const data = {
  test1: {
    userEmail: 'test@test1',
  },
  test2: {
    userEmail: 'test@test2',
  },
};

const Profile = () => {
    // URL parameter는 hook 사용해 객체 형태로 조회
    const params = useParams();
    const profile = data[params.userEmail];

  return (
    <div>
        <h1>사용자 프로필</h1>
        {profile ? (
        <div>
            <h1>{profile.email}</h1>
            <h2>hello</h2>
        </div>
        ) : (
        <p> not exist! </p>)}
    </div>
  )
}

export default Profile;