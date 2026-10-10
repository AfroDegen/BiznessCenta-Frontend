import { signInWithGoogle } from "../services/auth";

export default function GoogleButton() {
  return (
    <button
      className="google-btn"
      onClick={signInWithGoogle}
    >
      https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg

      <span className="google-text">
        Continue with Google
      </span>
    </button>
  );
}
