import {useAuth} from "../middlewares/Auth"

export default function  Home(){

    const { isLoggedIn, logout } = useAuth();

    return (
        <div className="min-h-screen min-w-screen bg-slate-200">
        {
            isLoggedIn?(<div>
                <div>login</div>
                <div>signup</div>
            </div>):(
                <div>
                <div>dashboard</div>
                <div>logout</div>

                </div>
            )
        }

        <p>The Home Page</p>

        </div>
    )
} 