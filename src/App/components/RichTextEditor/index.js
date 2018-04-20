import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

class MyStatefulEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: RichTextEditor.createEmptyValue()
        };
    }    

    componentWillMount() {
        if(this.props.default) {
            this.setState({
                value: RichTextEditor.createValueFromString(this.props.default, 'html')
            })
        }
    }

    onChange(value) {
        const currentValue = value.toString('html');
        const state = this.state.value.toString('html');

        this.setState({value});
        if(currentValue !== state && this.props.onChange) {
            this.props.onChange(currentValue);
        }
    };

    render () {
        return (
            <RichTextEditor
                value={this.state.value}
                onChange={this.onChange.bind(this)}
            />
        );
    }
}

export default MyStatefulEditor;