import './UserSongs404.css'
import { useNavigate } from 'react-router-dom'

function UserSongs404(){
    const navigate = useNavigate()
    return(
        <div id='no-liked-cont'>
            <span id='heading-404'>{"Looks like you don't have any Songs"}</span>
                <button className='click' onClick={() =>navigate('/songs/new')}>Get started uploading</button>

        </div>
    )

}

export default UserSongs404
