import ContactVerification from "@/components/ContactVerification";
import LeftSide from "./components/LeftSide";
import RighSide from "./components/RighSide";
import VerifyOtpModal from "@/components/VerifyOtpModal";

export default function Home() {
  return (
    <div className="flex justify-evenly">
      <LeftSide />
      <RighSide />
    </div>
   );
}
