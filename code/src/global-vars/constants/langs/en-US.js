
export const resource = {
  title: "English (USA)",
  flag: "🇺🇸",
  lang: "en-US",
  rtl: false,
  translations: {
    intlDateTime: "{{val, datetime}}",
    intlRelativeTime: "{{val, relativetime}}",
    intNowTime: "now",

    // for the the please wait page
    PLEASE_WAIT_TIMEOUT: "Something went wrong, click to Exit",
    PLEASE_WAIT: "Please wait",

    // For the Payment Page
    PAYMENT_PAGE_HEADER: "Payment Status",
    PAYMENT_PAGE_YOU_HAVENT_PAID_YET: "You haven't paid yet, it's free with ads",
    PAYMENT_PAGE_EXPIRED: "Seems as though you're payment has expired",
    PAYMENT_PAGE_EXPIRING_SOON: "You're payment is expiring soon, but you still have time left",
    PAYMENT_PAGE_NO_WORRIES: "You've got time, nothing to worry about",

    PAYMENT_PAGE_PROD_SALE: "Products For Sale",
    PAYMENT_PAGE_REPEAT_BUY_ERROR: "You're already buying this product, please wait",
    PAYMENT_PAGE_PEND_PURCH: "Pending Purchases",
    PAYMENT_PAGE_PEND_ERROR: "This Purchase Failed",
    PAYMENT_PAGE_PEND_SUCCESS: "This Purchase Succeeded",
    PAYMENT_PAGE_PURCH_RES_NO_ISSUE: "No Issues",
    PAYMENT_PAGE_PURCH_RES_WEBHOOK_FAILED: "The purchase was successful, but we need more time to validate it",
    PAYMENT_PAGE_PURCH_RES_USER_CANCELED: "Puchase cancelled",
    PAYMENT_PAGE_PURCH_RES_ALREADY_OWN: "You already own this product",
    PAYMENT_PAGE_PURCH_RES_DEFERRED_PAYMENT: "The purchase has been processed, just waiting for approval",
    PAYMENT_PAGE_PURCH_RES_REC_VAL_FAIL: "We need to revalidate your purchase",
    PAYMENT_PAGE_PURCH_RES_REC_REQ_FAIL: "We are having trouble naking the purchase",
    PAYMENT_PAGE_PURCH_RES_HAVE_SUB: "You already own this subscription",
    PAYMENT_PAGE_PURCH_RES_USR_CONF: "This product is owned by a different user",
    PAYMENT_PAGE_PURCH_RES_UNKNOWN: "We're unable to process your purchase, please try again later",

    // For Unmarked StartCleaning Page
    CLEAN_FROM_CAMERAROLL: "Clean from your Camera Roll",
    CLEAN_FROM_DIRECTORY: "Clean from a Directory",

    // for the swiper
    NOMOREFILES_NOTICE: "No more pictures. All caught up!",
    NOMOREFILES_CALL_TO_ACTION: "Click to go back to the main menu",

    // Load More Cards
    LOADMORECARDS_NOTICE: "All done with this batch",
    LOADMORECARDS_CALL_TO_ACTION: "Click to load the next 10",

    // for individual swiper cards
    SWIPERCARD_FILE_NAME: "File name",
    SWIPERCARD_FILE_URI: "File uri",
    SWIPERCARD_MARKED_TIMESTAMP: "Marked Timestamp",
    SWIPERCARD_STORED_STATUS: "Stored, Saved or New",
    SWIPER_CARD_STORED_STATUS_NEW: "New",
    SWIPER_CARD_STORED_STATUS_STORED: "Stored",
    SWIPER_CARD_STORED_STATUS_SAVED: "Saved",

    SWIPER_CARD_NO_DISPLAY_ITEM: "This file type has no available display",

    USER_WHY_REG_FOR: (
  `
  Why do we use register and forgot password as the same form?
  We want to avoid hackers finding out what users exist and which do not.
  If a hacker were to register under an email that already exists and we returned an error, they'd now know that user exists.
  If we only supported forgot password for emails that exist, the hacker could figure out which users exist.
  To protect the identity of our users, we try to make sure nobody knows.
  `
    ),
  },
};
