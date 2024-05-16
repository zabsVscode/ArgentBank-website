// Icons
import iconChat from '../../components/FeatureItem/icon-chat.png'
import iconMoney from '../../components/FeatureItem/icon-money.png'
import iconSecurity from '../../components/FeatureItem/icon-security.png'

// Components
import Banner from '../../components/Banner/Banner'
import Navigation from '../../components/Navigation/Navigation'
import FeatureItem from '../../components/FeatureItem/FeatureItem'
import Footer from '../../components/Footer/Footer'

// Styles
import './Index.css'

export default function Index() {
  document.title = 'Argent Bank - Home Page'

  /* ===== Features Content ===== */

  // Feature's titles

  const featureTitleChat = 'You are our #1 priority'
  const featureTitleMoney = 'More savings means higher rates'
  const featureTitleSecurity = 'Security you can trust'

  // Feature's texts

  const featureTextChat =
    'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.'
  const featureTextMoney =
    'The more you save with us, the higher your interest rate will be!'
  const featureTextSecurity =
    'We use top of the line encryption to make sure your data and money is always safe.'

  /* ===== Features Content ===== */

  return (
    <>
      <Navigation />
      <main>
        <Banner />
        <section className="features">
          <FeatureItem
            iconUrl={iconChat}
            title={featureTitleChat}
            text={featureTextChat}
          />
          <FeatureItem
            iconUrl={iconMoney}
            title={featureTitleMoney}
            text={featureTextMoney}
          />
          <FeatureItem
            iconUrl={iconSecurity}
            title={featureTitleSecurity}
            text={featureTextSecurity}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}