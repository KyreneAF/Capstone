import { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { thunkDeleteSong, thunkGetCurrSongs } from "../../redux/song";
import { useDispatch, useSelector } from "react-redux";
import './SongDeleteModal.css'


function SongDeleteModal({id}){

    id = 32
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const userSongs = useSelector(state => state.song)
    const currUser = useSelector(state => state.session.user)
    const song = userSongs[id]
    console.log("song",song)

    useEffect(() =>{
        dispatch(thunkGetCurrSongs())
    },[dispatch,currUser])

    const handleSubmit = async () => {
        closeModal()

        await dispatch(thunkDeleteSong(id))

      };

      const handleCancel = () => {

        return closeModal();
      }

      if(!song)return null
      return (
        <div id='delete-song-modal column'>
          <h3>Are you sure you want to delete</h3>
          <div className='delete-song-info-cont column'>
            <img className='delete-img' src={song.image_file}/>
            <span>{song.title}</span>
            <span>{song.num_likes} Likes</span>
          </div>
          <div id='delete-buttons-cont'>
            <button className='delete-button' onClick={handleSubmit}><h2 className='delete-button-title'>Delete</h2></button>
            <button className='keep-button' onClick={handleCancel}><h2 className='delete-button-title'>Cancel</h2></button>
          </div>
        </div>
      );

}

export default SongDeleteModal
