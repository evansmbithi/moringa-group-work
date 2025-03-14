App({
  data: {
    global_balance: ''
  },

  userInfo: null,

  fetchBal(msisdn) {
    return new Promise((resolve, reject) => {
      my.request({
        url: `https://moringa-silver-capstone-backend.onrender.com/api/v1/account/${msisdn}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        success: (res) => {
          console.log('Response:', res.data);

          if (
            res.data &&
            res.data.result &&
            res.data.result.account &&
            res.data.result.account.balance !== undefined
          ) {
            const balance = res.data.result.account.balance;
            this.data.global_balance = balance; // Update global balance
            resolve(balance); // Resolve the promise with balance
          } else {
            console.error('Balance not found in response');
            reject('Balance not found in response');
          }
        },
        fail: (error) => {
          console.error('Error fetching balance:', error);
          my.alert({ title: 'Error', content: 'Request failed. Unable to connect to server' });
          reject(error);
        }
      });
    });
  },

  withdraw(inputText) {
    return new Promise((resolve, reject) => {
      const bodyData = {
        requestRefId: "string",
        paypalUsername: "Martin",
        paypalPassword: "evans@123",
        msisdn: "254798881618",
        amount: inputText
      };

      my.request({
        url: 'https://moringa-silver-capstone-backend.onrender.com/api/v1/account/transact/2',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        data: bodyData,
        success: (res) => {
          console.log('Withdraw Response:', res.data);

          if (
            res.data &&
            res.data.result &&
            res.data.result.account &&
            res.data.result.account.balance !== undefined
          ) {
            const newBalance = res.data.result.account.balance;
            this.data.global_balance = newBalance; // Update balance
            resolve(newBalance); // Resolve promise
          } else {
            console.error('Balance not found in response');
            reject('Balance not found in response');
          }
        },
        fail: (error) => {
          console.error('Error withdrawing:', error);
          my.alert({ title: 'Error', content: 'Transaction failed. Please try again.' });
          reject(error);
        }
      });
    });
  },
  
  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.userInfo) {
        resolve(this.userInfo);
        return;
      }

      my.getAuthCode({
        scopes: ['auth_user'],
        success: (authcode) => {
          console.info(authcode);

          my.getAuthUserInfo({
            success: (res) => {
              this.userInfo = res;
              resolve(this.userInfo);
            },
            fail: () => {
              reject({});
            }
          });
        },
        fail: () => {
          reject({});
        }
      });
    });
  }
});
