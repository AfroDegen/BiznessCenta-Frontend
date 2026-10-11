import { signInWithGoogle } from "../services/auth";

export default function GoogleButton() {
  return (
    <button
      className="google-btn"
      onClick={() => signInWithGoogle()}
    >
      <img
        src="/google.svg"
        alt=""
        className="google-icon"
        width="22"
        height="22"
      />
      <span className="google-text">Continue with Google</span>
    </button>
  );
}
