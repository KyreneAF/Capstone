import { useSelector,useDispatch } from "react-redux"
import { thunkGetAllSongs} from "../../redux/song"
import { useEffect } from "react"
import {useNavigate, NavLink} from "react-router-dom"
// import AudioPlayer from "../Navigation/AudioPlayer"
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
            <div className='land-greeting-cont block'>
                <h3>{greeting}</h3>
            </div>
        )
    }

    const handlePlayClick = (audio_file) =>{
        <div className="audio-player" >
            <h1>hello</h1>
        {/* <audio className={ isPlaying ? 'show' : 'hidden' } controls src={src} >
        </audio> */}
      </div>

    }



    const genreSort = (genre,arr) => {
        if(!allSongsArr.length)return null
        return(
            <div className={`land-cont column block`}>
            <h3>{genre}</h3>
            <div className="genre-cont row">
            {arr.map(song =>(
                <div key={song.id} className="song-cont " >
                    <div className="stacked click">
                   { song.id <= 20 && <img className='land-sqr-img' src={song.image_file}
                        onError={(e) => e.target.src="https://pics.craiyon.com/2023-09-11/9ef3786032194aa195be4f05210f9570.webp"}
                        onClick={handlePlayClick(song.audio_file)}  />}
                     {/* <div className='play-icon-cont'><i className="fa-solid fa-play play-icon"></i></div> */}
                    <div className='land-song-info column click '>
                        {/* <span onClick={(e) => {e.stopPropagation();navigate(`/songs/${song.id}`)}}>{song.title},</span> */}
                        <NavLink className='navie' to={`/songs/${song.id}`}>{song.title}</NavLink>
                        <span style={{ color: 'grey' }}> by: {song.user_id.username}</span>

                    </div>
                    </div>

                    <span className="hidden">tricky! </span>
                </div>
            ))}
            </div>
        </div>

        )
    }



    if(!allSongsArr.length) return null
    return(
        <div className="land-pg-main-cont main">
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
