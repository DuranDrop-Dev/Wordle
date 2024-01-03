import axios from "axios";

/**
 * Check if the user exists in the database.
 * 
 * @param {string} email - The user's email address.
 * @param {string} displayName - The user's display name.
 * @param {string} date - The date the user was created.
 * @returns {Promise<object>} - The response data from the API.
 */
export const checkIfUser = async (email, displayName, date) => {
    try {
        // Define the API URL
        const url = 'https://gigsidekick.click/api/DB/CheckUser.php';

        // Send a GET request to the API
        const response = await axios.get(url, {
            params: {
                email: email,
                displayName: displayName,
                createdAt: date
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