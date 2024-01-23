"use client";
import React from "react";
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { GetServerSideProps } from "next";
import { getServerSideProps } from "../pages/dashboard";


const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();


  return (
    <div className="container" id="Navbar" onLoad={GetServerSideProps}>
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
            { !session &&
              <li className="nav-item pt-3">
              <Link href="/login" className="nav-link link-module">
                <span>Login</span>
              </Link>
              </li>
            }
            { session &&
              <li className="nav-item pt-3">
              <Link href="/logout" className="nav-link link-module">
              <span>Logout</span>
              </Link>
              </li>
            }
            <li className="nav-item pt-3 ">
              <Link href="/projects" className="nav-link link-module">
              <span>Projects</span>
              </Link>
            </li>
            <li className="nav-item pt-3">
              <Link href="/request" className="nav-link link-module" >
              <span>Equipment</span>
              </Link>
            </li>
            <li className="nav-item pt-3">
              
                <div className="dropdown">
                  <button className="nav-link dropbtn btn">Lab Equipment</button>
                  <div class="dropdown-content">
                    <Link href="/equipment" className="nav-link link-module">List of Equipment</Link>
                    <Link href="/request" className="nav-link link-module">Request Equipment</Link>
                  </div>
                </div>
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
        <header className="d-flex flex-wrap justify-content mb-2 border-bottom"></header>
        <button className="btn btn-outline-light mb-0" onClick={() => router.refresh()}>Data not updating? Click here to Refresh!</button>
        <header className="d-flex flex-wrap justify-content mb-5 pb-2 border-bottom"></header>
      </div>
      <div className="">
      </div>

    </div>
    
  );
};

export default Navbar;
