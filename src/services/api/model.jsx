import { BaseUrl } from "../../constants";

const FetchData = async (apiEndpoint, input) => {
    console.log('@@ Endpoint:', `${BaseUrl}${apiEndpoint}`);
    console.log('@@ Input:', input);

    try {
        const response = await fetch(`${BaseUrl}${apiEndpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });

        console.log('@@ Response status:', response.status);
        console.log('@@ Response:', response);

        // Check if response is not OK
        if (!response.ok) {
            // Handle non-JSON responses
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                console.error('Error response body:', errorData);
                throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || ''}`);
            } else {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }
        }

        // Parse JSON response
        const data = await response.json();
        console.log('@@ Response data:', data);
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default FetchData
