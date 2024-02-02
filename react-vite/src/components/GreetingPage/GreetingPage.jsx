import {useSelector, useDispatch} from 'react-redux';
import { thunkGetCurrSongs } from '../../redux/song';
import { useNavigate } from 'react-router-dom';
import './GreetingPage.css'

function GreetingPage(){

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const currUser = useSelector(state =>state.session.user)
    const currSongs = useSelector(state => state.song)

    // const



    return(
        <div className="greeting-main-cont column">
            <div className='greeting-nav-main-cont'>
                <div className='home-cont'>
                    <div className='add-song-cont click' onClick={() => navigate('/')}>
                        <i className="fa-solid fa-house"></i><span>Home</span>
                    </div>
                    <div className='add-song-bttn click' onClick={() => navigate('/songs/new')}>
                        <i className="fa-solid fa-plus"></i><span>Upload new track</span>
                    </div>
                </div>

            </div>

        </div>
    )

}

export default GreetingPage
