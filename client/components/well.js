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
    render() {
        const style = { height: '200px' };
        return (<Paper style={style}>
            {this.props.id}
            <Grid>
                <Row is="center">
                    <Cell is="10">
                    
                    </Cell>
                </Row>
            </Grid>
        </Paper>);
    }
});

export default Well;

