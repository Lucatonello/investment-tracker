# Track My Crypto

A Next.js application that helps you track your cryptocurrency investments and monitor real-time market trends. The app provides a user-friendly interface to manage your investment portfolio, track profits, view real-time charts, and access detailed information about cryptocurrencies.

## Features

### Dashboard

- **Investment Tracker**: 
  - Track your crypto investments in a table.
  - Calculate profit and loss for each asset.
  - Edit, delete, or mark investments as sold.
- **Sales Table**: 
  - Displays a table of your completed trades with profit and other trade details.
- **Real-Time Charts**: 
  - View real-time price, market cap, and total volume charts for the cryptocurrencies you have invested in.
- **Token Distribution Pie Chart**: 
  - A pie chart displaying the distribution of your tokens for a visual overview of your portfolio.

### Trending Section

- **Top Coins by 7-Day Price Change**:
  - View the top-performing coins over the last 7 days based on price change.
- **Most Popular Coins**:
  - See the most traded cryptocurrencies in the last 7 days.
- **Crypto News**:
  - Stay updated with the latest news in the cryptocurrency world.
  
### Coin Profiles

- **Detailed Coin Info**: 
  - View a detailed profile for each cryptocurrency with metadata such as:
    - Description
    - Tags
    - Sentiment analysis
    - Market cap rank
    - And more...
- **Links**: 
  - Access links to the coin's official homepage, repositories, and other resources.
- **Price Graph**: 
  - A price graph showing the historical price of the coin over time.

### Search Functionality

- **Search Coins**: 
  - Search for any coin by name and view its profile with all the relevant details and charts.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [npm](https://npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Steps

1. Clone this repository:
    ```bash
    git clone https://github.com/Lucatonello/investment-tracker.git
    ```

2. Navigate to the project directory:
    ```bash
    cd investment-tracker
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the application.

## Tech Stack
- **Frontend**: Next.js, Chart.js Tailwind CSS, Lucide, Shadcn
- **Backend**: CoinGecko API, Newsdata API, Neon database
- **State Management**: React hooks, Localstorage

## Contributing

Contributions are welcome! If you'd like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to your fork (`git push origin feature-branch`).
6. Open a pull request.
