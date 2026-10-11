  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data: business } = await supabase
          .from("businesses")
          .select("id")
          .eq("owner_id", currentUser.id)
          .maybeSingle();

        if (business) {
          navigate("/dashboard", { replace: true });
          return;
        }
      }

      setLoading(false);
    }

    loadUser();
  }, [navigate]);
