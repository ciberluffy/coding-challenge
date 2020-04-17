import React from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { requestApiData } from '../actions/actions';

import '../style/upcoming.css';

class List extends React.Component {
   
   constructor(props){
      super(props);
      this.state = {
         offset: 0,
      };
   }

   componentDidMount() {
      try {
         this.props.requestApiData(this.state.offset);
      } catch (e) {
         console.log(e);
      }
   }

   async prev() {
      if(this.state.offset >= 10){
         await this.props.requestApiData(this.state.offset - 10);
         this.setState({offset: this.state.offset - 10});
      }
   }

   async next(count) {
      if(this.state.offset <= count - 10){
         await this.props.requestApiData(this.state.offset + 10);
         this.setState({offset: this.state.offset + 10});
      }
   }

   calculateEnd(count) {
      return (this.state.offset + 10 > count) ? count : this.state.offset + 10;
   }

   spaces = (content) => (
      <div>
         <div className='container'></div>
            {content}
         <div className='container'></div>
      </div>
   )

   launch = (launch) => (
      <div key={launch.id}>
         {this.spaces(
            <div className='rocket-card'>
               <h2>{launch.name}</h2>
               <h4>{launch.rocket.configuration.launch_service_provider}</h4>
               
               <p>Mission: {launch.mission ? launch.mission.name : 'unasign'}</p>
               
               <button><Link className="link" to={`/${launch.id}`}>Details</Link></button>
            </div>
         )}
      </div>
   )

   header = () => (
      <div className='header-rocket-list'>
         <button className="buttom-prev" disabled={this.state.offset===0} onClick={() => this.prev()}>Prev</button>
         <h1 className="listing">Listing Upcoming Launches from {this.state.offset} to {this.calculateEnd(this.props.data.count)}</h1>
         <button className="buttom-next" disabled={this.state.offset+10>=this.props.data.count} onClick={() => this.next(this.props.data.count)}>Next</button>
      </div>
   )

   footer = () => (
      <div className='footer-rocket-list'>
         <button className="buttom-prev" disabled={this.state.offset===0} onClick={() => this.prev()}>Prev</button>
         <button className="buttom-next" disabled={this.state.offset+10>=this.props.data.count} onClick={() => this.next(this.props.data.count)}>Next</button>
      </div>
   )

   render() {
      return (this.props.data.results) ? (
         <div className='rocket-list'>
            {this.spaces(this.header())}
            
            {this.props.data.results.map(this.launch)}
            
            {this.spaces(this.footer())}
         </div>
      ) : (
         <h1>Loading...</h1>
      );
   }
}

const mapStateToProps = state => ({data: state.data});

const mapDispatchToProps = dispatch => bindActionCreators({requestApiData}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(List);
