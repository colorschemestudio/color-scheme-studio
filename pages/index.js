import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/global.css';

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'content/posts');
  const filenames = fs.readdirSync(postsDir);
  const posts = filenames.map(filename => {
    const filePath = path.join(postsDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return { ...data, slug: filename.replace('.md', '') };
  });
  return { props: { posts } };
}

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Color Scheme Studio</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <header className="header">
        <a href="/" className="logo">
          <img src="/assets/logo.svg" alt="Color Scheme Studio" />
        </a>
      </header>
      <main>
        <div className="post-grid">
          {posts.map(post => (
            <Link key={post.slug} href={`/${post.slug}`}>
              <div className="post-card">
                <img src={post.thumbnail} alt={post.title} />
                <h2>{post.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <footer>© Color Scheme Studio</footer>
    </>
  );
}
