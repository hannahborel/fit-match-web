import { Card, CardSize } from "@/components/Card";
import SignInButton from "@/components/SignInButton";

const LandingPage = () => (
  <div className=" flex w-full h-screen bg-gray-100">
    <div className="mx-auto my-auto">
      <Card title={""} cardSize={CardSize.Small}>
        <span className="mx-auto z-10">Welcome to</span>

        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_3133-Wmlu2CSO5ebo01qfv9UlRcTShfUAH0.jpeg"
          className="mx-auto -mt-8 -mb-6"
          alt="Fluent brand logo"
        />
        <div className="mx-auto">
          <SignInButton />
        </div>
      </Card>
    </div>
  </div>
);

export default LandingPage;
