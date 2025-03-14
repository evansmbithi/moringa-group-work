const app = getApp();

const baseUrl = 'https://moringa-silver-capstone-backend.onrender.com/'; // Replace with your actual base URL

Page({

  data: {
    user: {},                // Stores user data
    dashboard_balance: '',   // Stores the displayed PayPal balance
  },

  onLoad() {
    // Fetch user information
    app.getUserInfo()
      .then(user => {
        this.setData({ user });
      })
      .catch(() => {
        console.error('Failed to get user information');
      });

    // Fetch balance when the page loads
    this.fetchBalance();

    // Start an interval to update balance every 3 seconds
    this.intervalId = setInterval(() => {
      this.fetchBalance();
    }, 3000);
  },

  onUnload() {
    // Clear interval when the page is unloaded
    clearInterval(this.intervalId);
  },

  onShow() {
    // Restart interval when page is shown
    this.intervalId = setInterval(() => {
      this.fetchBalance();
    }, 3000);
  },

  onHide() {
    // Stop interval when the page is hidden
    clearInterval(this.intervalId);
  },

  fetchBalance() {
    // Call the global app function to fetch balance
    app.fetchBal('254798881618')
      .then(balance => {
        this.setData({ dashboard_balance: balance });
      })
      .catch(error => {
        console.error('Error fetching balance:', error);
      });
  },

  goToWithdraw(){
    my.navigateTo({ url: '../withdraw/withdraw' });  }
});



