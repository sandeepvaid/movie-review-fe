// Header.js
import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, Input, DatePicker, Select } from 'antd';
import { addMovie,getAllMovies } from '../../services/movie';
import './header.css'
import MovieCard from '../MovieCard/MovieCard';
import { addReview } from '../../services/review';



const Header = () => {
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    const [addMovieModalVisible, setAddMovieModalVisible] = useState(false);
    const [addReviewModalVisible, setAddReviewModalVisible] = useState(false);
    const [movieName,setMovieName] = useState("")
    const [movieReleaseDate,setMovieReleaseDate] = useState("")
    const [allMovies,setAllMovies] = useState([]);
    const [selectMovieId,setSelectMovieId] = useState("")
    const [reviewerName,setReviewerName] = useState("")
    const [rating,setRating] = useState(0)
    const [reviewComment,setReviewComment] = useState("")
    useEffect(()=>{
        handleGetAllMovies();
    },[])

    const movieOptions = allMovies.map(movie => (
        <Option key={movie._id} value={movie.name}>
          {movie.name}
        </Option>
      ));
      
    const handleGetAllMovies = async() =>{
        const movies = await getAllMovies();
        setAllMovies(movies)
    }

    const handleAddMovieClick = () => {
        setAddMovieModalVisible(true);
    };

    const handleAddReviewClick = () => {
        setAddReviewModalVisible(true);
    };

    const handleAddMovieModalCancel = () => {
        setAddMovieModalVisible(false);
    };

    const handleAddReviewModalCancel = () => {
        setAddReviewModalVisible(false);
    };
    const handleAddMovie= async () => {
        
        const response = await addMovie({
            "name":movieName,
            "releaseDate":movieReleaseDate
        })
        setMovieName("");
        setMovieReleaseDate("");
        handleGetAllMovies();
        setAddMovieModalVisible(false);
    }
    const handleAddReview =async () => {
        console.log(selectMovieId,reviewComment,rating,reviewerName)
        const req={
            "reviewerName":reviewerName,
            "rating": rating,
            "comments":reviewComment,
        }
        addReview(selectMovieId,req);
        setAddReviewModalVisible(false);
    }
    const handleMovieSelect = (value) => {
        
        const selectedMovie = allMovies.find(movie => movie.name === value);
        setSelectMovieId(selectedMovie._id);
        
    }
  return (
    <div className='main-header'>
        <div className='header'>
            <Button type="primary" onClick={handleAddReviewClick} style={{ marginLeft: '10px' }}>
            Add Movie Review
            </Button>
            <Button type="primary" onClick={handleAddMovieClick}>
                Add Movie
            </Button>
        </div>   
        <div className='all-movies'>
            {allMovies.length >0 && allMovies.map((movie, index) =>{
            return <MovieCard movie={movie} handleGetAllMovies={handleGetAllMovies}/>
            })}
        </div>
      <Modal
        title="Add Movie"
        visible={addMovieModalVisible}
        onCancel={handleAddMovieModalCancel}
        footer={null}
      >
        <Card title="Movie Details">
          <p>
            
            <Input
              type="text"
              placeholder="Enter movie name"
              // You can set up state to capture the input value if needed
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            />
          </p>
          <p>
           
            <DatePicker
                placeholder='Release date'
              // You can customize the DatePicker component as needed
                onChange={(date, dateString) => setMovieReleaseDate(dateString)}
            />
          </p>
          <Button type="primary" onClick={handleAddMovie} style={{ marginTop: '10px' }}>
            Add Movie
          </Button>
        </Card>
      </Modal>
      <Modal
        title="Add Movie Review"
        open={addReviewModalVisible}
        onCancel={handleAddReviewModalCancel}
        footer={null}
      >
        <Card title="Review Details">
          <p>
            Movie Name:{' '}
            <Select
              placeholder="Select a movie"
              style={{ width: '100%' }}
              onChange={handleMovieSelect}
            >
              {movieOptions}
              {/* Add more options as needed */}
            </Select>
          </p>
          <p>
            Reviewer Name:{' '}
            <Input
              type="text"
              placeholder="Enter your name"

              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
            />
          </p>
          <p>
            Rating:{' '}
            <Input
              type="number"
              placeholder="Enter rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </p>
          <p>
            Review Comments:{' '}
            <Input.TextArea
              placeholder="Enter review comments"
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />
          </p>
          <Button type="primary" onClick={handleAddReview} style={{ marginTop: '10px' }}>
            Add Review
          </Button>
        </Card>
      </Modal>
        
      
    </div>
  );
};

export default Header;
