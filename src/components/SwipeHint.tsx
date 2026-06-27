import styles from './swipe-hint.module.scss'

export default function SwipeHint() {
    return <>
        <div class={styles.hint}>
          <div class={styles.line}></div>
          <div class={styles.dot}></div>

          <span class={styles.text}>swipe left</span>
        </div>
    </>
}
