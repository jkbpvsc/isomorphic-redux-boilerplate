import React, {Component} from 'react';
import { connect } from 'react-redux'
import { load, getData } from '../../Redux/actions/main'
import logo from '../../resources/image/logo.png';

import '../../sass/src/index.scss'

class IndexContainer extends Component {
    constructor() {
        super();
        this.state = {
            loadedOnClient: false
        }
    }

    static fetchData({ store }) {
        return store.dispatch(getData());
    }

    refresh() {
        this.props.dispatch(getData());
        this.setState({loadedOnClient: true});
    }

    componentDidMount() {
        this.props.dispatch(load());
    }

    render() {
           return (
               <div>
                   <h1>Isomorphic Redux Boilerplate</h1>
                   <img style={{ width: 140 }} src={logo}/>
                   <br/>
                   <br/>
                   <br/>
                   <h3>Async data</h3>
                   <p hidden={this.state.loadedOnClient}>This was rendered on the <b>server</b> in: {this.props.indexData.loaded ? this.props.indexData.time + 'ms' : 'Loading'}</p>
                   <p hidden={!this.state.loadedOnClient}>This was rendered on the <b>client</b> in: {this.props.indexData.loaded ? this.props.indexData.time + 'ms' : 'Loading'}</p>
                   <input type={'button'} onClick={this.refresh.bind(this)} value={'Refresh'}/>

                   <br/>
                   <br/>
                   <br/>
                   <br/>
                   <br/>
                   <div>Forked from: <a target={'_blank'} href={'https://github.com/atulmy/universal-react'}>atulmy</a></div>
               </div>
           )
    }
}

function mapStateToProps(state)
{
    return {
        indexData: state.indexData
    }
}

export default connect(mapStateToProps)(IndexContainer)