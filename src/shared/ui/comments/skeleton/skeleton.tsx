import { clsx } from 'clsx'

import styles from './skeleton.module.scss'
export const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={clsx(styles.avatar, styles.placeholder)}></div>
      <div className={styles.mainBlock}>
        <div className={clsx(styles.text, styles.placeholder)}></div>
        <div className={clsx(styles.likesAndAnswers, styles.placeholder)}></div>
      </div>
    </div>
  )
}
