"use client";

import { useAppDispatch, useAppSelector } from "../lib/hook";
import { getToken } from "../lib/axios";
import { login } from "../lib/features/auth/authSlice";
import { useEffect } from "react";

function useAuth() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const token = getToken();
    if (token && !auth.isAuthenticated) {
      dispatch(login(token));
    }
  }, [dispatch, auth.isAuthenticated]);

  return auth;
}

export default useAuth;
