import AuthForm from "../components/authForm";

const Signin = () => {
    return <AuthForm mode="signin" />
}

// so that we can opt out of <Layout> that is in the _app
Signin.authPage = true;

export default Signin;