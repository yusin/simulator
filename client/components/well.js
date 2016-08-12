import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Grid, Row, Cell } from 'react-inline-grid';

const Well = React.createClass({

    getInitialState() {
        return { dsr: { model: {} }, actual: {} };
    },
    componentDidMount() {
    },
    handleChange(v, val){
        console.log(val);
        this.props.onChange(this.props.id, val);
    },
    render() {
        const style = { height: '200px' };
        const id = 'well-'+this.props.id;
        return (<Paper style={style}>
            {this.props.id}
            <Grid>
                <Row is="center">
                    <Cell is="10">
                        <TextField id={id} value={this.props.well} style={{width:140}} onChange={this.handleChange} />
                    </Cell>
                </Row>
            </Grid>
        </Paper>);
    }
});

export default Well;

