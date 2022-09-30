// import type { NextPage } from "next";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import * as React from 'react';
type Props = {
  children?: React.ReactNode
};

const Layout: React.FC<Props>= ({ children })=>{
  return (
      <div>
          <Navbar/>
          <main>{children}</main> 
          {/* main原生的html标签，也可以用div标签  */}
          <Footer/>
      </div>
  )
};

export default Layout;




