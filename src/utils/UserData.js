import axios from "axios";

/**
 * Check if the user exists in the database.
 * 
 * @param {string} email - The user's email address.
 * @returns {Promise<object>} - The response data from the API.
 */
export const checkIfUser = async (email) => {
    try {
        // Define the API URL
        const url = 'https://wordle.durandrop.com/api/UserStats.php';

        // Send a GET request to the API
        const response = await axios.get(url, {
            params: {
                email: email
            }
        });

        // Get the results from the response
        const results = response.data;

        // Return the results
        return results;
    } catch (error) {
        // Log any errors that occur
        console.log(error);
    }
}