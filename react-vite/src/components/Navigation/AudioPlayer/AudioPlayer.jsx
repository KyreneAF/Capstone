import React from 'react'
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { thunkGetAllSongs } from '../../../redux/song'
import { useEffect } from 'react'
import './AudioPlayer.css'


function AudioPlayer(){

    const dispatch = useDispatch()
    const allSongs = useSelector(state => state.song)

    // console.log("ALLSONGS", allSongs)
    useEffect(()=>{
        dispatch(thunkGetAllSongs)
    },[dispatch])




    if(!allSongs[21])return null
    return (
        <div className='audio-player-main-cont'>
            <h3>Hello</h3>
            <ReactPlayer
                // url={allSongs[21].audio_file}
                controls={true}
                playing={true}
                width='100%'
                height='50px'
            />
        </div>
    );
}
export default AudioPlayer
