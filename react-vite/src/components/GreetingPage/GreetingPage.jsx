import {useSelector, useDispatch} from 'react-redux';
import { thunkGetCurrSongs,clearState } from '../../redux/song';
import { useNavigate } from 'react-router-dom';
import './GreetingPage.css'
import { useEffect } from 'react';

function GreetingPage(){

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const currUser = useSelector(state =>state.session.user)
    const currSongs = useSelector(state => state.song)
    const currSongsArr = Object.values(currSongs)


    useEffect(() =>{
        dispatch(thunkGetCurrSongs())
    },[dispatch, currUser])

    const handleNavMySongs = async() =>{
        navigate('/songs/current')
        dispatch(clearState())
    }

    // const userSongs = () =>{
    //     return(
    //         <div className='gp-user-song-cont row click' onClick={() => navigate('/songs/current')}>
    //             <img className='gp-img' src={currSongsArr[1].image_file}/>
    //             <div className='gp-user-song-title-cont column'>
    //                 <span>Your songs:</span>
    //                 <span>{currSongsArr.length} songs</span>
    //             </div>

    //         </div>
    //     )

    // }


    if(!currSongsArr.length) return null
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
            <div className='gp-user-song-cont row click' onClick={handleNavMySongs}>
                <img className='gp-img' src={currSongsArr[1].image_file}/>
                <div className='gp-user-song-title-cont column'>
                    <span>Your songs:</span>
                    <span>{currSongsArr.length} songs</span>
                </div>

            </div>

        </div>
    )

}

export default GreetingPage
