import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'
import { thunkGetAllSongs } from '../../redux/song'
import './SongDetails.css'

function SongDetails(){
    const dispatch = useDispatch()
    const allSongs = useSelector(state => state.song)
    const {id} = useParams()
    const song = allSongs[id]

    useEffect(() =>{
        dispatch(thunkGetAllSongs())
    },[dispatch,id])

    if(!Object.values(allSongs).length)return null
    const renderSongDetails = () =>{
        return(
            <div className='song-main-cont column'>
                <div className='song-img-play-poser-cont block '>
                    <div className='ss-stacked-con'>
                        {/* <img className='single-song-img' src={song.image_file}/> */}
                        <div className='play-icon-cont'><i className="fa-solid fa-play play-icon"></i></div>
                        {/* <audio controls onError={(e) => console.error('Audio error:', e)}>
                            <source src={song.audio_file} type="audio/mp3" />
                        </audio> */}
                        <span>{`produced by ${song.user_id.username}`}</span>
                    </div>
                    <div className='ss-liked-cont'>
                        <i className="fa-regular fa-heart"></i>
                        <span>{song.num_likes} Likes</span>
                    </div>

                </div>

            </div>
        )
    }


    return(
        <div className='ss-main-cont column'>
            <h2>hello</h2>
            {renderSongDetails()}
        </div>
    )

}
 export default SongDetails
