import React from "react";

import formStyles from "./form_container.module.scss";
import FormSize from "../model/form_size";

class FormContainer extends React.PureComponent<{size: FormSize | undefined}, {}> {
    render() {
        const size = this.props.size === undefined ? FormSize.REGULAR : this.props.size;
        const is_regular = size.width === FormSize.REGULAR.width && size.height === FormSize.REGULAR.height;
        return (
            <div className={is_regular ? formStyles.regular_container : formStyles.large_container}
                 style={{width: size.width + "px", height: size.height + "px"}}>
                <div className={formStyles.contents}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default FormContainer;
