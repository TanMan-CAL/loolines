import React, { useEffect } from 'react';

const PredictionChip = () => {
    const [date, setDate] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [ans, setAns] = React.useState('');
    const [clicked, setClick] = React.useState(0);
    const [isExpanded, setIsExpanded] = React.useState(false);
    
    const makeRequest = async () => {
        try {
            const response = await fetch('http://localhost:5000/postmodel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Ensure the header is set to application/json
                },
                body: JSON.stringify({
                    date: date,  
                    time: inputValue,  
                }),
            });

            // Check if the response is valid
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.prediction) {
                setAns(result.prediction);  // Display the prediction
            } else {
                setAns("Error: " + result.error);  // Display any errors sent from the backend
            }
        } catch (error) {
            console.log("Error:", error);
            setAns("Failed to get prediction: " + error.message);  // Display any network or other errors
        }
    };

    useEffect(() => {
        if (clicked === 1) {
            makeRequest();
            setClick(0);
        }
    }, [clicked]);  // Trigger the request when clicked changes to 1
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
      };

    const handleCategoryChange = (category: string) => {
        setDate(category);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleClick = (event: React.FormEvent) => {
        event.preventDefault()
        setClick(1);  // Set clicked to 1 to trigger the request in useEffect
    };

    return (
        <div
          className={`w-full max-w-xs p-2 border rounded-lg  ${
            isExpanded ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700"
          }`}
        >
          {/* Clickable Header */}
          <div
            className="cursor-pointer p-2 bg-gray-200 dark:bg-gray-600 rounded-lg"
            onClick={handleToggle}
          >
            <h5 className="text-xs font-medium text-gray-900 dark:text-white">
              Get Predictions
            </h5>
          </div>
    
          {/* Expandable Content */}
          {isExpanded && (
            <div className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mt-2">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Enter Day
                  </label>
                  <select
                    name="date"
                    id="date"
                    onChange={(event) => handleCategoryChange(event.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  >
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
    
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                  >
                    Enter Time
                  </label>
                  <input
                    name="password"
                    id="password"
                    onChange={handleInputChange}
                    placeholder="12:00"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
    
                <button
                  type="submit"
                  onClick={handleClick}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Process
                </button>
    
                <div className="w-full max-w-xs p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <h5 className="text-xs font-medium text-gray-900 dark:text-white mb-2">
                    Prediction Result
                  </h5>
                  <div
                    id="outputBox"
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  >
                    {ans}
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      );
    }


export default PredictionChip;
