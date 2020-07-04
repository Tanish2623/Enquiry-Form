import React,{useState} from 'react';
import axios from 'axios';
const ContactForm = () => {

    const [state, setState] = useState({
        name : '',
        email : '',
        subject : '',
        message : ''
    });
    const [result, setResult] =useState(null);
    const sendEmail = event => {
        const url = "http://localhost:3030/send";
        const data = {...state};
        console.log(data)
        event.preventDefault();
        axios
          .post(url, { ...state })
          .then(response => {
            setResult(response.data);
            setState({
              name: '',
              email: '',
              subject: '',
              message: ''
            });
          })
          .catch((error) => {
            setResult({
              success: false,
              message: 'Something went wrong. Try again later'
            });
          });
      };
      const onInputChange = event => {
        const { name, value } = event.target;
    
        setState({
          ...state,
          [name]: value
        });
      };


    return (
        <div>
        { result && (
            <p className={`${result.success}? 'success' : 'error' `}>
                {result.message}
            </p>
        )}
            <form onSubmit={sendEmail}>
                Full Name :
                <br/>
                <input type="text"
                       name="name"
                       value={state.name}
                       placeholder="Enter Your Full Name"
                       onChange={onInputChange}
                />
                <br/>
                Email :
                <br/> 
                <input type="text"
                       name="email"
                       value={state.email}
                       placeholder="Enter Your email"
                       onChange={onInputChange}
                />
                <br/>
                Subject : 
                <br/>
                <input type="text"
                       name="subject"
                       value={state.subject}
                       placeholder="Enter Subject"
                       onChange={onInputChange}
                />
                <br/>
                Message : 
                <br/>
                <input type="textarea"
                       name="message"
                       value={state.message}
                       placeholder="Enter Your Message"
                       onChange={onInputChange}
                />
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ContactForm;