import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { motion } from 'framer-motion'
import { Button } from 'components/Button'
import FontIcon from 'components/FontIcon'
import InView from 'components/InView'
import { styler, images, colors, breakpoints, rem } from 'styles'
import { path } from 'utils/const'

const styles = styler({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '25px 30px',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: colors.yellow,
    fontWeight: 'normal',
  },
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    fontSize: 16,
    color: colors.darkGray,
    fontWeight: 'bold',
    height: 60,
    marginRight: 50,
    [breakpoints.phone]: {
      display: 'none',
    },
  },
  signupButton: {
    fontSize: 16,
    fontWeight: 'bold',
    height: 60,
    width: 160,
    borderRadius: '30px !important',
  },
  hero: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    [breakpoints.phone]: {
      flexDirection: 'column',
    },
  },
  heroInfoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 10px 10px 0 rgba(65, 64, 64, 0.17)',
    padding: '50px 30px',
    margin: '80px 50px',
    background: 'white',
    maxWidth: 455,
    zIndex: 2,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'normal !important',
    color: colors.darkGray,
    textAlign: 'left !important',
    width: '100%',
    marginBottom: 40,
  },
  heroDesc: {
    fontWeight: 14,
    marginBottom: 120,
    lineHeight: 1.71,
  },
  heroSignupButton: {
    width: 160,
    height: 60,
    borderRadius: '30px !important',
  },
  heroImageContainer: {
    display: 'flex',
    position: 'relative',
    width: '45%',
    maxWidth: 486,
    zIndex: 2,
    marginLeft: 40,
    [breakpoints.phone]: {
      display: 'none',
    },
  },
  heroImageContainerMobile: {
    display: 'none',
    position: 'relative',
    width: '45%',
    maxWidth: 486,
    zIndex: 2,
    marginLeft: 40,
    [breakpoints.phone]: {
      display: 'flex',
      width: '100%',
      maxWidth: 'auto',
      justifyContent: 'flex-end',
      marginLeft: 0,
    },
  },
  heroLaptopImageContainerMobile: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLaptopImage: {
    flex: 1,
    width: '100%',
    zIndex: 2,
    [breakpoints.phone]: {
      marginLeft: 20,
    },
  },
  heroBirdImage: {
    position: 'absolute',
    top: -65,
    left: 50,
    width: 120,
    [breakpoints.phone]: {
      width: 60,
    },
  },
  heroMobile: {
    display: 'none',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 15px',
    background: 'white',
    boxShadow: '0 10px 10px 0 rgba(65, 64, 64, 0.17)',
    zIndex: 2,
    [breakpoints.phone]: {
      display: 'flex',
    },
  },
  heroMobileTitle: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 20,
    color: colors.darkGray,
  },
  heroMobileLoginButton: {
    height: 30,
    width: 100,
    borderRadius: '15px !important',
  },
  heroShadow: {
    position: 'absolute',
    background: colors.lightBlueGray,
    top: 0,
    left: 'calc(100% - 900px)',
    right: 0,
    bottom: 0,
    [breakpoints.desktop]: {
      left: 120,
    },
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: '80px 0',
  },
  featureTitle: {
    fontSize: 32,
    marginBottom: 80,
    color: colors.darkGray,
  },
  featureItemsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 800,
    [breakpoints.phone]: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  featureItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: 200,
    height: '100%',
    [breakpoints.phone]: {
      width: '100%',
      marginBottom: 40,
      flexDirection: 'row',
      minWidth: '100%',
      padding: '0 40px',
    },
  },
  featureImage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    background: colors.darkGray,
    marginBottom: 20,
    [breakpoints.phone]: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginBottom: 0,
      marginRight: 10,
    },
  },
  featureItemIcon: {
    color: 'white',
    fontSize: 30,
    [breakpoints.phone]: {
      fontSize: 24,
    },
  },
  featureContents: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [breakpoints.phone]: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      width: 'auto',
    },
  },
  featureItemTitle: {
    fontSize: 24,
    fontWeight: 'normal',
    color: colors.darkGray,
    marginBottom: 15,
    textAlign: 'center',
  },
  featureItemDesc: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 1.71,
    [breakpoints.phone]: {
      textAlign: 'left',
    },
  },
  procedures: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  procedureTitle: {
    fontSize: 32,
    marginBottom: 80,
    color: colors.darkGray,
  },
  procedureItemsContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 120,
    zIndex: 2,
  },
  procedureItemImage: {
    width: '50%',
    height: 'auto',
    objectFit: 'contain',
    boxShadow: '0 10px 10px 0 rgba(65, 64, 64, 0.17)',
    border: `1px solid ${colors.lightGray}`,
    borderRadius: 4,
    zIndex: 2,
    [breakpoints.phone]: {
      width: '40%',
    },
  },
  procedureItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 10px 10px 0 rgba(65, 64, 64, 0.17)',
    background: 'white',
    borderRadius: 4,
    padding: 40,
    maxWidth: 365,
    zIndex: 2,
    [breakpoints.phone]: {
      padding: 20,
    },
  },
  procedureItemTitle: {
    fontSize: 24,
    fontWeight: 'normal',
    color: colors.darkGray,
    marginBottom: 30,
  },
  procedureItemDesc: {
    fontWeight: 14,
    lineHeight: 1.17,
  },
  procedureShadow: {
    position: 'absolute',
    top: 40,
    bottom: 40,
    width: '40%',
    background: colors.lightBlueGray,
    height: 340,
  },
  prompt: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '80px 40px',
  },
  promptTitle: {
    fontSize: 32,
    fontWeight: 'normal',
    color: colors.darkGray,
    marginBottom: 20,
  },
  promptDesc: {
    fontSize: 16,
    fontWeight: 'normal',
    color: colors.darkGray,
    marginBottom: 40,
  },
  promptButton: {
    width: 160,
    height: 60,
    borderRadius: '30px !important',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: '50px 20px 20px',
    background: colors.darkGray,
  },
  copyRight: {
    fontSize: 16,
    color: 'white',
  },
})

const features = [
  {
    icon: 'clock',
    title: '簡単、便利',
    desc:
      'ワンクリックでスニペットを作成、コピー、他のドキュメントに貼り付けできます。',
  },
  {
    icon: 'cog',
    title: '管理',
    desc:
      'スニペットをフォルダ、タグ、拡張子によって管理できます。キーワード検索もできます。',
  },
  {
    icon: 'tags',
    title: '完全無料',
    desc:
      'スマホ、デスクトップ、どんな端末からでもご利用いただけます。全ての機能を無料でご利用いただけます。',
  },
]

const procedures = {
  desk: [
    {
      ss: images.step1,
      title: 'スニペット作成',
      desc:
        'あなたがよく使う定型分、ソースコードを追加しましょう。フォルダを分けたり、タグを追加することで、あなたらしくスニペットを管理できます。',
    },
    {
      ss: images.step2,
      title: 'スニペット検索',
      desc:
        'フォルダ、拡張子、タグから該当するスニペットを検索したり、キーワード検索が可能です。タグを管理する自分ルールを設けて、自分好みにカスタマイズしましょう。',
    },
    {
      ss: images.step3,
      title: 'スニペットをコピー、貼り付け',
      desc:
        'コピーボタンをクリックすればコピーは完了です。あとはあなたのドキュメント、ノート、お好みの場所に貼り付けできます。',
    },
  ],
  mob: [
    {
      ss: images.step1mob,
      title: 'スニペット作成',
      desc:
        'あなたがよく使う定型分、ソースコードを追加しましょう。フォルダを分けたり、タグを追加することで、あなたらしくスニペットを管理できます。',
    },
    {
      ss: images.step2mob,
      title: 'スニペット検索',
      desc:
        'フォルダ、拡張子、タグから該当するスニペットを検索したり、キーワード検索が可能です。タグを管理する自分ルールを設けて、自分好みにカスタマイズしましょう。',
    },
    {
      ss: images.step3mob,
      title: 'スニペットをコピー、貼り付け',
      desc:
        'コピーボタンをクリックすればコピーは完了です。あとはあなたのドキュメント、ノート、お好みの場所に貼り付けできます。',
    },
  ],
}

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
}

const getHeroVariants = ({ x, y, delay }) => ({
  exit: { x, y, opacity: 0, transition },
  enter: { x: 0, y: 0, opacity: 1, transition: { delay, ...transition } },
})

const getHeroVariantsMobile = ({ x, y, delay }) => ({
  exit: { x, y, opacity: 0, transition },
  enter: { x: 0, y: 35, opacity: 1, transition: { delay, ...transition } },
})

const getFeaturesVariants = ({ delay }) => ({
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay,
      ...transition,
    },
  },
})

const getProcedureVariants = ({ x, delay }) => ({
  hidden: { x, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delay,
      ...transition,
    },
  },
})

const Lp = ({ history }) => {
  const isPhone = useMediaQuery({ query: '(max-width: 576px)' })
  const renderTop = () => (
    <div className={styles.top}>
      <div className={styles.logoContainer}>
        <img src={images.logo} className={styles.logo} alt="logo" />
        <h1 className={styles.title}>
          コピペ
          <span style={{ color: colors.darkGray, fontWeight: 'normal' }}>
            っと
          </span>
        </h1>
      </div>
      <div className={styles.authContainer}>
        <Button
          label="ログイン"
          className={styles.loginButton}
          onClick={() => {
            history.push(path.login)
          }}
        />
        <Button
          label="無料会員登録"
          className={`btn-yellow-outline ${styles.signupButton}`}
          onClick={() => {
            history.push(path.signup)
          }}
        />
      </div>
    </div>
  )

  const renderHero = () => (
    <motion.div
      className={styles.hero}
      initial="exit"
      animate="enter"
      exit="exit"
    >
      <motion.span
        variants={getHeroVariants({ x: -200, y: 0, delay: 0.5 })}
        className={styles.heroShadow}
      />
      <motion.div
        variants={getHeroVariants({ x: -200, y: 0, delay: 0 })}
        className={styles.heroInfoContainer}
      >
        <h1 className={styles.heroTitle}>作業の効率化、手助けします</h1>
        <p className={styles.heroDesc}>
          何度も同じ文章を作ったり、以前作ったものを使いまわす時、その検索に時間をかけていませんか？
          スニペットは、IT用語で、「再利用できる一部」を指します。
          コピペっとでスニペットを管理して、作業を効率化しませんか？
        </p>
        <Button
          label="無料会員登録"
          className={`btn-yellow ${styles.heroSignupButton}`}
          onClick={() => {
            history.push(path.signup)
          }}
        />
      </motion.div>
      <motion.div
        variants={getHeroVariants({ x: 200, y: 0, delay: 1 })}
        className={styles.heroImageContainer}
      >
        <img
          src={images.laptop}
          alt="hero"
          className={styles.heroLaptopImage}
        />
        <motion.img
          alt="bird"
          src={images.birdLpFly}
          className={styles.heroBirdImage}
          variants={getHeroVariants({ x: 0, y: 80, delay: 2 })}
        />
      </motion.div>
      <motion.div
        variants={getHeroVariants({ x: 200, y: 0, delay: 1 })}
        className={styles.heroImageContainerMobile}
      >
        <div className={styles.heroMobile}>
          <h2 className={styles.heroMobileTitle}>アカウントをお持ちの方</h2>
          <Button
            label="ログイン"
            className={`btn-yellow-outline ${styles.heroMobileLoginButton}`}
            onClick={() => history.push(path.login)}
          />
        </div>
        <div className={styles.heroLaptopImageContainerMobile}>
          <img
            src={images.laptop}
            alt="hero"
            className={styles.heroLaptopImage}
          />
          <motion.img
            alt="bird"
            src={images.birdLpFly}
            className={styles.heroBirdImage}
            variants={getHeroVariantsMobile({ x: 0, y: 80, delay: 2 })}
          />
        </div>
      </motion.div>
    </motion.div>
  )

  const renderFeatures = () => (
    <div className={styles.features}>
      <h2 className={styles.featureTitle}>特徴</h2>
      <div className={styles.featureItemsContainer}>
        {features.map((x, i) => (
          <InView
            key={i.toString()}
            className={styles.featureItem}
            variants={getFeaturesVariants({ delay: 0.3 * i })}
          >
            <>
              <div className={styles.featureImage}>
                <FontIcon icon={x.icon} className={styles.featureItemIcon} />
              </div>
              <div className={styles.featureContents}>
                <h3 className={styles.featureItemTitle}>{x.title}</h3>
                <p className={styles.featureItemDesc}>{x.desc}</p>
              </div>
            </>
          </InView>
        ))}
      </div>
    </div>
  )

  const renderProcedures = () => {
    const ps = isPhone ? procedures.mob : procedures.desk
    return (
      <div className={styles.procedures}>
        <h2 className={styles.procedureTitle}>使い方</h2>
        {ps.map((x, i) =>
          i % 2 === 0 ? (
            <InView
              key={i.toString()}
              className={styles.procedureItemsContainer}
              variants={getProcedureVariants({ x: -100, delay: 0.3 * i })}
            >
              <>
                <span className={styles.procedureShadow} />
                <img
                  src={x.ss}
                  alt={`step${i + 1}`}
                  className={styles.procedureItemImage}
                  style={rem({ marginRight: 60 })}
                />
                <div className={styles.procedureItemContainer}>
                  <h3 className={styles.procedureItemTitle}>{x.title}</h3>
                  <p className={styles.procedureItemDesc}>{x.desc}</p>
                </div>
              </>
            </InView>
          ) : (
            <InView
              key={i.toString()}
              className={styles.procedureItemsContainer}
              variants={getProcedureVariants({ x: 100, delay: 0.3 * i })}
            >
              <>
                <span className={styles.procedureShadow} />
                <div className={styles.procedureItemContainer}>
                  <h3 className={styles.procedureItemTitle}>{x.title}</h3>
                  <p className={styles.procedureItemDesc}>{x.desc}</p>
                </div>
                <img
                  src={x.ss}
                  alt={`procedure-${i + 1}`}
                  className={styles.procedureItemImage}
                  style={rem({ marginLeft: 60 })}
                />
              </>
            </InView>
          ),
        )}
      </div>
    )
  }

  const renderPrompt = () => (
    <div className={styles.prompt}>
      <h2 className={styles.promptTitle}>試してみましょう</h2>
      <p className={styles.promptDesc}>
        コピペっとは完全無料。アカウント削除も可能です。一度登試してみましょう。
      </p>
      <Button
        label="無料会員登録"
        className={`btn-yellow ${styles.promptButton}`}
        onClick={() => {
          history.push(path.signup)
        }}
      />
    </div>
  )

  const renderBottom = () => (
    <div className={styles.bottom}>
      <p className={styles.copyRight}>@2020 Wataru Maeda</p>
    </div>
  )

  return (
    <div className={styles.root}>
      {renderTop()}
      {renderHero()}
      {renderFeatures()}
      {renderProcedures()}
      {renderPrompt()}
      {renderBottom()}
    </div>
  )
}

Lp.propTypes = {}

Lp.defaultProps = {}

export default Lp
