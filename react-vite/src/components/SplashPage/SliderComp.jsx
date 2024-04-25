import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkGetAllSongs } from "../../redux/song";
import "./SliderComp.css";

function SliderComp() {
  const dispatch = useDispatch();
  const allSongs = useSelector((state) => state.song);
  const allSongsArr = Object.values(allSongs);
  useEffect(() => {
    dispatch(thunkGetAllSongs());
    // dispatch(thunkGetCurrLiked(currUser?.id))
  }, [dispatch]);

  // const prevArr = () =>{
  //   return (
  //       <div id ='arrow-button' style={{backgroundColor:'white', color:'black'}}>
  //           <i className="fa-solid fa-arrow-right"></i>
  //       </div>
  //   )
  // }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    prevArrow: (
      <div className="prev-arrow">
        <i className="fa-solid fa-arrow-left"></i>
      </div>
    ),
    nextArrow: (
      <div className="next-arrow">
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="slider-main-cont">
      <Slider {...settings}>
        {allSongsArr.map((song) => (
          <div key={song.id}>
            <h2>{song.title}</h2>
            <img id="slider-img" src={song.image_file} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default SliderComp;
