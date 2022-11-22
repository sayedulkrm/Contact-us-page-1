import React, { Fragment, useState } from 'react'
import "./ContactUs.css";




const ContactUs = () => {


    const formInitialDetails = {
        name: "",
        email: "",
        message: "",
    }


    const [formDetails, setformDetails] = useState(formInitialDetails);
    const [btnText, setbtnText] = useState("Send");
    const [status, setstatus] = useState({});




    const formData = (cate,value) => {

        setformDetails({
            ...formDetails,
            [cate]: value,
        })


    }




    const submitHandler = async(e) => {


        e.preventDefault();
        setbtnText("Sending...");

        const res = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDetails),
        });

        setbtnText("Sent");

        const data = await res.json();

        

        setformDetails(formInitialDetails)


        if ( data.code === 200 ) {
            setstatus({

                success : true,
                message : "Your message sent",
                
            })
            
        }else {
            setstatus({
                success: false,
                message: `Oops... Something went wrong. Please try again later`
            })

            
        }
        




    }








return (

    <Fragment>
        <div className="container">
            <h1>Contact Us</h1>
            <div >
                <form className="form" onSubmit={submitHandler}>

                    <input type="text" value={formDetails.name} placeholder="Enter your Name"  onChange={(e) => formData("name", e.target.value) } />


                    <input type="email" value={formDetails.email} placeholder="Enter your Email" onChange={(e) => formData("email" ,e.target.value) } />

                    <textarea cols="30" rows="6" type="text" placeholder='Type Your Message' value={formDetails.message} onChange={(e) => formData("message", e.target.value)} />


                    <button type='submit'>{btnText}</button>


                    { status.message && 
                
                        <div>
                            <p className={status.success === true ?  "green" : "red"}>{status.message}</p>

                        </div> 
                    }



                </form>
            </div>
        </div>
    </Fragment>



)
}

export default ContactUs