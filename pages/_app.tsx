import '../styles/globals.css'
import Layout from 'components/layout';
import { StoreProvider } from 'store/index';
import { NextPage } from 'next';
import React from 'react'


interface IProps {
  initialValue: Record<any, any>;
  Component: NextPage;
  pageProps: any;
  // pageProps?: Element;
}

function MyApp({ initialValue, Component, pageProps }:IProps){

  const renderLayout= ()=>{
    if((Component as any).layout === null) {
      return <Component {...pageProps}/>;
    } else {
      return (
      <Layout>
        {/*  Component ==> Layout的children */}
        <Component {...pageProps} /> 
      </Layout>
      );
    }
  }  
  
  return (
    <StoreProvider initialValue={initialValue}>
        {renderLayout()}
    </StoreProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const { userId, nickname, avatar } = ctx?.req?.cookies || {};

  return {
    initialValue: {
      user: {
        userInfo: {
          userId,
          nickname,
          avatar,
        },
      },
    },
  };
};

export default MyApp
