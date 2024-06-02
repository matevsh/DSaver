import { useLocation } from "wouter";

export function useNavigate() {
  const [_location, navigate] = useLocation();

  return { navigate };
}
