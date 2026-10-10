import { signInWithGoogle } from "../services/auth";

export default function GoogleButton() {
  return (
    <button
      className="glass-button"
      onClick={signInWithGoogle}
    >
      Continue with Google
    </button>
  );
}

