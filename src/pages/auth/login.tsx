import { useNavigate } from "react-router-dom";
import { verifyAdmin } from "../../services/auth";
import { useState } from "react";

export default function LoginPage() {
  const [busy, setbusy] = useState(false);
  const navigate = useNavigate();

  const _onSubmit = async (e: any) => {
    e.preventDefault();
    if (busy) return;
    setbusy(true);
    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    await verifyAdmin(body)
      .then((res) => {
        localStorage.setItem("authToken", res.token);
        navigate("/");
      })
      .catch(() => {})
      .finally(() => setbusy(false));
  };

  return (
    <form onSubmit={_onSubmit}>
      <div className="text-[28px] font-[ClashDisplay]">LOGIN TO LEADS</div>
      <div className="mt-6">Username or Email</div>
      <input
        className="text-[14px] mt-2 border-[1.5px] border-[#16263B] bg-[#0F1626] rounded-[12px] px-4 py-3 w-full"
        placeholder="Enter your username"
        required
        autoFocus
        type="email"
        id="email"
      />
      <div className="mt-6">Password</div>
      <input
        className="text-[14px] mt-2 border-[1.5px] border-[#16263B] bg-[#0F1626] rounded-[12px] px-4 py-3 w-full"
        placeholder="Enter your username"
        required
        autoFocus
        type="password"
        id="password"
      />
      <button className={`btn1 w-full mt-8 lg:mt-12 ${busy ? "busybtn" : ""}`}>
        Login
      </button>
    </form>
  );
}
