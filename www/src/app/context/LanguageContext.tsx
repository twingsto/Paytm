import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "hindi" | "english";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  english: {
    // Common
    continue: "Continue",
    verify: "Verify",
    cancel: "Cancel",
    done: "Done",
    submit: "Submit",
    back: "Back",
    next: "Next",
    skip: "Skip",

    // Mobile Number Screen
    mobileTitle: "Enter your mobile number",
    mobileSubtitle: "We'll send you a confirmation code",
    mobileLabel: "Mobile Number",
    mobilePlaceholder: "Enter 10-digit mobile number",

    // OTP Screen
    otpTitle: "Verify your number",
    otpSubtitle: "Enter the 6-digit code sent to your phone",
    resendCode: "Resend code",
    resendIn: "Resend code in",

    // Language Screen
    languageTitle: "Select your language",
    languageSubtitle: "अपनी भाषा का चयन करें",

    // Name Input Screen
    nameTitle: "What's your name?",
    nameSubtitle: "This will be used across the app",
    nameLabel: "Full Name",
    // namePlaceholder: "Enter your full name",

    // Preference Screen
    preferenceTitle: "What do you use payments for?",
    preferenceSubtitle: "Select all that apply",
    upiPayments: "UPI Payments",
    billPayments: "Bill Payments",
    travel: "Travel",
    financialServices: "Financial Services",

    // Dashboard
    welcomeBack: "Welcome back,",
    scanAndPay: "Scan & Pay",
    payAnyone: "Pay anyone instantly",
    sendMoney: "Send Money",
    toContact: "To Contact",
    bankTransfer: "Bank Transfer",
    checkBalance: "Check Balance",
    payAgain: "Pay Again",
    quickActions: "Quick Actions",
    recentTransactions: "Recent Transactions",
    scanQR: "Scan QR",
    home: "Home",
    explore: "Explore",
    profile: "Profile",

    // Quick Actions
    mobileRecharge: "Mobile Recharge",
    electricityBill: "Electricity Bill",
    fastagRecharge: "FASTag Recharge",
    trainBooking: "Train Booking",
    flightSearch: "Flight Search",
    creditCardBill: "Credit Card Bill",
    loanEMI: "Loan EMI",
    creditScore: "Credit Score",

    // Transactions
    received: "Received",
    paid: "Paid",

    // Explore Screen
    // searchServices: "Search for services",
    rechargeBills: "Recharge & Bills",
    rechargeBillsSubtitle: "Mobile, Electricity, DTH & more",
    // financialServicesTitle: "Financial Services",
    financialServicesSubtitle: "Loans, Insurance, Investments",
    // travelTitle: "Travel",
    travelSubtitle: "Flights, Trains, Hotels",
    offersTitle: "Offers",
    offersSubtitle: "Deals, Rewards, Discounts",

    // Profile Screen
    myProfile: "My Profile",
    accountSettings: "Account Settings",
    security: "Security",
    help: "Help & Support",
    about: "About",
    logout: "Logout",

    // Payment Screens
    enterAmount: "Enter Amount",
    paymentTo: "Payment to",
    enterUPIPin: "Enter UPI PIN",
    // paymentSuccessful: "Payment Successful",
    paymentFailed: "Payment Failed",
    transactionId: "Transaction ID",

    // UPI PIN
    setupUPIPin: "Set up your UPI PIN",
    confirmUPIPin: "Confirm your UPI PIN",
    enterPin: "Enter PIN",
    confirmPin: "Confirm PIN",
    pinMismatch: "PINs do not match",
    pinSuccess: "PIN set successfully",

    // Select Contact
    selectContact: "Select Contact",
    searchContacts: "Search contacts",

    // Offers
    offersRewards: "Offers & Rewards",
    all: "All",
    food: "Food",
    shopping: "Shopping",
    bills: "Bills",
    claim: "Claim",
    claimed: "Claimed",
    validTill: "Valid till",
    expiresToday: "Expires today",

    // Balance
    totalBalance: "Total Balance",
    showBalance: "Show Balance",
    hideBalance: "Hide Balance",

    // PIN Screens
    setUpUPIPin: "Set up your APP PIN",
    setPinSubtitle: "This PIN will be used for access the APP",
    confirmYourPin: "Confirm your APP PIN",
    confirmPinSubtitle: "Re-enter your PIN to confirm",
    pinSetSuccessfully: "APP PIN set successfully!",
    pinSuccessMessage: "Your APP PIN is now active and will be used to access the app",
    enterYourPin: "Enter your APP PIN",
    verifyPinSubtitle: "Enter PIN to continue",
    forgotPin: "Forgot PIN?",

    // Scan Screen
    scanQRCode: "Scan QR Code",
    scanInstruction: "Align QR code within the frame",
    enterUPIID: "Enter UPI ID",
    upiIdPlaceholder: "name@upi",

    // Select Contact
    recentContacts: "Recent Contacts",
    allContacts: "All Contacts",

    // Payment Amount
    enterAmountTitle: "Enter Amount",
    amountPlaceholder: "₹0",
    addNote: "Add note (optional)",
    notePlaceholder: "What's this payment for?",
    pay: "Pay",

    // Payment Success
    paymentSuccessTitle: "Payment Successful!",
    paidTo: "Paid to",
    shareReceipt: "Share Receipt",
    downloadReceipt: "Download Receipt",
    // backToHome: "Back to Home",

    // Bank Transfer
    bankTransferTitle: "Bank Transfer",
    accountNumber: "Account Number",
    accountNumberPlaceholder: "Enter account number",
    ifscCode: "IFSC Code",
    ifscPlaceholder: "Enter IFSC code",
    accountHolderName: "Account Holder Name",
    namePlaceholder: "Enter name",
    beneficiaryName: "Beneficiary Name",

    // Check Balance
    checkBalanceTitle: "Check Balance",
    selectAccount: "Select Account",
    linkedAccounts: "Linked Accounts",

    // Recharge & Bills
    rechargeTitle: "Recharge & Bills",
    prepaidRecharge: "Prepaid Recharge",
    postpaidBill: "Postpaid Bill",
    dthRecharge: "DTH Recharge",
    electricityBillPay: "Electricity Bill",
    gasBill: "Gas Bill",
    waterBill: "Water Bill",
    broadbandBill: "Broadband Bill",

    // Travel
    bookFlights: "Book Flights",
    bookTrains: "Book Trains",
    bookHotels: "Book Hotels",
    bookBus: "Book Bus",

    // Profile
    settings: "Settings",
    language: "Language",
    darkMode: "Dark Mode",
    notifications: "Notifications",
    privacyPolicy: "Privacy Policy",
    termsConditions: "Terms & Conditions",
    version: "Version",

    // Quick Pay
    quickPayMode: "Quick Pay Mode",
    quickPayDesc: "Skip PIN for small transactions",
    setLimit: "Set Limit",
    enableQuickPay: "Enable Quick Pay",

    // Others
    search: "Search",
    filter: "Filter",
    today: "Today",
    yesterday: "Yesterday",
    week: "Week",
    month: "Month",
    apply: "Apply",
    reset: "Reset",
    close: "Close",
    success: "Success",
    failed: "Failed",
    pending: "Pending",
    amount: "Amount",
    date: "Date",
    time: "Time",
    status: "Status",
    viewDetails: "View Details",
    retry: "Retry",

    // PIN Prompt Screen
    secureYourApp: "Secure your APP",
    setupPinDescription: "Set up a APP PIN to secure the APP and add an extra layer of protection",
    enable: "Enable",
    skipForNow: "Skip for now",

    // Notifications
    paymentMadeTo: "Payment of ₹{amount} made to {name}",
    clickToViewTransaction: "Click to view transaction details",
    viewTransaction: "View",

    // Confirm PIN Screen
    confirmYourPinTitle: "Confirm your PIN",
    enterSamePinAgain: "Enter the same PIN again to confirm",
    pinDoesNotMatch: "PIN does not match",
    changePin: "Change PIN",

    // Payment Amount Screen
    enterAmountLabel: "Enter Amount",
    addNoteOptional: "Add a note (optional)",
    processingPayment: "Processing...",
    keepSliding: "Keep sliding...",
    slideToPay: "Slide to Pay",

    // Payment PIN Screen
    toAuthorizePayment: "To authorize payment of",
    incorrectPin: "Incorrect PIN. Please try again.",
    pleaseEnterDigits: "Please enter at least 4 digits",
    enterAnyPinDemo: "Enter any 4-6 digit PIN for demo",

    // Payment Success Screen
    paymentSuccessful: "Payment Successful",
    paymentSent: "Your payment has been sent",
    processingPaymentText: "Processing payment...",
    amountPaid: "Amount Paid",
    to: "To",
    upiId: "UPI ID",
    note: "Note",
    share: "Share",
    backToHome: "Back to Home",

    // Recharge Screen
    rechargeBillsTitle: "Recharge & Bills",
    searchServices: "Search services",
    frequentlyUsed: "Frequently Used",
    mobileRechargeLabel: "Mobile Recharge",
    electricityBillLabel: "Electricity Bill",
    dthRechargeLabel: "DTH Recharge",
    creditCardBillLabel: "Credit Card Bill",
    fastagRechargeLabel: "FASTag Recharge",
    waterBillLabel: "Water Bill",
    recharge: "Recharge",
    utilities: "Utilities",
    financial: "Financial",
    others: "Others",
    postpaid: "Postpaid",
    electricity: "Electricity",
    water: "Water",
    gas: "Gas",
    lpg: "LPG",
    wifi: "WiFi",
    cableTv: "Cable TV",
    loanEmiLabel: "Loan EMI",
    insurancePremium: "Insurance Premium",
    rent: "Rent",
    subscriptions: "Subscriptions",
    trafficChallans: "Traffic Challans",
    evRecharge: "EV Recharge",

    // Financial Services Screen
    financialServicesTitle: "Financial Services",
    financialOverview: "Financial Overview",
    creditScoreLabel: "Credit Score",
    activeLoan: "Active Loan",
    creditCardDue: "Credit Card Due",
    goldSilver: "Gold & Silver",
    saveInGold: "Save in Gold",
    saveInSilver: "Save in Silver",
    goldSip: "Gold SIP",
    goldPriceAlert: "Gold Price Alert",
    loans: "Loans",
    paytmPostpaid: "Paytm Postpaid",
    personalLoan: "Personal Loan",
    loanOnMutualFund: "Loan on Mutual Fund",
    freeCreditScore: "Free Credit Score",
    insurance: "Insurance",
    bikeInsurance: "Bike Insurance",
    carInsurance: "Car Insurance",
    healthInsurance: "Health Insurance",
    insurancePremiumLabel: "Insurance Premium",
    investments: "Investments",
    mutualFunds: "Mutual Funds",
    stocks: "Stocks",
    etfs: "ETFs",
    mtf: "MTF",
    cards: "Cards",
    getCreditCard: "Get Credit Card",
    payCreditCardBill: "Pay Credit Card Bill",
    linkRupayCard: "Link RuPay Card to UPI",
    getSbiCreditCard: "Get SBI Credit Card",

    // Travel Screen
    travelTitle: "Travel",
    flights: "Flights",
    trains: "Trains",
    buses: "Buses",
    hotels: "Hotels",
    recentSearches: "Recent Searches",
  },
  hindi: {
    // Common
    continue: "जारी रखना",
    verify: "सत्यापित करें",
    cancel: "रद्द करें",
    done: "हो गया",
    submit: "जमा करें",
    back: "वापस",
    next: "अगला",
    skip: "छोड़ें",

    // Mobile Number Screen
    mobileTitle: "अपना मोबाइल नंबर दर्ज करें",
    mobileSubtitle: "हम आपको एक पुष्टिकरण कोड भेजेंगे",
    mobileLabel: "मोबाइल नंबर",
    mobilePlaceholder: "10 अंकों का मोबाइल नंबर दर्ज करें",

    // OTP Screen
    otpTitle: "अपना नंबर सत्यापित करें",
    otpSubtitle: "अपने फोन पर भेजे गए 6 अंकों का कोड दर्ज करें",
    resendCode: "कोड फिर से भेजें",
    resendIn: "कोड फिर से भेजें",

    // Language Screen
    languageTitle: "अपनी भाषा का चयन करें",
    languageSubtitle: "Select your language",

    // Name Input Screen
    nameTitle: "आपका नाम क्या है?",
    nameSubtitle: "इसका उपयोग ऐप में किया जाएगा",
    nameLabel: "पूरा नाम",
    // namePlaceholder: "अपना पूरा नाम दर्ज करें",

    // Preference Screen
    preferenceTitle: "आप भुगतान का उपयोग किसके लिए करते हैं?",
    preferenceSubtitle: "लागू सभी का चयन करें",
    upiPayments: "UPI भुगतान",
    billPayments: "बिल भुगतान",
    travel: "यात्रा",
    financialServices: "वित्तीय सेवाएं",

    // Dashboard
    welcomeBack: "वापसी पर स्वागत है,",
    scanAndPay: "स्कैन और भुगतान करें",
    payAnyone: "किसी को भी तुरंत भुगतान करें",
    sendMoney: "पैसे भेजें",
    toContact: "संपर्क को",
    bankTransfer: "बैंक ट्रांसफर",
    checkBalance: "बैलेंस जांचें",
    payAgain: "फिर से भुगतान करें",
    quickActions: "त्वरित कार्य",
    recentTransactions: "हाल के लेनदेन",
    scanQR: "QR स्कैन करें",
    home: "होम",
    explore: "एक्सप्लोर",
    profile: "प्रोफ़ाइल",

    // Quick Actions
    mobileRecharge: "मोबाइल रिचार्ज",
    electricityBill: "बिजली का बिल",
    fastagRecharge: "FASTag रिचार्ज",
    trainBooking: "ट्रेन बुकिंग",
    flightSearch: "फ्लाइट खोजें",
    creditCardBill: "क्रेडिट कार्ड बिल",
    loanEMI: "लोन EMI",
    creditScore: "क्रेडिट स्कोर",

    // Transactions
    received: "प्राप्त",
    paid: "भुगतान किया",

    // Explore Screen
    // searchServices: "सेवाओं की खोज करें",
    rechargeBills: "रिचार्ज और बिल",
    rechargeBillsSubtitle: "मोबाइल, बिजली, DTH और अधिक",
    // financialServicesTitle: "वित्तीय सेवाएं",
    financialServicesSubtitle: "ऋण, बीमा, निवेश",
    // travelTitle: "यात्रा",
    travelSubtitle: "उड़ानें, ट्रेनें, होटल",
    offersTitle: "ऑफर",
    offersSubtitle: "सौदे, पुरस्कार, छूट",

    // Profile Screen
    myProfile: "मेरी प्रोफ़ाइल",
    accountSettings: "खाता सेटिंग्स",
    security: "सुरक्षा",
    help: "सहायता और समर्थन",
    about: "के बारे में",
    logout: "लॉग आउट",

    // Payment Screens
    enterAmount: "राशि दर्ज करें",
    paymentTo: "भुगतान",
    enterUPIPin: "UPI पिन दर्ज करें",
    // paymentSuccessful: "भुगतान सफल",
    paymentFailed: "भुगतान विफल",
    transactionId: "लेनदेन आईडी",

    // UPI PIN
    setupUPIPin: "अपना APP पिन सेट करें",
    confirmUPIPin: "अपने APP पिन की पुष्टि करें",
    enterPin: "पिन दर्ज करें",
    confirmPin: "पिन की पुष्टि करें",
    pinMismatch: "पिन मेल नहीं खाते",
    pinSuccess: "पिन सफलतापूर्वक सेट किया गया",

    // Select Contact
    selectContact: "संपर्क चुनें",
    searchContacts: "संपर्क खोजें",

    // Offers
    offersRewards: "ऑफर और पुरस्कार",
    all: "सभी",
    food: "भोजन",
    shopping: "खरीदारी",
    bills: "बिल",
    claim: "दावा करें",
    claimed: "दावा किया गया",
    validTill: "तक मान्य",
    expiresToday: "आज समाप्त हो रहा है",

    // Balance
    totalBalance: "कुल बैलेंस",
    showBalance: "बैलेंस दिखाएं",
    hideBalance: "बैलेंस छुपाएं",

    // PIN Screens
    setUpUPIPin: "अपना ऐप पिन सेट करें",
    setPinSubtitle: "यह पिन ऐप तक पहुंचने के लिए उपयोग किया जाएगा",
    confirmYourPin: "अपने ऐप पिन की पुष्टि करें",
    confirmPinSubtitle: "पुष्टि के लिए अपना पिन फिर से दर्ज करें",
    pinSetSuccessfully: "ऐप पिन सफलतापूर्वक सेट किया गया!",
    pinSuccessMessage: "आपका ऐप पिन अब सक्रिय है और ऐप तक पहुंचने के लिए उपयोग किया जाएगा",
    enterYourPin: "अपना APP पिन दर्ज करें",
    verifyPinSubtitle: "जारी रखने के लिए पिन दर्ज करें",
    forgotPin: "पिन भूल गए?",

    // Scan Screen
    scanQRCode: "QR कोड स्कैन करें",
    scanInstruction: "फ्रेम के भीतर QR कोड को संरेखित करें",
    enterUPIID: "UPI ID दर्ज करें",
    upiIdPlaceholder: "नाम@upi",

    // Select Contact
    recentContacts: "हाल के संपर्क",
    allContacts: "सभी संपर्क",

    // Payment Amount
    enterAmountTitle: "राशि दर्ज करें",
    amountPlaceholder: "₹0",
    addNote: "नोट जोड़ें (वैकल्पिक)",
    notePlaceholder: "यह भुगतान किसके लिए है?",
    pay: "भुगतान करें",

    // Payment Success
    paymentSuccessTitle: "भुगतान सफल!",
    paidTo: "को भुगतान किया",
    shareReceipt: "रसीद साझा करें",
    downloadReceipt: "रसीद डाउनलोड करें",
    // backToHome: "होम पर वापस जाएं",

    // Bank Transfer
    bankTransferTitle: "बैंक ट्रांसफर",
    accountNumber: "खाता संख्या",
    accountNumberPlaceholder: "खाता संख्या दर्ज करें",
    ifscCode: "IFSC कोड",
    ifscPlaceholder: "IFSC कोड दर्ज करें",
    accountHolderName: "खाता धारक का नाम",
    namePlaceholder: "नाम दर्ज करें",
    beneficiaryName: "लाभार्थी का नाम",

    // Check Balance
    checkBalanceTitle: "बैलेंस जांचें",
    selectAccount: "खाता चुनें",
    linkedAccounts: "लिंक किए गए खाते",

    // Recharge & Bills
    rechargeTitle: "रिचार्ज और बिल",
    prepaidRecharge: "प्रीपेड रिचार्ज",
    postpaidBill: "पोस्टपेड बिल",
    dthRecharge: "DTH रिचार्ज",
    electricityBillPay: "बिजली का बिल",
    gasBill: "गैस बिल",
    waterBill: "पानी का बिल",
    broadbandBill: "ब्रॉडबैंड बिल",

    // Travel
    bookFlights: "फ्लाइट बुक करें",
    bookTrains: "ट्रेन बुक करें",
    bookHotels: "होटल बुक करें",
    bookBus: "बस बुक करें",

    // Profile
    settings: "सेटिंग्स",
    language: "भाषा",
    darkMode: "डार्क मोड",
    notifications: "सूचनाएं",
    privacyPolicy: "गोपनीयता नीति",
    termsConditions: "नियम और शर्तें",
    version: "संस्करण",

    // Quick Pay
    quickPayMode: "त्वरित भुगतान मोड",
    quickPayDesc: "छोटे लेनदेन के लिए पिन छोड़ें",
    setLimit: "सीमा निर्धारित करें",
    enableQuickPay: "त्वरित भुगतान सक्षम करें",

    // Others
    search: "खोजें",
    filter: "फ़िल्टर",
    today: "आज",
    yesterday: "कल",
    week: "सप्ताह",
    month: "महीना",
    apply: "लागू करें",
    reset: "रीसेट करें",
    close: "बंद करें",
    success: "सफल",
    failed: "विफल",
    pending: "लंबित",
    amount: "राशि",
    date: "तारीख",
    time: "समय",
    status: "स्थिति",
    viewDetails: "विवरण देखें",
    retry: "पुनः प्रयास करें",

    // PIN Prompt Screen
    secureYourApp: "अपने ऐप को सुरक्षित करें",
    setupPinDescription: "ऐप को सुरक्षित करने और सुरक्षा की एक अतिरिक्त परत जोड़ने के लिए ऐप पिन सेट करें",
    enable: "सक्षम करें",
    skipForNow: "अभी के लिए छोड़ें",

    // Notifications
    paymentMadeTo: "₹{amount} का भुगतान {name} को किया गया",
    clickToViewTransaction: "लेनदेन विवरण देखने के लिए क्लिक करें",
    viewTransaction: "देखें",

    // Confirm PIN Screen
    confirmYourPinTitle: "अपने पिन की पुष्टि करें",
    enterSamePinAgain: "पुष्टि के लिए फिर से वही पिन दर्ज करें",
    pinDoesNotMatch: "पिन मेल नहीं खाता",
    changePin: "पिन बदलें",

    // Payment Amount Screen
    enterAmountLabel: "राशि दर्ज करें",
    addNoteOptional: "नोट जोड़ें (वैकल्पिक)",
    processingPayment: "प्रक्रिया हो रही है...",
    keepSliding: "स्लाइड करते रहें...",
    slideToPay: "भुगतान के लिए स्लाइड करें",

    // Payment PIN Screen
    toAuthorizePayment: "भुगतान को अधिकृत करने के लिए",
    incorrectPin: "गलत पिन। कृपया पुनः प्रयास करें।",
    pleaseEnterDigits: "कृपया कम से कम 4 अंक दर्ज करें",
    enterAnyPinDemo: "डेमो के लिए कोई भी 4-6 अंकों का पिन दर्ज करें",

    // Payment Success Screen
    paymentSuccessful: "भुगतान सफल",
    paymentSent: "आपका भुगतान भेज दिया गया है",
    processingPaymentText: "भुगतान प्रक्रिया हो रही है...",
    amountPaid: "भुगतान की गई राशि",
    to: "को",
    upiId: "UPI आईडी",
    note: "नोट",
    share: "साझा करें",
    backToHome: "होम पर वापस जाएं",

    // Recharge Screen
    rechargeBillsTitle: "रिचार्ज और बिल",
    searchServices: "सेवाओं की खोज करें",
    frequentlyUsed: "अक्सर उपयोग किए जाने वाले",
    mobileRechargeLabel: "मोबाइल रिचार्ज",
    electricityBillLabel: "बिजली का बिल",
    dthRechargeLabel: "DTH रिचार्ज",
    creditCardBillLabel: "क्रेडिट कार्ड बिल",
    fastagRechargeLabel: "FASTag रिचार्ज",
    waterBillLabel: "पानी का बिल",
    recharge: "रिचार्ज",
    utilities: "उपयोगिताएं",
    financial: "वित्तीय",
    others: "अन्य",
    postpaid: "पोस्टपेड",
    electricity: "बिजली",
    water: "पानी",
    gas: "गैस",
    lpg: "एलपीजी",
    wifi: "वाईफाई",
    cableTv: "केबल टीवी",
    loanEmiLabel: "लोन EMI",
    insurancePremium: "बीमा प्रीमियम",
    rent: "किराया",
    subscriptions: "सदस्यताएं",
    trafficChallans: "ट्रैफिक चालान",
    evRecharge: "EV रिचार्ज",

    // Financial Services Screen
    financialServicesTitle: "वित्तीय सेवाएं",
    financialOverview: "वित्तीय अवलोकन",
    creditScoreLabel: "क्रेडिट स्कोर",
    activeLoan: "सक्रिय ऋण",
    creditCardDue: "क्रेडिट कार्ड देय",
    goldSilver: "सोना और चांदी",
    saveInGold: "सोने में बचत करें",
    saveInSilver: "चांदी में बचत करें",
    goldSip: "गोल्ड SIP",
    goldPriceAlert: "सोने की कीमत अलर्ट",
    loans: "ऋण",
    paytmPostpaid: "Paytm पोस्टपेड",
    personalLoan: "व्यक्तिगत ऋण",
    loanOnMutualFund: "म्युचुअल फंड पर ऋण",
    freeCreditScore: "मुफ्त क्रेडिट स्कोर",
    insurance: "बीमा",
    bikeInsurance: "बाइक बीमा",
    carInsurance: "कार बीमा",
    healthInsurance: "स्वास्थ्य बीमा",
    insurancePremiumLabel: "बीमा प्रीमियम",
    investments: "निवेश",
    mutualFunds: "म्युचुअल फंड",
    stocks: "स्टॉक",
    etfs: "ETF",
    mtf: "MTF",
    cards: "कार्ड",
    getCreditCard: "क्रेडिट कार्ड प्राप्त करें",
    payCreditCardBill: "क्रेडिट कार्ड बिल का भुगतान करें",
    linkRupayCard: "RuPay कार्ड को UPI से लिंक करें",
    getSbiCreditCard: "SBI क्रेडिट कार्ड प्राप्त करें",

    // Travel Screen
    travelTitle: "यात्रा",
    flights: "उड़ानें",
    trains: "ट्रेनें",
    buses: "बसें",
    hotels: "होटल",
    recentSearches: "हाल की खोजें",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("appLanguage");
    console.log("Initial language from localStorage:", saved);
    return (saved === "hindi" || saved === "english") ? saved : "english";
  });

  useEffect(() => {
    console.log("Language changed to:", language);
    localStorage.setItem("appLanguage", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    console.log("Setting language to:", lang);
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translated = translations[language][key as keyof typeof translations.english];
    if (!translated) {
      console.warn(`Missing translation for key: ${key} in language: ${language}`);
      return key;
    }
    return translated;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
