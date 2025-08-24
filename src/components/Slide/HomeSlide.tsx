import styles from './slide.module.scss'

import {default as cn} from 'classnames'
import Signature from '../Signature'

export default function HomeSlide() {
  return <>
    <div class={cn(styles.slide, styles.home)}>
      <h1>The <span class={styles.accent}>Lekker</span> Census</h1>
      <p><i>Census of the littlebear36 community</i></p>
      {/*<p>art and stylistic direction by Oni_Spumoni</p>*/}
      {/*<p>website by brilliantdrink</p>*/}
      <Signature class={styles.signature} classSvg={''}/>
    </div>
  </>
}
