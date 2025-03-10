import { useAuth0 } from "@auth0/auth0-react"


const ButtonAuth = () => {
    const { loginWithRedirect } = useAuth0()
    return (
        <div>
            <button className="text-orange-600 font-semibold p-2 cursor-pointer"
                onClick={async () => await loginWithRedirect()}>Log In</button>
        </div>
    )
}

export default ButtonAuth
