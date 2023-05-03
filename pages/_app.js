import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const roboto = Inter({
  weight: '400',
  subsets: ['latin'],
})
//make sure to add the font to the head tag


export default function App({ Component, pageProps }) {
  return (<main className={roboto.className}>
    <Component {...pageProps} />
  </main>)
}
