import {Component} from "react";
import {MdClear} from "react-icons/md";


export class ComposeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipient: '',
            subject: '',
            message: ''
        }
    }

    handleSend() {
        const email = {
            recipient: this.state.recipient,
            subject: this.state.subject,
            message: this.state.message,
            date: new Date(),
            sender: "skaterboii17@myspace.com"
        }

        fetch('http://localhost:3001/send', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(email),
        })
            .then(response => {
                if(response.status >= 200 && response.status <= 299){
                    response.json();
                }else{
                    throw Error('error');
                }
            })
            .then(data => {
                console.log("Email sent Successfully");
            })
            .catch(err => console.log("error"));


        this.setState({recipient: '', subject: '', message: ''});
    }

    render() {
        return <>
            {this.props.composeMessage && <div className={"composeContainer"}>
                <div className={"composeHeader"}>
                    <h3>New Message</h3>
                    <div
                        onClick={this.props.onClick}
                        className={"clearButton"}><MdClear/>
                    </div>
                </div>
                <div className={"composeContent"}>
                    <input placeholder={"To"} className={"composeInput"} onChange={(arg) => {
                        this.setState({recipient: arg.target.value})
                    }}/>
                    <input placeholder={"Subject"} className={"composeInput"} onChange={(arg) => {
                        this.setState({subject: arg.target.value})
                    }}/>
                    <textarea placeholder={"Message"} className={"composeMessage"} onChange={(arg) => {
                        this.setState({message: arg.target.value})
                    }}/>
                    <button className={"sendButton"} onClick={() => this.handleSend()}>Send</button>
                </div>
            </div>}
        </>;
    }
}