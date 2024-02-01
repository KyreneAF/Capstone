import { useSelector,useDispatch } from "react-redux"
import { thunkGetAllSongs } from "../../redux/song"
import { useEffect } from "react"
import './SplashPage.css'

function SplashPage(){
    const dispatch = useDispatch()
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
            <div className={`land-${genre}-cont land-cat-block`}>
            <h3>{genre}</h3>
            {arr.map(song =>(
                <div key={song.id}>
                    {/* <span>{song.audio_file}</span> */}
                    <img className='land-sqr-img' src={song.image_file} onError={(e) => e.target.src="https://pics.craiyon.com/2023-09-11/9ef3786032194aa195be4f05210f9570.webp"}/>
                    <audio controls onError={(e) => console.error('Audio error:', e)}>
                     <source src={song.audio_file} type="audio/mp3" />
                    </audio>
                </div>
            ))}
        </div>

        )
    }



    return(
        <div className="land-pg-main-cont">
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
