import type { NextPage } from "next";
import { prepareConnection } from "db/index";
import { Article } from 'db/entity';
import ListItem from 'components/ListItem/index'
import { Divider } from 'antd';
// import { IArticle } from 'pages/api/index'
import React from 'react';

// interface IProps {
//   articles: IArticle[];
// }

export async function getServerSideProps(){
  const db = await prepareConnection();
  const articles = await db.getRepository(Article).find({
    relations: ['user']
  });
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)) || [],
    },
  };
}
// const Home: NextPage = (props: IProps)=>{
  const Home: NextPage = (props: any)=>{
  const { articles } = props;

  return (
    <div> 
      <div className="content-layout">
      {
        articles?.map((article: any)=>(
        <>
          <ListItem article={article} />
          <Divider />
        </>
        ))
      }
      </div>
    </div>)
};
export default Home;

