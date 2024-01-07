const API_URL = "https://melted-abyssinian-second.glitch.me/api/v1/movie"
export const addMovie = async (req)=>{
    try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req),
        });
    
        if (!response.ok) {
          // Handle the error here
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const newMovie = await response.json();
        console.log('Movie added successfully:', newMovie);
    
        return newMovie;
      } catch (error) {
        console.error('Error adding movie:', error.message);
        // Handle the error here
      }
}

// Function to get all movie names
export const  getAllMovies = async()=> {
  
    try {
      const response = await fetch(API_URL);
  
      if (!response.ok) {
        // Handle the error here
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const movies = await response.json();

      return movies;
    } catch (error) {
      console.error('Error getting movie names:', error.message);
      // Handle the error here
    }
  }
  

export const  deleteMovie = async (movieId)=>{
  try {
    const response = await fetch(`${API_URL}/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // Movie deleted successfully
      console.log('Movie deleted successfully');
    } else {
      // Handle error
      console.error('Failed to delete movie');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}
