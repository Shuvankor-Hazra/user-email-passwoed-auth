import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted);

        setRegisterError('');
        setSuccess('');

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer !');
            return;

        } else if (!/[A_Z]/.test(password)) {
            setRegisterError('Password should be at least 1 Uppercase characters !')
            return;

        } else if (!accepted) {
            setRegisterError('Please accept our terms and condition !')
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User Created Successfully !')

                updateProfile(result.user, {
                    displayName: name,
                })

                sendEmailVerification(result.user)
                    .then(() => {
                        alert('Please check your email and verify your account !')
                    })
                    .then(() => console.log('Profile Updated'))
                    .catch(error => console.log(error))
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message)
            })
    }



    return (
        <div className="">
            <div className="mx-auto w-1/3 space-y-5">
                <h2 className="text-4xl">Register Now</h2>
                <form onSubmit={handleRegister}>

                    <input className="border-2 w-full mb-5 text-lg px-4 py-2 rounded-xl" placeholder="Full Name" type="text" name="name" id="" required />
                    <br />

                    <input className="border-2 w-full mb-5 text-lg px-4 py-2 rounded-xl" placeholder="Email Address" type="email" name="email" id="" required />
                    <br />

                    <div className="relative">
                        <input
                            className="border-2 w-full mb-5 text-lg px-4 py-2 rounded-xl " placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id=""
                            required />
                        <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer text-2xl absolute top-4 right-4">
                            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                        </span>
                    </div>
                    <br />
                    <div className="space-x-2 ">
                        <input type="checkbox" name="terms" id="terms" />
                        <label htmlFor="terms">Accept our terms and conditions.</label>
                    </div>
                    <br />
                    <input className="w-full btn btn-secondary " type="submit" value="Register" />
                    {
                        registerError && <p className="text-red-500">{registerError}</p>
                    }
                    {
                        success && <p className="text-green-500">{success}</p>
                    }
                    <p className="text-lg mt-5">Already have an account ? please... <Link to='/login' className="underline text-primary">Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Register;