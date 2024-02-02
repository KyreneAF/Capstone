import { useSelector,useDispatch } from "react-redux"
import { thunkGetAllSongs } from "../../redux/song"
import { useEffect } from "react"
import {useNavigate} from "react-router-dom"
import './SplashPage.css'

function SplashPage(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allSongs = useSelector(state => state.song)
    const allSongsArr = Object.values(allSongs)

    const hipHopSongs = allSongsArr.filter(song => song.genre === "Hip-Hop")
    const rockSongs= allSongsArr.filter(song => song.genre === "Rock")
    const elecSongs = allSongsArr.filter(song => song.genre === "Electronic")
    const bassSongs = allSongsArr.filter(song => song.genre === "Dirty Bass")
    const popSongs = allSongsArr.filter(song => song.genre === "Pop")
    const latinSongs = allSongsArr.filter(song => song.genre === "Latino")

    useEffect(() =>{
        dispatch(thunkGetAllSongs())
    },[dispatch,])


    const greetingMessage  = () =>{
        const time = new Date().getHours()
        let greeting = null
        if(time < 12 && time > 5) greeting = "Good morning"
        else if(time >= 12 && time < 17) greeting = "Good afternoon"
        else greeting = "Good evening"
        return(
            <div className='land-greeting-cont'>
                <h3>{greeting}</h3>
            </div>
        )
    }



    const genreSort = (genre,arr) => {
        if(!arr.length)return null
        return(
            <div className={`land-${genre}-cont block column`}>
            <h3>{genre}</h3>
            <div className="row">
            {arr.map(song =>(
                <div key={song.id} className="column" onClick={() => navigate(`/spots/${song.id}`)}>
                    <img className='land-sqr-img' src={song.image_file} onError={(e) => e.target.src="https://pics.craiyon.com/2023-09-11/9ef3786032194aa195be4f05210f9570.webp"}/>
                     <div className='play-icon-cont'><i className="fa-solid fa-play play-icon"></i></div>
                    <audio controls onError={(e) => console.error('Audio error:', e)}>
                     <source src={song.audio_file} type="audio/mp3" />
                    </audio>
                    <div className='land-song-info cloumn'>
                        <span>{song.title},</span>
                        <span>{song.user_id.username}</span>

                    </div>
                </div>
            ))}
            </div>
        </div>

        )
    }


    if(!allSongsArr.length) return null
    return(
        <div className="land-pg-main-cont ">
            <div className='add-song-bttn' onClick={() => navigate('/songs/new')}>
                <i className="fa-solid fa-plus"></i>
                <span>Upload new track</span>
            </div>
            <div className='land-allSongs-cont block'>
                <div className="land-greet-cont">{greetingMessage()}</div>
                <div className='songs'>
                    {genreSort("Hip-Hop",hipHopSongs)}
                    {genreSort("Rock",rockSongs)}
                    {genreSort("Electronic",elecSongs )}
                    {genreSort("Dirty Bass",bassSongs)}
                    {genreSort("Pop",popSongs)}
                    {genreSort("Latino",latinSongs)}
                </div>

            </div>
        </div>
    )



}

export default SplashPage
