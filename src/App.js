import EmailList from './Components/EmailList';
import EmailDetails from './Components/EmailDetails';
import './App.css';
import {Component} from "react";
import {MdClear} from "react-icons/md";
import {ComposeComponent} from "./Components/Compose";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emails: [],
            selectedEmail: {},
            searchText: '',
            isComposeMessage: false
        }
    }

    async componentDidMount() {
        await this.loadEmails();
    }

    async loadEmails() {
        const url = 'http://localhost:3001/emails';
        const response = await fetch(url);
        const data = await response.json();
        this.setState({emails: data})
    }

    handleEmailSelected(email) {
        this.setState({selectedEmail: email});
    }

    async searchEmail() {
        if (this.state.searchText === '') {
            await this.loadEmails();
        } else {
            const url = `http://localhost:3001/search?query=${this.state.searchText}`;
            const response = await fetch(url);
            const searchResults = await response.json();
            this.setState({emails: searchResults});
        }
    }

    render() {

        return (
            <div className={'main'}>
                <div>
                    <div className={'search'}>
                        <div className={'searchBar'}>
                            <input type='text' placeholder='Search...' value={this.state.searchText}
                                   onChange={(event) => {
                                       console.log(event.target.value);
                                       this.setState({searchText: event.target.value})
                                   }}
                            />
                            {(this.state.searchText !== '') &&
                            <div
                                onClick={(e) => {
                                    this.setState({searchText: ''}, async () =>
                                        await this.searchEmail());
                                }}

                                className={'clearButton'}><MdClear/>
                            </div>}
                        </div>
                        <button onClick={(e) => this.searchEmail()}>
                            Search
                        </button>
                    </div>
                    <EmailList
                        emails={this.state.emails}
                        onEmailSelected={(arg) => this.handleEmailSelected(arg)}
                        selectedEmail={this.state.selectedEmail}
                    />

                </div>
                <div className={'rightSide'}>
                    <button onClick={() => this.setState({isComposeMessage: true})}
                            className={"composeButton"}>Compose
                    </button>
                    <EmailDetails
                        email={this.state.selectedEmail}
                    />
                </div>
                <ComposeComponent composeMessage={this.state.isComposeMessage}
                                  onClick={(e) => this.setState({isComposeMessage: false})}/>
            </div>
        );

    }
}

export default App;
