# crypto-ninja's

A powerful crypto tracker built with React, Axios, Framer Motion, and Chart.js. Keep an eye on your favorite cryptocurrencies with customizable watchlists and dynamic, real-time data visualizations.

## Features

- **Customizable Watchlists**: Track your favorite cryptocurrencies and manage them effortlessly with watchlists.
- **Real-Time Data**: Get up-to-date price data, market cap, and total volumes of your selected cryptocurrencies.
- **Dynamic Charts**: Visualize the historical price data of cryptocurrencies using interactive and responsive charts.
- **Price Toggle**: Switch between viewing prices, market caps, or total volumes.
- **Multi-Axis Charts**: Compare two cryptocurrencies simultaneously using multi-axis charts.
- **React-Toastify**: Notifiy user with pop-up messages about the action result (Success/Error/Alert).

## Technologies Used

- **React**: For building the UI components.
- **Axios**: For handling API requests.
- **Framer Motion**: For smooth and engaging animations.
- **Chart.js**: For rendering dynamic cryptocurrency charts.
- **Material UI**: Used for various UI components such as:
  - **ToggleButton**: To switch between different price types.
  - **Select**: For dropdown menus and selecting cryptocurrencies.
  - **Icons**: For enhancing the user interface with recognizable icons.
  - **Switch**: For toggling between different UI elements.
  - **Drawer**: For navigation and watchlist management.
  - **Loader**: To show a loading state when data is being fetched.
  - **Tooltip**: For providing additional information on hover.
  - **Pagination**: For navigating through pages of data.
  - **Tab**: For switching between different sections of the application.
- **React-Toastify**: For displaying action results with pop-up messages.

## Project Structure

```
├── public
├── src
│   ├── apis                 # API calls to fetch cryptocurrency data
│   ├── components            # Reusable UI components such as charts, buttons, etc.
│   ├── pages                 # Pages such as Dashboard, Watchlist, etc.
│   ├── styles                # Global CSS and style modules
│   └── utils                 # Utility functions like number conversion, data formatting
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cryptotracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd cryptotracker
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Run the app:
   ```bash
   npm start
   ```

## Pictures

Here are some screenshots of the application:

1. **Homepage**
   ![Homepage](./src/assets/homepage.png)

2. **Dashboard Grid View**
   ![Dashboard Grid View](./src/assets/dashboard_grid.png)

3. **Dashboard List View**
   ![Dashboard List View](./src/assets/dashboard_list.png)

4. **Coin Details**
   ![Coin Details](./src/assets/coin_details.png)

5. **Price Comparison**
   ![Price Comparison](./src/assets/price_comparison.png)

6. **Price Comparison Graph**
   ![Price Comparison Graph](./src/assets/price_comparison_graph.png)

## License

This project is licensed under the MIT License.
