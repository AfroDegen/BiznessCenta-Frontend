import { signInWithGoogle } from "../services/auth";

export default function GoogleButton() {
  return (
    <button
      className="google-btn"
      onClick={() => signInWithGoogle()}
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt=""
        width="18"
        height="18"
      />
      <span className="google-text">Continue with Google</span>
    </button>
  );
}
