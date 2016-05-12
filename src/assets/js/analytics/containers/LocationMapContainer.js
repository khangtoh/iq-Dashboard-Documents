import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import MarkerWithLabel from 'app/common/components/maps/MarkerWithLabel';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';
import ui from 'redux-ui/transpiled';

const mapStyle = [
  {
    'featureType': 'all',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'all',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  }
];

const markerIcon = {
  url: '/assets/images/map-circle.svg',
  anchor: new google.maps.Point(25,25)
};

const clusterStyle = {
  width: 25,
  height: 25,
  url: '/assets/images/map-circle.svg',
  textColor: '#fff'
};

const eventWrapper = (fn) => {
  return function() {
    const args = Array.prototype.slice.call(arguments);
    args.unshift(this.refs.map);
    fn.apply(null, args);
  }
};

class LocationMap extends Component {
  render() {
    return (
      <div>
        <div className="clearfix">
          <h2 className="pull-xs-left">Location</h2>
          <div className="pull-xs-right">
            {this.props.ignoredCount} unknown locations
          </div>
        </div>
        <GoogleMapLoader
          containerElement={
            <div style={{
              height: 500,
            }}/>
          }
          googleMapElement={
            <GoogleMap
              ref="map"
              defaultZoom={this.props.ui.zoom}
              defaultCenter={{lat: 0, lng: 0}}
              options={{
                styles: mapStyle
              }}
              onClick={_ => {}}
              onZoomChanged={eventWrapper(this.props.onZoomChanged).bind(this)}>
              <MarkerClusterer styles={[clusterStyle]}>
                {this.props.markers.map((marker, index) => {
                  return (
                    <MarkerWithLabel {...marker}/>
                  );
                })}
              </MarkerClusterer>
            </GoogleMap>
          }/>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  const filters = state.analytics.filters;
  const data = state.analytics.data;
  const allSearches = data.allSearches;

  let ignoredCount = 0;

  const markers = _(allSearches)
    .thru(value => _.reduce(value, (result, search) => {
      // Do not include 0,0. As that is unknown
      if(
        search.lat >= 0 && search.lat <= 0.1
        &&
        search.long >= 0 && search.lat <= 0.1
      ) {
        ignoredCount++;
        return result;
      }

      const key = `${search.lat}:${search.long}`;
      result[key] = {
        position: {
          lat: search.lat,
          lng: search.long,
        },
        key: key,
        defaultAnimation: 2,
        icon: markerIcon,
        labelContent: 1,
        //labelAnchor: new google.maps.Point(22, 0),
        labelClass: 'map-label', // the CSS class for the label,
        labelAnchor: new google.maps.Point(25, 25)
      };
      return result;
    }, {}))
    .thru(_.toArray)
    .value();

  return {
    ignoredCount,
    markers
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onZoomChanged: (mapComponent) => {
      const map = mapComponent.props.map;

      ownProps.updateUI('zoom', map.zoom);
    }
  };
};

let DecoratedComponent = LocationMap;
DecoratedComponent = connect(mapStateToProps, mapDispatchToProps)(DecoratedComponent);
DecoratedComponent = ui({
  state: {
    zoom: 3
  }
})(DecoratedComponent);


export default DecoratedComponent;