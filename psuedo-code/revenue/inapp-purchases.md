
- In App purchases
  - User must be able to login/register
    - need to create a website for that
  - https://github.com/dooboolab/react-native-iap
  - Allows the person to skip ads
  - create a website that stores the paid status
    - fetch from the website the users paid status
    - probably need some sort of user/password situation to ensure that only the user can access the paid status
    - will probably need some sort of paypal integration
  - not sure if the payment reciept comes from the user or directly from apple/google


## Server
- User
  - Create a user
    - send user verification token to users email or mobile phone
  - Verify a user
  - User logs in
  - User Logs out
- Payment - requires user
  - New Payment
  - New Subscription
  - Canceled Subscription
