import { Header } from "./components/Header";
import styles from './App.module.css';
import { Sidebar } from "./components/Sidebar";
import { Post, PostProps } from "./components/Post";
import { useState } from "react";


export function App() {
  const [posts, setPosts] = useState<PostProps[]>([
    {
      id: 1,
      author: {
        avatarUrl: 'http://github.com/leonsuckow.png',
        name: 'Leon Suckow',
        role: 'Web Developer',
      },
      content: [
        { type: 'paragraph', content: 'Fala galera 👋' },
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é Todo-list 🚀' },
        { type: 'link', content: '#novoProjeto #nlw #rocketseat' },
      ],
      publishedAt: new Date('2023-01-15')
    },
    {
      id: 2,
      author: {
        avatarUrl: 'http://github.com/andresuckow.png',
        name: 'André Suckow',
        role: 'Web Developer',
      },
      content: [
        { type: 'paragraph', content: 'Fala galera 👋' },
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀' },
        { type: 'link', content: '#novoProjeto #nlw #rocketseat' },
      ],
      publishedAt: new Date('2023-05-03')
    }
  ])
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>
  );
}
