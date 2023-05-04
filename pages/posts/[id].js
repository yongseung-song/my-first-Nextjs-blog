import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // 비동기 함수인 getPostData 로부터 데이터를 받아야하므로 호출할때 `await` 을 사용한다
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

function catchEls(html) {
  // const rawHtml = postData.contentHtml;
  const regexp = /^\<[a-zA-Z]+\>.+\<\/[a-zA-Z]+\>$/gm;
  const matches = html.match(regexp);
  console.log(matches ? matches : "this is empty");
  // matches.map((match) => console.log(match));
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <br />
      {postData.id}
      <br />
      <Date dateString={postData.date} />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      {/* <div>{catchEls(postData.contentHtml)}</div> */}
    </Layout>
  );
}
