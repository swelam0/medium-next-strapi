import { url } from "../../config/next.config";
import ReactMarkdown from "react-markdown";

export default function Article({ article }) {
  return (
    <div>
      <h1>{article.Title}</h1>
      <ReactMarkdown>{article.Body}</ReactMarkdown>
    </div>
  );
}
export const getStaticProps = async (context) => {
  const data = await fetch(`${url}/articles/${context.params.id}`);
  const article = await data.json();

  return {
    props: { article },
    revalidate: 1,
  };
};
export async function getStaticPaths() {
  const res = await fetch(`${url}/articles`);
  const articles = await res.json();

  const paths = articles.map((item) => ({
    params: { id: item.id.toString() },
  }));

  return { paths, fallback: false };
}
