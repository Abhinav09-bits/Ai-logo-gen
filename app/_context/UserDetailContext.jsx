"use client"
import { createContext } from 'react';
export const UserDetailContext = createContext({ userDetail: null, setUserDetail: () => {} });