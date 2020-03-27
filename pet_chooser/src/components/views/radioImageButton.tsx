import React from "react";

class RadioImageButton extends React.PureComponent<{option: { name: string, image: string },
    isSelected: boolean | undefined,
    onClick: CallableFunction }, {}> {

    render(): any {
        const image_size = "150px";
        return (
            <div style={{width: image_size, margin: "10px", transition: "0.2s", opacity: this.props.isSelected === undefined || this.props.isSelected ? 1.0 : 0.3 }} onClick={() => this.props.onClick(this.props.option.name)}>
                <img width={image_size} height={image_size} src={this.props.option.image} />
                <p style={{textAlign: "center"}}>{this.props.option.name}</p>
            </div>
        );
    }
}

export default RadioImageButton;
