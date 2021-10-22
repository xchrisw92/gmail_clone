import React from "react";

function EmailDetails(props) {
    return (
        <div className={'emailDetails'}>
            <h2>{props.email.subject}</h2>
            <div className={'emailHeader'}>
                <div>
                    <p className={'secondaryText'}>{props.email.sender && "From: " + props.email.sender}</p>
                    <p className={'secondaryText'}>{props.email.recipient && "To: " + props.email.recipient}</p>
                </div>
                    <p className={'secondaryText'}>{props.email.date} </p>
            </div>
            <p className={'emailMessage'}>{props.email.message && "Message: " + props.email.message}</p>

        </div>
    );
}

export default EmailDetails;