"use client";

import React from "react";
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from "next-auth/react";


const Navbar = () => {
  const { data: session } = useSession();


  return (
    <div className="container" id="Navbar">
      <div className="row">
        <header className="d-flex flex-wrap justify-content-center pt-3">
          <div className="stacked-title mb-3 mb-md-0 me-md-auto link-body-emphasis">
            <a
              href="/"
              className="d-flex link-module align-items-center mb-0 mb-md-0 me-md-auto link-body-emphasis link-color-unique text-decoration-none"
            >
              <span className="fs-4">BASE CORE LAB Website</span>
            </a>
          </div>
          <ul className="nav ">
            <li className="nav-item pt-3">
              <Link href="/login" className="nav-link link-module">
                <span>Login</span>
              </Link>
            </li>
            <li className="nav-item pt-3">
              <Link href="/logout" className="nav-link link-module">
              <span>Logout</span>
              </Link>
            </li>
            <li className="nav-item pt-3">
              <Link href="/request" className="nav-link link-module">
              <span>Request Equipment</span>
              </Link>
            </li>
            <li className="nav-item pt-3">
              <Link href="/equipment" className="nav-link link-module">
              <span>List of Equipment</span>
              </Link>
            </li>
            { session?.user?.admin == true &&
                <li className="nav-item pt-3 ">
                <Link href="/dashboard" className="nav-link link-module">
                <span>Dashboard</span>
                </Link>
                </li>
            }
            <li className="nav-item pt-3 ">
              <Link href="/about" className="nav-link link-module">
              <span>About</span>
              </Link>
            </li>
          </ul>
        </header>
        <header className="d-flex flex-wrap justify-content mb-5 pb-2 border-bottom"></header>
      </div>
    </div>
    
  );
};

export default Navbar;
