"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const nav = () => {
  return <div className="nav_logo">
    <a>Home</a>
    <a>About</a>
    <a>PlaceHolder</a>
    <a>PlaceHolder</a>
  </div>;
};

export default nav;
