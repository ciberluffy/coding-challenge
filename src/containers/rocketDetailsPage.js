import React from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { requestApiDetails } from '../actions/actions';

import '../style/rocketDetails.css';

class Rocket extends React.Component {

   componentDidMount() {
      if(this.props.match.params){
         try {
            this.props.requestApiDetails(this.props.match.params.id);
         } catch (e) {
            console.log(e);
         }
      }
      
   }

   render() {
      const detail = this.props.detail;
      
      return (detail && detail.id) ? (
         <div>
            <div>
            <h1>{detail.name}</h1>
            <h2>{detail.rocket.configuration.launch_service_provider.name}</h2>
            <img src={`${detail.rocket.configuration.image_url}`} 
                  className='rocket-img' 
                  alt={`${detail.name}`} />
            </div>

            <button><Link className="link" to='/'>Back</Link></button>
         </div>
      ) : (
         <h1>Loading...</h1>
      );
   }
}

const mapStateToProps = state => ({detail: state.detail});

const mapDispatchToProps = dispatch => bindActionCreators({requestApiDetails}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Rocket);
