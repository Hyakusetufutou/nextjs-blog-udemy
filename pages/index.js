import { Inter } from "next/font/google";
import Layout, { siteTitle } from "@/components/Layout";
import utilStyles from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { getStoredPostData } from "@/lib/post";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getStoredPostData();

  return {
    props: {
      allPostsData,
    },
  };
}

//  SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //  コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        わたしはフルスタックエンジニアです/Udemy講師として活動しています/好きな言語はJavascriptです
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <h1>{id}</h1>
              <Link href={`/posts/${id}`}>
                <img
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                  alt="a"
                />
              </Link>
              <Link href={`/posts/${id}`}>
                <div className={utilStyles.boldText}>{title}</div>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
