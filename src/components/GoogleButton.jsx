import { signInWithGoogle } from "../services/auth";

export default function GoogleButton() {
  return (
    <button
      className="google-btn"
      onClick={signInWithGoogle}
    >
      <span className="google-icon">
        G
      </span>

      Continue with Google
    </button>
  );
}
