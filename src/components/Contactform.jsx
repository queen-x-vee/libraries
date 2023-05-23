import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
//import { Stack } from '@chakra-ui/react';

function ContactUsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name.trim() === "") {
      setNameError("Name is required");
      return;
    }

    if (email.trim() === "") {
      setEmailError("Email is required");
      return;
    } else {
      // Check if email is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Invalid email address");
        return;
      }
    }

    if (message.trim() === "") {
      setMessageError("Message is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const id = uuidv4();
      const response = await axios.post(
        "https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries",
        {
          id,
          name,
          email,
          subject,
          message,
        }
      );

      if (response.status === 200) {
        // Handle successful form submission here
        console.log("success!");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setIsSubmitting(false);
      } else {
        setSubmitError(
          "An error occurred while submitting the form. Please try again later."
        );
        console.log(response);
        setIsSubmitting(false);
      }
    } catch (error) {
      setSubmitError(
        "An error occurred while submitting the form. Please try again later."
      );
      console.log(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundImage: "linear-gradient(to right, #093028, #237a57)",
          color: "white",
          minHeight: "100vh",
          //width:'50%',
          marginLeft:'auto',
          marginRight:'auto',
          paddingBottom:'30px',
          paddingTop:'20px'
        }}
      >
        <h2
        style={{
          fontSize:'37px',
          color:'white',
          textAlign:'center',
          padding:'14px',
          marginBottom:'25px',
          //marginTop:'30px'
        }}>Contact Us!</h2>
        <div style={{
          width:'45%',
          marginLeft:'auto',
          marginRight:'auto'
        }}>
        {submitError && <div>{submitError}</div>}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "30px",
          }}
        >
          <label style={{
            fontSize:'18px'
          }}>
            Name <span>*</span>
          </label>
          <input
            style={{
              width: "100%",
              outline:'none',
              border:'none',
              height: "55px",
              color:'black',
              borderRadius: "15px",
              padding: "16px",
              paddingRight: "22px",
              backgroundColor: "white",
            }}
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <div>{nameError}</div>}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "30px",
          }}
        >
          <label style={{
            fontSize:'18px'
          }}>
            Email <span>*</span>
          </label>
          <input
            style={{
              width: "100%",
              outline:'none',
              border:'none',
              height: "55px",
              color:'black',
              borderRadius: "15px",
              padding: "16px",
              paddingRight: "22px",
              backgroundColor: "white",
            }}
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div>{emailError}</div>}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "30px",
          }}
        >
          <label 
          style={{
            fontSize:'18px'
          }}> Subject</label>
          <input
            style={{
              width: "100%",
              outline:'none',
              border:'none',
              height: "55px",
              color:'black',
              borderRadius: "15px",
              padding: "16px",
              paddingRight: "22px",
              backgroundColor: "white",
            }}
            type="text"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "30px",
          }}
        >
          <label style={{
            fontSize:'18px'
          }}>
            {" "}
            Message <span>*</span>
          </label>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              outline:'none',
              border:'none',
              color:'black',
              //height: "55px",
              borderRadius: "15px",
              padding: "16px",
              paddingRight: "22px",
              backgroundColor: "white",
            }}
          />
          {messageError && <div>{messageError}</div>}
        </div>
        <button type="submit" disabled={isSubmitting}
         style={{
          width: "100%",
          height: "45px",
          borderRadius: "15px",
          padding: "16px",
          fontSize:'20px',

         color:'black',
          backgroundColor: "yellow",
        }}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        </div>
      </form>
    </div>
  );
}

export default ContactUsForm;
