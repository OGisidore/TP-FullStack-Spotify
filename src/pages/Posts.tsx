import React, { Fragment, useEffect, useState } from 'react'
import { Post } from '../Models/Post'
import { Link } from 'react-router-dom'
import { getAllData } from '../Helpers/api/espero.indexdb'
import { convertBlobtoUrl } from '../Helpers/utiles/utils'
// import { useNavigate } from 'react-router-dom'
// interface resultDatas {
//   isSuccess: boolean
//   results?: Record<string, any>[]
//   totalPages?: number
//   currentPage?: number
//   nextPage?: number | null
//   previousPage?: number | null
//   pageLinks: string[]
//   allCount?: number | null
// }

export const Posts: React.FC = () => {
  // const navigate = useNavigate()
  const [posts, setPosts] = useState<Post[]>([])
  // cost[(DataSchema, setDatas)] = useState<resultDatas | null>()
  // const posts: Post[] = [
  //   {
  //     _id: 'leodgnbg',
  //     title: 'Introduction à TypeScript',
  //     content:
  //       'Découvrez les bases de TypeScript et comment il peut améliorer votre développement JavaScript.',
  //     category: 'Développement',
  //     image: 'https://example.com/images/typescript_intro.jpg',
  //     userId: 'user123',
  //     publishedAt: new Date('2024-09-09T10:00:00Z'),
  //   },
  //   {
  //     _id: 'leodgnbg',
  //     title: 'Les avantages de React',
  //     content:
  //       'React est une bibliothèque puissante pour construire des interfaces utilisateur dynamiques.',
  //     category: 'Développement',
  //     image: 'https://example.com/images/react_advantages.jpg',
  //     userId: 'user456',
  //     publishedAt: new Date('2024-09-09T10:00:00Z'),
  //   },
  //   {
  //     _id: 'leodgnbg',
  //     title: 'Comment utiliser Tailwind CSS',
  //     content:
  //       'Apprenez à utiliser Tailwind CSS pour créer des designs modernes et responsives.',
  //     category: 'Design',
  //     image: 'https://example.com/images/tailwind_css.jpg',
  //     userId: 'user789',
  //     publishedAt: new Date('2024-09-09T10:00:00Z'),
  //   },
  //   {
  //     _id: 'leodgnbg',
  //     title: 'Introduction à Firebase',
  //     content:
  //       "Firebase offre une suite d'outils pour construire des applications web et mobiles.",
  //     category: 'Développement',
  //     image: 'https://example.com/images/firebase_intro.jpg',
  //     userId: 'user101',
  //     publishedAt: new Date('2024-09-09T10:00:00Z'),
  //   },
  //   {
  //     _id: 'leodgnbg',
  //     title: 'Les tendances du marketing digital en 2024',
  //     content:
  //       'Découvrez les dernières tendances et stratégies en marketing digital pour cette année.',
  //     category: 'Marketing',
  //     image: 'https://example.com/images/digital_marketing.jpg',
  //     userId: 'user202',
  //     publishedAt: new Date('2024-09-09T10:00:00Z'),
  //   },
  //   {
  //     _id: 'leodgnbg',
  //     title: 'Optimiser votre portfolio pour le SEO',
  //     content:
  //       'Des conseils pratiques pour améliorer le référencement de votre portfolio en ligne.',
  //     category: 'SEO',
  //     image: 'https://example.com/images/seo_portfolio.jpg',
  //     userId: 'user303',
  //     publishedAt: new Date('2024-09-09T10:00:00Z'),
  //   },
  //   {
  //     _id: 'leodgnbg',
  //     title: 'Les meilleures pratiques en gestion de projet',
  //     content:
  //       'Apprenez les meilleures pratiques pour gérer efficacement vos projets.',
  //     category: 'Gestion',
  //     image: 'https://example.com/images/project_management.jpg',
  //     userId: 'user404',
  //     publishedAt: new Date('2024-09-09T10:00:00Z'),
  //   },
  //   {
  //     _id: 'leodgnbg',
  //     title: 'Guide pour débutants en Python',
  //     content:
  //       'Un guide complet pour commencer avec Python, parfait pour les débutants.',
  //     category: 'Programmation',
  //     image: 'https://example.com/images/python_guide.jpg',
  //     userId: 'user505',
  //     publishedAt: new Date('2024-09-08T08:00:00Z'),
  //   },
  //   {
  //     _id: 'leodgnbg',
  //     title: 'Sécurité des applications web',
  //     content:
  //       'Conseils pour sécuriser vos applications web contre les menaces courantes.',
  //     category: 'Sécurité',
  //     image: 'https://example.com/images/web_security.jpg',
  //     userId: 'user606',
  //     publishedAt: new Date('2024-09-09T10:00:00Z'),
  //   },
  //   {
  //     _id: 'leodgnbg',
  //     title: 'La révolution des technologies blockchain',
  //     content:
  //       "Découvrez comment la blockchain transforme divers secteurs et ce que cela signifie pour l'avenir.",
  //     category: 'Technologie',
  //     image: 'https://example.com/images/blockchain_revolution.jpg',
  //     userId: 'user707',
  //     publishedAt: new Date('2024-09-09T10:00:00Z'),
  //   },
  // ]
  const getPosts = async () => {
    try {
      var JsonDatas: any = await getAllData('posts')
      if (JsonDatas.status === 200) {
        JsonDatas.datas?.map((d: Post) => {
          d.image = convertBlobtoUrl(d.image as Blob)
          return d
        })
        setPosts(JsonDatas.datas as Post[])
      }
    } catch (error) {
      console.log('error' + error)
    }
  }
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <Fragment>
      <section className="w-full md:w-[50rem] mt-10">
        <h1 className="text-4xl">Posts</h1>
        {posts.map((post: Post) => {
          return (
            <Link
              to={'/posts/:' + post._id}
              key={post._id}
              className="w-full p-4 flex border-b-2 shadow-md justify-between items-center"
            >
              <h3 className="text-3xl font-bold">{post.title}</h3>
              <p>{post.publishedAt.toDateString()}</p>
            </Link>
          )
        })}
      </section>
    </Fragment>
  )
}
