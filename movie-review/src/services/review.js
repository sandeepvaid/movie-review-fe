const API_URL = "https://melted-abyssinian-second.glitch.me/api/v1/review"
export const addReview =  async (movieId,req)=>{
    try {
        const response = await fetch(`${API_URL}/${movieId}`, {
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
    
        const rewReview = await response.json();

      } catch (error) {
        console.error('Error adding movie:', error.message);
        // Handle the error here
      }
}

export const getMovieReview = async (movieId) => {
  try {
    const response = await fetch(`${API_URL}/${movieId}`);

    if (!response.ok) {
      // Handle the error here
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const reviews = await response.json();

    return reviews;
  } catch (error) {
    console.error('Error getting movie names:', error.message);
    // Handle the error here
  }
}