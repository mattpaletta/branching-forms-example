import React from "react";

import GenericForm from "../lib/views/genericForm";
import HomeSelection from "./steps/HomeSelection";

class FriendshipFormController extends React.PureComponent {
    render() {
        return <GenericForm startScreen={HomeSelection} />
    }
}

export default FriendshipFormController;
