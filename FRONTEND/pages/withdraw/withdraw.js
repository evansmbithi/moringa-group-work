
// Get the global app instance
const app = getApp();

Page({
  // Declare page data
  data: {
    inputValue: ''
  },
  // Listening lifecycle callback onLoad
  onLoad() {
    // Get user information and store data
    app.getUserInfo().then(
      (user) => {
        this.setData({
          user,
        });
      },
      () => {
        // Failed to get user information
      }
    );
  },


  onBlur(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
  
  goToPrevious() {
    // Make a page jump
    // my.navigateTo({ url: '../dashboard/dashboard' });
    my.navigateBack();
  },

  withdraw(){
    return new Promise((resolve) => {
      setTimeout(() => {
        app.withdraw(this.data.inputValue); 
        resolve();
         // Mark the Promise as resolved
      }, 1);
    }).then(()=>{
      setTimeout(() => {
        this.goToPrevious();
         // Mark the Promise as resolved
      }, 10);
    })
}

});


