import { createBrowserRouter } from "react-router";
import MobileNumberScreen from "./screens/MobileNumberScreen";
import OTPScreen from "./screens/OTPScreen";
import NameInputScreen from "./screens/NameInputScreen";
import PreferenceScreen from "./screens/PreferenceScreen";
import Dashboard from "./screens/Dashboard";
import ExploreScreen from "./screens/ExploreScreen";
import RechargeScreen from "./screens/RechargeScreen";
import FinancialServicesScreen from "./screens/FinancialServicesScreen";
import TravelScreen from "./screens/TravelScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ScanScreen from "./screens/ScanScreen";
import SelectContactScreen from "./screens/SelectContactScreen";
import PaymentAmountScreen from "./screens/PaymentAmountScreen";
import PaymentPINScreen from "./screens/PaymentPINScreen";
import PaymentSuccessScreen from "./screens/PaymentSuccessScreen";
import QuickPayModeScreen from "./screens/QuickPayModeScreen";
import CheckBalanceScreen from "./screens/CheckBalanceScreen";
import OffersRewardsScreen from "./screens/OffersRewardsScreen";
import SetPINScreen from "./screens/SetPINScreen";
import ConfirmPINScreen from "./screens/ConfirmPINScreen";
import PINSuccessScreen from "./screens/PINSuccessScreen";
import PINPromptScreen from "./screens/PINPromptScreen";
import VerifyUPIPINScreen from "./screens/VerifyUPIPINScreen";
import BankTransferScreen from "./screens/BankTransferScreen";
import BankTransferAmountScreen from "./screens/BankTransferAmountScreen";
import BankTransferSuccessScreen from "./screens/BankTransferSuccessScreen";
import LanguageScreen from "./screens/LanguageScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LanguageScreen />,
  },
  {
    path: "/mobile",
    element: <MobileNumberScreen />,
  },
  {
    path: "/otp",
    element: <OTPScreen />,
  },
  {
    path: "/name",
    element: <NameInputScreen />,
  },
  {
    path: "/preferences",
    element: <PreferenceScreen />,
  },
  {
    path: "/pin-prompt",
    element: <PINPromptScreen />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/explore",
    element: <ExploreScreen />,
  },
  {
    path: "/recharge",
    element: <RechargeScreen />,
  },
  {
    path: "/financial",
    element: <FinancialServicesScreen />,
  },
  {
    path: "/travel",
    element: <TravelScreen />,
  },
  {
    path: "/profile",
    element: <ProfileScreen />,
  },
  {
    path: "/scan",
    element: <ScanScreen />,
  },
  {
    path: "/select-contact",
    element: <SelectContactScreen />,
  },
  {
    path: "/payment-amount",
    element: <PaymentAmountScreen />,
  },
  {
    path: "/payment-pin",
    element: <PaymentPINScreen />,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccessScreen />,
  },
  {
    path: "/quick-pay",
    element: <QuickPayModeScreen />,
  },
  {
    path: "/check-balance",
    element: <CheckBalanceScreen />,
  },
  {
    path: "/offers",
    element: <OffersRewardsScreen />,
  },
  {
    path: "/set-pin",
    element: <SetPINScreen />,
  },
  {
    path: "/confirm-pin",
    element: <ConfirmPINScreen />,
  },
  {
    path: "/pin-success",
    element: <PINSuccessScreen />,
  },
  {
    path: "/verify-upi-pin",
    element: <VerifyUPIPINScreen />,
  },
  {
    path: "/bank-transfer",
    element: <BankTransferScreen />,
  },
  {
    path: "/bank-transfer-amount",
    element: <BankTransferAmountScreen />,
  },
  {
    path: "/bank-transfer-success",
    element: <BankTransferSuccessScreen />,
  },
]);
