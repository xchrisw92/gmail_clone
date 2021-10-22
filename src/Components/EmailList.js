import React from "react";


function EmailList(props) {
    return (
        <div className={'emailList'}>
            <div className={'emailListContainer'}>
                {props.emails.map(email => {
                    return (
                        <div className={email.id === props.selectedEmail.id ? 'emailTitle emailTitleSelected': 'emailTitle'} key={email.id} onClick={() => props.onEmailSelected(email)}>
                            <h3>{email.subject}</h3>
                            <p className={'secondaryText'}>{email.sender}</p>
                        </div>


                    )
                })}

            </div>
        </div>

    );
}

export default EmailList;
