// Components
import Footer from '../../components/Footer/Footer'
import Navigation from '../../components/Navigation/Navigation'
import SignInForm from '../../components/SignInForm/SignInForm'

export default function SignIn() {
  document.title = 'Argent Bank - Login'
  return (
    <>
      <Navigation />
      <main className="main bg-dark">
        <SignInForm />
      </main>
      <Footer />
    </>
  )
}