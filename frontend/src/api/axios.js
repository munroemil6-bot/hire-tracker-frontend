import { useState } from "react";
import api from "../api/axios";

function Register() {

    const [formData, setFormData] = useState({

        username: "",

        email: "",

        password: "",

        phone: "",

        role: "APPLICANT"

    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("register/", formData);

            alert("Registration Successful");

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            {/* form inputs */}

            <button type="submit">

                Register

            </button>

        </form>

    );

}

export default Register;