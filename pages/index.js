import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'content/posts');
  const filenames = fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : [];
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
          <img src="/assets/css-logo.png" alt="Color Scheme Studio Logo" />
        </a>
        <nav className="nav">
          <a href="#">About</a>
          <a href="#">Color 101</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <main className="main">
        <div className="grid">
          {posts.map(post => (
            <Link key={post.slug} href={`/${post.slug}`}>
              <div className="card">
                <img src={post.thumbnail} alt={post.title} />
                <h2>{post.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 Color Scheme Studio. All rights reserved.</p>
      </footer>

      <style jsx>{`
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
          color: #333;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 40px;
          border-bottom: 1px solid #ddd;
        }
        .logo img {
          height: 40px;
          cursor: pointer;
        }
        .nav a {
          margin-left: 20px;
          text-decoration: none;
          color: #333;
          font-weight: 500;
        }
        .nav a:hover {
          color: #fe7170;
        }
        .main {
          padding: 40px;
          display: flex;
          justify-content: center;
        }
        .grid {
          display: grid;
          gap: 40px;
          width: 100%;
          max-width: 1200px;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }
        .card {
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          border-radius: 20px;
          overflow: hidden;
          transition: 0.3s;
          background: white;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        .card img {
          width: 100%;
          height: auto;
          display: block;
        }
        .card h2 {
          margin: 16px;
          font-size: 18px;
          color: #333;
        }
        .footer {
          text-align: center;
          padding: 30px;
          font-size: 14px;
          color: #777;
          border-top: 1px solid #ddd;
        }
      `}</style>
    </>
  );
}
